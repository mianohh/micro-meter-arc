import './globals.css';
import { Providers } from './providers';

export const metadata = {
  title: 'Micro-Meter',
  description: 'AI Agent Marketplace',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-mono">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}