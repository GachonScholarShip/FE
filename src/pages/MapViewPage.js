import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import styles from "./MapViewPage.module.css";
import axios from "axios";

function MapViewPage() {
  const location = useLocation();
  const { selectedBuilding } = location.state || {}; // 전달된 selectedBuilding 정보 받기
  const [map, setMap] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  useEffect(() => {
    if (!selectedBuilding) return;

    const fetchMapviewData = async () => {
      try {
        const response = await axios.get(
          `http://110.15.135.250:8000/movement-service/member/direction/${selectedBuilding}`,
          {
            headers: {
              Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsInJvbGUiOiJBRE1JTiIsInN1YiI6IkF1dGhvcml6YXRpb24iLCJpYXQiOjE3NDU0MTE3NzMsImV4cCI6MTc1NDA1MTc3M30.VBuP9Li37A7YGPTlv3Jc2dn8E1h6WK2CBOUTxi92cZU",
              "Content-Type": "application/json",
            },
          }
        );
        setMap(response.data.data.url);
      } catch (error) {
        console.error("로드뷰 불러오기 실패:", error);
      }
    };

    const fetchQrCode = async () => {
      try {
        const response = await axios.get(
          `http://110.15.135.250:8000/movement-service/member/qrcode/${selectedBuilding}`,
          {
            headers: {
              Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsInJvbGUiOiJBRE1JTiIsInN1YiI6IkF1dGhvcml6YXRpb24iLCJpYXQiOjE3NDU0MTE3NzMsImV4cCI6MTc1NDA1MTc3M30.VBuP9Li37A7YGPTlv3Jc2dn8E1h6WK2CBOUTxi92cZU",
              "Content-Type": "application/json",
            },
        }
      );
      // API 응답에서 imageUrl을 직접 받아와 상태에 할당
      setQrCodeUrl(response.data.data.imageUrl);
    } catch (error) {
      console.error("QR 코드 불러오기 실패:", error);
    }
  };

    fetchMapviewData();
    fetchQrCode();
  }, [selectedBuilding]);


    return (
      <div>
        <NavBar />
        <div className={styles.bg} />
        <div className={styles.content}>
          {/* 로드뷰 표시 */}
          {map ? (
            <iframe
              src={map}
              title="로드뷰"
              className={styles.mapContent}
              allowFullScreen
            />
          ) : (
            <div className={styles.mapContent}>지도를 불러오는 중입니다...</div>
          )}
  
          {/* QR 코드 박스 */}
          <div className={styles.qrBox}>
            <span className={styles.qrText}>휴대폰으로 보기</span>
            {qrCodeUrl && (
              <img src={qrCodeUrl} alt="Qr 코드" className={styles.qr} />
            )}
            {!qrCodeUrl && selectedBuilding && (
              <div className={styles.loading}>QR 코드 불러오는 중...</div>
            )}
            {!qrCodeUrl && !selectedBuilding && (
              <div>건물 정보를 불러오는 중...</div>
            )}
          </div>
        </div>
      </div>
    );
  }

export default MapViewPage;
