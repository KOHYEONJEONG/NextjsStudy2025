"use client"; //클라이언트 컴포넌트 명시
import { useState } from "react";
import { useRouter } from "next/navigation";

// 사용자의 입력값을 보관하는 [상호작용] 기능이 존재하는 클라이언트 컴포넌트.
export default function Searchbar() {
  const router = useRouter();
  const [search, setSearch] = useState(""); //tsx 초기값 없으면 setSearch(e.target.value)에러남

  //입력 받는 기능
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    router.push(`/search?q=${search}`);
  };

  return (
    <div>
      <input onChange={onChangeSearch} />
      <button onClick={onSubmit}>검색</button>
    </div>
  );
}
