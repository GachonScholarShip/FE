import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ManagerNavBar from "../../components/ManagerNavBar";
import SearchBar from "../../components/SearchBar";
import SaveButton from "../../components/SaveButton";
import styles from "./ClassroomManagementUpdatePage.module.css";

function ClassroomManagementUpdatePage() {
  const location = useLocation();
  const { roomName, courseName, professor, time, building, floor } =
    location.state || {};

  const [selectedBuilding, setSelectedBuilding] = useState(building || "");
  const [selectedFloor, setSelectedFloor] = useState(floor || "");

  const buildingFloors = {
    가천관: [
      "B2",
      "B1",
      "1F",
      "2F",
      "3F",
      "4F",
      "5F",
      "6F",
      "7F",
      "8F",
      "9F",
      "10F",
      "11F",
      "12F",
    ],
    공과대학1: ["B1", "1F", "2F", "3F", "4F", "5F", "6F", "7F"],
    공과대학2: ["1F", "2F", "3F", "4F", "5F", "6F"],
    교육대학원: ["B2", "B1", "1F", "2F", "3F", "4F", "5F", "6F"],
    글로벌센터: ["B1", "1F", "2F", "3F", "4F", "5F", "6F", "7F"],
    바이오나노연구원: ["B1", "1F", "2F", "3F", "4F", "5F"],
    바이오나노대학: ["1F", "2F", "3F", "4F", "5F"],
    반도체대학: ["B3", "B2", "B1", "1F", "2F", "3F", "4F", "5F", "6F"],
    법과대학: ["1F", "2F", "3F", "4F"],
    비전타워: [
      "B4",
      "B3",
      "B2",
      "B1",
      "1F",
      "2F",
      "3F",
      "4F",
      "5F",
      "6F",
      "7F",
    ],
    예술체육대학1: ["B1", "1F", "2F", "3F", "4F", "5F", "6F"],
    예술체육대학2: ["B1", "1F", "2F", "3F", "4F"],
    한의과대학: ["1F", "2F", "3F", "4F", "5F"],
  };

  const handleBuildingChange = (e) => {
    setSelectedBuilding(e.target.value);
    setSelectedFloor("");
  };

  const handleFloorChange = (e) => {
    setSelectedFloor(e.target.value);
  };

  return (
    <div>
      <ManagerNavBar />
      <div className={styles.bg}>
        <div className={styles.container}>
          <div className={styles.topBox}>
            <SearchBar placeholder="강의실을 입력해주세요" />
          </div>

          <div className={styles.bottomBox}>
            <div className={styles.title}>수정</div>
            <div className={styles.formContainer}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>강의실</label>
                  <input
                    type="text"
                    placeholder="강의실을 입력해주세요"
                    defaultValue={roomName}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>강의명</label>
                  <input
                    type="text"
                    placeholder="강의명을 입력해주세요"
                    defaultValue={courseName}
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>교수</label>
                  <input
                    type="text"
                    placeholder="교수명을 입력해주세요"
                    defaultValue={professor}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>시간</label>
                  <input
                    type="text"
                    placeholder="시간을 입력해주세요"
                    defaultValue={time}
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>건물명</label>
                  <select
                    value={selectedBuilding}
                    onChange={handleBuildingChange}
                    className={styles.select}
                  >
                    <option value="">건물을 선택해주세요</option>
                    {Object.keys(buildingFloors).map((building) => (
                      <option key={building} value={building}>
                        {building}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>층</label>
                  <select
                    value={selectedFloor}
                    onChange={handleFloorChange}
                    className={styles.select}
                    disabled={!selectedBuilding}
                  >
                    <option value="">층 수를 선택해주세요</option>
                    {selectedBuilding &&
                      buildingFloors[selectedBuilding]?.map((floor) => (
                        <option key={floor} value={floor}>
                          {floor}
                        </option>
                      ))}
                  </select>
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

export default ClassroomManagementUpdatePage;
