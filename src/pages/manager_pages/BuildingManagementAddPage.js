import React, { useState } from "react";
import ManagerNavBar from "../../components/ManagerNavBar";
import SearchBar from "../../components/SearchBar";
import SaveButton from "../../components/SaveButton";
import styles from "./BuildingManagementAddPage.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function BuildingManagementAddPage() {
  const navigate = useNavigate();

  const [buildingName, setBuildingName] = useState("");
  const [isPublic, setIsPublic] = useState("");
  const [topFloor, setTopFloor] = useState("");
  const [bottomFloor, setBottomFloor] = useState("");

  const handleBuildingNameChange = (e) => setBuildingName(e.target.value);
  const handleIsPublicChange = (e) => setIsPublic(e.target.value);
  const handleTopFloorChange = (e) => setTopFloor(e.target.value);
  const handleBottomFloorChange = (e) => setBottomFloor(e.target.value);

  const handleSaveClick = async () => {
    if (!buildingName || !isPublic || !topFloor || !bottomFloor) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    const data = {
      buildingName,
      topFloor: parseInt(topFloor, 10),
      bottomFloor: parseInt(bottomFloor, 10),
      isPublic: isPublic === "가능",
    };

    try {
      const response = await axios.post(
        "http://110.15.135.250:8000/building-service/admin/building",
        data,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsInJvbGUiOiJBRE1JTiIsInN1YiI6IkF1dGhvcml6YXRpb24iLCJpYXQiOjE3NDU0MTEzMjUsImV4cCI6MTc1NDA1MTMyNX0.V0RNqeCd4j7XznWD6c5x1wVhf4QNwoXGKhgWa2C5rJs`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.code === 201) {
        alert("건물 생성 성공");
        navigate("/bm");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        alert("에러: " + error.response.data.message);
      } else {
        alert("건물 추가 중 오류 발생");
      }
    }
  };

  return (
    <div>
      <ManagerNavBar />
      <div className={styles.bg}>
        <div className={styles.container}>
          <div className={styles.topBox}>
            <SearchBar placeholder="건물명을 입력해주세요" />
          </div>

          <div className={styles.bottomBox}>
            <div className={styles.title}>건물 추가</div>
            <div className={styles.formContainer}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>건물명</label>
                  <select
                    className={styles.select}
                    value={buildingName}
                    onChange={handleBuildingNameChange}
                  >
                    <option value="">건물을 선택해주세요</option>
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
                  <label>이용 가능 여부</label>
                  <select
                    className={styles.select}
                    value={isPublic}
                    onChange={handleIsPublicChange}
                  >
                    <option value="">선택해주세요</option>
                    <option value="가능">가능</option>
                    <option value="불가능">불가능</option>
                  </select>
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>최고층</label>
                  <input
                    type="text"
                    placeholder="최고층을 입력해주세요"
                    value={topFloor}
                    onChange={handleTopFloorChange}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>최하층</label>
                  <input
                    type="text"
                    placeholder="최하층을 입력해주세요"
                    value={bottomFloor}
                    onChange={handleBottomFloorChange}
                  />
                </div>
              </div>
            </div>

            <div className={styles.savebuttonContainer}>
              <SaveButton onClick={handleSaveClick} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuildingManagementAddPage;
