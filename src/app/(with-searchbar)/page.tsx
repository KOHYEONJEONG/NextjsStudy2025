import BookItem from "@/components/book-item";
import style from "./page.module.css";
import books from "@/mock/books.json";

export default function Home() {
  // 인덱스 페이지

  return (
    <div className={style.container}>
      {/* section 태그는 div 태그와 이름만 다른뿐 기능은 같다 */}
      <section>
        <h3>지금 추천하는 도서</h3>
        {/*books은 mock폴더안에 임시 배열데이터, list 형태로 렌더링 */}
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>

      <section>
        <h3>등록된 모든 도서</h3>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  );
}
