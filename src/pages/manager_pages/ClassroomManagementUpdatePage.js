import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ManagerNavBar from "../../components/ManagerNavBar";
import SearchBar from "../../components/SearchBar";
import SaveButton from "../../components/SaveButton";
import styles from "./ClassroomManagementUpdatePage.module.css";
import axios from "axios";

function ClassroomManagementUpdatePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    id,
    roomName,
    title,
    professor,
    courseTime,
    buildingName,
    floor,
    code,
    grade,
    major,
  } = location.state;

  const [selectedBuilding, setSelectedBuilding] = useState(buildingName || "");
  const [selectedFloor, setSelectedFloor] = useState(floor || "");
  const [buildingFloorsMap, setBuildingFloorsMap] = useState({});
  const [formData, setFormData] = useState({
    id: id,
    roomName: roomName,
    title: title,
    professor: professor,
    courseTime: courseTime,
    buildingName: buildingName,
    floor: floor,
    code: code,
    grade: grade,
    major: major,
  });

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const response = await axios.get(
          "http://110.15.135.250:8000/building-service/admin/building",
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsInJvbGUiOiJBRE1JTiIsInN1YiI6IkF1dGhvcml6YXRpb24iLCJpYXQiOjE3NDU0MTEzMjUsImV4cCI6MTc1NDA1MTMyNX0.V0RNqeCd4j7XznWD6c5x1wVhf4QNwoXGKhgWa2C5rJs`,
              "Content-Type": "application/json",
            },
          }
        );

        const map = {};
        response.data.data.forEach((building) => {
          map[building.buildingName] = building.floors
            .map((floor) => {
              if (floor.startsWith("B")) return floor;
              if (floor === "0") return null;
              return `${floor}F`;
            })
            .filter(Boolean);
        });

        setBuildingFloorsMap(map);
      } catch (error) {
        console.error("건물 정보 로딩 실패:", error);
      }
    };

    fetchBuildings();
  }, []);

  useEffect(() => {
    if (selectedBuilding && buildingFloorsMap[selectedBuilding]) {
      if (floor && buildingFloorsMap[selectedBuilding].includes(`${floor}F`)) {
        setSelectedFloor(`${floor}F`);
      }
    }
  }, [selectedBuilding, buildingFloorsMap, floor]);

  const extractTimeSlot = (courseTimeStr) => {
    if (!courseTimeStr) return "";
    const parts = courseTimeStr.split(",").map((s) => s.trim());
    return parts[parts.length - 1];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "buildingName") {
      setSelectedBuilding(value);
      setFormData((prev) => ({ ...prev, buildingName: value }));
    }
    if (name === "floor") {
      setSelectedFloor(value);
      setFormData((prev) => ({ ...prev, floor: value }));
    }
  };
  const handleSave = async () => {
    if (!formData.id) {
      alert("강의실 ID가 없습니다. 수정할 수 없습니다.");
      return;
    }

    try {
      const numericFloor =
        selectedFloor && !selectedFloor.startsWith("B") && selectedFloor !== ""
          ? selectedFloor.replace("F", "")
          : selectedFloor;

      const payload = {
        id: formData.id,
        code: formData.code,
        title: formData.title,
        grade: formData.grade,
        major: formData.major,
        professor: formData.professor,
        courseTime: formData.courseTime,
        buildingName: selectedBuilding,
        timeSlot: extractTimeSlot(formData.courseTime),
        roomName: formData.roomName,
        floor: Number(numericFloor), // 숫자 변환
      };
      console.log("전송할 payload", payload);

      const response = await axios.patch(
        `http://110.15.135.250:8000/building-service/admin/classes/${formData.id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsInJvbGUiOiJBRE1JTiIsInN1YiI6IkF1dGhvcml6YXRpb24iLCJpYXQiOjE3NDU0MTEzMjUsImV4cCI6MTc1NDA1MTMyNX0.V0RNqeCd4j7XznWD6c5x1wVhf4QNwoXGKhgWa2C5rJs`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("resonse.data", response.data);
      console.log("response", response);
      if (response.data.code === 200) {
        alert("강의실 수정 성공!");
        navigate(`/cm`);
      } else {
        alert("수정 실패: " + response.data.message);
      }
    } catch (err) {
      console.error("PATCH 실패:", err);
      alert("수정 실패: " + (err.response?.data?.message || "서버 오류"));
    }
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
                    name="roomName"
                    value={formData.roomName}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>강의명</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>교수</label>
                  <input
                    type="text"
                    name="professor"
                    value={formData.professor}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>시간</label>
                  <input
                    type="text"
                    name="courseTime"
                    value={formData.courseTime}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>건물명</label>
                  <select
                    className={styles.select}
                    name="buildingName"
                    value={selectedBuilding}
                    onChange={handleChange}
                  >
                    <option value="">건물을 선택해주세요</option>
                    {Object.keys(buildingFloorsMap).map((building) => (
                      <option key={building} value={building}>
                        {building}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>층</label>
                  <select
                    className={styles.select}
                    name="floor"
                    value={selectedFloor}
                    onChange={handleChange}
                    disabled={!selectedBuilding}
                  >
                    <option value="">층을 선택해주세요</option>
                    {buildingFloorsMap[selectedBuilding]?.map((fl) => (
                      <option key={fl} value={fl}>
                        {fl}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>코드</label>
                  <input
                    type="text"
                    placeholder="코드를 입력해주세요"
                    value={formData.code}
                    readOnly
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>학년</label>
                  <input
                    type="text"
                    placeholder="학년을 입력해주세요"
                    value={formData.grade}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>전공</label>
                  <input
                    type="text"
                    placeholder="전공을 입력해주세요"
                    value={formData.major}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.formGroup}></div>
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

export default ClassroomManagementUpdatePage;
