import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ManagerNavBar from "../../components/ManagerNavBar";
import SaveButton from "../../components/SaveButton";
import styles from "./RoadManagementUpdatePage.module.css";
import axios from "axios";

function RoadManagementUpdatePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, url, name } = location.state || {};

  const [selectedName, setSelectedName] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const destinations = [
    "가천관",
    "공과대학1",
    "공과대학2",
    "교육대학원",
    "글로벌센터",
    "바이오나노연구원",
    "바이오나노대학",
    "반도체대학",
    "법과대학",
    "비전타워",
    "예술체육대학1",
    "예술체육대학2",
    "한의과대학",
  ];

  useEffect(() => {
    if (name) {
      setSelectedName(name);
    }
    if (url) {
      setNewUrl(url);
    }
  }, [name, url]);

  if (!id) {
    navigate("/rm");
    return null;
  }

  const handleSave = async () => {
    if (!selectedName || !newUrl) {
      alert("목적지와 URL을 모두 입력해주세요.");
      return;
    }

    const data = {
      id: id,
      endPoint: selectedName,
      url: newUrl,
    };

    try {
      const response = await axios.patch(
        `http://110.15.135.250:8000/movement-service/admin/direction`,
        data,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsInJvbGUiOiJBRE1JTiIsInN1YiI6IkF1dGhvcml6YXRpb24iLCJpYXQiOjE3NDU0MTE3NzMsImV4cCI6MTc1NDA1MTc3M30.VBuP9Li37A7YGPTlv3Jc2dn8E1h6WK2CBOUTxi92cZU",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.code === 200) {
        alert("성공적으로 수정되었습니다.");
        navigate("/rm");
      } else {
        alert("수정에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("수정 실패:", error);

      if (error.response) {
        console.error("응답 데이터 오류:", error.response.data);
        alert(`수정에 실패했습니다: ${error.response.data.message}`);
      } else {
        alert("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <div>
      <ManagerNavBar />
      <div className={styles.bg}>
        <div className={styles.container}>
          <div className={styles.Box}>
            <div className={styles.title}>수정</div>
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
                    {destinations.map((destination, index) => (
                      <option key={index} value={destination}>
                        {destination}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>네이버 지도 URL (URL 단축 서비스 이용)</label>
                  <input
                    type="text"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className={styles.savebuttonContainer}>
              <SaveButton onClick={handleSave} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoadManagementUpdatePage;
