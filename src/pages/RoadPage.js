import React, { useState, useEffect, useRef } from "react";
import NavBar from "../components/NavBar";
import styles from "./RoadPage.module.css";
import mapImage from "../assets/gachomap.png";
import { useNavigate } from "react-router-dom";
import imageMapResize from "image-map-resizer";

const buildingCoords = [
  { name: "가천관", coords: [0.672, 0.489, 0.782, 0.657], shape: "rect" },
  { name: "산학협력관", coords: [0.787, 0.628, 0.895, 0.761], shape: "rect" },
  { name: "공과대학2", coords: [0.702, 0.775, 0.812, 0.915], shape: "rect" },
  { name: "한의과대학", coords: [0.638, 0.708, 0.721, 0.773], shape: "rect" },
  { name: "바이오나노연구원", coords: [0.577, 0.776, 0.692, 0.869], shape: "rect" },
  { name: "법과대학", coords: [0.628, 0.893, 0.672, 0.987], shape: "rect" },
  { name: "비전타워", coords: [0.488, 0.870, 0.625, 0.987], shape: "rect" },
  { name: "정문", coords: [0.352, 0.892, 0.480, 0.969], shape: "rect" },
  { name: "전자정보도서관", coords: [0.451, 0.767, 0.549, 0.702], shape: "rect" },
  { name: "반도체대학", coords: [0.284, 0.731, 0.438, 0.875], shape: "rect" },
  { name: "글로벌센터", coords: [0.150, 0.616, 0.265, 0.760], shape: "rect" },
  { name: "공과대학1", coords: [0.306, 0.555, 0.417, 0.705], shape: "rect" },
  { name: "학군단", coords: [0.392, 0.494, 0.454, 0.556], shape: "rect" },
  { name: "바이오나노대학", coords: [0.508, 0.495, 0.638, 0.621], shape: "rect" },
  { name: "예술.체육대학2", coords: [0.434, 0.419, 0.560, 0.492], shape: "rect" },
  { name: "예술.체육대학1", coords: [0.248, 0.347, 0.344, 0.506], shape: "rect" },
  { name: "대학원", coords: [0.344, 0.255, 0.415, 0.378], shape: "rect" },
  { name: "교육대학원", coords: [0.709, 0.238, 0.780, 0.409], shape: "rect" },
  { name: "중앙도서관", coords: [0.665, 0.114, 0.793, 0.221], shape: "rect" },
  { name: "학생회관", coords: [0.524, 0.058, 0.618, 0.121], shape: "rect" },
  { name: "학생생활관(기숙사)", coords: [0.129, 0.163, 0.229, 0.022], shape: "rect" },
  { name: "AI공학관", coords: [0.075, 0.310, 0.273, 0.168], shape: "rect" },
  { name: "잔디광장", coords: [0.635, 0.724, 0.553, 0.643], shape: "rect" },
  { name: "프리덤광장", coords: [0.526, 0.823, 0.575, 0.867], shape: "rect" },
  { name: "스타덤광장", coords: [0.445, 0.822, 0.518, 0.771], shape: "rect" },
  { name: "바람개비동산", coords: [0.445, 0.300, 0.692, 0.416], shape: "rect" },
  { name: "대운동장", coords: [0.207, 0.058, 0.456, 0.121], shape: "rect" }
];

const buildings = [
  "가천관", "산학협력관", "공과대학2", "한의과대학", "바이오나노연구원",
  "법과대학", "비전타워", "정문", "전자정보도서관", "반도체대학",
  "글로벌센터", "공과대학1", "학군단", "바이오나노대학", "예술.체육대학2",
  "예술.체육대학1", "대학원", "교육대학원", "중앙도서관", "학생회관",
  "학생생활관(기숙사)", "AI공학관"
];
const classBuildings = [
  "가천관", "공과대학2", "한의과대학", "바이오나노연구원",
  "법과대학", "비전타워", "반도체대학", "글로벌센터", "공과대학1", "바이오나노대학",
  "예술.체육대학2", "예술.체육대학1", "교육대학원", "AI공학관"
];

