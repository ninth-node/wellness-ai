/**
 * Tests for error handling utilities
 */
import { describe, it, expect } from '@jest/globals';
import { handleAPIError, validateField } from '@/lib/error-handler';
import { APIError } from '@/lib/api';

describe('handleAPIError', () => {
  it('should handle 400 Bad Request', () => {
    const error = new APIError(400, 'Bad request');
    const result = handleAPIError(error);

    expect(result.statusCode).toBe(400);
    expect(result.code).toBe('BAD_REQUEST');
    expect(result.message).toContain('Invalid request');
  });

  it('should handle 401 Unauthorized', () => {
    const error = new APIError(401, 'Unauthorized');
    const result = handleAPIError(error);

    expect(result.statusCode).toBe(401);
    expect(result.code).toBe('UNAUTHORIZED');
    expect(result.message).toContain('not authenticated');
  });

  it('should handle 404 Not Found', () => {
    const error = new APIError(404, 'Resource not found');
    const result = handleAPIError(error);

    expect(result.statusCode).toBe(404);
    expect(result.code).toBe('NOT_FOUND');
    expect(result.message).toBe('Resource not found');
  });

  it('should handle 500 Internal Server Error', () => {
    const error = new APIError(500, 'Server error');
    const result = handleAPIError(error);

    expect(result.statusCode).toBe(500);
    expect(result.code).toBe('INTERNAL_ERROR');
    expect(result.message).toContain('internal server error');
  });

  it('should handle generic errors', () => {
    const error = new Error('Something went wrong');
    const result = handleAPIError(error);

    expect(result.code).toBe('ERROR');
    expect(result.message).toBe('Something went wrong');
  });

  it('should handle unknown errors', () => {
    const result = handleAPIError('random error');

    expect(result.code).toBe('UNKNOWN');
    expect(result.message).toContain('unknown error');
  });
});

describe('validateField', () => {
  it('should validate required field', () => {
    const result = validateField('Name', '', { required: true });
    expect(result).toContain('required');
  });

  it('should validate min length', () => {
    const result = validateField('Password', 'abc', { minLength: 8 });
    expect(result).toContain('at least 8 characters');
  });

  it('should validate max length', () => {
    const result = validateField('Name', 'a'.repeat(101), { maxLength: 100 });
    expect(result).toContain('must not exceed 100 characters');
  });

  it('should validate pattern', () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const result = validateField('Email', 'not-an-email', { pattern: emailPattern });
    expect(result).toContain('invalid');
  });

  it('should validate custom rule', () => {
    const isEven = (value: number) => value % 2 === 0;
    const result = validateField('Number', 3, { custom: isEven });
    expect(result).toContain('invalid');
  });

  it('should return null for valid field', () => {
    const result = validateField('Name', 'John Doe', { required: true, minLength: 3 });
    expect(result).toBeNull();
  });
});
