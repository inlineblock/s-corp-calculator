'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface StateSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const states = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

export default function StateSelector({ value, onChange }: StateSelectorProps) {
  const t = useTranslations('Calculator');
  const tStates = useTranslations('States');
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStates = states.filter(state =>
    tStates(state).toLowerCase().includes(searchTerm.toLowerCase()) ||
    state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (state: string) => {
    onChange(state);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="space-y-3 relative">
      <label className="block text-sm font-semibold text-slate-200">
        {t('state')}
      </label>
      <p className="text-xs text-slate-400 mb-2">
        {t('stateDescription')}
      </p>

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-4 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white text-lg font-semibold text-left focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 flex justify-between items-center"
        >
          <span>{tStates(value)} ({value})</span>
          <svg
            className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-slate-800 border border-slate-600 rounded-xl shadow-2xl max-h-80 overflow-hidden">
            <div className="p-3 border-b border-slate-600">
              <input
                type="text"
                placeholder="Search states..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
            <div className="max-h-60 overflow-y-auto">
              {filteredStates.map((state) => (
                <button
                  key={state}
                  onClick={() => handleSelect(state)}
                  className="w-full px-4 py-3 text-left hover:bg-slate-700 transition-colors duration-150 text-white border-b border-slate-700 last:border-b-0"
                >
                  <span className="font-medium">{tStates(state)}</span>
                  <span className="text-slate-400 ml-2">({state})</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}