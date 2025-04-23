import { ReactNode, Suspense } from "react";
import Searchbar from "../../components/searchbar";

export default function Layout({ children }: { children: ReactNode }) {
  // (with-searchbar)안에 있는 모든 페이지에 레이아웃

  return (
    <div>
      {/* 인덱스 페이지와 search 페이지의 공통적으로 SeachBar가 상단에 생긴다.
          ㄴ 상세보기 화면에서는 SeachBar가 안 보이겠지?

          Searchbar 컴포넌트만 클라이언트 컴포넌트로 만들면됨
      */}
      <Searchbar />

      {/* 
          props에서 구조분해할당으로 전달 받은 다음...

          children 키워드를 통해 자동으로 Page 컴포넌트 전달되기 때문에 
          레이아웃 컴포넌트의 리턴문 안에 
          이런식으로 페이지 컴포넌트를 어디에 배칠할 건지 직접 설정해주면 된다. 

          ㄴ 레이아웃 파일은 자동으로 next에서 중첩해줌.
      */}
      {children}
    </div>
  );
}
