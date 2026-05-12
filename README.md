# AI Sales Platform — B2B ИИ-автоматизация

Комплексное B2B-решение: конверсионный лендинг + интерактивный ИИ-чат (ролевая игра «ИИ продает ваш продукт вам же») + сбор лидов + интеграция с CRM.

## Tech Stack

- **Frontend:** Next.js 16 (App Router), React 19, Tailwind CSS v4, Framer Motion, Lucide Icons
- **Backend:** FastAPI (Python 3.12), OpenAI GPT-4o с Function Calling, SSE Streaming
- **Database:** PostgreSQL 15
- **Инфраструктура:** Docker Compose

## Быстрый старт

### 1. Клонировать репозиторий

```bash
git clone https://github.com/ID-Lusha/projecr-April.git
cd projecr-April
```

### 2. Настроить переменные окружения

```bash
cp .env.example .env
# Отредактировать .env — указать OPENAI_API_KEY
```

### 3. Запустить через Docker

```bash
docker compose up --build
```

Сервисы:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000
- **PostgreSQL:** localhost:5432

### 4. Локальная разработка (без Docker)

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

**Backend:**
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

## Структура проекта

```
├── docker-compose.yml          # Оркестрация сервисов
├── frontend/                   # Next.js App
│   ├── app/                    # Pages & layouts
│   ├── components/
│   │   ├── chat/               # ИИ-чат (ядро)
│   │   ├── landing/            # Секции лендинга
│   │   ├── layout/             # Navbar, ThemeToggle
│   │   └── animations/         # Framer Motion
│   └── lib/                    # API клиент, утилиты
├── backend/                    # FastAPI
│   ├── routers/chat.py         # API эндпоинты чата
│   ├── services/
│   │   ├── ai_engine.py        # OpenAI GPT-4o + Function Calling
│   │   ├── guardrails.py       # Защита от инъекций
│   │   └── session_manager.py  # Управление сессиями
│   └── models/schemas.py       # Pydantic модели
└── supabase/migrations/        # SQL миграции
```

## Логика ИИ-чата

Чат имеет 3 стадии:

1. **Setup** — пользователь вводит нишу, ИИ задаёт уточняющий вопрос
2. **Roleplay** — ИИ продаёт продукт пользователя самому пользователю
3. **Lead Capture** — после 4 реплик или «согласия» клиента показывается форма сбора контактов

## API Endpoints

| Метод | URL | Описание |
|-------|-----|----------|
| POST | `/chat/start` | Начать сессию (ниша бизнеса) |
| POST | `/chat/message` | Отправить сообщение (SSE stream) |
| POST | `/chat/lead` | Отправить контакт (телефон/Telegram) |
| GET | `/health` | Health check |

## Лицензия

Проприетарный код. Все права защищены.
