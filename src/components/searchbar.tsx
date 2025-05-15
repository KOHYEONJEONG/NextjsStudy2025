"use client"; //클라이언트 컴포넌트

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation"; //App 라우터를 사용하기에 next/navigation로 import해주기
import style from "./serachbar.module.css";

export default function Searchbar() {
  //사용자 입력이 필요한 상호작용(입력이나 이벤트)이 필요한 컴포넌트.
  const router = useRouter();
  const searchParams = useSearchParams(); //동적함수사용, 비동기함수, nextjs가 제공하는 hook, 쿼리스트링을 빼올 수 있음.
  const [search, setSearch] = useState("");

  const q = searchParams.get("q");

  useEffect(() => {
    setSearch(q || ""); //q가 falsy 값(거짓으로 평가되는 값)이면 ""(빈 문자열)을 반환
    /**
     * falsy 값이란:
     * null
     * undefined
     * "" (빈 문자열)
     * 0
     * NaN
    false
 */
  }, [q]); //쿼리스트링 q의 값이 변할 때마다 setSearch 함수를 호출해서 SearchState의 값을 현재의 쿼리스트링 값으로 업데이트

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    if (!search || q === search) return; //검색어가 변경되지 않았으면 추가적인 검색 작업이 '불필요'하여 예외처리

    // \search\page.tsx 실행
    router.push(`/search?q=${search}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div className={style.container}>
      <input value={search} onChange={onChangeSearch} onKeyDown={onKeyDown} />
      <button onClick={onSubmit}>검색</button>
    </div>
  );
}
