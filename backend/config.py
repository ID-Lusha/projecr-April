from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    openai_api_key: str = ""
    postgres_user: str = "postgres"
    postgres_password: str = "changeme_strong_password"
    postgres_db: str = "ai_platform"
    postgres_host: str = "postgres"
    postgres_port: int = 5432
    cors_origins: str = "http://localhost:3000"

    @property
    def database_url(self) -> str:
        return (
            f"postgresql://{self.postgres_user}:{self.postgres_password}"
            f"@{self.postgres_host}:{self.postgres_port}/{self.postgres_db}"
        )

    class Config:
        env_file = ".env"


settings = Settings()
