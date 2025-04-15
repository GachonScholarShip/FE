import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ManagerNavBar from "../../components/ManagerNavBar";
import SearchBar from "../../components/SearchBar";
import AddButton from "../../components/AddButton";
import DeleteButton from "../../components/DeleteButton";
import UpdateButton from "../../components/UpdateButton";
import styles from "./ClassroomManagementPage.module.css";
import DeleteConfirmPopup from "../../components/DeleteConfirmPopup";

function ClassroomManagementPage() {
  const navigate = useNavigate();
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [selectedFloor, setSelectedFloor] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roomData, setRoomData] = useState([
    {
      baseId: 1,
      roomName: "B202",
      courseName: "중국어",
      professor: "홍길동",
      time: "월 5, 6",
      building: "가천관",
      floor: "B2",
    },
    {
      baseId: 2,
      roomName: "B203",
      courseName: "인성세미나",
      professor: "홍길동",
      time: "화 1, 2",
      building: "비전타워",
      floor: "B2",
    },
  ]);

  const handleDeleteClick = (roomName) => {
    setSelectedRoom(roomName);
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    setRoomData((prevRoomData) =>
      prevRoomData.filter((room) => room.roomName !== selectedRoom)
    );
    setShowConfirm(false);
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
    setSelectedRoom(null);
  };

  const handleUpdateClick = (room) => {
    navigate(`/cmu/${room.baseId}`, {
      state: {
        roomName: room.roomName,
        courseName: room.courseName,
        professor: room.professor,
        time: room.time,
        building: room.building,
        floor: room.floor,
      },
    });
  };

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

  const filteredRoomData = roomData.filter((room) => {
    const matchesSearch = room.roomName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesBuilding = selectedBuilding
      ? room.building === selectedBuilding
      : true;
    const matchesFloor = selectedFloor ? room.floor === selectedFloor : true;
    return matchesSearch && matchesBuilding && matchesFloor;
  });

  return (
    <div>
      <ManagerNavBar />
      <div className={styles.bg}>
        <div className={styles.container}>
          <div className={styles.topBox}>
            <SearchBar
              placeholder="강의실을 입력해주세요"
              onSearch={setSearchTerm}
            />
          </div>

          <div className={styles.bottomBox}>
            <div className={styles.title}>강의실 현황</div>

            <div className={styles.selectFloorBuildings}>
              <div className={styles.floorButtons}>
                {selectedBuilding &&
                  buildingFloors[selectedBuilding]?.map((floor) => (
                    <button
                      key={floor}
                      className={`${styles.floorButton} ${
                        selectedFloor === floor ? styles.active : ""
                      }`}
                      onClick={() => setSelectedFloor(floor)}
                    >
                      {floor}
                    </button>
                  ))}
              </div>
              <div className={styles.selectorBox}>
                <select
                  value={selectedBuilding}
                  onChange={(e) => {
                    setSelectedBuilding(e.target.value);
                    setSelectedFloor("");
                  }}
                >
                  <option value="">건물을 선택해주세요</option>
                  {Object.keys(buildingFloors).map((building, idx) => (
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

            {filteredRoomData.map((room) => (
              <div key={room.baseId} className={styles.tableRow}>
                <div className={styles.column}>{room.roomName}</div>
                <div className={styles.column}>{room.courseName}</div>
                <div className={styles.column}>{room.professor}</div>
                <div className={styles.column}>{room.time}</div>
                <div className={styles.column}>
                  <div className={styles.button}>
                    <UpdateButton
                      onClick={() =>
                        navigate(`/cmu/${room.baseId}`, {
                          state: {
                            roomName: room.roomName,
                            courseName: room.courseName,
                            professor: room.professor,
                            time: room.time,
                            building: room.building,
                            floor: room.floor,
                          },
                        })
                      }
                    />
                    <DeleteButton
                      onClick={() => handleDeleteClick(room.roomName)}
                    />
                  </div>
                </div>
              </div>
            ))}

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
