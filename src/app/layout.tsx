import type { Metadata } from 'next';
import { Providers } from './providers';

import 'antd/dist/reset.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'GitHub Top Stars',
  description: 'Browse the most starred GitHub repositories',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
