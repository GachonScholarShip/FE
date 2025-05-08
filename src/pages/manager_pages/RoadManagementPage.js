import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ManagerNavBar from "../../components/ManagerNavBar";
import AddButton from "../../components/AddButton";
import DeleteButton from "../../components/DeleteButton";
import UpdateButton from "../../components/UpdateButton";
import styles from "./RoadManagementPage.module.css";
import DeleteConfirmPopup from "../../components/DeleteConfirmPopup";
import axios from "axios";

function RoadManagementPage() {
  const navigate = useNavigate();

  const [destinations, setDestinations] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const pageSize = 10;

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get(
          "http://110.15.135.250:8000/movement-service/admin/direction?pageNum=0&pageSize=1000",
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsInJvbGUiOiJBRE1JTiIsInN1YiI6IkF1dGhvcml6YXRpb24iLCJpYXQiOjE3NDU0MTEzMjUsImV4cCI6MTc1NDA1MTMyNX0.V0RNqeCd4j7XznWD6c5x1wVhf4QNwoXGKhgWa2C5rJs`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data.code === 200) {
          const mappedData = response.data.data.map((item) => ({
            baseId: item.id,
            id: item.endPoint,
            url: item.url,
            name: item.endPoint,
          }));
          setDestinations(mappedData);
        }
      } catch (error) {
        console.error("목록 조회 실패:", error);
      }
    };

    fetchDestinations();
  }, []);

  const totalPages = Math.ceil(destinations.length / pageSize);
  const paginatedDestinations = destinations.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  const handleDeleteClick = (destination) => {
    setSelectedDestination(destination);
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedDestination) return;

    try {
      const response = await axios.delete(
        `http://110.15.135.250:8000/movement-service/admin/direction/${selectedDestination.baseId}`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsInJvbGUiOiJBRE1JTiIsInN1YiI6IkF1dGhvcml6YXRpb24iLCJpYXQiOjE3NDU0MTEzMjUsImV4cCI6MTc1NDA1MTMyNX0.V0RNqeCd4j7XznWD6c5x1wVhf4QNwoXGKhgWa2C5rJs`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.code === 200) {
        setDestinations((prev) =>
          prev.filter((item) => item.baseId !== selectedDestination.baseId)
        );
      }
    } catch (error) {
      console.error("삭제 실패:", error);
    } finally {
      setShowConfirm(false);
      setSelectedDestination(null);
    }
  };

  const handleCancelDelete = () => {
    setSelectedDestination(null);
    setShowConfirm(false);
  };

  const handleUpdateClick = (destination) => {
    navigate(`/rmu/${destination.baseId}`, {
      state: {
        id: destination.baseId,
        url: destination.url,
        name: destination.name,
      },
    });
  };

  // URL 자르기 함수
  const formatUrl = (url) => {
    const maxLength = 50;
    if (url.length > maxLength) {
      return url.slice(0, maxLength) + "...";
    }
    return url;
  };

  return (
    <div>
      <ManagerNavBar />
      <div className={styles.bg}>
        <div className={styles.container}>
          <div className={styles.Box}>
            <div className={styles.title}>길찾기 관리</div>
            <div className={styles.tableHeader}>
              <div className={styles.column}>목적지</div>
              <div className={styles.column}>
                네이버 지도 URL(URL 단축 서비스 이용)
              </div>
              <div className={styles.column}></div>
            </div>

            {paginatedDestinations.map((destination) => (
              <div key={destination.baseId} className={styles.tableRow}>
                <div className={styles.column}>{destination.id}</div>
                <div className={styles.column}>
                  {formatUrl(destination.url)}
                </div>
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

export default RoadManagementPage;
