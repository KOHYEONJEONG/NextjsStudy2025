import React, { ReactNode } from "react";

function Layout({
  children,
}: {
  children: ReactNode; //children은 Node타입이다.
}) {
  return (
    <div>
      <div>임시 서치바</div>
      {children}
    </div>
  );
}

export default Layout;
