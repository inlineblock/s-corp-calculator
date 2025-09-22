interface TaxBracket {
  min: number;
  max: number;
  rate: number;
}

const federalTaxBrackets2024: TaxBracket[] = [
  { min: 0, max: 11000, rate: 0.10 },
  { min: 11000, max: 44725, rate: 0.12 },
  { min: 44725, max: 95375, rate: 0.22 },
  { min: 95375, max: 182050, rate: 0.24 },
  { min: 182050, max: 231250, rate: 0.32 },
  { min: 231250, max: 578125, rate: 0.35 },
  { min: 578125, max: Infinity, rate: 0.37 }
];

// const selfEmploymentTaxRate = 0.1413; // 14.13% (Social Security + Medicare - employer portion deduction)
const socialSecurityWageBase = 160200; // 2024 limit
const medicareRate = 0.029; // 2.9%
const additionalMedicareRate = 0.009; // 0.9% on income over $200k
const additionalMedicareThreshold = 200000;

const stateTaxRates: { [key: string]: number } = {
  AL: 0.05, AK: 0, AZ: 0.045, AR: 0.069, CA: 0.133, CO: 0.0455, CT: 0.069, DE: 0.066,
  FL: 0, GA: 0.0575, HI: 0.11, ID: 0.058, IL: 0.0495, IN: 0.0323, IA: 0.0853, KS: 0.057,
  KY: 0.05, LA: 0.06, ME: 0.0715, MD: 0.0575, MA: 0.05, MI: 0.0425, MN: 0.0985,
  MS: 0.05, MO: 0.054, MT: 0.0675, NE: 0.0684, NV: 0, NH: 0, NJ: 0.1075, NM: 0.059,
  NY: 0.109, NC: 0.0525, ND: 0.029, OH: 0.0399, OK: 0.05, OR: 0.099, PA: 0.0307,
  RI: 0.0599, SC: 0.07, SD: 0, TN: 0, TX: 0, UT: 0.0495, VT: 0.0875, VA: 0.0575,
  WA: 0, WV: 0.065, WI: 0.0765, WY: 0
};

function calculateFederalIncomeTax(income: number): number {
  let tax = 0;

  for (const bracket of federalTaxBrackets2024) {
    if (income <= bracket.min) break;

    const taxableInThisBracket = Math.min(income, bracket.max) - bracket.min;
    tax += taxableInThisBracket * bracket.rate;
  }

  return tax;
}

function calculateSelfEmploymentTax(income: number): number {
  const seIncome = income * 0.9235; // 92.35% of net earnings subject to SE tax

  // Social Security portion (capped)
  const socialSecurityTax = Math.min(seIncome, socialSecurityWageBase) * 0.124; // 12.4%

  // Medicare portion (uncapped)
  const medicareTax = seIncome * medicareRate;

  // Additional Medicare tax on high earners
  const additionalMedicare = income > additionalMedicareThreshold
    ? (income - additionalMedicareThreshold) * additionalMedicareRate
    : 0;

  return socialSecurityTax + medicareTax + additionalMedicare;
}

// function calculatePayrollTaxes(salary: number): number {
//   // Employee portion of payroll taxes
//   const employeeSocialSecurity = Math.min(salary, socialSecurityWageBase) * 0.062; // 6.2%
//   const employeeMedicare = salary * 0.0145; // 1.45%
//   const additionalMedicare = salary > additionalMedicareThreshold
//     ? (salary - additionalMedicareThreshold) * additionalMedicareRate
//     : 0;

//   // Employer portion of payroll taxes (also paid by the S-Corp owner)
//   const employerSocialSecurity = Math.min(salary, socialSecurityWageBase) * 0.062; // 6.2%
//   const employerMedicare = salary * 0.0145; // 1.45%

//   return employeeSocialSecurity + employeeMedicare + additionalMedicare +
//          employerSocialSecurity + employerMedicare;
// }

// function calculateLLCTaxes(income: number, state: string): number {
//   const federalIncomeTax = calculateFederalIncomeTax(income);
//   const selfEmploymentTax = calculateSelfEmploymentTax(income);
//   const stateTax = income * (stateTaxRates[state] || 0);

//   return federalIncomeTax + selfEmploymentTax + stateTax;
// }

// function calculateSCorpTaxes(totalIncome: number, salary: number, state: string): number {
//   const distributions = totalIncome - salary;

//   // Salary is subject to federal income tax and payroll taxes
//   const salaryFederalTax = calculateFederalIncomeTax(salary);
//   const payrollTaxes = calculatePayrollTaxes(salary);
//   const salaryStateTax = salary * (stateTaxRates[state] || 0);

//   // Distributions are subject only to federal and state income tax (no payroll taxes)
//   const distributionsFederalTax = calculateFederalIncomeTax(distributions);
//   const distributionsStateTax = distributions * (stateTaxRates[state] || 0);

//   // Total taxes on combined income
//   const totalFederalTax = calculateFederalIncomeTax(totalIncome);
//   const totalStateTax = totalIncome * (stateTaxRates[state] || 0);

//   return totalFederalTax + payrollTaxes + totalStateTax;
// }

export function calculateTaxes(totalIncome: number, salary: number, state: string) {
  // Ensure salary doesn't exceed total income
  const adjustedSalary = Math.min(salary, totalIncome);

  // LLC breakdown
  const llcFederalIncomeTax = calculateFederalIncomeTax(totalIncome);
  const llcSelfEmploymentTax = calculateSelfEmploymentTax(totalIncome);
  const llcStateTax = totalIncome * (stateTaxRates[state] || 0);
  const llcTotalTax = llcFederalIncomeTax + llcSelfEmploymentTax + llcStateTax;

  // S-Corp breakdown
  const distributions = totalIncome - adjustedSalary;
  const scorpFederalIncomeTax = calculateFederalIncomeTax(totalIncome);
  const scorpPayrollTax = adjustedSalary * 0.153; // 15.3% total (employee + employer)
  const scorpStateTax = totalIncome * (stateTaxRates[state] || 0);
  const scorpTotalTax = scorpFederalIncomeTax + scorpPayrollTax + scorpStateTax;

  const savings = llcTotalTax - scorpTotalTax;
  const recommendation: 'scorp' | 'llc' = savings > 0 ? 'scorp' : 'llc';

  return {
    llcTotalTax,
    scorpTotalTax,
    savings,
    recommendation,
    breakdown: {
      llc: {
        federalIncomeTax: llcFederalIncomeTax,
        selfEmploymentTax: llcSelfEmploymentTax,
        stateTax: llcStateTax
      },
      scorp: {
        federalIncomeTax: scorpFederalIncomeTax,
        payrollTax: scorpPayrollTax,
        stateTax: scorpStateTax,
        salary: adjustedSalary,
        distributions: distributions
      }
    }
  };
}