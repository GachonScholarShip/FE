import styles from "./SignUpPage.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "../components/Popup";
import axios from "axios";

function SignUpPage() {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [idMessage, setIdMessage] = useState("");
  const [studentMessage, setStudentMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSignUp = async () => {
    console.log("회원가입 시도:", {
      userId,
      studentId,
      password,
      confirmPassword,
      gender,
      name,
      email,
    });

    if (password !== confirmPassword) {
      setPasswordMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (idMessage.includes("중복된") || studentMessage.includes("중복된")) {
      setShowPopup(true);
      return;
    }

    try {
      const response = await axios.post(
        "http://110.15.135.250:8000/user-service/signup",
        {
          username: name,
          email: email,
          password: password,
          studentId: studentId,
          sex: gender.toUpperCase(),
          loginId: userId,
        }
      );

      if (response.data.code === 200) {
        setSuccessMessage("회원가입이 완료되었습니다!");
        setShowPopup(true);
      } else {
        alert("회원가입에 실패했습니다.");
      }
    } catch (error) {
      console.error("서버 응답:", error.response.data);

      if (error.response.data.message.includes("이미 존재하는 ID")) {
        setIdMessage("중복된 아이디입니다.");
        setShowPopup(true);
      } else if (error.response.data.message.includes("이미 존재하는 학번")) {
        setStudentMessage("중복된 학번입니다.");
        setShowPopup(true);
      } else {
        alert("회원가입 요청 중 에러가 발생했습니다.");
      }
    }
  };

  const checkId = async () => {
    if (!userId) {
      setIdMessage("아이디를 입력해주세요.");
      return;
    }

    try {
      const response = await axios.get(
        `http://110.15.135.250:8000/user-service/normal/login_id/${userId}`
      );

      if (response.data.data) {
        setIdMessage("사용 가능한 아이디입니다.");
      } else {
        setIdMessage("중복된 아이디입니다.");
      }
    } catch (error) {
      console.error("아이디 중복 확인 오류:", error);
      setIdMessage("아이디 중복 확인 중 오류가 발생했습니다.");
    }
  };

  const checkStudentId = async () => {
    if (!studentId) {
      setStudentMessage("학번을 입력해주세요.");
      return;
    }

    try {
      const response = await axios.get(
        `http://110.15.135.250:8000/user-service/normal/student_id/${studentId}`
      );

      if (response.data.data) {
        setStudentMessage("사용 가능한 학번입니다.");
      } else {
        setStudentMessage("중복된 학번입니다.");
      }
    } catch (error) {
      console.error("학번 중복 확인 오류:", error);
      setStudentMessage("학번 중복 확인 중 오류가 발생했습니다.");
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    checkPassword(newPassword, confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    checkPassword(password, newConfirmPassword);
  };

  const checkPassword = (pw, confirmPw) => {
    if (pw === confirmPw) {
      setPasswordMessage("비밀번호가 일치합니다.");
    } else {
      setPasswordMessage("비밀번호가 일치하지 않습니다.");
    }
  };

  const getIdMessageColor = () => {
    return idMessage.includes("중복된") ? styles.error : styles.success;
  };

  const getStudentMessageColor = () => {
    return studentMessage.includes("중복된") ? styles.error : styles.success;
  };

  const getPasswordMessageColor = () => {
    return passwordMessage.includes("일치하지") ? styles.error : styles.success;
  };

  return (
    <div>
      <div className={styles.bg} />

      <div className={styles.signupBox}>
        <h2 className={styles.title}>회원가입</h2>

        <label className={styles.idpassword}>아이디</label>
        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="아이디"
            className={styles.input}
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <button onClick={checkId} className={styles.checkButton}>
            중복 확인
          </button>
        </div>
        {idMessage && (
          <a className={`${styles.idpassword} ${getIdMessageColor()}`}>
            {idMessage}
          </a>
        )}

        <label className={styles.idpassword}>비밀번호</label>
        <input
          type="password"
          placeholder="비밀번호 입력"
          className={styles.input}
          value={password}
          onChange={handlePasswordChange}
        />
        <input
          type="password"
          placeholder="비밀번호 재입력"
          className={styles.input2}
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        {passwordMessage && (
          <a className={`${styles.idpassword} ${getPasswordMessageColor()}`}>
            {passwordMessage}
          </a>
        )}

        <label className={styles.idpassword}>이름</label>
        <input
          type="text"
          placeholder="이름 입력"
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label className={styles.idpassword}>학번</label>
        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="학번 입력"
            className={styles.input}
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
          <button onClick={checkStudentId} className={styles.checkButton}>
            중복 확인
          </button>
        </div>
        {studentMessage && (
          <a className={`${styles.idpassword} ${getStudentMessageColor()}`}>
            {studentMessage}
          </a>
        )}

        <label className={styles.idpassword}>이메일</label>
        <input
          type="text"
          placeholder="이메일 입력"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className={styles.idpassword}>성별</label>
        <div className={styles.genderGroup}>
          <label className={styles.gender}>
            <input
              type="radio"
              name="gender"
              value="male"
              onChange={(e) => setGender(e.target.value)}
            />
            남성
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              onChange={(e) => setGender(e.target.value)}
            />
            여성
          </label>
        </div>

        <button onClick={handleSignUp} className={styles.signupButton}>
          가입하기
        </button>

        {showPopup && (
          <Popup
            message={
              successMessage ||
              (idMessage.includes("중복된") || studentMessage.includes("중복된")
                ? "중복된 내용이 있습니다!"
                : "입력란에 내용을 모두 기입해주세요!")
            }
            onClose={() => {
              setShowPopup(false);
              if (successMessage) {
                setSuccessMessage("");
                navigate("/");
              }
            }}
            isSuccess={!!successMessage}
          />
        )}
      </div>
    </div>
  );
}

export default SignUpPage;
