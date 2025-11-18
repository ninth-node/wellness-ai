"""
Application configuration using Pydantic settings.
"""
from typing import List, Optional
from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="allow"
    )

    # Application
    APP_NAME: str = "Wellness AI Platform"
    APP_VERSION: str = "0.1.0"
    DEBUG: bool = False
    ENVIRONMENT: str = "development"

    # API
    API_V1_STR: str = "/api/v1"
    API_HOST: str = "0.0.0.0"
    API_PORT: int = 8000

    # Security
    SECRET_KEY: str = Field(..., min_length=32)
    JWT_SECRET_KEY: str = Field(..., min_length=32)
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # Database
    DATABASE_URL: str = Field(
        default="postgresql://wellness_user:wellness_dev_password@localhost:5432/wellness_ai"
    )
    DATABASE_POOL_SIZE: int = 20
    DATABASE_MAX_OVERFLOW: int = 10
    DATABASE_ECHO: bool = False

    # Redis
    REDIS_URL: str = Field(default="redis://:redis_dev_password@localhost:6379/0")
    REDIS_CACHE_TTL: int = 3600

    # CORS
    CORS_ORIGINS: List[str] = Field(
        default=["http://localhost:3000", "http://localhost:3001"]
    )
    CORS_CREDENTIALS: bool = True

    # AI Services
    OPENAI_API_KEY: Optional[str] = None
    ANTHROPIC_API_KEY: Optional[str] = None
    LANGCHAIN_API_KEY: Optional[str] = None
    LANGCHAIN_TRACING_V2: bool = False
    LANGCHAIN_PROJECT: str = "wellness-ai"

    # Storage
    AWS_ACCESS_KEY_ID: Optional[str] = None
    AWS_SECRET_ACCESS_KEY: Optional[str] = None
    AWS_S3_BUCKET: Optional[str] = None
    AWS_S3_ENDPOINT_URL: Optional[str] = "http://localhost:9000"

    # External Services
    STRIPE_SECRET_KEY: Optional[str] = None
    STRIPE_WEBHOOK_SECRET: Optional[str] = None
    TWILIO_ACCOUNT_SID: Optional[str] = None
    TWILIO_AUTH_TOKEN: Optional[str] = None
    SENDGRID_API_KEY: Optional[str] = None

    # Monitoring
    SENTRY_DSN: Optional[str] = None
    LOG_LEVEL: str = "INFO"

    # Feature Flags
    ENABLE_AI_SKIN_ANALYSIS: bool = True
    ENABLE_AR_TRY_ON: bool = False
    ENABLE_SUBSCRIPTION_BOXES: bool = True


# Create global settings instance
settings = Settings()
