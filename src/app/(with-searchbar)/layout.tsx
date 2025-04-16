import React, { ReactNode } from "react";
import Searchbar from "../components/searchbar";
function Layout({
  children,
}: {
  children: ReactNode; //children은 Node타입이다.
}) {
  return (
    <div>
      <Searchbar />
      {children}
    </div>
  );
}

export default Layout;