const etc = [
  "잔디광장", "프리덤광장", "스타덤광장", "바람개비동산", "대운동장"
];

function RoadPage() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [showFloorButton, setShowFloorButton] = useState(false);
  const navigate = useNavigate();
  const mapImageRef = useRef(null); // 이미지 요소에 대한 ref 생성

  useEffect(() => {
    const img = mapImageRef.current;

    const updateCoords = () => {
      if (!img) return;
      const width = img.clientWidth;
      const height = img.clientHeight;

      const map = document.querySelector(`map[name="campusMap"]`);
      if (!map) return;
      const areas = map.querySelectorAll('area');

      areas.forEach((area, index) => {
        try {
          const rawCoords = buildingCoords[index].coords;
          if (!rawCoords) return;

          const pixelCoords = rawCoords.map((val, i) =>
            i % 2 === 0 ? Math.round(val * width) : Math.round(val * height)
          );
          area.coords = pixelCoords.join(',');
        } catch (err) {
          console.warn('좌표 변환 실패:', err);
        }
      });
      imageMapResize(); // 좌표 업데이트 후 이미지 맵 리사이즈
    };

    const handleLoad = () => {
      updateCoords(); // 이미지 로드 후 초기 좌표 변환
      window.addEventListener("resize", updateCoords); // 창 크기 변경 시 업데이트
    };

    if (img && img.complete) {
      handleLoad(); // 이미지가 이미 로드된 경우 즉시 실행
    } else if (img) {
      img.addEventListener("load", handleLoad); // 이미지 로드 이벤트 리스너 등록
    }

    return () => {
      if (img) {
        img.removeEventListener("load", handleLoad); // 언마운트 시 이벤트 리스너 제거
        window.removeEventListener("resize", updateCoords);
      }
    };
  }, []);

  const handleBuildingClick = (event, building) => {
    event.preventDefault(); // 이미지맵 링크 방지
    const x = event.clientX + 50;
    const y = event.clientY + window.scrollY;
    setModalPosition({ x, y });
    setSelectedBuilding(building);
    setModalVisible(true);
    setShowFloorButton(classBuildings.includes(building));
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div>
      <NavBar />
      <div className={styles.bg} />
      <div className={styles.content}>
        <img
          ref={mapImageRef} // 이미지 요소에 ref 연결
          src={mapImage}
          alt="Campus Map"
          useMap="#campusMap"
          className={styles.map}
        />
        <map name="campusMap">
          {buildingCoords.map((item, index) => (
            <area
              key={index}
              alt={item.name}
              title={item.name}
              coords={item.coords.join(',')} // 초기에는 비율 좌표 문자열로 설정
              shape={item.shape}
              href="#"
              onClick={(event) => handleBuildingClick(event, item.name)}
            />
          ))}
        </map>
        <div className={styles.buildingList}>
          <ul>
            {buildings.map((building, index) => (
              <li
                key={`building-${index}`}
                className={styles.buildingItem}
                onClick={(event) => handleBuildingClick(event, building)}
              >
                {`${String.fromCharCode(65 + index)}. ${building}`}
              </li>
            ))}
            {etc.map((building, index) => (
              <li
                key={`etc-${index}`}
                className={styles.buildingItem}
                onClick={(event) => handleBuildingClick(event, building)}
              >
                {`${index + 1}. ${building}`}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {modalVisible && (
        <div
          className={styles.modal}
          style={{ top: `${modalPosition.y}px`, left: `${modalPosition.x}px` }}
        >
          <div className={styles.modalContent}>
            <h3>{selectedBuilding}</h3>
            <div className={styles.modalButtons} onClick={() => handleNavigation("/map")}>
              <button>지도 보기</button>
            </div>
            <div className={styles.modalButtons} onClick={() => handleNavigation("/ar")}>
              <button>로드뷰 보기</button>
            </div>
            {showFloorButton && (
              <div className={styles.modalButtons} onClick={() => handleNavigation(`/building/${selectedBuilding}/1`)}>
                <button>층별 안내</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default RoadPage;