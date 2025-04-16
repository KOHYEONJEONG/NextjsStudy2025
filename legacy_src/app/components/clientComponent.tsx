// "use client"; //클라이언트 컴포넌트
// import ServerComponent from "./serverComponent";

// export default function ClientComponent() {
//   console.log("클라이언트 컴포넌트!");

//   return (
//     <div>
//       <ServerComponent />
//     </div>
//   );
// }

"use client";
import { ReactNode } from "react";

//클라이언트 컴포넌트

export default function ClientComponent({ children }: { children: ReactNode }) {
  //이 클라이언트 컴포넌트는 이 서버 컴포넌트를 직접 실행할 필요 없이 그냥 오직
  //서버 컴포넌트의 결과물만 딱 children이라는 props로 전달받도록 구조가 변경되기 때문이다.(먼저 보고오기 : with-searchbar)\page.tsx)
  // props로 받아서 렌더링만 하면 되기에!
  console.log("클라이언트 컴포넌트!");

  return <div>{children}</div>;
}
