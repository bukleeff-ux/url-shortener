import random
import string
from contextlib import asynccontextmanager

from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from config import BASE_URL, FRONTEND_URL, SHORT_CODE_LENGTH
from database import init_db, get_db
from models import URL
from schemas import ShortenRequest, URLResponse


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield


app = FastAPI(title="URL Shortener API", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_methods=["*"],
    allow_headers=["*"],
)


def _generate_code(length: int = SHORT_CODE_LENGTH) -> str:
    """Generate a random alphanumeric short code."""
    chars = string.ascii_letters + string.digits
    return "".join(random.choices(chars, k=length))


# ── Endpoints ────────────────────────────────────────────────────────────────

@app.post("/shorten", response_model=URLResponse, status_code=201)
async def shorten_url(body: ShortenRequest, db: AsyncSession = Depends(get_db)):
    """Create a short URL. Optionally provide a custom short code."""
    original = str(body.url)
    code = body.custom_code or _generate_code()

    # Validate custom code uniqueness
    if body.custom_code:
        existing = await db.scalar(select(URL).where(URL.short_code == code))
        if existing:
            raise HTTPException(status_code=409, detail="Short code already taken")

    # Avoid random collisions
    while not body.custom_code:
        collision = await db.scalar(select(URL).where(URL.short_code == code))
        if not collision:
            break
        code = _generate_code()

    url = URL(original_url=original, short_code=code)
    db.add(url)
    await db.commit()
    await db.refresh(url)

    return URLResponse(
        short_code=url.short_code,
        short_url=f"{BASE_URL}/{url.short_code}",
        original_url=url.original_url,
        clicks=url.clicks,
        created_at=url.created_at,
    )


@app.get("/stats/{short_code}", response_model=URLResponse)
async def get_stats(short_code: str, db: AsyncSession = Depends(get_db)):
    """Return statistics for a short URL."""
    url = await db.scalar(select(URL).where(URL.short_code == short_code))
    if not url:
        raise HTTPException(status_code=404, detail="Short URL not found")

    return URLResponse(
        short_code=url.short_code,
        short_url=f"{BASE_URL}/{url.short_code}",
        original_url=url.original_url,
        clicks=url.clicks,
        created_at=url.created_at,
    )


@app.get("/{short_code}")
async def redirect(short_code: str, db: AsyncSession = Depends(get_db)):
    """Redirect to the original URL and increment click counter."""
    url = await db.scalar(select(URL).where(URL.short_code == short_code))
    if not url:
        raise HTTPException(status_code=404, detail="Short URL not found")

    url.clicks += 1
    await db.commit()
    return RedirectResponse(url=url.original_url, status_code=307)
