import Providers from '@/components/Providers/Providers';
import type { Metadata } from 'next';
import { lato } from '../styles/fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'RH+',
  description: 'RH+',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="pt">
      <body suppressHydrationWarning className={lato.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
