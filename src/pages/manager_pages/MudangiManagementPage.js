import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ManagerNavBar from "../../components/ManagerNavBar";
import AddButton from "../../components/AddButton";
import DeleteButton from "../../components/DeleteButton";
import UpdateButton from "../../components/UpdateButton";
import styles from "./MudangiManagementPage.module.css";
import DeleteConfirmPopup from "../../components/DeleteConfirmPopup";

function MudangiManagementPage() {
  const navigate = useNavigate();

  const [times, setTimes] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);

  const pageSize = 10;

  useEffect(() => {
    const fetchMudangTimes = async () => {
      try {
        const response = await axios.get(
          "http://110.15.135.250:8000/movement-service/admin/mudang",
          {
            params: { pageNum: 0, pageSize: 1000 },
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsInJvbGUiOiJBRE1JTiIsInN1YiI6IkF1dGhvcml6YXRpb24iLCJpYXQiOjE3NDU0MTE3NzMsImV4cCI6MTc1NDA1MTc3M30.VBuP9Li37A7YGPTlv3Jc2dn8E1h6WK2CBOUTxi92cZU",
              "Content-Type": "application/json",
            },
          }
        );

        const rawData = response.data.data || [];
        const formatted = rawData.map((item) => ({
          id: item.timeslot,
          baseId: item.mudangId,
          available: true,
        }));

        setTimes(formatted);
      } catch (error) {
        console.error(
          "무당이 시간표 로딩 실패:",
          error.response?.data?.message || error.message
        );
      }
    };

    fetchMudangTimes();
  }, []);

  const handleDeleteClick = (time) => {
    setSelectedTime(time);
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedTime) {
      try {
        const response = await axios.delete(
          `http://110.15.135.250:8000/movement-service/admin/mudang/${selectedTime.baseId}`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsInJvbGUiOiJBRE1JTiIsInN1YiI6IkF1dGhvcml6YXRpb24iLCJpYXQiOjE3NDU0MTE3NzMsImV4cCI6MTc1NDA1MTc3M30.VBuP9Li37A7YGPTlv3Jc2dn8E1h6WK2CBOUTxi92cZU",
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.code === 200) {
          alert(response.data.message);
          setTimes((prev) =>
            prev.filter((item) => item.baseId !== selectedTime.baseId)
          );
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        if (error.response) {
          alert(error.response.data.message);
        } else {
          console.error("Error:", error);
          alert("서버에 연결할 수 없습니다.");
        }
      }
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
        mudangId: time.baseId,
      },
    });
  };

  const totalPages = Math.ceil(times.length / pageSize);
  const paginatedTimes = times.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

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

            {paginatedTimes.map((time) => (
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

            <div className={styles.pagination}>
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx)}
                  className={
                    idx === currentPage ? styles.activePage : styles.pageButton
                  }
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MudangiManagementPage;
