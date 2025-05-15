import "./globals.css";
import Link from "next/link";
import style from "./layout.module.css"; //루트 layout에 css파일
import { BookData } from "@/types";

async function Footer() {
  //옵션이 없고(또는 no-store) 데이터 캐싱되지 않는다.
  //왜? 해당 레이아웃은 메인 layout이며 이 Footer 컴포넌트때문에 동적 컴포넌트로 인식되기 때문이다
  // 그렇기 때문에 자주 변화하지 않는 Footer는 캐시 옵션을 사용하여 RootLayout을 정적 컴포넌트로 인식되게 함으로써 다른 컴포넌트에도 영향이 가지 않는다(npm run build 해보자. )
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    { cache: "force-cache" }
  );
  if (!response.ok) {
    return <footer>제작 @winterlood</footer>;
  }

  //요청성공
  const book: BookData[] = await response.json(); //json으로 변환

  const bookCount = book.length;

  return (
    <footer>
      <div>제작 @winterlood</div>
      <div>{bookCount}개의 도서가 등록되었습니다.</div>
    </footer>
  );
}

//인덱스 페이지에 포함되는 layout
export default function RootLayout({
  children, //구조분해할당으로 받아오기.
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <div className={style.container}>
          {/* 시맨틱 태그 */}
          <header>
            <Link href={"/"}>📚 ONEBITE BOOKS</Link>
          </header>

          {/* 
                props에서 구조분해할당으로 전달 받은 다음...

                children 키워드를 통해 자동으로 Page 컴포넌트 전달되기 때문에 
                레이아웃 컴포넌12개의 책트의 리턴문 안에 
                이런식으로 페이지 컴포넌트를 어디에 배칠할 건지 직접 설정해주면 된다. 
            */}
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
