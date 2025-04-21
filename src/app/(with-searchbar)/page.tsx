import BookItem from "@/components/book-item";
import style from "./page.module.css";
import books from "@/mock/books.json";
import { BookData } from "@/types";

async function AllBook() {
  //api로 데이터를 불러오면 타입스크립트는 어떤 결과값을 가져올지 몰라 타입정보를 지정해줘야한다.
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`
  );

  //예외처리 필수
  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }
  const allBook: BookData[] = await response.json(); //타입 지정(BookData의 array 타입)

  return (
    <div>
      {allBook.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

// 랜덤으로 추천도서 가져옴
async function RecoBooks() {
  //api로 데이터를 불러오면 타입스크립트는 어떤 결과값을 가져올지 몰라 타입정보를 지정해줘야한다.
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`
  );
  //예외처리 필수
  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const recoBooks: BookData[] = await response.json(); //타입 지정

  console.log("랜덤 => ", recoBooks);

  //정상적으로 불러와서 렌더링까지 확인할 수 있다.
  return (
    <div>
      {recoBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export default function Home() {
  //async 제외
  // 인덱스 페이지

  return (
    <div className={style.container}>
      {/* section 태그는 div 태그와 이름만 다른뿐 기능은 같다 */}
      <section>
        <h3>지금 추천하는 도서</h3>
        {/*books은 mock폴더안에 임시 배열데이터, list 형태로 렌더링 */}
        <RecoBooks />
      </section>

      <section>
        <h3>등록된 모든 도서</h3>
        <AllBook />
      </section>
    </div>
  );
}
