import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite+aiosqlite:///./urls.db")
BASE_URL: str = os.getenv("BASE_URL", "http://localhost:8000")
FRONTEND_URL: str = os.getenv("FRONTEND_URL", "http://localhost:5173")
SHORT_CODE_LENGTH: int = int(os.getenv("SHORT_CODE_LENGTH", "6"))
