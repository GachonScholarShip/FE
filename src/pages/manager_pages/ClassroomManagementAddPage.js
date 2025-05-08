import React, { useState, useEffect } from "react";
import ManagerNavBar from "../../components/ManagerNavBar";
import SearchBar from "../../components/SearchBar";
import SaveButton from "../../components/SaveButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./ClassroomManagementAddPage.module.css";

function ClassroomManagementAddPage() {
  const [roomName, setRoomName] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [professor, setProfessor] = useState("");
  const [courseTime, setCourseTime] = useState("");
  const [buildingName, setBuildingName] = useState("");
  const [code, setCode] = useState("");
  const [grade, setGrade] = useState("");
  const [major, setMajor] = useState("");
  const [floor, setFloor] = useState("");
  const [message, setMessage] = useState("");
  const [buildingFloorsMap, setBuildingFloorsMap] = useState({});
  const navigate = useNavigate();

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
            // 'B'로 시작하는 경우 처리, 숫자일 경우 'F' 추가
            if (floor.startsWith("B")) {
              return floor; // 'B1', 'B2' 등 그대로 처리
            } else if (floor === "0") {
              return null; // '0F'는 제외
            } else {
              return `${floor}F`; // '1', '2', '3' -> '1F', '2F', '3F'
            }
          })
          .filter((floor) => floor !== null); // '0F' 제외
      });

      setBuildingFloorsMap(map);
    } catch (err) {
      console.error("건물 정보 불러오기 실패:", err);
    }
  };

  useEffect(() => {
    fetchBuildings();
  }, []);

  // 시간대 마지막 값을 추출하는 함수
  const extractTimeSlot = (courseTimeStr) => {
    if (!courseTimeStr) return "";
    const parts = courseTimeStr.split(",").map((s) => s.trim());
    return parts[parts.length - 1]; // 마지막 시간대 반환
  };
  const handleSave = async () => {
    if (
      !roomName ||
      !courseTitle ||
      !professor ||
      !courseTime ||
      !buildingName ||
      !floor ||
      !code ||
      !grade ||
      !major
    ) {
      setMessage("모든 필드를 입력해주세요.");
      return;
    }

    // courseTime을 쉼표로 구분된 시간대 배열로 변환
    const timeSlots = courseTime.split(",").map((time) => time.trim());

    for (const timeSlot of timeSlots) {
      const requestData = {
        id: Date.now(),
        code: code,
        title: courseTitle,
        grade: grade,
        major: major,
        professor: professor,
        courseTime: courseTime,
        timeSlot: timeSlot,
        buildingName: buildingName,
        roomName: roomName,
        floor: floor,
      };

      try {
        const response = await axios.post(
          "http://110.15.135.250:8000/building-service/admin/classes",
          requestData,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsInJvbGUiOiJBRE1JTiIsInN1YiI6IkF1dGhvcml6YXRpb24iLCJpYXQiOjE3NDU0MTEzMjUsImV4cCI6MTc1NDA1MTMyNX0.V0RNqeCd4j7XznWD6c5x1wVhf4QNwoXGKhgWa2C5rJs`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("서버 응답:", response);
        console.log("생성 데이터:", requestData);

        if (response.data.code === 201) {
          setMessage("강의실이 성공적으로 추가되었습니다.");
          alert("강의실 추가 성공!");
        } else {
          setMessage(`강의실 추가 실패: ${response.data.message}`);
          alert("강의실 추가 실패!");
        }
      } catch (error) {
        setMessage("강의실 추가 중 오류가 발생했습니다.");
        console.error(error.response ? error.response.data : error);
      }
    }

    navigate(`/cm`);
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
            <div className={styles.title}>추가</div>
            <div className={styles.formContainer}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>강의실</label>
                  <input
                    type="text"
                    placeholder="강의실을 입력해주세요"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>강의명</label>
                  <input
                    type="text"
                    placeholder="강의명을 입력해주세요"
                    value={courseTitle}
                    onChange={(e) => setCourseTitle(e.target.value)}
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>교수</label>
                  <input
                    type="text"
                    placeholder="교수명을 입력해주세요"
                    value={professor}
                    onChange={(e) => setProfessor(e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>시간</label>
                  <input
                    type="text"
                    placeholder="시간을 입력해주세요"
                    value={courseTime}
                    onChange={(e) => setCourseTime(e.target.value)}
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>건물명</label>
                  <select
                    className={styles.select}
                    value={buildingName}
                    onChange={(e) => {
                      setBuildingName(e.target.value);
                      setFloor("");
                    }}
                  >
                    <option value="">건물을 선택해주세요</option>
                    {Object.keys(buildingFloorsMap).map((building, idx) => (
                      <option key={idx} value={building}>
                        {building}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>층</label>
                  <select
                    className={styles.select}
                    value={floor}
                    onChange={(e) => setFloor(e.target.value)}
                  >
                    <option value="">층 수를 선택해주세요</option>
                    {buildingFloorsMap[buildingName]?.map((floorOption) => (
                      <option key={floorOption} value={floorOption}>
                        {floorOption}
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
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>학년</label>
                  <input
                    type="text"
                    placeholder="학년을 입력해주세요"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>전공</label>
                  <input
                    type="text"
                    placeholder="전공을 입력해주세요"
                    value={major}
                    onChange={(e) => setMajor(e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}></div>
              </div>
            </div>
            <div className={styles.savebuttonContainer}>
              <SaveButton onClick={handleSave} />
            </div>
            {message && <div className={styles.message}>{message}</div>}{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClassroomManagementAddPage;
