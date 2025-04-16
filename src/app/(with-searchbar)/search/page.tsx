import ClientComponent from "@/app/components/clientComponent";

export default async function Page({
  searchParams, // props 안에 쿼리스트링 정보가 들어옴.
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  //http://localhost:3000/search?q=hi
  return (
    <div>
      {/* 클라이언트 컴포넌트와 서버 컴포넌트를 포함하는 혼합된 헤이지가 됨 */}
      Search 페이지: {q}
      <ClientComponent>
        <></>
      </ClientComponent>
    </div>
  );
}
