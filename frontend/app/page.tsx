'use client';

import { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi';
import { parseUnits } from 'viem';
import { Terminal, Zap, CheckCircle2, Loader2 } from 'lucide-react';
import { CONTRACT_ADDRESS, CONTRACT_ABI, PROVIDER_ADDRESS } from '@/lib/contract';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [logs, setLogs] = useState<string[]>(['> System ready', '> Connect wallet to begin']);
  const [result, setResult] = useState<string>('');
  const [requestId, setRequestId] = useState<number | null>(null);
  const [polling, setPolling] = useState(false);

  const { address, isConnected } = useAccount();
  const { data: hash, writeContract, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });
  const { data: nextId } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'nextRequestId',
  });

  useEffect(() => {
    if (isConnected) {
      setLogs(prev => [...prev, `> Connected: ${address?.slice(0, 6)}...${address?.slice(-4)}`]);
    }
  }, [isConnected, address]);

  const addLog = (message: string) => setLogs(prev => [...prev, message]);

  const handleRequest = async () => {
    if (!prompt.trim()) return;
    
    if (!isConnected) {
      addLog('> Please connect your wallet first');
      return;
    }
    
    const currentRequestId = Number(nextId || 0);
    setRequestId(currentRequestId);
    addLog(`> Submitting request #${currentRequestId}`);
    addLog('> Paying 0.0001 USDC...');
    
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'payForService',
      args: [PROVIDER_ADDRESS, 'ai-service', prompt],
      value: parseUnits('0.0001', 6),
    });
  };

  const callAIDirectly = async () => {
    try {
      addLog('> Processing with AI...');
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      
      const data = await response.json();
      
      if (data.success) {
        addLog('> AI response received!');
        setResult(data.answer);
        setPolling(false);
      } else {
        addLog(`> AI error: ${data.error}`);
      }
    } catch (error) {
      addLog('> AI request failed');
    }
  };

  useEffect(() => {
    if (isConfirming) addLog('> Transaction pending...');
    if (isSuccess && requestId !== null) {
      addLog('> Payment confirmed!');
      addLog('> Processing with AI...');
      setPolling(true);
      
      callAIDirectly();
    }
  }, [isConfirming, isSuccess, requestId]);

  return (
    <div className="min-h-screen bg-zinc-950 text-green-500 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        <div className="flex justify-between items-center border-b border-green-500/30 pb-4">
          <div className="flex items-center gap-3">
            <Terminal className="w-8 h-8" />
            <h1 className="text-3xl font-bold">MICRO-METER-ARC</h1>
          </div>
          <ConnectButton />
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
            disabled={isPending || isConfirming || polling || !prompt.trim()}
            className="mt-4 w-full bg-green-500 text-black font-bold py-3 px-6 rounded hover:bg-green-400 disabled:bg-zinc-700 disabled:text-zinc-500 flex items-center justify-center gap-2"
          >
            {isPending || isConfirming || polling ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {polling ? 'PROCESSING...' : 'CONFIRMING...'}
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                {isConnected ? 'PAY 0.0001 USDC & REQUEST' : 'CONNECT WALLET TO REQUEST'}
              </>
            )}
          </button>
        </div>

        <div className="border border-green-500/30 bg-black/50 p-6 rounded-lg">
          <div className="bg-zinc-900 rounded p-4 h-64 overflow-y-auto font-mono text-sm">
            {logs.map((log, i) => (
              <div key={i} className="text-green-400">{log}</div>
            ))}
          </div>
        </div>

        {result && (
          <div className="border border-green-500 bg-black/80 p-6 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-6 h-6" />
              <span className="font-bold text-xl">GEMINI AI RESPONSE</span>
            </div>
            <div className="bg-zinc-900 rounded p-6 text-green-300 font-mono text-sm leading-relaxed">
              {result}
            </div>
            <div className="mt-4 text-xs text-green-500/70">
              Request ID: #{requestId} | Paid with USDC on Arc Testnet
            </div>
          </div>
        )}

        <div className="text-center text-green-500/50 text-sm">
          <p>⚡ Pay-Per-Inference • 0.0001 USDC • Arc Testnet</p>
        </div>
      </div>
    </div>
  );
}