// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { useSupabaseAuth } from "../supabase";

// 로그인 관련 전역 상태를 담을 컨텍스트
const AuthContext = createContext(null);


// 실제로 상태를 만들고 <AutoContext.Provider>를 감싸주는 컴포넌트
export function AuthProvider({ children }) {
  const { getUserInfo } = useSupabaseAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 버그 방지용
    let ignore = false;

    const setupUser = async () => {
      try {
        // 1) Supabase에서 유저 정보 가져오기
        const res = await getUserInfo?.();

        // 2) 응답에서 user를 우선 사용
        let currentUser = res?.user;

        // 3) 없다면 localStorage에서 백업
        if (!currentUser) {
          const stored = localStorage.getItem("userInfo");
          if (stored) {
            try {
              const parsed = JSON.parse(stored);
              currentUser = parsed.user ?? parsed;
            } catch (e) {
              console.error("userInfo 파싱 실패", e);
            }
          }
        }

        if (!ignore) {
          setUser(currentUser || null);
        }
      } catch (e) {
        console.error("getUserInfo 에러", e);
        if (!ignore) {
          setUser(null);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    setupUser();

    return () => {
      ignore = true;
    };
  }, []);

  const value = { user, setUser, loading };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// useContext(AuthContext) 커스텀 훅
export function useAuthContext() {
  const ctx = useContext(AuthContext);
  // “AuthProvider로 안 감싸고 썼다” 는 버그를 바로 알려주려고 throw 추가
  if (!ctx) {
    throw new Error("useAuthContext는 AuthProvider 안에서만 사용해야 합니다.");
  }
  return ctx;
}
