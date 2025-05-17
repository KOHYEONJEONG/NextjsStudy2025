import { ReactNode, Suspense } from "react";
import Searchbar from "../../components/searchbar";

export default function Layout({ children }: { children: ReactNode }) {
  // (with-searchbar)안에 있는 모든 페이지에 레이아웃

  return (
    <div>
      <div>
        클라이언트 라우터 캐시가 작동되는지 확인하기 위해 시분초를 확인해보자
        검색어를 입력해도 시간이 변화되지 않는걸 알 수 있다!(넥스트 서버 자동
        작동)
        {new Date().toLocaleString()}
      </div>

      {/* 인덱스 페이지와 search 페이지의 공통적으로 SeachBar가 상단에 생긴다.
          ㄴ 상세보기 화면에서는 SeachBar가 안 보이겠지?

          Searchbar 컴포넌트만 클라이언트 컴포넌트로 만들면됨
      */}
      <Suspense fallback={<div>Loading ...</div>}>
        {/*
        Suspense 컴포넌트란?(서스펜스, 리액트 내장컴포넌트)
        사전렌더링 과정에서 클라이언트 컴포넌트는 배제되고 오직 클라이언트 측에서만 렌더링된다. 
        ㄴ 묶여있는 컴포넌트들은 미완성 상태로 남겨두고 곧 바로 렌더링하지 않는다. 
        ㄴㄴ 대신에 FALLBACK으로 대신 렌더링하게 됨.(fallback={<div>Loading ...</div>})
        ㄴㄴㄴ 언제까지? 이 컴포넌트(Searchbar)의 비동기 작업이 종료가될때까지 미완성 상태로 남아있는다.
                ㄴ Searchbar 컴포넌트 안에서 useSearchParams 훅이 있는데 
                빌드타임에 불러오는 문제를 막아서 build 시 오류가 안남.
        ㄴ빌드타임에 불러오는 문제를 효과적으로 막을 수 있다.

        */}
        <Searchbar />
      </Suspense>

      {/* 
          # children
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
