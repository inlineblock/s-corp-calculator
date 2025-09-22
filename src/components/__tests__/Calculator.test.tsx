/**
 * @jest-environment jsdom
 */

import { calculateTaxes } from '@/lib/taxCalculations';

// Mock the components that depend on next-intl
jest.mock('../IncomeInput', () => {
  return function MockIncomeInput() {
    return <div data-testid="income-input">Income Input</div>;
  };
});

jest.mock('../SalarySlider', () => {
  return function MockSalarySlider() {
    return <div data-testid="salary-slider">Salary Slider</div>;
  };
});

jest.mock('../StateSelector', () => {
  return function MockStateSelector() {
    return <div data-testid="state-selector">State Selector</div>;
  };
});

jest.mock('../TaxResults', () => {
  return function MockTaxResults() {
    return <div data-testid="tax-results">Tax Results</div>;
  };
});

describe('Calculator Logic Integration', () => {
  it('should integrate all calculation logic correctly', () => {
    // Test the actual calculation logic that powers the Calculator component
    const result1 = calculateTaxes(100000, 50000, 'FL');
    expect(result1.llcTotalTax).toBeGreaterThan(0);
    expect(result1.scorpTotalTax).toBeGreaterThan(0);
    expect(result1.savings).toBeGreaterThan(0);
    expect(result1.recommendation).toBe('scorp');

    const result2 = calculateTaxes(200000, 80000, 'CA');
    expect(result2.llcTotalTax).toBeGreaterThan(0);
    expect(result2.scorpTotalTax).toBeGreaterThan(0);
    expect(result2.savings).toBeGreaterThan(0);
    expect(result2.recommendation).toBe('scorp');
  });

  it('should handle edge cases in calculation logic', () => {
    // Zero income
    const zeroResult = calculateTaxes(0, 0, 'FL');
    expect(zeroResult.llcTotalTax).toBe(0);
    expect(zeroResult.scorpTotalTax).toBe(0);
    expect(zeroResult.savings).toBe(0);

    // Salary capping
    const cappedResult = calculateTaxes(100000, 150000, 'FL');
    const normalResult = calculateTaxes(100000, 100000, 'FL');
    expect(cappedResult.llcTotalTax).toBe(normalResult.llcTotalTax);
    expect(cappedResult.scorpTotalTax).toBe(normalResult.scorpTotalTax);
  });

  it('should show correct state tax variations', () => {
    const flResult = calculateTaxes(100000, 50000, 'FL'); // No state tax
    const caResult = calculateTaxes(100000, 50000, 'CA'); // High state tax

    expect(caResult.llcTotalTax).toBeGreaterThan(flResult.llcTotalTax);
    expect(caResult.scorpTotalTax).toBeGreaterThan(flResult.scorpTotalTax);
  });
});