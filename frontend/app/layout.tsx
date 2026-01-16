import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'MICRO-METER // Agentic Market',
  description: 'Decentralized AI Agent Marketplace',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-mono">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
