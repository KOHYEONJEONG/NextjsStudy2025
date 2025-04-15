export default async function Page({
  searchParams, // props 안에 쿼리스트링 정보가 들어옴.
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  //http://localhost:3000/search?q=hi
  return <div>Search 페이지: {q}</div>;
}
