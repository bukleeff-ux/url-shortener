from datetime import datetime
from pydantic import BaseModel, HttpUrl


class ShortenRequest(BaseModel):
    url: HttpUrl
    custom_code: str | None = None  # optional custom short code


class URLResponse(BaseModel):
    short_code: str
    short_url: str
    original_url: str
    clicks: int
    created_at: datetime

    model_config = {"from_attributes": True}
