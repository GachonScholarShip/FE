import styles from "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function LoginPage() {
  const navigate = useNavigate();

  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    if (!loginId || !password) {
      setErrorMessage("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post(
        "http://110.15.135.250:8000/user-service/signin",
        {
          loginId: loginId,
          password: password,
        }
      );

      if (response.data.code === 200) {
        const role = response.data.data.role;

        if (role === "ADMIN") {
          navigate("/ua");
        } else if (role === "USER") {
          navigate("/main");
        } else {
          setErrorMessage("알 수 없는 사용자 유형입니다.");
        }
      } else {
        setErrorMessage("로그인 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("로그인 에러:", error);
      if (error.response && error.response.status === 500) {
        setErrorMessage("서버 오류가 발생했습니다. 관리자에게 문의하세요.");
      } else {
        setErrorMessage("아이디 또는 비밀번호를 다시 확인해주세요.");
      }
    }
  };

  return (
    <div>
      <div className={styles.bg} />

      <div className={styles.loginBox}>
        <h2 className={styles.title}>로그인</h2>

        <label className={styles.idpassword}>ID</label>
        <input
          type="text"
          placeholder="Enter ID"
          className={styles.input}
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
        />

        <label className={styles.idpassword}>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {errorMessage && <div className={styles.error}>{errorMessage}</div>}

        <button onClick={handleLogin} className={styles.loginButton}>
          로그인
        </button>

        <a href="/signup" className={styles.signup}>
          회원가입
        </a>
      </div>
    </div>
  );
}

export default LoginPage;
