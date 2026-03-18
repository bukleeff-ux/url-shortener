# 🔗 Shortly — URL Shortener

A full-stack URL shortener with click tracking and stats. Paste a long URL, get a short one, track how many times it was visited.

## ✨ Features

- **🔗 URL shortening** — generate a compact short code in one click
- **✏️ Custom codes** — optionally choose your own short alias
- **📊 Click tracking** — every redirect increments the click counter
- **🔍 Stats lookup** — check statistics for any short code
- **📋 Copy to clipboard** — one-click copy of the short URL

## 🛠 Tech Stack

**Backend**

![Python](https://img.shields.io/badge/Python_3.11-3776AB?style=flat-square&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy_2-D71F00?style=flat-square&logo=sqlalchemy&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=flat-square&logo=sqlite&logoColor=white)

**Frontend**

![React](https://img.shields.io/badge/React_18-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite_5-646CFF?style=flat-square&logo=vite&logoColor=white)

## 🚀 Quick Start

### Backend

```bash
cd backend
python -m venv venv && source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
uvicorn main:app --reload
```

API will be available at `http://localhost:8000`. Interactive docs: `http://localhost:8000/docs`

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

App will be available at `http://localhost:5173`

## ⚙️ Configuration

### Backend (`backend/.env`)

| Variable | Default | Description |
|---|---|---|
| `DATABASE_URL` | `sqlite+aiosqlite:///./urls.db` | Async database URL |
| `BASE_URL` | `http://localhost:8000` | Public server URL (used in short links) |
| `FRONTEND_URL` | `http://localhost:5173` | Frontend origin for CORS |
| `SHORT_CODE_LENGTH` | `6` | Length of auto-generated codes |

### Frontend (`frontend/.env`)

| Variable | Default | Description |
|---|---|---|
| `VITE_API_URL` | `http://localhost:8000` | Backend API base URL |

## 📡 API Endpoints

| Method | Path | Description |
|---|---|---|
| `POST` | `/shorten` | Create a short URL |
| `GET` | `/{short_code}` | Redirect to original URL |
| `GET` | `/stats/{short_code}` | Get click stats for a short URL |

## 📁 Structure

```
url-shortener/
├── backend/
│   ├── main.py          # FastAPI app & endpoints
│   ├── models.py        # SQLAlchemy ORM model
│   ├── schemas.py       # Pydantic request/response schemas
│   ├── database.py      # Async engine & session
│   ├── config.py        # Settings from .env
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── App.jsx               # Root component with tab navigation
│   │   ├── components/
│   │   │   ├── ShortenForm.jsx   # URL input form
│   │   │   ├── ResultCard.jsx    # Short URL card with copy button
│   │   │   └── StatsLookup.jsx   # Stats search by short code
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── .gitignore
└── README.md
```

## 📫 Contact

- **Telegram:** [@Bukllee](https://t.me/Bukllee)
- **Email:** bukleeff@gmail.com
