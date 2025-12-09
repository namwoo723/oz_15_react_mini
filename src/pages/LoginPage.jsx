import { useState } from "react";
import FormInput from "../component/FormInput";
import { Link } from "react-router-dom";

const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function LoginPage() {
  const [form, setForm] = useState({ email: "", password: ""})
  const [errors, setErrors] =useState({ email: "", password: ""});

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const validate = () => {
    const newErrors = { email: "", password: ""}

    if (!form.email) {
      newErrors.email = "이메일을 입력해주세요.";
    } else if (!emailReg.test(form.email)) {
      newErrors.email = "올바른 이메일 양식으로 입력해주세요.";
    }

    if (!form.password) {
      newErrors.password = "비밀번호를 입력해주세요.";
    } else if (form.password.length < 8) {
      newErrors.password = "비밀번호는 8자 이상이어야 합니다.";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every(v => v === "")
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!validate()) return;

    console.log("로그인 시도", form);
    alert("로그인 요청 전송 (콘솔 확인)");
  }

  return (
    <section className="auth-page">
      <h2 className="auth-title">로그인</h2>

      <form className="auth-form" onSubmit={handleSubmit}>
        <FormInput
          id="login-email"
          label="이메일"
          type="email"
          value={form.email}
          placeholder="이메일을 입력해주세요"
          onChange={handleChange("email")}
          error={errors.email}
        />

        <FormInput
          id="login-password"
          label="비밀번호"
          type="password"
          value={form.password}
          placeholder="비밀번호를 입력해주세요"
          onChange={handleChange("password")}
          error={errors.password}
        />

        <button type="submit" className="auth-submit">
          로그인
        </button>
      </form>

      <p className="auth-helper">
        Movie가 처음이신가요?{" "}
        <Link to="/signup" className="auth-link">
          간편 가입
        </Link>
      </p>
    </section>
  );
}

export default LoginPage;
