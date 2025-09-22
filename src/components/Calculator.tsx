'use client';

import { useState, useEffect } from 'react';
import IncomeInput from './IncomeInput';
import SalarySlider from './SalarySlider';
import StateSelector from './StateSelector';
import TaxResults from './TaxResults';
import { calculateTaxes } from '@/lib/taxCalculations';

interface TaxResults {
  llcTotalTax: number;
  scorpTotalTax: number;
  savings: number;
  recommendation: 'scorp' | 'llc';
  breakdown: {
    llc: {
      federalIncomeTax: number;
      selfEmploymentTax: number;
      stateTax: number;
    };
    scorp: {
      federalIncomeTax: number;
      payrollTax: number;
      stateTax: number;
      salary: number;
      distributions: number;
    };
  };
}

export default function Calculator() {
  const [totalIncome, setTotalIncome] = useState<number>(100000);
  const [salary, setSalary] = useState<number>(50000);
  const [selectedState, setSelectedState] = useState<string>('CA');
  const [results, setResults] = useState<TaxResults | null>(null);

  useEffect(() => {
    if (totalIncome > 0) {
      const taxResults = calculateTaxes(totalIncome, salary, selectedState);
      setResults(taxResults);
    }
  }, [totalIncome, salary, selectedState]);

  useEffect(() => {
    if (salary > totalIncome) {
      setSalary(totalIncome);
    }
  }, [totalIncome, salary]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Control Panel */}
        <div className="space-y-6">
          <div className="hud-panel rounded-2xl p-6 shadow-2xl border-2 border-cyan-500/30">
            {/* Control Panel Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-cyan-500/30">
              <div className="flex items-center">
                <div className="hex-panel w-8 h-8 flex items-center justify-center mr-3">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full energy-core"></div>
                </div>
                <h2 className="text-xl font-bold terminal-text">CONTROL MATRIX</h2>
              </div>
              <div className="text-xs terminal-text data-stream">
                STATUS: ACTIVE
              </div>
            </div>

            <div className="space-y-8">
              <div className="shield-effect">
                <IncomeInput
                  value={totalIncome}
                  onChange={setTotalIncome}
                />
              </div>

              <div className="shield-effect">
                <SalarySlider
                  value={salary}
                  maxValue={totalIncome}
                  onChange={setSalary}
                />
              </div>

              <div className="shield-effect">
                <StateSelector
                  value={selectedState}
                  onChange={setSelectedState}
                />
              </div>
            </div>

            {/* System Status */}
            <div className="mt-6 pt-4 border-t border-cyan-500/30">
              <div className="grid grid-cols-3 gap-4 text-xs terminal-text">
                <div className="text-center">
                  <div className="w-full bg-slate-700 rounded-full h-2 mb-1">
                    <div className="energy-bar h-2 rounded-full" style={{width: '87%'}}></div>
                  </div>
                  <div>CALC PWR</div>
                </div>
                <div className="text-center">
                  <div className="w-full bg-slate-700 rounded-full h-2 mb-1">
                    <div className="energy-bar h-2 rounded-full" style={{width: '94%'}}></div>
                  </div>
                  <div>SYNC STATUS</div>
                </div>
                <div className="text-center">
                  <div className="w-full bg-slate-700 rounded-full h-2 mb-1">
                    <div className="energy-bar h-2 rounded-full" style={{width: '98%'}}></div>
                  </div>
                  <div>DATA FLOW</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Analysis Output Panel */}
        <div className="space-y-6">
          {results && (
            <div className="hud-panel rounded-2xl p-6 shadow-2xl border-2 border-purple-500/30">
              {/* Results Panel Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-purple-500/30">
                <div className="flex items-center">
                  <div className="hex-panel w-8 h-8 flex items-center justify-center mr-3">
                    <div className="w-3 h-3 bg-purple-400 rounded-full energy-core"></div>
                  </div>
                  <h2 className="text-xl font-bold terminal-text">ANALYSIS OUTPUT</h2>
                </div>
                <div className="text-xs terminal-text data-stream">
                  PROCESSING COMPLETE
                </div>
              </div>

              <TaxResults results={results} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}