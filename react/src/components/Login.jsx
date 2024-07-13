import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const Login = () => {
  const nav = useNavigate();
  const [formData, setFormData] = useState({ id: "", password: "" });

  const onChangeForm = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmitForm = (e) => {
    e.preventDefault();

    axios
      .post(`${location.protocol}//${location.hostname}:3000/users/login`, {
        ...formData,
      })
      .then((result) => {
        console.log(result.data);
        if (result.data.isSuccess) {
          Swal.fire({
            icon: "success",
            text: result.data.message,
            confirmButtonText: "확인",
          });
        } else {
          Swal.fire({
            icon: "error",
            text: result.data.message,
            confirmButtonText: "확인",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
