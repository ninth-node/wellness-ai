/**
 * Tests for Zod validation schemas
 */
import { describe, it, expect } from '@jest/globals';
import {
  clientSchema,
  appointmentSchema,
  treatmentSchema,
  productSchema,
  loginSchema,
} from '@/lib/validations';

describe('clientSchema', () => {
  it('should validate a valid client', () => {
    const validClient = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      skin_type: 'normal',
    };

    const result = clientSchema.safeParse(validClient);
    expect(result.success).toBe(true);
  });

  it('should reject client without required fields', () => {
    const invalidClient = {
      first_name: 'John',
      // Missing last_name and email
    };

    const result = clientSchema.safeParse(invalidClient);
    expect(result.success).toBe(false);
  });

  it('should reject invalid email', () => {
    const invalidClient = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'not-an-email',
    };

    const result = clientSchema.safeParse(invalidClient);
    expect(result.success).toBe(false);
  });

  it('should reject invalid skin type', () => {
    const invalidClient = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      skin_type: 'invalid-type',
    };

    const result = clientSchema.safeParse(invalidClient);
    expect(result.success).toBe(false);
  });
});

describe('treatmentSchema', () => {
  it('should validate a valid treatment', () => {
    const validTreatment = {
      name: 'Facial Treatment',
      category: 'facial',
      description: 'Relaxing facial',
      duration_minutes: 60,
      base_price: 150.0,
      is_active: true,
    };

    const result = treatmentSchema.safeParse(validTreatment);
    expect(result.success).toBe(true);
  });

  it('should reject treatment with negative duration', () => {
    const invalidTreatment = {
      name: 'Facial Treatment',
      duration_minutes: -10,
      base_price: 150.0,
    };

    const result = treatmentSchema.safeParse(invalidTreatment);
    expect(result.success).toBe(false);
  });

  it('should reject treatment with negative price', () => {
    const invalidTreatment = {
      name: 'Facial Treatment',
      duration_minutes: 60,
      base_price: -50.0,
    };

    const result = treatmentSchema.safeParse(invalidTreatment);
    expect(result.success).toBe(false);
  });
});

describe('productSchema', () => {
  it('should validate a valid product', () => {
    const validProduct = {
      sku: 'TEST-SKU-001',
      name: 'Hydrating Serum',
      brand: 'Beauty Co',
      category: 'skincare',
      price: 75.0,
      is_active: true,
    };

    const result = productSchema.safeParse(validProduct);
    expect(result.success).toBe(true);
  });

  it('should reject product without SKU', () => {
    const invalidProduct = {
      name: 'Hydrating Serum',
      price: 75.0,
    };

    const result = productSchema.safeParse(invalidProduct);
    expect(result.success).toBe(false);
  });
});

describe('loginSchema', () => {
  it('should validate valid login credentials', () => {
    const validLogin = {
      email: 'user@example.com',
      password: 'password123',
    };

    const result = loginSchema.safeParse(validLogin);
    expect(result.success).toBe(true);
  });

  it('should reject login with short password', () => {
    const invalidLogin = {
      email: 'user@example.com',
      password: 'short',
    };

    const result = loginSchema.safeParse(invalidLogin);
    expect(result.success).toBe(false);
  });

  it('should reject login with invalid email', () => {
    const invalidLogin = {
      email: 'not-an-email',
      password: 'password123',
    };

    const result = loginSchema.safeParse(invalidLogin);
    expect(result.success).toBe(false);
  });
});
