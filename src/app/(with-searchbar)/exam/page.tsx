import ClientComponent from "./client-component";
import stlyes from "../page.module.css";
import ServerComponent from "./server-component";

export default function Page() {
  return (
    <div className={stlyes.page}>
      테스트 페이지
      <ClientComponent>
        {/* children으로 전달된 서버 컴포넌트는 클라이언트 컴포넌트로 변경하지 않는다. */}
        <ServerComponent />
      </ClientComponent>
    </div>
  );
}
