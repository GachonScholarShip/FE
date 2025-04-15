import { useState } from "react";
import ManagerNavBar from "../../components/ManagerNavBar";
import SearchBar from "../../components/SearchBar";
import AddButton from "../../components/AddButton";
import DeleteButton from "../../components/DeleteButton";
import UpdateButton from "../../components/UpdateButton";
import styles from "./BuildingManagementPage.module.css";
import { useNavigate } from "react-router-dom";
import DeleteConfirmPopup from "../../components/DeleteConfirmPopup";

function BuildingManagementPage() {
  const navigate = useNavigate();

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [buildingData, setBuildingData] = useState([
    {
      name: "가천관",
      available: true,
      topFloor: "12F",
      bottomFloor: "B2",
      baseId: 1,
    },
    {
      name: "한의과대학",
      available: false,
      topFloor: "5F",
      bottomFloor: "1F",
      baseId: 2,
    },
  ]);

  const currentPage = "bm";

  const handleDeleteClick = (buildingName) => {
    setSelectedBuilding(buildingName);
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    setBuildingData((prevBuildingData) =>
      prevBuildingData.filter((building) => building.name !== selectedBuilding)
    );
    setShowConfirm(false);
    setSelectedBuilding(null);
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
    setSelectedBuilding(null);
  };

  const handleUpdateClick = (building) => {
    navigate(`/bmu/${building.baseId}`, {
      state: {
        name: building.name,
        available: building.available,
        topFloor: building.topFloor,
        bottomFloor: building.bottomFloor,
      },
    });
  };

  const filteredBuildings = buildingData.filter((building) =>
    building.name.includes(searchQuery)
  );

  const handleSearch = (query) => {
    setSearchQuery(query);
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
            {filteredBuildings.map((building, index) => (
              <div key={index} className={styles.tableRow}>
                <div className={styles.column}>{building.name}</div>
                <div className={styles.column}>
                  {building.available ? "가능" : "불가능"}
                </div>
                <div className={styles.column}>
                  <div className={styles.button}>
                    <UpdateButton
                      onClick={() =>
                        navigate(`/bmu/${building.baseId}`, {
                          state: {
                            name: building.name,
                            available: building.available,
                            topFloor: building.topFloor,
                            bottomFloor: building.bottomFloor,
                          },
                        })
                      }
                    />
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
