import { useState, useEffect } from "react";
import ManagerNavBar from "../../components/ManagerNavBar";
import SearchBar from "../../components/SearchBar";
import AddButton from "../../components/AddButton";
import DeleteButton from "../../components/DeleteButton";
import UpdateButton from "../../components/UpdateButton";
import styles from "./BuildingManagementPage.module.css";
import { useNavigate } from "react-router-dom";
import DeleteConfirmPopup from "../../components/DeleteConfirmPopup";
import axios from "axios";

function BuildingManagementPage() {
  const navigate = useNavigate();

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [buildingData, setBuildingData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

        console.log(response.data);

        if (response.data.code === 200) {
          const buildings = response.data.data.map((building) => {
            const floorNumbers = building.floors
              .map((floor) => {
                if (typeof floor === "string" && floor.startsWith("B")) {
                  const number = parseInt(floor.slice(1), 10);
                  return isNaN(number) ? null : -number; // "B2" -> -2
                } else {
                  const number = parseInt(floor, 10);
                  return isNaN(number) ? null : number;
                }
              })
              .filter((n) => n !== null); // null 값 제거

            const maxFloor = Math.max(...floorNumbers);
            const minFloor = Math.min(...floorNumbers);

            return {
              name: building.buildingName,
              available: building.isPublic,
              topFloor: `${maxFloor}F`,
              bottomFloor: minFloor < 0 ? `B${-minFloor}` : `${minFloor}F`, // 최소층이 음수면 'B'로 반환
              baseId: building.id,
            };
          });

          setBuildingData(buildings);
        } else {
          console.error("서버 오류:", response.data.message);
        }
      } catch (error) {
        console.error("API 요청 실패:", error.response?.data || error.message);
      }
    };

    fetchBuildings();
  }, []);

  const handleDeleteClick = (buildingName) => {
    setSelectedBuilding(buildingName);
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const buildingToDelete = buildingData.find(
        (building) => building.name === selectedBuilding
      );

      if (!buildingToDelete) {
        alert("삭제할 건물을 찾을 수 없습니다.");
        return;
      }

      const response = await axios.delete(
        `http://110.15.135.250:8000/building-service/admin/building/${buildingToDelete.baseId}`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsInJvbGUiOiJBRE1JTiIsInN1YiI6IkF1dGhvcml6YXRpb24iLCJpYXQiOjE3NDU0MTEzMjUsImV4cCI6MTc1NDA1MTMyNX0.V0RNqeCd4j7XznWD6c5x1wVhf4QNwoXGKhgWa2C5rJs`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.code === 204) {
        setBuildingData((prev) =>
          prev.filter((building) => building.name !== selectedBuilding)
        );
        alert("건물 삭제 성공!");
      } else {
        alert("삭제 실패: " + response.data.message);
      }
    } catch (error) {
      if (error.response?.data?.message) {
        alert("에러: " + error.response.data.message);
      } else {
        alert("삭제 요청 중 오류 발생");
      }
    } finally {
      setShowConfirm(false);
      setSelectedBuilding(null);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
    setSelectedBuilding(null);
  };

  const handleUpdateClick = (building) => {
    navigate(`/bmu/${building.baseId}`, {
      state: {
        id: building.baseId,
        name: building.name,
        available: building.available,
        topFloor: building.topFloor,
        bottomFloor: building.bottomFloor,
      },
    });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const filteredBuildings = buildingData.filter((building) =>
    building.name.includes(searchQuery)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBuildings = filteredBuildings.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredBuildings.length / itemsPerPage);

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={i === currentPage ? styles.activePage : styles.pageButton}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div>
      <ManagerNavBar />
      <div className={styles.bg}>
        <div className={styles.container}>
          <div className={styles.topBox}>
            <SearchBar
              placeholder="건물명을 입력해주세요"
              onSearch={handleSearch}
            />
          </div>

          <div className={styles.bottomBox}>
            <div className={styles.title}>건물 현황</div>

            <div className={styles.tableHeader}>
              <div className={styles.column}>건물 이름</div>
              <div className={styles.column}>이용 가능</div>
              <div className={styles.column}></div>
            </div>

            {currentBuildings.map((building, index) => (
              <div key={index} className={styles.tableRow}>
                <div className={styles.column}>{building.name}</div>
                <div className={styles.column}>
                  {building.available ? "가능" : "불가능"}
                </div>
                <div className={styles.column}>
                  <div className={styles.button}>
                    <UpdateButton onClick={() => handleUpdateClick(building)} />
                    <DeleteButton
                      onClick={() => handleDeleteClick(building.name)}
                    />
                  </div>
                </div>
              </div>
            ))}

            {showConfirm && (
              <DeleteConfirmPopup
                message={`${selectedBuilding}을(를) 정말로 삭제하시겠습니까?`}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
              />
            )}

            <div className={styles.pagination}>{renderPageNumbers()}</div>

            <div className={styles.addbuttonContainer}>
              <AddButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuildingManagementPage;
