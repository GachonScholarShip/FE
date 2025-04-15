import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ManagerNavBar from "../../components/ManagerNavBar";
import AddButton from "../../components/AddButton";
import DeleteButton from "../../components/DeleteButton";
import UpdateButton from "../../components/UpdateButton";
import styles from "./MudangiManagementPage.module.css";
import DeleteConfirmPopup from "../../components/DeleteConfirmPopup";

function MudangiManagementPage() {
  const navigate = useNavigate();

  const [times, setTimes] = useState([
    { id: "AM 9:00", available: true, baseId: 1 },
    { id: "AM 9:05", available: false, baseId: 2 },
  ]);

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);

  const handleDeleteClick = (time) => {
    setSelectedTime(time);
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (selectedTime) {
      setTimes((prev) =>
        prev.filter((item) => item.baseId !== selectedTime.baseId)
      );
    }
    setShowConfirm(false);
    setSelectedTime(null);
  };

  const handleCancelDelete = () => {
    setSelectedTime(null);
    setShowConfirm(false);
  };

  const handleUpdateClick = (time) => {
    navigate(`/muu/${time.baseId}`, {
      state: {
        id: time.id,
        available: time.available,
      },
    });
  };

  const currentPage = "mu";

  return (
    <div>
      <ManagerNavBar />
      <div className={styles.bg}>
        <div className={styles.container}>
          <div className={styles.Box}>
            <div className={styles.title}>무당이 시간표</div>
            <div className={styles.tableHeader}>
              <div className={styles.column}>시간</div>
              <div className={styles.column}></div>
            </div>

            {times.map((time) => (
              <div key={time.baseId} className={styles.tableRow}>
                <div className={styles.column}>{time.id}</div>
                <div className={styles.column}></div>
                <div className={styles.column}>
                  <div className={styles.button}>
                    <UpdateButton onClick={() => handleUpdateClick(time)} />
                    <DeleteButton onClick={() => handleDeleteClick(time)} />
                  </div>
                </div>
              </div>
            ))}

            {showConfirm && selectedTime && (
              <DeleteConfirmPopup
                message={`${selectedTime.id} 시간대를 정말 삭제하시겠습니까?`}
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

export default MudangiManagementPage;
