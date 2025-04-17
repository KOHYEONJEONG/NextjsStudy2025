"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation"; //App 라우터를 사용하기에 next/navigation로 import해주기
import style from "./serachbar.module.css";

export default function Searchbar() {
  const router = useRouter();
  const searchParams = useSearchParams(); //nextjs가 제공하는 hook, 쿼리스트링을 빼올 수 있음.
  const [search, setSearch] = useState("");

  const q = searchParams.get("q");

  useEffect(() => {
    setSearch(q || "");
  }, [q]); //쿼리스트링 q의 값이 변할 때마다 setSearch 함수를 호출해서 SearchState의 값을 현재의 쿼리스트링 값으로 업데이트

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    if (!search || q === search) return; //검색어가 변경되지 않았으면 추가적인 검색 작업이 불필요하여 예외처리
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
