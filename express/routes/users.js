var express = require("express");
var router = express.Router();
const pool = require("../database/pool");

router.post("/login", (req, res) => {
  const result = {
    isSuccess: false,
    message: "",
  };

  pool.getConnectionPool((conn) => {
    const sql =
      "SELECT id, password FROM app.Users WHERE id = ? AND password = ?";
    const params = [req.body.id, req.body.password];
    conn.query(sql, params, (err, row) => {
      if (err) {
        result.message = "로그인 실패했습니다.";
        return res.send(result);
      }

      if (row.length == 0) {
        result.message = "아이디와 비밀번호를 확인해주세요!";
        return res.send(result);
      }

      result.isSuccess = true;
      result.message = "로그인 성공!"
      return res.send(result);
    });
    conn.release();
  });
});

router.post("/register", (req, res) => {
  const result = {
    isSuccess: false,
    message: "",
  };

  // 데이터 입력확인
  for (let key of Object.keys(req.body)) {
    if (!req.body[key]) {
      if (key === "id") {
        result.message = "아이디를 입력해주세요!";
        return res.send(result);
      } else if (key === "password") {
        result.message = "비밀번호를 입력해주세요!";
        return res.send(result);
      } else if (key === "password_confirm") {
        result.message = "비밀번호 확인을 입력해주세요!";
        return res.send(result);
      }
    }
  }

  // 비밀번호 똑같은지 확인
  if (req.body.password !== req.body.password_confirm) {
    result.message = "입력한 비밀번호가 다릅니다!";
    return res.send(result);
  }

  pool.getConnectionPool((conn) => {
    const sql = "INSERT INTO app.Users (id, password) VALUES(?, ?)";
    const params = [req.body.id, req.body.password];
    conn.query(sql, params, (err, row) => {
      if (err) {
        if (err.code == "ER_DUP_ENTRY") {
          result.message = "아이디가 이미 존재합니다!";
        }
        return res.send(result);
      }
      result.isSuccess = true;
      result.message = "회원가입 되었습니다!";
      return res.send(result);
    });
    conn.release();
  });
});

module.exports = router;
