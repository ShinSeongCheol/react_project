import "./Signup.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const checkValidation = (formData) => {
  const result = {
    isSuccess: true,
    text: "",
  };

  // 데이터 입력확인
  for (let key of Object.keys(formData)) {
    if (!formData[key]) {
      result.isSuccess = false;

      if (key === "id") {
        result.text = "아이디를 입력해주세요!";
        break;
      } else if (key === "password") {
        result.text = "비밀번호를 입력해주세요!";
        break;
      } else if (key === "password_confirm") {
        result.text = "비밀번호 확인을 입력해주세요!";
        break;
      }
    }
  }

  return result;
};

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

    let { isSuccess, text } = checkValidation(formData);
    if (!isSuccess) {
      Swal.fire({
        icon: "warning",
        text,
        confirmButtonText: "확인",
      });
      return;
    }

    if (formData.password !== formData.password_confirm) {
      Swal.fire({
        icon: "warning",
        text: "입력한 비밀번호가 다릅니다!",
        confirmButtonText: "확인",
      });
      return;
    }

    sessionStorage.setItem("user", JSON.stringify(formData));
    Swal.fire({
      icon: "success",
      text: "회원가입 되었습니다!",
      confirmButtonText: "확인",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        nav("/login");
      }
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
