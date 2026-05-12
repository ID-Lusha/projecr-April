import psycopg2
from config import settings

STAGE_SETUP = "setup"
STAGE_ROLEPLAY = "roleplay"
STAGE_LEAD_CAPTURE = "lead_capture"

MAX_ROLEPLAY_MESSAGES = 4


def get_db_connection():
    return psycopg2.connect(settings.database_url)


def create_session(business_niche: str) -> str:
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute(
                "INSERT INTO chat_sessions (business_niche, stage) VALUES (%s, %s) RETURNING id",
                (business_niche, STAGE_SETUP),
            )
            session_id = str(cur.fetchone()[0])
            conn.commit()
            return session_id
    finally:
        conn.close()


def get_session(session_id: str) -> dict | None:
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute(
                "SELECT id, business_niche, business_type, average_check, stage, message_count "
                "FROM chat_sessions WHERE id = %s",
                (session_id,),
            )
            row = cur.fetchone()
            if not row:
                return None
            return {
                "id": str(row[0]),
                "business_niche": row[1],
                "business_type": row[2],
                "average_check": row[3],
                "stage": row[4],
                "message_count": row[5],
            }
    finally:
        conn.close()


def update_session_stage(session_id: str, stage: str):
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute(
                "UPDATE chat_sessions SET stage = %s, updated_at = now() WHERE id = %s",
                (stage, session_id),
            )
            conn.commit()
    finally:
        conn.close()


def update_session_context(session_id: str, business_type: str, average_check: str):
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute(
                "UPDATE chat_sessions SET business_type = %s, average_check = %s, "
                "stage = %s, updated_at = now() WHERE id = %s",
                (business_type, average_check, STAGE_ROLEPLAY, session_id),
            )
            conn.commit()
    finally:
        conn.close()


def increment_message_count(session_id: str) -> int:
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute(
                "UPDATE chat_sessions SET message_count = message_count + 1, updated_at = now() "
                "WHERE id = %s RETURNING message_count",
                (session_id,),
            )
            count = cur.fetchone()[0]
            conn.commit()
            return count
    finally:
        conn.close()


def save_message(session_id: str, role: str, content: str):
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute(
                "INSERT INTO chat_messages (session_id, role, content) VALUES (%s, %s, %s)",
                (session_id, role, content),
            )
            conn.commit()
    finally:
        conn.close()


def get_chat_history(session_id: str) -> list[dict]:
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute(
                "SELECT role, content FROM chat_messages WHERE session_id = %s ORDER BY created_at",
                (session_id,),
            )
            return [{"role": row[0], "content": row[1]} for row in cur.fetchall()]
    finally:
        conn.close()


def save_lead(session_id: str, phone: str | None, telegram: str | None, business_niche: str):
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute(
                "INSERT INTO leads (session_id, phone, telegram, business_niche) "
                "VALUES (%s, %s, %s, %s)",
                (session_id, phone, telegram, business_niche),
            )
            conn.commit()
    finally:
        conn.close()


def should_end_roleplay(session_id: str) -> bool:
    session = get_session(session_id)
    if not session:
        return False
    return session["message_count"] >= MAX_ROLEPLAY_MESSAGES
