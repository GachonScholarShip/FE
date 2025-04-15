import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import styles from "./ARViewPage.module.css";

function ARViewPage() {
  const location = useLocation();
  const { selectedBuilding } = location.state || {};  // 전달된 selectedBuilding 정보 받기
  const [roadview, setRoadview] = useState(null);

  useEffect(() => {
    if (!selectedBuilding) return;

    const loadNaverMapScript = () => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?clientId=YOUR_CLIENT_ID`;
      script.async = true;
      script.onload = () => initializeRoadview();  // API 로드 후 로드뷰 초기화
      document.head.appendChild(script);
    };

    const initializeRoadview = () => {
      const roadviewOptions = {
        position: new window.naver.maps.LatLng(37.5665, 126.9780),  // 기본 위치 (서울 중심)
      };

      const naverRoadview = new window.naver.maps.Roadview("roadview", roadviewOptions);
      setRoadview(naverRoadview);

      // 선택된 건물에 맞는 좌표로 수정 필요
      let buildingLocation = new window.naver.maps.LatLng(37.5700, 126.9850);  // 기본 위치

      // 선택된 건물에 맞는 좌표 설정
      if (selectedBuilding === "가천관") {
        buildingLocation = new window.naver.maps.LatLng(37.5665, 126.9780); // 가천관의 실제 좌표
      }

      // 로드뷰의 위치를 선택된 건물 위치로 설정
      naverRoadview.setPosition(buildingLocation);
    };

    loadNaverMapScript();

    // 클린업: 컴포넌트가 언마운트될 때 스크립트 제거
    return () => {
      const script = document.querySelector('script[src="https://openapi.map.naver.com/openapi/v3/maps.js?clientId=YOUR_CLIENT_ID"]');
      if (script) {
        script.remove();
      }
    };
  }, [selectedBuilding]);

  return (
    <div>
      <NavBar />
      <div className={styles.bg} />
      <div className={styles.content}>
        {/* 로드뷰 div */}
        <div id="roadview" className={styles.roadviewContent}></div>

        <div className={styles.qrBox}>
          <span className={styles.qrText}>휴대폰으로 보기</span>
          {/* <img src={qrIcon} alt="Qr" className={styles.icon} /> */}
        </div>
      </div>
    </div>
  );
}

export default ARViewPage;
