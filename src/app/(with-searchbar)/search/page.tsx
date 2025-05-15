import books from "@/mock/books.json";
import BookItem from "@/components/book-item";
import { BookData } from "@/types";

// 라우트 세그먼트 옵션
// 1. auto          : 기본값, 강제x(동적함수나 , 캐싱되지 않은 데이터 패칭을 사용한다면 동적 페이지로, 그렇지 않다면 정적페이지로 인식 늘 그랬던것 처럼~)
// 2. force-dynamic : 페이지를 강제로 dynamic 페이지로 설정(이유를 막론하고 동적페이지로 설정된다.)
// 3. force-static  : 페이지를 강제로 static 페이지로 설정(유의할 점 : 동적함수를 포함한 page인경우 기능이 제대로 작동 안한다)
// 4. error         : 현재 페이지를 정적 페이지로 변경하지만 동적 페이지로 의심되는 경우 오류를 출력한다.(빌드 시 오류 출력됨)
// export const dynamic = "force-static"; //강제 변경이라 사용을 추천하지 않는다.

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
  //ㄴ (최적화)검색 결과는 계속해서 캐싱이 이루어질 거기 때문에 한 번 검색이 된 데이터를 캐시해두자. <- 빠르게 응답 가능   { cache: "force-cache" }
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
