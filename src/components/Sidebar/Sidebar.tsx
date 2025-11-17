import React from 'react';
import SidebarDesktop from './SidebarDesktop/SidebarDesktop';
import SidebarMobile from './SidebarMobile/SidebarMobile';

const Sidebar = () => {
  return (
    <>
      <SidebarDesktop />
      <SidebarMobile />
    </>
  );
};

export default Sidebar;
