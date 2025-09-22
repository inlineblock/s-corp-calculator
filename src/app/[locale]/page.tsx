'use client';

import { useTranslations } from 'next-intl';
import Calculator from '@/components/Calculator';

export default function Home() {
  const t = useTranslations('Calculator');

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Starfield Background */}
      <div className="starfield"></div>

      {/* HUD Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-10"
             style={{
               backgroundImage: `
                 linear-gradient(rgba(0, 212, 255, 0.3) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(0, 212, 255, 0.3) 1px, transparent 1px)
               `,
               backgroundSize: '50px 50px'
             }}>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header HUD Panel */}
        <div className="text-center mb-12 hud-panel rounded-2xl p-8 mx-auto max-w-4xl">
          <div className="flex items-center justify-center mb-6">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 energy-core"></div>
            <span className="terminal-text text-sm">SYSTEM ONLINE</span>
            <div className="w-2 h-2 bg-green-400 rounded-full ml-2 energy-core"></div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4 hologram bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            {t('title')}
          </h1>

          <div className="scan-line">
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-4">
              {t('description')}
            </p>
          </div>

          {/* Status indicators */}
          <div className="flex justify-center space-x-6 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-400 mr-2 energy-core"></div>
              <span className="terminal-text">TAX ENGINE</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-400 mr-2 energy-core"></div>
              <span className="terminal-text">CALCULATION MATRIX</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-purple-400 mr-2 energy-core"></div>
              <span className="terminal-text">QUANTUM PROCESSOR</span>
            </div>
          </div>
        </div>

        <Calculator />
      </div>

      {/* Corner HUD Elements */}
      <div className="fixed top-4 left-4 text-xs terminal-text z-20">
        <div className="hud-panel p-2 rounded">
          <div>LAT: 37.7749</div>
          <div>LON: -122.4194</div>
          <div className="data-stream">SCANNING...</div>
        </div>
      </div>

      <div className="fixed top-4 right-4 text-xs terminal-text z-20">
        <div className="hud-panel p-2 rounded">
          <div>PWR: 99.7%</div>
          <div>CPU: 23%</div>
          <div className="data-stream">OPTIMAL</div>
        </div>
      </div>

      <div className="fixed bottom-4 left-4 text-xs terminal-text z-20">
        <div className="hud-panel p-2 rounded">
          <div>VER: 2.1.47</div>
          <div>NET: SECURE</div>
          <div className="data-stream">CONNECTED</div>
        </div>
      </div>

      <div className="fixed bottom-4 right-4 text-xs terminal-text z-20">
        <div className="hud-panel p-2 rounded">
          <div>MEM: 4.2GB</div>
          <div>DSK: 87%</div>
          <div className="data-stream">ACTIVE</div>
        </div>
      </div>
    </div>
  );
}