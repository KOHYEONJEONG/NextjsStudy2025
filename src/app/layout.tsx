import "./globals.css";
import Link from "next/link";
import style from "./layout.module.css";
import { BookData } from "@/types";

async function Footer() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`
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
      <div>{bookCount}개의 책</div>
    </footer>
  );
}

export default function RootLayout({
  children,
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
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
