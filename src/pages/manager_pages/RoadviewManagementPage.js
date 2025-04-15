import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ManagerNavBar from "../../components/ManagerNavBar";
import AddButton from "../../components/AddButton";
import DeleteButton from "../../components/DeleteButton";
import UpdateButton from "../../components/UpdateButton";
import styles from "./RoadviewManagementPage.module.css";
import DeleteConfirmPopup from "../../components/DeleteConfirmPopup";

function RoadviewManagementPage() {
  const navigate = useNavigate();

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [destinations, setDestinations] = useState([
    { id: "가천관", url: "https://iii.ad/d0dac0", baseId: 1, name: "가천관" },
    {
      id: "반도체대학",
      url: "https://iii.ad/1c3698",
      baseId: 2,
      name: "반도체대학",
    },
  ]);

  const handleDeleteClick = (destination) => {
    setSelectedDestination(destination);
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (selectedDestination) {
      setDestinations((prev) =>
        prev.filter((d) => d.id !== selectedDestination.id)
      );
      setShowConfirm(false);
      setSelectedDestination(null);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
    setSelectedDestination(null);
  };

  const handleUpdateClick = (destination) => {
    navigate(`/rvmu/${destination.baseId}`, {
      state: {
        id: destination.id,
        url: destination.url,
        name: destination.name,
      },
    });
  };

  return (
    <div>
      <ManagerNavBar />
      <div className={styles.bg}>
        <div className={styles.container}>
          <div className={styles.Box}>
            <div className={styles.title}>로드뷰 관리</div>
            <div className={styles.tableHeader}>
              <div className={styles.column}>목적지</div>
              <div className={styles.column}>
                네이버 지도 URL(URL 단축 서비스 이용)
              </div>
              <div className={styles.column}></div>
            </div>

            {destinations.map((destination, index) => (
              <div key={index} className={styles.tableRow}>
                <div className={styles.column}>{destination.id}</div>
                <div className={styles.column}>{destination.url}</div>

                <div className={styles.column}>
                  <div className={styles.button}>
                    <UpdateButton
                      onClick={() => handleUpdateClick(destination)}
                    />
                    <DeleteButton
                      onClick={() => handleDeleteClick(destination)}
                    />
                  </div>
                </div>
              </div>
            ))}

            {showConfirm && selectedDestination && (
              <DeleteConfirmPopup
                message={`${selectedDestination.id}을(를) 정말 삭제하시겠습니까?`}
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

export default RoadviewManagementPage;
