import React, { ReactNode } from "react";

function Layout({
  children,
}: {
  children: ReactNode; //children은 Node타입이다.
}) {
  return <div>{children}</div>;
}

export default Layout;
