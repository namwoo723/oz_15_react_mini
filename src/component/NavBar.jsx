import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";
import { useSupabaseAuth } from "../supabase";
import { useAuthContext } from "../context/AuthContext";
import Button from "./Button";

export default function NavBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const [search, setSearch] = useState(query);
  const debouncedSearch = useDebounce(search, 500);

  const { logout } = useSupabaseAuth();
  // 로그아웃시, 전역에서 로그아웃 상태로 UI가 바뀌도록 해주는 것.
  const { user, setUser } = useAuthContext();
  //이미지 드롭다운 메뉴(마이페이지/로그아웃)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (debouncedSearch) {
      setSearchParams({ query: debouncedSearch });
    } else {
      setSearchParams({});
    }
  }, [debouncedSearch, setSearchParams]);

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setIsMenuOpen(false);
  };
  // 로그인 여부 불리언
  const isLoggedIn = !!user;

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

      <div className="navbar-right">
        {isLoggedIn ? (
          <div
            className="profile-wrapper"
            onMouseEnter={() => setIsMenuOpen(true)}
            onMouseLeave={() => setIsMenuOpen(false)}
          >
            <button
              type="button" 
              className="profile-thumbnail"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <span className="profile-initial">
                {user.userName?.[0] || "U"}
              </span>
            </button>

            {isMenuOpen && (
              <div className="profile-menu">
                <span className="profile-menu-item">{user.userName} 님</span>
                <div className="profile-menu-item">
                  마이 페이지
                </div>
                <button
                  type="button"
                  className="profile-menu-item"
                  onClick={handleLogout}
                >
                  로그아웃
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="buttons">
            <Link to="/login">
              <Button variant="outline">로그인</Button>
            </Link>
            <Link to="/signup">
              <Button>회원가입</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
