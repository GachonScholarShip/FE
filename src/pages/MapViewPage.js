import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import styles from "./MapViewPage.module.css";

function MapViewPage() {
  const location = useLocation();
  const { selectedBuilding } = location.state || {}; // 전달된 selectedBuilding 정보 받기
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (!selectedBuilding) return;

    const loadNaverMapScript = () => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?clientId=YOUR_CLIENT_ID`;
      script.async = true;
      script.onload = () => initializeMap(); // API 로드 후 지도 초기화
      document.head.appendChild(script);
    };

    const initializeMap = () => {
      const mapOptions = {
        center: new window.naver.maps.LatLng(37.5665, 126.978), // 예시로 서울 중심
        zoom: 14,
      };

      const naverMap = new window.naver.maps.Map("map", mapOptions);
      setMap(naverMap);

      const startLocation = new window.naver.maps.LatLng(37.5665, 126.978); // 키오스크 위치 예시
      let endLocation = new window.naver.maps.LatLng(37.57, 126.985); // 선택된 건물의 기본 위치

      // 선택된 건물에 맞는 좌표로 수정 필요
      if (selectedBuilding === "가천관") {
        endLocation = new window.naver.maps.LatLng(37.5665, 126.978); // 가천관의 실제 좌표
      }

      // 경로 요청
      const directionsService = new window.naver.maps.DirectionsService();
      directionsService.route(
        {
          origin: startLocation,
          destination: endLocation,
        },
        (response, status) => {
          if (status === "OK") {
            // DirectionsStatus.OK -> 'OK'로 수정
            const route = response.routes[0];
            const polyline = new window.naver.maps.Polyline({
              path: route.path,
              strokeColor: "#0033FF",
              strokeOpacity: 0.8,
              strokeWeight: 5,
            });
            polyline.setMap(naverMap);
          } else {
            console.error("경로를 찾을 수 없습니다. 오류: ", status);
          }
        }
      );
    };

    loadNaverMapScript();

    // 클린업: 컴포넌트가 언마운트될 때 스크립트 제거
    return () => {
      const script = document.querySelector(
        'script[src="https://openapi.map.naver.com/openapi/v3/maps.js?clientId=YOUR_CLIENT_ID"]'
      );
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
        {/* 지도 div */}
        <div id="map" className={styles.mapContent}></div>

        <div className={styles.qrBox}>
          <span className={styles.qrText}>휴대폰으로 보기</span>
          {/* <img src={qrIcon} alt="Qr" className={styles.icon} /> */}
        </div>
      </div>
    </div>
  );
}

export default MapViewPage;
