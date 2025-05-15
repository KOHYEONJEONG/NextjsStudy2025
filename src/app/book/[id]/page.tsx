import { notFound } from "next/navigation";
import style from "./page.module.css";

const mockData = {
  id: 1,
  title: "한 입 크기로 잘라 먹는 리액트",
  subTitle: "자바스크립트 기초부터 애플리케이션 배포까지",
  description:
    "자바스크립트 기초부터 애플리케이션 배포까지\n처음 시작하기 딱 좋은 리액트 입문서\n\n이 책은 웹 개발에서 가장 많이 사용하는 프레임워크인 리액트 사용 방법을 소개합니다. 인프런, 유데미에서 5000여 명이 수강한 베스트 강좌를 책으로 엮었습니다. 프런트엔드 개발을 희망하는 사람들을 위해 리액트의 기본을 익히고 다양한 앱을 구현하는 데 부족함이 없도록 만들었습니다. \n\n자바스크립트 기초 지식이 부족해 리액트 공부를 망설이는 분, 프런트엔드 개발을 희망하는 취준생으로 리액트가 처음인 분, 퍼블리셔나 백엔드에서 프런트엔드로 직군 전환을 꾀하거나 업무상 리액트가 필요한 분, 뷰, 스벨트 등 다른 프레임워크를 쓰고 있는데, 실용적인 리액트를 배우고 싶은 분, 신입 개발자이지만 자바스크립트나 리액트 기초가 부족한 분에게 유용할 것입니다.",
  author: "이정환",
  publisher: "프로그래밍인사이트",
  coverImgUrl:
    "https://shopping-phinf.pstatic.net/main_3888828/38888282618.20230913071643.jpg",
};

// book\[id]
// 한개의 url 파라미터만 허용한다.(ex) book\1\2 은 안된다!)
// http://localhost:3000/book/1

//[...id]이면 한개이상의 파라미터도 허용한다.
// ex( ttp://localhost:3000/book/1/2)
// 단 url 파라미터가 한개도 없으면 404 에러
// *[[...id]] 이렇게 사용하면 없어도 에러 안남

//⏬generateStaticParams로 내보내진 url 파라미터가 [{ id: "1" }, { id: "2" }, { id: "3" }]; 이외에는 존재하지 말아야할 때 404페이지로 보내고 싶다면? 아래 한줄 적기
//export const dynamicParams = false;//🔥넥스트 서버가 자동으로 이 페이지를 생성할 때 dynamicParams 변수의 값을 내보내진 값을 확인하여 넥스트는 이 페이지의 파라미터는 다이나믹하면 안되구나 생각한다.
//                            기본값이 true이고, true면 작성 안하면 됨.

/*
  # generateStaticParams 함수
  - 정적으로 빌드 타임에 어떠한 url 파라미터가 존재할 수 있는지
  - 🔥어떤 도서가 빌드타임에 만들어져야 되는지 먼저 
*/
export function generateStaticParams() {
  // 🔥넥스트 서버가 자동으로 이 정적 파라미터를 읽어서 이 파라미터에 해당하는 북페이지를 빌드타임에 정적으로 만든다.
  //  ㄴ 🔥C:\Users\EM_NB163\OneDrive\문서\onebite-next\section03\.next\server\app\book 폴더에 1,2,3 페이지가 만들어진걸 볼 수 있다(또는 npm run build 콘솔창에 출력.)
  //  ㄴ ⭐서버측에 '풀 라우트 캐시'로 잘 보관된걸 알 수 있다.
  // 정적 페이지로 변경하기 위해서 사용, 속도 향상
  // (🔥이 외 페이지는 입력 안해도 원래는 동적 페이지니까 실시간으로 검색되서 잘 나옴.
  // ㄴ이때 해당페이지도 풀 라우트 캐시로써 잘 저장이 되고있다!!!! - 해당 페이지 다시 접속해도 빠르게 저장된 페이지를 보여준다.)
  // ㄴㄴ http://localhost:3000/book/10
  // ㄴㄴㄴ🔥불러온 해당 페이지를 다시 새로고침해보면 ex 65ms -> 9ms 밖에 안걸린다.
  // ㄴㄴㄴㄴㄴ 한번 요청된 페이지는 새롭게 요청해도 생성되지 않는다. 왜? 풀라우트 캐시에 저장되어서 (처음보다 빠르게 보여진다.)

  return [{ id: "1" }, { id: "2" }, { id: "3" }];
  // 주의할 점: 위에처럼 URL 파라미터의 값을 명시할 때에는 문자열로만, 문자열 데이터로만 명시해야 한다.
  // 🔥이제 해당 페이지 컴포넌트는 스태틱 페이지이다. 밑에 동적함수(fetch 및 캐시 사용 안한 함수)사용했지만 강제로 스태틱 페이지로 설정된다.
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string | string[] }>;
}) {
  const response = await fetch(
    // `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${(await params).id}`
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${(await params).id}`
  );
  //예외처리 필수
  if (!response.ok) {
    //사실상 보기에는 안 좋음. 데이터가 없다면 404 페이지를 보여주는게 훨씬 좋음.
    if (response.status === 404) {
      //백엔드 서버로부터 데이터가 현재 없다는 거니까 notFound함수를 사용하자.
      notFound(); //next/navigation
    }
    return <div>오류가 발생했습니다...</div>;
  }

  const book = await response.json();

  //하나의 도서의 데이터를 객체형태로 보관
  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    book;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        {/* 도서 커버 이미지 */}
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
