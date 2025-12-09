import { useState } from "react";
import FormInput from "../component/FormInput";
import { useSupabaseAuth } from "../supabase";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const nameReg = /^[가-힣a-zA-Z0-9]{2,8}$/;
const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// 8자 이상, 대문자/소문자/숫자 포함
const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

function SignupPage() {
  const [ form, setForm ] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: ""
  });

  const[errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: ""    
  })

  const [serverError, setServerError] = useState("")

  const { signUp } = useSupabaseAuth();
  const { setUser } = useAuthContext()
  const navigate = useNavigate()

  const handleChange = (field) => (e) => {
    const value = e.target.value;

    setForm((prev) => ({ ...prev, [field]: value}));
  };

  const validate = () => {
    const newErrors = {
      name: "",
      email: "",
      password: "",
      passwordConfirm: ""        
    }

    if (!form.name) {
      newErrors.name = "이름을 입력해주세요.";
    } else if (!nameReg.test(form.name)) {
      newErrors.name = "2~8자, 숫자/한글/영어만 사용 가능합니다.";
    }

    // 이메일
    if (!form.email) {
      newErrors.email = "이메일을 입력해주세요.";
    } else if (!emailReg.test(form.email)) {
      newErrors.email = "이메일 형식으로 작성해주세요.";
    }

    // 비밀번호
    if (!form.password) {
      newErrors.password = "비밀번호를 입력해주세요.";
    } else if (!passwordReg.test(form.password)) {
      newErrors.password =
        "영문 대문자/소문자 + 숫자 조합, 8자 이상이어야 합니다.";
    }

    // 비밀번호 확인
    if (!form.passwordConfirm) {
      newErrors.passwordConfirm = "비밀번호 확인을 입력해주세요.";
    } else if (form.password !== form.passwordConfirm) {
      newErrors.passwordConfirm = "비밀번호가 일치하지 않습니다.";
    }

    setErrors(newErrors);
    
    // 하나의 에러도 없으면 true
    return Object.values(newErrors).every((v) => v === "")
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("")

    if (!validate()) return;

    const { email, password, name } = {
      email: form.email,
      password: form.password,
      name: form.name,
    }

    const res = await signUp({
      email,
      password,
      userName: name,
    });

    if (res.error) {
      setServerError(res.error.message || "회원가입에 실패했습니다.");
      return;
    }

    // 성공: 전역 상태 업데이트 + 메인 페이지로 이동
    setUser(res.user);
    navigate("/");
  }

  return (
    <section className="auth-page">
      <h2 className="auth-title">회원가입</h2>

      <form className="auth-form" onSubmit={handleSubmit}>
        <FormInput
          id="name"
          label="이름"
          value={form.name}
          placeholder="2~8자, 숫자, 한글, 영어만 사용"
          onChange={handleChange("name")}
          error={errors.name}
        />

        <FormInput
          id="email"
          label="이메일"
          type="email"
          value={form.email}
          placeholder="example@oz.com"
          onChange={handleChange("email")}
          error={errors.email}
        />

        <FormInput
          id="password"
          label="비밀번호"
          type="password"
          value={form.password}
          placeholder="영문 대/소문자 + 숫자 조합, 8자 이상"
          onChange={handleChange("password")}
          error={errors.password}
        />

        <FormInput
          id="passwordConfirm"
          label="비밀번호 확인"
          type="password"
          value={form.passwordConfirm}
          placeholder="비밀번호를 한 번 더 입력해주세요"
          onChange={handleChange("passwordConfirm")}
          error={errors.passwordConfirm}
        />

        {serverError && <p className="form-error">{serverError}</p>}

        <button type="submit" className="auth-submit">
          회원가입
        </button>
      </form>
    </section>
  );
}

export default SignupPage;