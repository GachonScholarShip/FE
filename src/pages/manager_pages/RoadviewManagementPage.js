import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import ManagerNavBar from "../../components/ManagerNavBar";
import AddButton from "../../components/AddButton";
import DeleteButton from "../../components/DeleteButton";
import UpdateButton from "../../components/UpdateButton";
import DeleteConfirmPopup from "../../components/DeleteConfirmPopup";

import styles from "./RoadviewManagementPage.module.css";

function RoadviewManagementPage() {
  const navigate = useNavigate();

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [destinations, setDestinations] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const pageSize = 10;

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get(
          "http://110.15.135.250:8000/movement-service/member/road_view?pageNum=0&pageSize=1000",
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsInJvbGUiOiJBRE1JTiIsInN1YiI6IkF1dGhvcml6YXRpb24iLCJpYXQiOjE3NDU0MTE3NzMsImV4cCI6MTc1NDA1MTc3M30.VBuP9Li37A7YGPTlv3Jc2dn8E1h6WK2CBOUTxi92cZU",
              "Content-Type": "application/json",
            },
          }
        );

        const data = response.data.data;
        const formatted = data.map((item) => ({
          id: item.endPoint,
          url: item.url,
          baseId: item.roadViewId,
          name: item.endPoint,
        }));

        setDestinations(formatted);
      } catch (error) {
        console.error("로드뷰 목록 조회 실패:", error);
      }
    };

    fetchDestinations();
  }, []);

  const handleDeleteClick = (destination) => {
    setSelectedDestination(destination);
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedDestination) {
      try {
        await axios.delete(
          `http://110.15.135.250:8000/movement-service/admin/road_view/${selectedDestination.baseId}`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsInJvbGUiOiJBRE1JTiIsInN1YiI6IkF1dGhvcml6YXRpb24iLCJpYXQiOjE3NDU0MTE3NzMsImV4cCI6MTc1NDA1MTc3M30.VBuP9Li37A7YGPTlv3Jc2dn8E1h6WK2CBOUTxi92cZU",
              "Content-Type": "application/json",
            },
          }
        );

        setDestinations((prev) =>
          prev.filter((d) => d.baseId !== selectedDestination.baseId)
        );
        setShowConfirm(false);
        setSelectedDestination(null);
      } catch (error) {
        console.error("로드뷰 삭제 실패:", error);
      }
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
        baseId: destination.baseId,
      },
    });
  };

  const totalPages = Math.ceil(destinations.length / pageSize);
  const paginatedDestinations = destinations.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

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

            {paginatedDestinations.map((destination, index) => (
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

export default RoadviewManagementPage;
