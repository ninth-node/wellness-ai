/**
 * Tests for date utility functions
 */
import { describe, it, expect } from '@jest/globals';
import { formatDate, formatDuration, isToday, isPast } from '@/lib/date-utils';

describe('formatDate', () => {
  it('should format date without time', () => {
    const dateString = '2025-03-15T14:30:00';
    const result = formatDate(dateString, false);
    expect(result).toContain('Mar');
    expect(result).toContain('15');
    expect(result).toContain('2025');
  });

  it('should format date with time', () => {
    const dateString = '2025-03-15T14:30:00';
    const result = formatDate(dateString, true);
    expect(result).toContain('Mar');
    expect(result).toContain('15');
    expect(result).toContain('2025');
    expect(result).toContain('14');
    expect(result).toContain('30');
  });

  it('should handle invalid date', () => {
    const result = formatDate('invalid-date');
    expect(result).toBe('Invalid date');
  });
});

describe('formatDuration', () => {
  it('should format minutes only', () => {
    expect(formatDuration(45)).toBe('45 min');
  });

  it('should format hours only', () => {
    expect(formatDuration(120)).toBe('2h');
  });

  it('should format hours and minutes', () => {
    expect(formatDuration(90)).toBe('1h 30min');
  });

  it('should format multiple hours and minutes', () => {
    expect(formatDuration(150)).toBe('2h 30min');
  });
});

describe('isToday', () => {
  it('should return true for today', () => {
    const today = new Date();
    const result = isToday(today.toISOString());
    expect(result).toBe(true);
  });

  it('should return false for yesterday', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const result = isToday(yesterday.toISOString());
    expect(result).toBe(false);
  });

  it('should return false for tomorrow', () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const result = isToday(tomorrow.toISOString());
    expect(result).toBe(false);
  });
});

describe('isPast', () => {
  it('should return true for past date', () => {
    const pastDate = new Date('2020-01-01');
    const result = isPast(pastDate.toISOString());
    expect(result).toBe(true);
  });

  it('should return false for future date', () => {
    const futureDate = new Date('2030-01-01');
    const result = isPast(futureDate.toISOString());
    expect(result).toBe(false);
  });
});
