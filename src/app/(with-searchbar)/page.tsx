// import styles from "./page.module.css";
// import ClientComponent from "./search/clientComponent";
// export default function Home() {
//   //console.log("Home 컴포넌트 실행"); //서버에서만 실행(브라우저 콘솔창에는 한 번만 뜸, 서버 콘솔창만 여러번 뜸.)

//   return (
//     <div className={styles.page}>
//       인덱스 페이지
//       <ClientComponent />
//     </div>
//   );
// }

import styles from "./page.module.css";
import ClientComponent from "./search/clientComponent";
import ServerComponent from "./search/serverComponent";

export default function Home() {
  //console.log("Home 컴포넌트 실행"); //서버에서만 실행(브라우저 콘솔창에는 한 번만 뜸, 서버 콘솔창만 여러번 뜸.)

  return (
    <div className={styles.page}>
      인덱스 페이지
      <ClientComponent>
        {/* children으로 이렇게 서버 컴포넌트로 넘겨주는 구조로 변경 시 Nextjs는 서버 컴포넌트를 클라이언트 컴포넌트로 변경하지 않는다. */}
        <ServerComponent />
      </ClientComponent>
    </div>
  );
}
