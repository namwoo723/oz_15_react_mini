// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { useSupabaseAuth } from "../supabase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { getUserInfo } = useSupabaseAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuthContext는 AuthProvider 안에서만 사용해야 합니다.");
  }
  return ctx;
}
