import styles from "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/main");
  };

  return (
    <div>
      <div className={styles.bg} />

      <div className={styles.loginBox}>
        <h2 className={styles.title}>로그인</h2>
        <label className={styles.idpassword}>ID</label>
        <input type="text" placeholder="Enter ID" className={styles.input} />
        <label className={styles.idpassword}>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          className={styles.input}
        />
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
