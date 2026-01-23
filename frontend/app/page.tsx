'use client';

import { useState } from 'react';
import { Terminal, Zap, CheckCircle2, Loader2 } from 'lucide-react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleRequest = async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    setResult('');
    
    // Simulate AI processing
    setTimeout(() => {
      setResult(`AI Response: Based on your query "${prompt}", this demonstrates the Micro-Meter marketplace concept. In production, this connects to Arc Testnet for real USDC payments and on-chain AI responses.`);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-green-500 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        <div className="flex justify-between items-center border-b border-green-500/30 pb-4">
          <div className="flex items-center gap-3">
            <Terminal className="w-8 h-8" />
            <h1 className="text-3xl font-bold">MICRO-METER</h1>
          </div>
          <div className="text-green-400 text-sm">Arc Testnet Ready</div>
        </div>

        <div className="border border-green-500/30 bg-black/50 p-6 rounded-lg">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full bg-zinc-900 border border-green-500/50 rounded p-4 text-green-400 font-mono focus:outline-none focus:border-green-500 min-h-[120px]"
            placeholder="Enter your AI request..."
          />
          <button
            onClick={handleRequest}
            disabled={loading || !prompt.trim()}
            className="mt-4 w-full bg-green-500 text-black font-bold py-3 px-6 rounded hover:bg-green-400 disabled:bg-zinc-700 disabled:text-zinc-500 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                PROCESSING...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                REQUEST (0.0001 USDC)
              </>
            )}
          </button>
        </div>

        {result && (
          <div className="border border-green-500 bg-black/80 p-6 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-6 h-6" />
              <span className="font-bold text-xl">AI RESPONSE</span>
            </div>
            <div className="bg-zinc-900 rounded p-6 text-green-300 font-mono">
              {result}
            </div>
          </div>
        )}

        <div className="text-center text-green-500/50 text-sm">
          <p>⚡ Micro-Meter Demo • Contract: 0xcC4BdC096505905bEF5B2bf7d9f79787F2058Be7</p>
        </div>
      </div>
    </div>
  );
}