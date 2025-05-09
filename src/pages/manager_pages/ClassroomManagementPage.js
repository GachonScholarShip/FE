import React, { useState, useEffect, useMemo } from "react";
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

  const itemsPerPage = 9; // 한 페이지에 보여줄 항목 수
  const pageGroupSize = 10; // 페이지 그룹 크기 (페이지 버튼을 몇 개씩 묶을지 설정)

  const token =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsInJvbGUiOiJBRE1JTiIsInN1YiI6IkF1dGhvcml6YXRpb24iLCJpYXQiOjE3NDU0MTE3NzMsImV4cCI6MTc1NDA1MTc3M30.VBuP9Li37A7YGPTlv3Jc2dn8E1h6WK2CBOUTxi92cZU";

  const fetchClassroomDetails = async () => {
    try {
      if (!selectedBuilding) return;

      const rawParams = {
        buildingName: selectedBuilding || undefined,
        floor: selectedFloor !== "" ? selectedFloor : undefined,
        pageSize: 5000,
        pageNum: 0, // 항상 첫 페이지만 요청
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

      const content = response.data.data?.content || response.data.data || [];
      const totalElements = response.data.data?.totalElements || content.length;

      setRoomData(content);
      setTotalPages(Math.ceil(totalElements / itemsPerPage)); // 전체 페이지 수 계산
    } catch (err) {
      console.error(err);
    }
  };

  // 건물 목록 불러오는 함수
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
        const sortedFloors = map[firstBuilding]; // 이미 정렬된 상태
        const lowestFloor = sortedFloors[0]; // 정렬된 리스트에서 최하층
        setSelectedBuilding(firstBuilding);
        setSelectedFloor(lowestFloor);
      }
    } catch (err) {
      console.error("건물 목록 불러오기 실패:", err);
    }
  };
  const pageNumbers = Array.from(
    {
      length:
        totalPages >= pageGroupStart
          ? Math.min(pageGroupSize, totalPages - pageGroupStart + 1)
          : 0,
    },
    (_, i) => pageGroupStart + i
  );

  const goToPrevGroup = () => {
    if (pageGroupStart > 1) {
      const newStart = Math.max(1, pageGroupStart - pageGroupSize);
      setPageGroupStart(newStart);
      setCurrentPage(newStart);
    }
  };

  const goToNextGroup = () => {
    if (pageGroupStart + pageGroupSize <= totalPages) {
      const newStart = pageGroupStart + pageGroupSize;
      setPageGroupStart(newStart);
      setCurrentPage(newStart);
    } else if (pageGroupStart < totalPages) {
      const newStart = totalPages - (totalPages % pageGroupSize) + 1;
      setPageGroupStart(newStart);
      setCurrentPage(newStart);
    }
  };

  // 선택한 강의실 삭제 처리
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

  const filteredData = useMemo(() => {
    return roomData.filter(
      (room) =>
        (!searchTerm ||
          room.roomName.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedBuilding ? room.buildingName === selectedBuilding : true) &&
        (selectedFloor ? room.floor === selectedFloor : true)
    );
  }, [roomData, searchTerm, selectedBuilding, selectedFloor]);

  console.log("filteredData:", filteredData);

  useEffect(() => {
    setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
  }, [filteredData]);

  useEffect(() => {
    console.log("filteredData:", filteredData);
    if (filteredData.length === 0 && roomData.length > 0) {
      console.warn("데이터 있음에도 필터링 결과 없음. 조건 확인 필요.");
    }
  }, [filteredData]);

  const displayedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    fetchBuildings();
  }, []);

  useEffect(() => {
    if (selectedBuilding) {
      fetchClassroomDetails();
    }
  }, [selectedBuilding, selectedFloor]);

  useEffect(() => {
    console.log("currentPage:", currentPage);
    console.log("selectedBuilding:", selectedBuilding);
    console.log("selectedFloor:", selectedFloor);
    fetchClassroomDetails();
  }, [selectedBuilding, selectedFloor, currentPage]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages]);

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
                    const buildingName = e.target.value;
                    const lowestFloor =
                      buildingFloorsMap[buildingName]?.[0] || "";
                    setSelectedBuilding(buildingName);
                    setSelectedFloor(lowestFloor);
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

            {filteredData.length === 0 ? (
              <div className={styles.nodata}>검색 결과가 없습니다.</div>
            ) : (
              displayedData.map((room) => (
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
              ))
            )}
            {filteredData.length > 0 && (
              <div className={styles.pagination}>
                <button onClick={goToPrevGroup} disabled={pageGroupStart === 1}>
                  ◀
                </button>
                {pageNumbers.map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={
                      page === currentPage
                        ? styles.activePage
                        : styles.pageButton
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
            )}

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
