import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import ManagerNavBar from "../../components/ManagerNavBar";
import AddButton from "../../components/AddButton";
import DeleteButton from "../../components/DeleteButton";
import UpdateButton from "../../components/UpdateButton";
import DeleteConfirmPopup from "../../components/DeleteConfirmPopup";
import styles from "./QRcodeManagementPage.module.css";

function QRcodeManagementPage() {
  const navigate = useNavigate();

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedQR, setSelectedQR] = useState(null);
  const [qrCodes, setQrCodes] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const pageSize = 3;

  useEffect(() => {
    const fetchQRCodes = async () => {
      try {
        const response = await axios.get(
          "http://110.15.135.250:8000/movement-service/admin/qrcode",
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsInJvbGUiOiJBRE1JTiIsInN1YiI6IkF1dGhvcml6YXRpb24iLCJpYXQiOjE3NDU0MTE3NzMsImV4cCI6MTc1NDA1MTc3M30.VBuP9Li37A7YGPTlv3Jc2dn8E1h6WK2CBOUTxi92cZU",
              "Content-Type": "application/json",
            },
          }
        );

        const data = response.data.data;
        setQrCodes(data || []);
      } catch (error) {
        console.error("QR 코드 목록 조회 실패:", error);
      }
    };

    fetchQRCodes();
  }, [currentPage]);

  const handleDeleteClick = (qr) => {
    setSelectedQR(qr);
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedQR) {
      try {
        await axios.delete(
          `http://110.15.135.250:8000/movement-service/admin/qrcode/${selectedQR.id}`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsInJvbGUiOiJBRE1JTiIsInN1YiI6IkF1dGhvcml6YXRpb24iLCJpYXQiOjE3NDU0MTE3NzMsImV4cCI6MTc1NDA1MTc3M30.VBuP9Li37A7YGPTlv3Jc2dn8E1h6WK2CBOUTxi92cZU",
              "Content-Type": "application/json",
            },
          }
        );

        setQrCodes((prev) => prev.filter((qr) => qr.id !== selectedQR.id));
        setShowConfirm(false);
        setSelectedQR(null);
      } catch (error) {
        console.error("QR 코드 삭제 실패:", error);
      }
    }
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
    setSelectedQR(null);
  };

  const handleUpdateClick = (qr) => {
    navigate(`/qrmu/${qr.id}`, {
      state: {
        id: qr.id,
        buildingName: qr.buildingName,
        imageUrl: qr.imageUrl,
        url: qr.url, // URL을 상태로 전달
      },
    });
  };

  // `totalPages`는 최소 1페이지가 나오도록 계산
  const totalPages = Math.ceil(qrCodes.length / pageSize);
  const paginatedQRCodes = qrCodes.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  return (
    <div>
      <ManagerNavBar />
      <div className={styles.bg}>
        <div className={styles.container}>
          <div className={styles.Box}>
            <div className={styles.title}>QR 코드 관리</div>

            <div className={styles.tableHeader}>
              <div className={styles.column}>건물 이름</div>
              <div className={styles.column}>QR 이미지</div>
              <div className={styles.column}>URL</div>
              <div className={styles.column}></div>
            </div>

            {paginatedQRCodes.map((qr) => (
              <div key={qr.id} className={styles.tableRow}>
                <div className={styles.column}>{qr.buildingName}</div>
                <div className={styles.column}>
                  {/* 이미지 URL로 표시 */}
                  <img
                    src={qr.imageUrl}
                    alt={qr.buildingName}
                    className={styles.qrImage}
                  />
                </div>
                <div className={styles.column}>
                  {/* URL 표시 */}
                  <span>{qr.imageUrl}</span> {/* URL 그대로 표시 */}
                </div>
                <div className={styles.column}>
                  <div className={styles.button}>
                    <UpdateButton onClick={() => handleUpdateClick(qr)} />
                    <DeleteButton onClick={() => handleDeleteClick(qr)} />
                  </div>
                </div>
              </div>
            ))}

            {showConfirm && selectedQR && (
              <DeleteConfirmPopup
                message={`${selectedQR.buildingName} QR 코드를 정말 삭제하시겠습니까?`}
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

export default QRcodeManagementPage;
