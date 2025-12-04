import { Link } from "react-router-dom";

export default function NavBar () {
  return (
    <nav className="navbar">
      <h1>
        <Link to="/" >Namflix</Link> 
      </h1>
      <input type="text"/>
      <button>로그인</button>
      <button>회원가입</button>
    </nav>
  )
}