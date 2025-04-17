import { ReactNode, Suspense } from "react";
import Searchbar from "../../components/searchbar";

export default function Layout({ children }: { children: ReactNode }) {
  // (with-searchbar)안에 있는 모든 페이지에 레이아웃

  return (
    <div>
      <Searchbar />
      {children}
    </div>
  );
}
