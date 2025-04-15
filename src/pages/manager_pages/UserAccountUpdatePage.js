import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ManagerNavBar from "../../components/ManagerNavBar";
import SearchBar from "../../components/SearchBar";
import SaveButton from "../../components/SaveButton";
import UserIcon from "../../assets/user.svg";
import styles from "./UserAccountUpdatePage.module.css";

function UserAccountUpdatePage() {
  const { userId } = useParams();

  const [userData, setUserData] = useState({
    name: "",
    gender: "",
    email: "",
    studentId: "",
  });

  useEffect(() => {
    const users = [
      {
        baseId: 1,
        name: "홍길동",
        gender: "남",
        email: "fsjdjf@gmail.com",
        studentId: "202001",
      },
      {
        baseId: 2,
        name: "김철수",
        gender: "남",
        email: "kimchulsoo@gmail.com",
        studentId: "202002",
      },
      {
        baseId: 3,
        name: "이영희",
        gender: "여",
        email: "leeyounghee@gmail.com",
        studentId: "202003",
      },
    ];

    const user = users.find((user) => user.baseId === parseInt(userId));
    if (user) {
      setUserData({
        name: user.name,
        gender: user.gender,
        email: user.email,
        studentId: user.studentId,
      });
    }
  }, [userId]);

  return (
    <div>
      <ManagerNavBar />
      <div className={styles.bg}>
        <div className={styles.container}>
          <div className={styles.topBox}>
            <SearchBar placeholder="사용자를 입력해주세요" />
          </div>

          <div className={styles.bottomBox}>
            <div className={styles.title}>수정</div>
            <div className={styles.formContainer}>
              <div className={styles.iconAndFormRow}>
                <div className={styles.userIcon}>
                  <img
                    src={UserIcon}
                    alt="사용자 아이콘"
                    className={styles.userIconImg}
                  />
                </div>
                <div className={styles.inforForm}>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>사용자 이름</label>
                      <input
                        type="text"
                        value={userData.name}
                        placeholder="이름을 입력해주세요"
                        onChange={(e) =>
                          setUserData({ ...userData, name: e.target.value })
                        }
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label>성별</label>
                      <select
                        className={styles.select}
                        value={userData.gender}
                        onChange={(e) =>
                          setUserData({ ...userData, gender: e.target.value })
                        }
                      >
                        <option value="">성별을 선택해주세요</option>
                        <option value="남">남</option>
                        <option value="여">여</option>
                      </select>
                    </div>
                  </div>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Email</label>
                      <input
                        type="text"
                        value={userData.email}
                        placeholder="Email을 입력해주세요"
                        onChange={(e) =>
                          setUserData({ ...userData, email: e.target.value })
                        }
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label>학번</label>
                      <input
                        type="text"
                        value={userData.studentId}
                        placeholder="학번을 입력해주세요"
                        onChange={(e) =>
                          setUserData({
                            ...userData,
                            studentId: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.savebuttonContainer}>
              <SaveButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserAccountUpdatePage;
