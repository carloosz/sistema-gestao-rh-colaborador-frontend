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
        'h-dvh pt-[50px]! lg:pt-[0]! pb-[60px]! lg:pb-[0]! overflow-auto',
        pathName === '/solicitacoes' ? 'bg-secondary' : 'bg-primary2',
      )}
    >
      <Sidebar />
      <div>
        <div className="lg:min-w-[1200px] p-[24px]! lg:pl-[136px]! lg:pr-[24px]!lg:pt-[32px]!">
          {children}
        </div>
      </div>
    </main>
  );
};

export default MasterRootLayout;
