import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ManagerNavBar from "../../components/ManagerNavBar";
import SearchBar from "../../components/SearchBar";
import AddButton from "../../components/AddButton";
import DeleteButton from "../../components/DeleteButton";
import UpdateButton from "../../components/UpdateButton";
import DeleteConfirmPopup from "../../components/DeleteConfirmPopup";
import styles from "./ClassroomManagementPage.module.css";
import axios from "axios";

function ClassroomManagementPage() {
  const navigate = useNavigate();

  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [selectedFloor, setSelectedFloor] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [roomData, setRoomData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [buildingFloorsMap, setBuildingFloorsMap] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroupStart, setPageGroupStart] = useState(1);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const itemsPerPage = 9;
  const pageGroupSize = 10;

  const token =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsInJvbGUiOiJBRE1JTiIsInN1YiI6IkF1dGhvcml6YXRpb24iLCJpYXQiOjE3NDU0MTE3NzMsImV4cCI6MTc1NDA1MTc3M30.VBuP9Li37A7YGPTlv3Jc2dn8E1h6WK2CBOUTxi92cZU";

  const fetchClassroomDetails = async () => {
    try {
      if (!selectedBuilding) {
        return;
      }

      const rawParams = {
        buildingName: selectedBuilding || undefined,
        floor: selectedFloor !== "" ? selectedFloor : undefined,
        pageNum: currentPage,
        pageSize: itemsPerPage,
      };

      const params = Object.fromEntries(
        Object.entries(rawParams).filter(([_, v]) => v !== undefined)
      );

      const response = await axios.get(
        "http://110.15.135.250:8000/building-service/admin/classes/detail",
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          params: params,
        }
      );

      const data = response.data.data || [];
      const totalElements = response.data.totalElements || data.length; // totalElements가 없으면 data.length 사용
      const totalPages = Math.ceil(totalElements / itemsPerPage); // totalPages 계산
      console.log(totalElements);

      setRoomData(data);
      setTotalPages(totalPages); // 페이지 수 업데이트
    } catch (err) {
      console.error("❌ 강의실 정보 불러오기 실패:", err);
    }
  };

  // 페이지네이션 관련 수정
  const goToPrevGroup = () => {
    if (pageGroupStart > 1) {
      const newStart = Math.max(1, pageGroupStart - pageGroupSize);
      setPageGroupStart(newStart);
      setCurrentPage(newStart); // currentPage를 0부터 시작하도록 수정
    }
  };

  const goToNextGroup = () => {
    if (pageGroupStart + pageGroupSize <= totalPages) {
      const newStart = pageGroupStart + pageGroupSize;
      setPageGroupStart(newStart);
      setCurrentPage(newStart); // currentPage를 0부터 시작하도록 수정
    } else if (pageGroupStart < totalPages) {
      const newStart = totalPages - (totalPages % pageGroupSize) + 1;
      setPageGroupStart(newStart);
      setCurrentPage(newStart); // currentPage를 0부터 시작하도록 수정
    }
  };

  useEffect(() => {
    fetchBuildings();
    fetchClassroomDetails();
  }, []);

  useEffect(() => {
    fetchClassroomDetails();
  }, [selectedBuilding, selectedFloor, currentPage]);

  const fetchBuildings = async () => {
    try {
      const response = await axios.get(
        "http://110.15.135.250:8000/building-service/admin/building",
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      const buildings = response.data.data;
      const map = {};

      buildings.forEach((b) => {
        const floors = b.floors
          .filter((floor) => floor !== 0 && floor !== "0")
          .sort((a, b) => {
            const normalize = (f) => {
              if (typeof f === "string" && f.startsWith("B")) {
                return -parseInt(f.slice(1));
              }
              return parseInt(f);
            };
            return normalize(a) - normalize(b);
          });

        map[b.buildingName] = floors;
      });

      setBuildingFloorsMap(map);
      if (buildings.length > 0) {
        const firstBuilding = buildings[0].buildingName;
        const firstFloor = buildings[0].floors[0]; // 첫 번째 빌딩의 첫 번째 층
        setSelectedBuilding(firstBuilding);
        setSelectedFloor(firstFloor);
      }
    } catch (err) {
      console.error("건물 목록 불러오기 실패:", err);
    }
  };

  const handleDeleteClick = (roomId) => {
    setSelectedRoom(roomId);
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const room = roomData.find((r) => r.id === selectedRoom);
      if (!room) return alert("강의실을 찾을 수 없습니다.");

      const response = await axios.delete(
        `http://110.15.135.250:8000/building-service/admin/classes/${selectedRoom}`,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.code === 204) {
        alert("삭제 성공");
        setRoomData((prev) => prev.filter((r) => r.id !== selectedRoom));
      } else {
        alert("삭제 실패: " + response.data.message);
      }
    } catch (e) {
      alert("삭제 중 오류 발생");
    } finally {
      setShowConfirm(false);
      setSelectedRoom(null);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
    setSelectedRoom(null);
  };

  const handleUpdateClick = (room) => {
    navigate(`/cmu/${room.id}`, {
      state: { ...room },
    });
  };

  const pageNumbers = Array.from(
    {
      length: Math.min(pageGroupSize, totalPages - pageGroupStart + 1),
    },
    (_, i) => pageGroupStart + i
  );

  const formatFloor = (floor) => {
    return typeof floor === "string" && floor.startsWith("B")
      ? floor
      : `${floor}F`;
  };

  return (
    <div>
      <ManagerNavBar />
      <div className={styles.bg}>
        <div className={styles.container}>
          <div className={styles.topBox}>
            <SearchBar
              placeholder="강의실을 입력해주세요"
              onSearch={(term) => {
                setSearchTerm(term);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className={styles.bottomBox}>
            <div className={styles.title}>강의실 현황</div>

            <div className={styles.selectFloorBuildings}>
              <div className={styles.floorButtons}>
                {selectedBuilding &&
                  buildingFloorsMap[selectedBuilding]?.map((floor) => (
                    <button
                      key={floor}
                      className={`${styles.floorButton} ${
                        selectedFloor === floor ? styles.active : ""
                      }`}
                      onClick={() => {
                        setSelectedFloor(floor);
                        setCurrentPage(1);
                      }}
                    >
                      {formatFloor(floor)}
                    </button>
                  ))}
              </div>
              <div className={styles.selectorBox}>
                <select
                  value={selectedBuilding}
                  onChange={(e) => {
                    setSelectedBuilding(e.target.value);
                    setSelectedFloor("");
                    setCurrentPage(1);
                  }}
                >
                  {Object.keys(buildingFloorsMap).map((building, idx) => (
                    <option key={idx} value={building}>
                      {building}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.tableHeader}>
              <div className={styles.column}>강의실</div>
              <div className={styles.column}>강좌명</div>
              <div className={styles.column}>교수</div>
              <div className={styles.column}>시간</div>
              <div className={styles.column}></div>
            </div>
            {roomData
              .filter(
                (room) =>
                  (!searchTerm ||
                    room.roomName
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())) &&
                  (!selectedBuilding ||
                    room.buildingName === selectedBuilding) &&
                  (!selectedFloor || room.floor === selectedFloor)
              )
              .map((room) => (
                <div key={room.id} className={styles.tableRow}>
                  <div className={styles.column}>{room.roomName}</div>
                  <div className={styles.column}>{room.title}</div>
                  <div className={styles.column}>{room.professor}</div>
                  <div className={styles.column}>{room.timeSlot}</div>
                  <div className={styles.column}>
                    <div className={styles.button}>
                      <UpdateButton onClick={() => handleUpdateClick(room)} />
                      <DeleteButton
                        onClick={() => handleDeleteClick(room.id)}
                      />
                    </div>
                  </div>
                </div>
              ))}

            <div className={styles.pagination}>
              <button onClick={goToPrevGroup} disabled={pageGroupStart === 1}>
                ◀
              </button>
              {pageNumbers.map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={
                    page === currentPage ? styles.activePage : styles.pageButton
                  }
                >
                  {page}
                </button>
              ))}
              <button
                onClick={goToNextGroup}
                disabled={pageGroupStart + pageGroupSize > totalPages}
              >
                ▶
              </button>
            </div>

            {showConfirm && (
              <DeleteConfirmPopup
                message={`${selectedRoom} 강의실을 정말 삭제하시겠습니까?`}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
              />
            )}

            <div className={styles.addbuttonContainer}>
              <AddButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClassroomManagementPage;
