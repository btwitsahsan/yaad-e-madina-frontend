import React, { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
  sidebarToggle: boolean;
};
const Layout: React.FC<LayoutProps> = ({ children, sidebarToggle }) => {
  return (
    <div className={`${sidebarToggle ? "" : "md:ml-64"}`}>
      <div className={`p-4 min-h-[80vh]`}>
      {children}
    </div>
    </div>
  );
};

export default Layout;
