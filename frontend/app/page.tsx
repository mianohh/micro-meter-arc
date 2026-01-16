'use client';

import { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi';
import { parseUnits } from 'viem';
import { Terminal, Zap, CheckCircle2, Loader2 } from 'lucide-react';
import { CONTRACT_ADDRESS, CONTRACT_ABI, PROVIDER_ADDRESS } from '@/lib/contract';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [logs, setLogs] = useState<string[]>(['> System initialized...', '> Connect wallet to begin...']);
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
      addLog(`> Wallet connected: ${address?.slice(0, 6)}...${address?.slice(-4)}`);
    }
  }, [isConnected, address]);

  const addLog = (message: string) => {
    setLogs((prev) => [...prev, message]);
  };

  const handleRequest = async () => {
    if (!prompt.trim()) return;
    
    const currentRequestId = Number(nextId || 0);
    setRequestId(currentRequestId);
    
    addLog(`> Submitting request...`);
    addLog(`> Prompt: "${prompt.slice(0, 50)}..."`);
    
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'payForService',
      args: [PROVIDER_ADDRESS, 'ai-service', prompt],
      value: parseUnits('0.0001', 6),
    });
  };

  useEffect(() => {
    if (isConfirming) {
      addLog('> Transaction pending...');
    }
    if (isSuccess && requestId !== null) {
      addLog('> Transaction confirmed!');
      addLog('> Waiting for AI agent...');
      setPolling(true);
      pollForResult(requestId);
    }
  }, [isConfirming, isSuccess, requestId]);

  const { data: requestData, refetch } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'requests',
    args: requestId !== null ? [BigInt(requestId)] : undefined,
    query: {
      enabled: false,
    },
  });

  const pollForResult = async (reqId: number) => {
    const interval = setInterval(async () => {
      const { data } = await refetch();
      
      if (data && data[4]) {
        clearInterval(interval);
        setPolling(false);
        addLog('> Request fulfilled!');
        setResult(data[3] as string);
      }
    }, 2000);

    setTimeout(() => {
      clearInterval(interval);
      setPolling(false);
    }, 60000);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-green-500 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div className="flex justify-between items-center border-b border-green-500/30 pb-4">
          <div className="flex items-center gap-3">
            <Terminal className="w-8 h-8" />
            <h1 className="text-3xl font-bold tracking-wider">MICRO-METER // AGENTIC MARKET</h1>
          </div>
          <ConnectButton />
        </div>

        <div className="border border-green-500/30 bg-black/50 p-6 rounded-lg">
          <label className="block text-sm mb-2 text-green-400">{'> WHAT DO YOU NEED?'}</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full bg-zinc-900 border border-green-500/50 rounded p-4 text-green-400 font-mono focus:outline-none focus:border-green-500 min-h-[120px]"
            placeholder="Enter your request for the AI agent..."
            disabled={!isConnected}
          />
          <button
            onClick={handleRequest}
            disabled={!isConnected || isPending || isConfirming || polling || !prompt.trim()}
            className="mt-4 w-full bg-green-500 text-black font-bold py-3 px-6 rounded hover:bg-green-400 disabled:bg-zinc-700 disabled:text-zinc-500 flex items-center justify-center gap-2 transition-all"
          >
            {isPending || isConfirming || polling ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {polling ? 'WAITING FOR AI...' : 'PROCESSING...'}
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                REQUEST AGENT (0.0001 USDC)
              </>
            )}
          </button>
        </div>

        <div className="border border-green-500/30 bg-black/50 p-6 rounded-lg">
          <div className="flex items-center gap-2 mb-4 text-green-400">
            <Terminal className="w-5 h-5" />
            <span className="font-bold">LIVE CONSOLE</span>
          </div>
          <div className="bg-zinc-900 rounded p-4 h-64 overflow-y-auto font-mono text-sm space-y-1">
            {logs.map((log, i) => (
              <div key={i} className="text-green-400">{log}</div>
            ))}
          </div>
        </div>

        {result && (
          <div className="border border-green-500 bg-black/80 p-6 rounded-lg animate-pulse">
            <div className="flex items-center gap-2 mb-4 text-green-400">
              <CheckCircle2 className="w-6 h-6" />
              <span className="font-bold text-xl">AI RESPONSE RECEIVED</span>
            </div>
            <div className="bg-zinc-900 rounded p-6 text-green-300 font-mono text-lg leading-relaxed">
              {result}
            </div>
            <div className="mt-4 text-xs text-green-500/70">
              Request ID: #{requestId} | Stored on-chain permanently
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
