import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import ManagerNavBar from "../../components/ManagerNavBar";
import SaveButton from "../../components/SaveButton";
import styles from "./RoadviewManagementUpdatePage.module.css";

function RoadviewManagementUpdatePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, url, baseId } = location.state || {};

  const [endPoint, setEndPoint] = useState(id || "");
  const [naverUrl, setNaverUrl] = useState(url || "");

  if (!baseId) {
    console.error("baseId가 null입니다. 제대로 전달되지 않았습니다.");
    alert("로드뷰 수정 페이지로 이동할 수 없습니다. 다시 시도해주세요.");
    navigate("/rvm");
    return null;
  }

  const handleSave = async () => {
    try {
      const requestBody = {
        roadViewId: baseId,
        endPoint: endPoint,
        url: naverUrl,
      };

      const response = await axios.patch(
        "http://110.15.135.250:8000/movement-service/admin/road_view",
        requestBody,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsInJvbGUiOiJBRE1JTiIsInN1YiI6IkF1dGhvcml6YXRpb24iLCJpYXQiOjE3NDU0MTE3NzMsImV4cCI6MTc1NDA1MTc3M30.VBuP9Li37A7YGPTlv3Jc2dn8E1h6WK2CBOUTxi92cZU", // Bearer Token 확인
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.code === 200) {
        alert("로드뷰 정보가 성공적으로 수정되었습니다.");
        navigate("/rvm");
      } else {
        alert("수정에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("로드뷰 수정 실패:", error);

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
                  <input
                    type="text"
                    value={endPoint}
                    onChange={(e) => setEndPoint(e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>네이버 지도 URL (URL 단축 서비스 이용)</label>
                  <input
                    type="text"
                    value={naverUrl}
                    onChange={(e) => setNaverUrl(e.target.value)}
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

export default RoadviewManagementUpdatePage;
