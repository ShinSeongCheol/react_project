import "./Signup.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const Signup = () => {
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    id: "",
    password: "",
    password_confirm: "",
  });

  const onChangeForm = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmitForm = (e) => {
    e.preventDefault();

    axios
      .post(`${location.protocol}//${location.hostname}:3000/users/register`, {
        ...formData,
      })
      .then((res) => {
        if (!res.data.isSuccess) {
          Swal.fire({
            icon: "warning",
            text: res.data.message,
            confirmButtonText: "확인",
          });
          return;
        } else {
          Swal.fire({
            icon: "success",
            text: res.data.message,
            confirmButtonText: "확인",
            allowOutsideClick: false,
          }).then((result) => {
            if (result.isConfirmed) {
              nav("/login");
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="Signup">
      <form className="signup_form" onSubmit={onSubmitForm}>
        <h4>회원가입</h4>
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
        <input
          type="password"
          name="password_confirm"
          placeholder="비밀번호 확인"
          onChange={onChangeForm}
        />
        <button type="submit">회원가입</button>
        <button
          type="button"
          onClick={() => {
            nav(-1);
          }}
        >
          뒤로가기
        </button>
      </form>
    </div>
  );
};

export default Signup;
