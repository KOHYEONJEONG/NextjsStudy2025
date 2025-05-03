import books from "@/mock/books.json";
import BookItem from "@/components/book-item";
import { BookData } from "@/types";

/**
 * async 키워드
 * ㄴ 리액트의 서버 컴포넌트이기 때문에 비동기적으로 실행되어도 문제가 없다.
 *
 */
export default async function Page({
  searchParams, //매개변수 구조분해, 전달된 props중 searchParams만 꺼냄.
}: {
  searchParams: Promise<{
    q?: string;
  }>;
}) {
  const { q } = await searchParams;

  //어쩔 수 없이 검색을 위해서 동적함수를 사용했기에 동적페이지가 되지만.
  //최대한 한번 호출된 검색어 데이터를 활용하기 위해서 force-cache 옵션을 사용하자.
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`, //p는 props의 searchParams
    { cache: "force-cache" }
  );

  //예외처리 필수
  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }


  const books: BookData[] = await response.json(); //타입 : BookData[]

  console.log("검색 =>> ", books);
  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}
