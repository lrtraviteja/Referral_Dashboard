import { describe, it, expect } from 'vitest';
import { formatDate, formatCurrency } from './formatters';

describe('formatters', () => {
  it('formats date from YYYY-MM-DD to YYYY/MM/DD', () => {
    expect(formatDate('2026-05-26')).toBe('2026/05/26');
  });

  it('formats profit as USD currency without decimals', () => {
    expect(formatCurrency(1234)).toBe('$1,234');
    expect(formatCurrency(0)).toBe('$0');
  });
});
