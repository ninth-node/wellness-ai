-- ==============================================================================
-- AI-First Wellness & Beauty Management Platform
-- Database Initialization Script
-- ==============================================================================

-- Create TimescaleDB extension
CREATE EXTENSION IF NOT EXISTS timescaledb;

-- Create UUID extension for generating UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create pg_trgm for fuzzy text search
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Set timezone
SET timezone = 'UTC';

-- Create custom types
CREATE TYPE user_role AS ENUM ('admin', 'manager', 'staff', 'client');
CREATE TYPE appointment_status AS ENUM ('scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show');
CREATE TYPE skin_type AS ENUM ('oily', 'dry', 'combination', 'sensitive', 'normal');

-- Create schema for application
CREATE SCHEMA IF NOT EXISTS wellness_ai;

-- Grant permissions (adjust based on your user)
GRANT ALL PRIVILEGES ON SCHEMA wellness_ai TO wellness_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA wellness_ai TO wellness_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA wellness_ai TO wellness_user;

-- Set search path
ALTER DATABASE wellness_ai SET search_path TO wellness_ai, public;

-- Create audit logging function
CREATE OR REPLACE FUNCTION wellness_ai.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create function for audit trail
CREATE OR REPLACE FUNCTION wellness_ai.create_audit_log()
RETURNS TRIGGER AS $$
BEGIN
    -- TODO: Implement audit logging
    RETURN NEW;
END;
$$ language 'plpgsql';

-- ==============================================================================
-- Initial Data (Optional - can be moved to seeds)
-- ==============================================================================

-- TODO: Add initial admin user after implementing authentication
-- TODO: Add default treatment categories
-- TODO: Add sample products for development

-- ==============================================================================
-- Performance Optimization
-- ==============================================================================

-- Optimize PostgreSQL for time-series data
ALTER SYSTEM SET shared_buffers = '256MB';
ALTER SYSTEM SET effective_cache_size = '1GB';
ALTER SYSTEM SET work_mem = '16MB';
ALTER SYSTEM SET maintenance_work_mem = '128MB';

-- ==============================================================================
-- Completion Message
-- ==============================================================================
DO $$
BEGIN
    RAISE NOTICE 'Database initialization completed successfully!';
    RAISE NOTICE 'Next steps:';
    RAISE NOTICE '1. Run Alembic migrations: alembic upgrade head';
    RAISE NOTICE '2. Seed initial data: python scripts/seed_data.py';
END $$;
