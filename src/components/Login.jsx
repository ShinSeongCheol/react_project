import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const nav = useNavigate();
  const [formData, setFormData] = useState({ id: "", password: "" });

  const onChangeForm = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmitForm = (e) => {
    e.preventDefault();

    sessionStorage.getItem("user");

    const { id, password } = sessionStorage.getItem("user")
      ? JSON.parse(sessionStorage.getItem("user"))
      : { id: null, password: null };

    if (formData.id === id && formData.password === password) {
      Swal.fire({
        icon: "success",
        text: "로그인 성공했습니다!",
        confirmButtonText: "확인",
      });
    } else {
      Swal.fire({
        icon: "error",
        text: "아이디와 비밀번호를 확인해주세요!",
        confirmButtonText: "확인",
      });
    }
  };

  return (
    <div className="Login">
      <form className="login_form" onSubmit={onSubmitForm}>
        <h4>로그인</h4>
        <input
          type="text"
          name="id"
          placeholder="아이디"
          onChange={onChangeForm}
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          onChange={onChangeForm}
        />
        <button type="submit">로그인</button>
        <div className="login_nav">
          <button
            type="button"
            onClick={() => {
              nav("/signup");
            }}
          >
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
