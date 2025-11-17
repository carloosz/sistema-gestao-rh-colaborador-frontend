import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import ModalLogout from '@/components/Modals/ModalLogout/ModalLogout';

const SidebarMobile = () => {
  const pathName = usePathname();
  const { logout } = useAuth();
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  return (
    <aside className="flex lg:hidden w-dvw fixed bottom-0 bg-primary border-primary p-[12px]! transition-all justify-center items-center gap-[40px] z-[99] overflow-x-auto">
      {openLogoutModal && (
        <ModalLogout
          onConfirm={logout}
          onCancel={() => setOpenLogoutModal(false)}
        />
      )}
      <nav className="min-w-[400px] flex justify-end items-center gap-[40px]">
        <Link
          href="/solicitacoes"
          className="flex gap-[8px] items-center text-start w-[36px]  h-[36px] transition-width text-primary4 hover:text-primary2"
        >
          <img
            width={36}
            height={36}
            src={
              pathName.match('/solicitacoes') !== null
                ? '/img/menu/requests_active.svg'
                : '/img/menu/requests.svg'
            }
            alt=""
          />
        </Link>
        <Link
          href="/minhas-informacoes"
          className="flex gap-[8px] items-center text-start w-[36px]  h-[36px] transition-width text-primary4 hover:text-primary2"
        >
          <img
            width={36}
            height={36}
            src={
              pathName.match('/minhas-informacoes') !== null
                ? '/img/menu/user_active.svg'
                : '/img/menu/user.svg'
            }
            alt=""
          />
        </Link>
        <Link
          href="/config"
          className="flex gap-[8px] items-center text-start w-[36px]  h-[36px] transition-width text-primary4 hover:text-primary2"
        >
          <img
            width={36}
            height={36}
            src={
              pathName.match('/config') !== null
                ? '/img/menu/gear_active.svg'
                : '/img/menu/gear.svg'
            }
            alt=""
          />
        </Link>
        <button
          type="button"
          onClick={() => setOpenLogoutModal(true)}
          className="flex gap-[8px] items-center text-start w-[36px] h-[36px] transition-width text-primary4 hover:text-primary2"
        >
          <img width={36} height={36} src="/img/menu/logout.svg" alt="" />
        </button>
      </nav>
    </aside>
  );
};

export default SidebarMobile;
