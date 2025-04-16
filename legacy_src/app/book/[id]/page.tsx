export default async function Page({
  params, // props 안에 쿼리스트링 정보가 들어옴.
}: {
  params: Promise<{ id: string }>;
}) {
  // [] : 동적 라우팅

  const { id } = await params; //구조분해 할당당
  //http://localhost:3000/book/1
  return <div>book {id} 페이지</div>;
}
