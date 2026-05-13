from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    openai_api_key: str = ""
    llm_base_url: str = "https://api.deepseek.com"
    llm_model: str = "deepseek-chat"
    postgres_user: str = "postgres"
    postgres_password: str = "changeme_strong_password"
    postgres_db: str = "ai_platform"
    postgres_host: str = "postgres"
    postgres_port: int = 5432
    cors_origins: str = "http://localhost:3000"
    telegram_bot_token: str = ""
    telegram_chat_id: str = ""

    @property
    def database_url(self) -> str:
        return (
            f"postgresql://{self.postgres_user}:{self.postgres_password}"
            f"@{self.postgres_host}:{self.postgres_port}/{self.postgres_db}"
        )

    class Config:
        env_file = ".env"


settings = Settings()
