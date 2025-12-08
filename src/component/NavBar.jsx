import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";

export default function NavBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [search, setSearch] = useState(query);
  const debouncedSearch = useDebounce(search, 500);

  // 디바운스된 값이 바뀔 때마다 URL 쿼리 업데이트
  useEffect(() => {
    if (debouncedSearch) {
      setSearchParams({ query: debouncedSearch }, { replace: true });
    } else {
      setSearchParams({});
    }
  }, [debouncedSearch, setSearchParams]);

  return (
    <nav className="navbar">
      <h1>
        <Link to="/">Movies</Link>
      </h1>
      
      <input
        type="text"
        placeholder="제목"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="buttons">
        <button>로그인</button>
        <button>회원가입</button>
      </div>
    </nav>
  );
}
