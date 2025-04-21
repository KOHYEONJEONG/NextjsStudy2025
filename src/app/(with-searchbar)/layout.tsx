import { ReactNode, Suspense } from "react";
import Searchbar from "../../components/searchbar";

export default function Layout({ children }: { children: ReactNode }) {
  // (with-searchbar)안에 있는 모든 페이지에 레이아웃

  return (
    <div>
      {/* 인덱스 페이지와 search 페이지의 공통적으로 SeachBar가 상단에 생긴다.
          ㄴ 상세보기 화면에서는 SeachBar가 안 보이겠지?
      */}
      <Searchbar />
      {children}
    </div>
  );
}
