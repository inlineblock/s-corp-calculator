'use client';

import { useTranslations } from 'next-intl';

interface SalarySliderProps {
  value: number;
  maxValue: number;
  onChange: (value: number) => void;
}

export default function SalarySlider({ value, maxValue, onChange }: SalarySliderProps) {
  const t = useTranslations('Calculator');
  const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-semibold terminal-text flex items-center">
          <div className="w-2 h-2 bg-purple-400 rounded-full mr-2 energy-core"></div>
          {t('salary')}
        </label>
        <div className="text-xs terminal-text data-stream">
          CONTROL ACTIVE
        </div>
      </div>

      <p className="text-xs text-slate-400 scan-line">
        {t('salaryDescription')}
      </p>

      {/* Value Display HUD */}
      <div className="hud-panel rounded-xl p-4 border border-purple-500/30">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className="hex-panel w-6 h-6 flex items-center justify-center mr-3">
              <div className="w-2 h-2 bg-purple-400 rounded-full energy-core"></div>
            </div>
            <span className="text-2xl font-bold terminal-text hologram">
              ${value.toLocaleString()}
            </span>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-purple-400">
              {percentage.toFixed(1)}%
            </div>
            <div className="text-xs terminal-text">
              OF INCOME
            </div>
          </div>
        </div>

        {/* Percentage Bar */}
        <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
          <div
            className="energy-bar h-2 rounded-full transition-all duration-300"
            style={{width: `${percentage}%`}}
          ></div>
        </div>

        <div className="flex justify-between text-xs terminal-text">
          <span>SALARY PORTION</span>
          <span>DISTRIBUTION: ${(maxValue - value).toLocaleString()}</span>
        </div>
      </div>

      {/* Advanced Slider Control */}
      <div className="relative group">
        <div className="absolute -top-3 left-0 right-0 flex justify-between text-xs terminal-text">
          <span>MIN</span>
          <span>OPTIMAL RANGE</span>
          <span>MAX</span>
        </div>

        <input
          type="range"
          min="0"
          max={maxValue}
          step="1000"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full h-4 bg-transparent rounded-lg appearance-none cursor-pointer slider relative z-10"
        />

        {/* Track styling */}
        <div className="absolute top-1/2 left-0 right-0 h-2 -translate-y-1/2 pointer-events-none">
          <div className="h-full bg-slate-700 rounded-full border border-slate-600">
            <div
              className="h-full energy-bar rounded-full transition-all duration-300"
              style={{width: `${percentage}%`}}
            ></div>
          </div>
        </div>

        {/* Range markers */}
        <div className="absolute top-full mt-2 left-0 right-0 flex justify-between text-xs terminal-text">
          <span>$0</span>
          <span className="text-yellow-400">REASONABLE</span>
          <span>${maxValue.toLocaleString()}</span>
        </div>

        {/* Scanning effect */}
        <div className="absolute inset-0 scan-line opacity-50"></div>
      </div>

      {/* Status Indicators */}
      <div className="grid grid-cols-2 gap-4 text-xs">
        <div className="hud-panel p-2 rounded border border-green-500/30">
          <div className="flex items-center justify-between">
            <span className="terminal-text">SE TAX SAVED</span>
            <div className="w-2 h-2 bg-green-400 rounded-full energy-core"></div>
          </div>
          <div className="text-green-400 font-bold">
            ${Math.max(0, (maxValue - value) * 0.1413).toLocaleString()}
          </div>
        </div>
        <div className="hud-panel p-2 rounded border border-orange-500/30">
          <div className="flex items-center justify-between">
            <span className="terminal-text">PAYROLL TAX</span>
            <div className="w-2 h-2 bg-orange-400 rounded-full energy-core"></div>
          </div>
          <div className="text-orange-400 font-bold">
            ${(value * 0.153).toLocaleString()}
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 28px;
          width: 28px;
          border-radius: 50%;
          background: radial-gradient(circle, var(--neon-cyan) 0%, var(--neon-purple) 100%);
          cursor: pointer;
          box-shadow:
            0 0 20px var(--neon-cyan),
            0 0 40px var(--neon-purple),
            inset 0 2px 4px rgba(255, 255, 255, 0.3);
          border: 3px solid rgba(0, 212, 255, 0.5);
          position: relative;
          z-index: 20;
        }

        .slider::-webkit-slider-thumb:hover {
          box-shadow:
            0 0 30px var(--neon-cyan),
            0 0 60px var(--neon-purple),
            inset 0 2px 6px rgba(255, 255, 255, 0.4);
          transform: scale(1.1);
        }

        .slider::-moz-range-thumb {
          height: 28px;
          width: 28px;
          border-radius: 50%;
          background: radial-gradient(circle, var(--neon-cyan) 0%, var(--neon-purple) 100%);
          cursor: pointer;
          box-shadow:
            0 0 20px var(--neon-cyan),
            0 0 40px var(--neon-purple),
            inset 0 2px 4px rgba(255, 255, 255, 0.3);
          border: 3px solid rgba(0, 212, 255, 0.5);
        }
      `}</style>
    </div>
  );
}