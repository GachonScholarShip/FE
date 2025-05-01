import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ManagerNavBar from "../../components/ManagerNavBar";
import SearchBar from "../../components/SearchBar";
import SaveButton from "../../components/SaveButton";
import UserIcon from "../../assets/user.svg";
import styles from "./UserAccountUpdatePage.module.css";
import axios from "axios";
import { useLocation } from "react-router-dom";

function UserAccountUpdatePage() {
  const { userId } = useParams();
  const location = useLocation();
  const { state } = location;

  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: state?.name || "",
    gender: state?.gender || "",
    email: state?.email || "",
    studentId: state?.studentId || "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://110.15.135.250:8000/user-service/admin/user/${userId}`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsInJvbGUiOiJBRE1JTiIsInN1YiI6IkF1dGhvcml6YXRpb24iLCJpYXQiOjE3NDU0MTE3NzMsImV4cCI6MTc1NDA1MTc3M30.VBuP9Li37A7YGPTlv3Jc2dn8E1h6WK2CBOUTxi92cZU",
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data) {
          setUserData({
            name: response.data.name,
            gender: response.data.gender,
            email: response.data.email,
            studentId: response.data.studentId,
          });
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleUpdateUser = async () => {
    const updatedData = {
      userId: userId,
      username: userData.name,
      sex: userData.gender === "MALE" ? "MALE" : "FEMALE",
      email: userData.email,
      studentId: userData.studentId,
    };

    try {
      const response = await axios.patch(
        "http://110.15.135.250:8000/user-service/admin/user",
        updatedData,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsInJvbGUiOiJBRE1JTiIsInN1YiI6IkF1dGhvcml6YXRpb24iLCJpYXQiOjE3NDU0MTE3NzMsImV4cCI6MTc1NDA1MTc3M30.VBuP9Li37A7YGPTlv3Jc2dn8E1h6WK2CBOUTxi92cZU",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.code === 200) {
        alert("사용자 정보가 수정되었습니다.");
        navigate("/ua");
      }
    } catch (error) {
      setError("사용자 정보를 수정하는데 실패했습니다.");
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      }
    }
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

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
                        <option value="MALE">남</option>
                        <option value="FEMALE">여</option>
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
            {error && <div className={styles.error}>{error}</div>}{" "}
            <div className={styles.savebuttonContainer}>
              <SaveButton onClick={handleUpdateUser} />{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserAccountUpdatePage;
