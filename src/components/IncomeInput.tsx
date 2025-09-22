'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface IncomeInputProps {
  value: number;
  onChange: (value: number) => void;
}

export default function IncomeInput({ value, onChange }: IncomeInputProps) {
  const t = useTranslations('Calculator');
  const [displayValue, setDisplayValue] = useState(value.toLocaleString());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    const numericValue = parseInt(rawValue) || 0;

    setDisplayValue(rawValue ? numericValue.toLocaleString() : '');
    onChange(numericValue);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-semibold terminal-text flex items-center">
          <div className="w-2 h-2 bg-cyan-400 rounded-full mr-2 energy-core"></div>
          {t('totalIncome')}
        </label>
        <div className="text-xs terminal-text data-stream">
          INPUT ACTIVE
        </div>
      </div>

      <p className="text-xs text-slate-400 scan-line">
        {t('totalIncomeDescription')}
      </p>

      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
          <span className="terminal-text text-lg font-semibold">$</span>
        </div>

        <input
          type="text"
          value={displayValue}
          onChange={handleChange}
          className="w-full pl-8 pr-4 py-4 hud-button rounded-xl text-white text-xl font-bold placeholder-slate-500 focus:outline-none transition-all duration-300 warp-effect focus:shadow-lg focus:shadow-cyan-500/25"
          placeholder="100,000"
        />

        {/* Holographic overlay */}
        <div className="absolute inset-0 rounded-xl pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"></div>
        </div>

        {/* Data stream indicator */}
        <div className="absolute -top-1 -right-1 w-3 h-3">
          <div className="w-full h-full bg-green-400 rounded-full energy-core"></div>
        </div>
      </div>

      {/* Value display */}
      <div className="flex justify-between text-xs terminal-text">
        <span>DATA VALIDATED</span>
        <span>FORMAT: CURRENCY</span>
      </div>
    </div>
  );
}