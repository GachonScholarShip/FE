import React, { useState } from "react";
import ManagerNavBar from "../../components/ManagerNavBar";
import SaveButton from "../../components/SaveButton";
import styles from "./RoadviewManagementAddPage.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RoadviewManagementAddPage() {
  const [selectedName, setSelectedName] = useState("");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSaveClick = async () => {
    if (!selectedName || !url) {
      alert("목적지와 URL을 모두 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post(
        "http://110.15.135.250:8000/movement-service/admin/road_view",
        {
          endPoint: selectedName,
          url: url,
        },
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsInJvbGUiOiJBRE1JTiIsInN1YiI6IkF1dGhvcml6YXRpb24iLCJpYXQiOjE3NDU0MTE3NzMsImV4cCI6MTc1NDA1MTc3M30.VBuP9Li37A7YGPTlv3Jc2dn8E1h6WK2CBOUTxi92cZU",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.code === 200) {
        setMessage(response.data.message);
        alert(response.data.message);
        navigate("/rvm");
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        console.error("Error:", error);
        alert("서버에 연결할 수 없습니다.");
      }
    }
  };

  return (
    <div>
      <ManagerNavBar />
      <div className={styles.bg}>
        <div className={styles.container}>
          <div className={styles.Box}>
            <div className={styles.title}>추가</div>
            <div className={styles.formContainer}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>목적지</label>
                  <select
                    className={styles.select}
                    value={selectedName}
                    onChange={(e) => setSelectedName(e.target.value)}
                  >
                    <option value="">목적지를 선택해주세요</option>
                    <option value="가천관">가천관</option>
                    <option value="공과대학1">공과대학1</option>
                    <option value="공과대학2">공과대학2</option>
                    <option value="교육대학원">교육대학원</option>
                    <option value="글로벌센터">글로벌센터</option>
                    <option value="바이오나노연구원">바이오나노연구원</option>
                    <option value="바이오나노대학">바이오나노대학</option>
                    <option value="반도체대학">반도체대학</option>
                    <option value="법과대학">법과대학</option>
                    <option value="비전타워">비전타워</option>
                    <option value="예술체육대학1">예술체육대학1</option>
                    <option value="예술체육대학2">예술체육대학2</option>
                    <option value="한의과대학">한의과대학</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>네이버 지도 URL (URL 단축 서비스 이용)</label>
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="URL을 입력해주세요"
                  />
                </div>
              </div>
            </div>
            <div className={styles.savebuttonContainer}>
              <SaveButton onClick={handleSaveClick} />{" "}
            </div>
            {message && <div className={styles.message}>{message}</div>}{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoadviewManagementAddPage;
