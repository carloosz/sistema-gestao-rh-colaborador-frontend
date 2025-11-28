import { useAuth } from '@/hooks/useAuth';
import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import ModalLogout from '@/components/Modals/ModalLogout/ModalLogout';
import './styles.css';
import { twMerge } from 'tailwind-merge';

const SidebarMobile = () => {
  const router = useRouter();
  const pathName = usePathname();
  const { logout } = useAuth();
  const [openMenu, setOpenMenu] = useState(false);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  return (
    <aside
      className={twMerge(
        'block lg:hidden aside',
        openMenu ? 'menu-opened' : '',
      )}
    >
      {openLogoutModal && (
        <ModalLogout
          onConfirm={logout}
          onCancel={() => setOpenLogoutModal(false)}
        />
      )}
      <button
        type="button"
        onClick={() => setOpenMenu(prev => !prev)}
        className="burger-container"
      >
        <div id="burger">
          <div className="bar topBar" />
          <div className="bar btmBar" />
        </div>
      </button>
      {openMenu && (
        <nav className="menu">
          <button
            type="button"
            onClick={() => {
              router.push('/solicitacoes');
              setOpenMenu(false);
            }}
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
            Solicitacões
          </button>
          <button
            type="button"
            onClick={() => {
              router.push('/minhas-informacoes');
              setOpenMenu(false);
            }}
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
            Minhas Informações
          </button>
          <button
            type="button"
            onClick={() => {
              router.push('/config');
              setOpenMenu(false);
            }}
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
            Configurações
          </button>
          <button
            type="button"
            onClick={() => setOpenLogoutModal(true)}
            className="flex gap-[8px] items-center text-start w-[36px] h-[36px] transition-width text-primary4 hover:text-primary2"
          >
            <img width={36} height={36} src="/img/menu/logout.svg" alt="" />
            Sair
          </button>
        </nav>
      )}
    </aside>
  );
};

export default SidebarMobile;
