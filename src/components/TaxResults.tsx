'use client';

import { useTranslations } from 'next-intl';

interface TaxResultsProps {
  results: {
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
  };
}

export default function TaxResults({ results }: TaxResultsProps) {
  const t = useTranslations('Calculator');
  const { llcTotalTax, scorpTotalTax, savings, recommendation } = results;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-2xl">
      <h2 className="text-2xl font-bold text-white mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
        {t('results')}
      </h2>

      <div className="space-y-6">
        {/* Tax Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-600/30">
            <div className="text-sm text-slate-400 mb-1">{t('llcTaxes')}</div>
            <div className="text-2xl font-bold text-orange-400">
              {formatCurrency(llcTotalTax)}
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-600/30">
            <div className="text-sm text-slate-400 mb-1">{t('scorpTaxes')}</div>
            <div className="text-2xl font-bold text-blue-400">
              {formatCurrency(scorpTotalTax)}
            </div>
          </div>
        </div>

        {/* Savings/Cost */}
        <div className="bg-gradient-to-r from-slate-900/50 to-slate-800/50 rounded-xl p-6 border border-slate-600/30">
          <div className="text-center">
            <div className="text-sm text-slate-400 mb-2">
              {savings > 0 ? t('savings') : t('costs')}
            </div>
            <div className={`text-4xl font-bold mb-4 ${
              savings > 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {formatCurrency(Math.abs(savings))}
            </div>
          </div>
        </div>

        {/* Recommendation */}
        <div className={`rounded-xl p-6 border-2 ${
          recommendation === 'scorp'
            ? 'bg-green-900/30 border-green-500/50'
            : 'bg-orange-900/30 border-orange-500/50'
        }`}>
          <h3 className="text-lg font-semibold text-white mb-3">
            {t('recommendation')}
          </h3>
          <p className={`text-lg ${
            recommendation === 'scorp' ? 'text-green-300' : 'text-orange-300'
          }`}>
            {recommendation === 'scorp'
              ? t('useScorp').replace('{amount}', formatCurrency(savings))
              : t('useLlc').replace('{amount}', formatCurrency(Math.abs(savings)))
            }
          </p>
        </div>

        {/* Detailed Tax Breakdown */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-white">{t('whereMoneyGoes')}</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LLC Breakdown */}
            <div className="bg-orange-900/20 border border-orange-500/30 rounded-xl p-5">
              <h4 className="text-lg font-semibold text-orange-300 mb-4 flex items-center">
                <div className="w-3 h-3 bg-orange-400 rounded-full mr-2"></div>
                {t('llcStructure')}
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-300">{t('federalIncomeTax')}</span>
                  <span className="text-white font-medium">{formatCurrency(results.breakdown.llc.federalIncomeTax)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">{t('selfEmploymentTax')}</span>
                  <span className="text-white font-medium">{formatCurrency(results.breakdown.llc.selfEmploymentTax)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">{t('stateTax')}</span>
                  <span className="text-white font-medium">{formatCurrency(results.breakdown.llc.stateTax)}</span>
                </div>
                <div className="border-t border-orange-500/30 pt-2">
                  <div className="flex justify-between font-bold">
                    <span className="text-orange-300">Total</span>
                    <span className="text-orange-300">{formatCurrency(llcTotalTax)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* S-Corp Breakdown */}
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-5">
              <h4 className="text-lg font-semibold text-blue-300 mb-4 flex items-center">
                <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
                {t('scorpStructure')}
              </h4>
              <div className="space-y-3">
                <div className="text-xs text-slate-400 mb-2">
                  {t('salaryPortion')}: {formatCurrency(results.breakdown.scorp.salary)} |
                  {t('distributionsPortion')}: {formatCurrency(results.breakdown.scorp.distributions)}
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">{t('federalIncomeTax')}</span>
                  <span className="text-white font-medium">{formatCurrency(results.breakdown.scorp.federalIncomeTax)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">{t('payrollTax')}</span>
                  <span className="text-white font-medium">{formatCurrency(results.breakdown.scorp.payrollTax)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">{t('stateTax')}</span>
                  <span className="text-white font-medium">{formatCurrency(results.breakdown.scorp.stateTax)}</span>
                </div>
                <div className="border-t border-blue-500/30 pt-2">
                  <div className="flex justify-between font-bold">
                    <span className="text-blue-300">Total</span>
                    <span className="text-blue-300">{formatCurrency(scorpTotalTax)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Comparison Bars */}
          <div className="space-y-3">
            <div className="text-sm text-slate-400">Tax Comparison</div>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-orange-400 rounded"></div>
                <div className="flex-1 bg-slate-700 rounded-full h-3 relative overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full transition-all duration-500"
                    style={{ width: `${(llcTotalTax / Math.max(llcTotalTax, scorpTotalTax)) * 100}%` }}
                  ></div>
                </div>
                <div className="text-sm text-slate-300 min-w-[80px]">LLC</div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-blue-400 rounded"></div>
                <div className="flex-1 bg-slate-700 rounded-full h-3 relative overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${(scorpTotalTax / Math.max(llcTotalTax, scorpTotalTax)) * 100}%` }}
                  ></div>
                </div>
                <div className="text-sm text-slate-300 min-w-[80px]">S-Corp</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}