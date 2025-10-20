'use client';

import Sidebar from '@/components/Sidebar/Sidebar';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

const MasterRootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathName = usePathname();

  return (
    <main
      className={twMerge(
        'h-dvh  overflow-auto',
        pathName === '/solicitacoes' ? 'bg-secondary' : 'bg-primary2',
      )}
    >
      <Sidebar />
      <div>
        <div className="min-w-[1200px] pl-[136px]! pr-[24px]! pt-[32px]!">
          {children}
        </div>
      </div>
    </main>
  );
};

export default MasterRootLayout;
