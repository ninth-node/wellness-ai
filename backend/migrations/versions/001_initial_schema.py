"""Initial schema

Revision ID: 001_initial
Revises:
Create Date: 2025-01-18

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '001_initial'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Create custom enum types
    op.execute("CREATE TYPE user_role AS ENUM ('admin', 'manager', 'staff', 'client')")
    op.execute("CREATE TYPE appointment_status AS ENUM ('scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show')")
    op.execute("CREATE TYPE skin_type AS ENUM ('oily', 'dry', 'combination', 'sensitive', 'normal')")

    # Create users table
    op.create_table(
        'users',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('email', sa.String(255), nullable=False),
        sa.Column('hashed_password', sa.String(255), nullable=False),
        sa.Column('full_name', sa.String(255), nullable=False),
        sa.Column('role', postgresql.ENUM('admin', 'manager', 'staff', 'client', name='user_role'), nullable=False),
        sa.Column('is_active', sa.Boolean(), nullable=False, server_default='true'),
        sa.Column('is_verified', sa.Boolean(), nullable=False, server_default='false'),
        sa.Column('phone', sa.String(20), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=False, server_default=sa.text('now()')),
        sa.Column('updated_at', sa.DateTime(), nullable=False, server_default=sa.text('now()')),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('email')
    )
    op.create_index(op.f('ix_users_email'), 'users', ['email'])

    # Create clients table
    op.create_table(
        'clients',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('first_name', sa.String(100), nullable=False),
        sa.Column('last_name', sa.String(100), nullable=False),
        sa.Column('email', sa.String(255), nullable=False),
        sa.Column('phone', sa.String(20), nullable=True),
        sa.Column('date_of_birth', sa.Date(), nullable=True),
        sa.Column('address', postgresql.JSON(), nullable=True),
        sa.Column('emergency_contact', postgresql.JSON(), nullable=True),
        sa.Column('skin_type', postgresql.ENUM('oily', 'dry', 'combination', 'sensitive', 'normal', name='skin_type'), nullable=True),
        sa.Column('skin_tone', sa.String(50), nullable=True),
        sa.Column('skin_undertone', sa.String(50), nullable=True),
        sa.Column('hair_type', sa.String(50), nullable=True),
        sa.Column('hair_color', sa.String(50), nullable=True),
        sa.Column('allergies_sensitivities', postgresql.JSON(), nullable=True),
        sa.Column('beauty_preferences', postgresql.JSON(), nullable=True),
        sa.Column('communication_preferences', postgresql.JSON(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=False, server_default=sa.text('now()')),
        sa.Column('updated_at', sa.DateTime(), nullable=False, server_default=sa.text('now()')),
        sa.ForeignKeyConstraint(['user_id'], ['users.id']),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('email')
    )
    op.create_index(op.f('ix_clients_email'), 'clients', ['email'])

    # Create staff table
    op.create_table(
        'staff',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('employee_id', sa.String(50), nullable=True),
        sa.Column('first_name', sa.String(100), nullable=False),
        sa.Column('last_name', sa.String(100), nullable=False),
        sa.Column('email', sa.String(255), nullable=False),
        sa.Column('phone', sa.String(20), nullable=True),
        sa.Column('role', sa.String(50), nullable=False),
        sa.Column('hire_date', sa.Date(), nullable=True),
        sa.Column('hourly_rate', sa.Numeric(6, 2), nullable=True),
        sa.Column('commission_rate', sa.Numeric(4, 2), nullable=True),
        sa.Column('certifications', postgresql.JSON(), nullable=True),
        sa.Column('skills', postgresql.JSON(), nullable=True),
        sa.Column('languages', postgresql.JSON(), nullable=True),
        sa.Column('specialization_areas', postgresql.JSON(), nullable=True),
        sa.Column('availability_pattern', postgresql.JSON(), nullable=True),
        sa.Column('performance_metrics', postgresql.JSON(), nullable=True),
        sa.Column('client_ratings_avg', sa.Numeric(3, 2), nullable=True),
        sa.Column('is_active', sa.Boolean(), nullable=False, server_default='true'),
        sa.Column('created_at', sa.DateTime(), nullable=False, server_default=sa.text('now()')),
        sa.Column('updated_at', sa.DateTime(), nullable=False, server_default=sa.text('now()')),
        sa.ForeignKeyConstraint(['user_id'], ['users.id']),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('email')
    )

    # Create treatments table
    op.create_table(
        'treatments',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(255), nullable=False),
        sa.Column('category', sa.String(100), nullable=True),
        sa.Column('description', sa.String(), nullable=True),
        sa.Column('duration_minutes', sa.Integer(), nullable=False),
        sa.Column('base_price', sa.Numeric(8, 2), nullable=False),
        sa.Column('skill_requirements', postgresql.JSON(), nullable=True),
        sa.Column('equipment_needed', postgresql.JSON(), nullable=True),
        sa.Column('contraindications', postgresql.JSON(), nullable=True),
        sa.Column('treatment_protocol', postgresql.JSON(), nullable=True),
        sa.Column('seasonal_availability', postgresql.JSON(), nullable=True),
        sa.Column('is_active', sa.Boolean(), nullable=False, server_default='true'),
        sa.Column('created_at', sa.DateTime(), nullable=False, server_default=sa.text('now()')),
        sa.Column('updated_at', sa.DateTime(), nullable=False, server_default=sa.text('now()')),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_treatments_name'), 'treatments', ['name'])

    # Create appointments table
    op.create_table(
        'appointments',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('client_id', sa.Integer(), nullable=False),
        sa.Column('treatment_id', sa.Integer(), nullable=False),
        sa.Column('staff_id', sa.Integer(), nullable=True),
        sa.Column('appointment_datetime', sa.DateTime(), nullable=False),
        sa.Column('estimated_duration', sa.Integer(), nullable=True),
        sa.Column('actual_duration', sa.Integer(), nullable=True),
        sa.Column('status', postgresql.ENUM('scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show', name='appointment_status'), nullable=False),
        sa.Column('no_show_probability', sa.Numeric(3, 2), nullable=True),
        sa.Column('booking_source', sa.String(50), nullable=True),
        sa.Column('special_requests', sa.String(), nullable=True),
        sa.Column('ai_recommendations', postgresql.JSON(), nullable=True),
        sa.Column('pre_treatment_notes', sa.String(), nullable=True),
        sa.Column('post_treatment_notes', sa.String(), nullable=True),
        sa.Column('client_satisfaction_rating', sa.Integer(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=False, server_default=sa.text('now()')),
        sa.Column('updated_at', sa.DateTime(), nullable=False, server_default=sa.text('now()')),
        sa.ForeignKeyConstraint(['client_id'], ['clients.id']),
        sa.ForeignKeyConstraint(['treatment_id'], ['treatments.id']),
        sa.ForeignKeyConstraint(['staff_id'], ['staff.id']),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_appointments_client_id'), 'appointments', ['client_id'])
    op.create_index(op.f('ix_appointments_staff_id'), 'appointments', ['staff_id'])
    op.create_index(op.f('ix_appointments_datetime'), 'appointments', ['appointment_datetime'])
    op.create_index(op.f('ix_appointments_status'), 'appointments', ['status'])

    # Create products table
    op.create_table(
        'products',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('sku', sa.String(100), nullable=False),
        sa.Column('name', sa.String(255), nullable=False),
        sa.Column('brand', sa.String(100), nullable=True),
        sa.Column('category', sa.String(100), nullable=True),
        sa.Column('subcategory', sa.String(100), nullable=True),
        sa.Column('description', sa.String(), nullable=True),
        sa.Column('ingredients', postgresql.JSON(), nullable=True),
        sa.Column('skin_type_suitability', postgresql.ARRAY(sa.String()), nullable=True),
        sa.Column('age_group_suitability', postgresql.ARRAY(sa.String()), nullable=True),
        sa.Column('price', sa.Numeric(8, 2), nullable=False),
        sa.Column('cost', sa.Numeric(8, 2), nullable=True),
        sa.Column('professional_only', sa.Boolean(), nullable=False, server_default='false'),
        sa.Column('requires_consultation', sa.Boolean(), nullable=False, server_default='false'),
        sa.Column('seasonal_product', sa.Boolean(), nullable=False, server_default='false'),
        sa.Column('expiration_tracking', sa.Boolean(), nullable=False, server_default='true'),
        sa.Column('ai_recommendation_score', sa.Numeric(3, 2), nullable=True),
        sa.Column('usage_instructions', sa.String(), nullable=True),
        sa.Column('contraindications', postgresql.JSON(), nullable=True),
        sa.Column('product_images', postgresql.JSON(), nullable=True),
        sa.Column('is_active', sa.Boolean(), nullable=False, server_default='true'),
        sa.Column('created_at', sa.DateTime(), nullable=False, server_default=sa.text('now()')),
        sa.Column('updated_at', sa.DateTime(), nullable=False, server_default=sa.text('now()')),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('sku')
    )
    op.create_index(op.f('ix_products_sku'), 'products', ['sku'])
    op.create_index(op.f('ix_products_name'), 'products', ['name'])

    # Create inventory table
    op.create_table(
        'inventory',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('product_id', sa.Integer(), nullable=False),
        sa.Column('location', sa.String(100), nullable=True),
        sa.Column('current_quantity', sa.Integer(), nullable=False, server_default='0'),
        sa.Column('minimum_stock_level', sa.Integer(), nullable=False, server_default='5'),
        sa.Column('maximum_stock_level', sa.Integer(), nullable=False, server_default='100'),
        sa.Column('reorder_point', sa.Integer(), nullable=False, server_default='10'),
        sa.Column('supplier_id', sa.Integer(), nullable=True),
        sa.Column('unit_cost', sa.Numeric(8, 2), nullable=True),
        sa.Column('last_restock_date', sa.Date(), nullable=True),
        sa.Column('expiration_date', sa.Date(), nullable=True),
        sa.Column('batch_number', sa.String(50), nullable=True),
        sa.Column('ai_demand_prediction', postgresql.JSON(), nullable=True),
        sa.Column('seasonal_adjustment_factor', sa.Numeric(3, 2), nullable=False, server_default='1.0'),
        sa.Column('created_at', sa.DateTime(), nullable=False, server_default=sa.text('now()')),
        sa.Column('updated_at', sa.DateTime(), nullable=False, server_default=sa.text('now()')),
        sa.ForeignKeyConstraint(['product_id'], ['products.id']),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_inventory_product_id'), 'inventory', ['product_id'])


def downgrade() -> None:
    op.drop_index(op.f('ix_inventory_product_id'), table_name='inventory')
    op.drop_table('inventory')
    op.drop_index(op.f('ix_products_name'), table_name='products')
    op.drop_index(op.f('ix_products_sku'), table_name='products')
    op.drop_table('products')
    op.drop_index(op.f('ix_appointments_status'), table_name='appointments')
    op.drop_index(op.f('ix_appointments_datetime'), table_name='appointments')
    op.drop_index(op.f('ix_appointments_staff_id'), table_name='appointments')
    op.drop_index(op.f('ix_appointments_client_id'), table_name='appointments')
    op.drop_table('appointments')
    op.drop_index(op.f('ix_treatments_name'), table_name='treatments')
    op.drop_table('treatments')
    op.drop_table('staff')
    op.drop_index(op.f('ix_clients_email'), table_name='clients')
    op.drop_table('clients')
    op.drop_index(op.f('ix_users_email'), table_name='users')
    op.drop_table('users')
    op.execute('DROP TYPE appointment_status')
    op.execute('DROP TYPE skin_type')
    op.execute('DROP TYPE user_role')
