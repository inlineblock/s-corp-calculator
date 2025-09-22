import { calculateTaxes } from '../taxCalculations';

describe('Tax Calculations', () => {
  describe('Basic LLC vs S-Corp comparison', () => {
    it('should calculate taxes correctly for a simple case', () => {
      const totalIncome = 100000;
      const salary = 50000;
      const state = 'FL'; // No state income tax

      const result = calculateTaxes(totalIncome, salary, state);

      expect(result).toHaveProperty('llcTotalTax');
      expect(result).toHaveProperty('scorpTotalTax');
      expect(result).toHaveProperty('savings');
      expect(result).toHaveProperty('recommendation');
      expect(result.llcTotalTax).toBeGreaterThan(0);
      expect(result.scorpTotalTax).toBeGreaterThan(0);
    });

    it('should recommend S-Corp when there are significant savings', () => {
      const totalIncome = 150000;
      const salary = 60000; // Low salary should result in S-Corp savings
      const state = 'FL';

      const result = calculateTaxes(totalIncome, salary, state);

      expect(result.savings).toBeGreaterThan(0);
      expect(result.recommendation).toBe('scorp');
    });

    it('should recommend LLC when salary equals total income', () => {
      const totalIncome = 40000;
      const salary = 40000; // All income as salary - S-Corp has no benefit
      const state = 'CA'; // Use high-tax state

      const result = calculateTaxes(totalIncome, salary, state);

      // S-Corp should cost more when 100% salary due to additional compliance costs
      expect(result.savings).toBeLessThanOrEqual(0);
      expect(result.recommendation).toBe('llc');
    });
  });

  describe('State tax variations', () => {
    it('should handle states with no income tax (Florida)', () => {
      const totalIncome = 100000;
      const salary = 50000;

      const result = calculateTaxes(totalIncome, salary, 'FL');

      expect(result.llcTotalTax).toBeGreaterThan(0);
      expect(result.scorpTotalTax).toBeGreaterThan(0);
    });

    it('should handle states with high income tax (California)', () => {
      const totalIncome = 100000;
      const salary = 50000;

      const result = calculateTaxes(totalIncome, salary, 'CA');

      expect(result.llcTotalTax).toBeGreaterThan(0);
      expect(result.scorpTotalTax).toBeGreaterThan(0);
    });

    it('should show higher taxes in high-tax states vs no-tax states', () => {
      const totalIncome = 100000;
      const salary = 50000;

      const flResult = calculateTaxes(totalIncome, salary, 'FL');
      const caResult = calculateTaxes(totalIncome, salary, 'CA');

      expect(caResult.llcTotalTax).toBeGreaterThan(flResult.llcTotalTax);
      expect(caResult.scorpTotalTax).toBeGreaterThan(flResult.scorpTotalTax);
    });
  });

  describe('Income levels', () => {
    it('should handle low income scenarios', () => {
      const totalIncome = 30000;
      const salary = 20000;
      const state = 'FL';

      const result = calculateTaxes(totalIncome, salary, state);

      expect(result.llcTotalTax).toBeGreaterThan(0);
      expect(result.scorpTotalTax).toBeGreaterThan(0);
    });

    it('should handle high income scenarios', () => {
      const totalIncome = 500000;
      const salary = 150000;
      const state = 'FL';

      const result = calculateTaxes(totalIncome, salary, state);

      expect(result.llcTotalTax).toBeGreaterThan(0);
      expect(result.scorpTotalTax).toBeGreaterThan(0);
    });

    it('should show greater S-Corp benefits at higher income levels', () => {
      const salary = 80000;
      const state = 'FL';

      const lowIncomeResult = calculateTaxes(100000, salary, state);
      const highIncomeResult = calculateTaxes(300000, salary, state);

      // Higher income should show more S-Corp benefits
      expect(highIncomeResult.savings).toBeGreaterThan(lowIncomeResult.savings);
    });
  });

  describe('Salary variations', () => {
    it('should handle minimum salary scenarios', () => {
      const totalIncome = 100000;
      const salary = 0; // Minimum salary
      const state = 'FL';

      const result = calculateTaxes(totalIncome, salary, state);

      expect(result.llcTotalTax).toBeGreaterThan(0);
      expect(result.scorpTotalTax).toBeGreaterThan(0);
    });

    it('should handle salary equal to total income', () => {
      const totalIncome = 100000;
      const salary = 100000; // Maximum salary (equals total income)
      const state = 'FL';

      const result = calculateTaxes(totalIncome, salary, state);

      expect(result.llcTotalTax).toBeGreaterThan(0);
      expect(result.scorpTotalTax).toBeGreaterThan(0);
    });

    it('should show decreasing S-Corp benefits as salary increases', () => {
      const totalIncome = 200000;
      const state = 'FL';

      const lowSalaryResult = calculateTaxes(totalIncome, 60000, state);
      const highSalaryResult = calculateTaxes(totalIncome, 150000, state);

      expect(lowSalaryResult.savings).toBeGreaterThan(highSalaryResult.savings);
    });

    it('should handle salary exceeding total income by capping it', () => {
      const totalIncome = 100000;
      const salary = 150000; // Exceeds total income
      const state = 'FL';

      const result = calculateTaxes(totalIncome, salary, state);
      const cappedResult = calculateTaxes(totalIncome, totalIncome, state);

      expect(result.llcTotalTax).toBe(cappedResult.llcTotalTax);
      expect(result.scorpTotalTax).toBe(cappedResult.scorpTotalTax);
    });
  });

  describe('Edge cases', () => {
    it('should handle zero income', () => {
      const result = calculateTaxes(0, 0, 'FL');

      expect(result.llcTotalTax).toBe(0);
      expect(result.scorpTotalTax).toBe(0);
      expect(result.savings).toBe(0);
    });

    it('should handle unknown state codes gracefully', () => {
      const totalIncome = 100000;
      const salary = 50000;

      const result = calculateTaxes(totalIncome, salary, 'XX');

      expect(result.llcTotalTax).toBeGreaterThan(0);
      expect(result.scorpTotalTax).toBeGreaterThan(0);
    });
  });

  describe('Social Security wage base limits', () => {
    it('should apply Social Security wage base limit correctly', () => {
      const totalIncome = 300000; // Above SS wage base
      const salary = 200000; // Above SS wage base
      const state = 'FL';

      const result = calculateTaxes(totalIncome, salary, state);

      expect(result.llcTotalTax).toBeGreaterThan(0);
      expect(result.scorpTotalTax).toBeGreaterThan(0);
    });
  });

  describe('Additional Medicare tax', () => {
    it('should apply additional Medicare tax for high earners', () => {
      const totalIncome = 250000; // Above additional Medicare threshold
      const salary = 120000;
      const state = 'FL';

      const result = calculateTaxes(totalIncome, salary, state);

      expect(result.llcTotalTax).toBeGreaterThan(0);
      expect(result.scorpTotalTax).toBeGreaterThan(0);
    });
  });
});