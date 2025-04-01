import React, { useState } from "react";
import NavBar from "../components/NavBar";
import styles from "./RoadPage.module.css";
import mapImage from "../assets/gachomap.png";
import { useNavigate } from "react-router-dom";

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

  const handleBuildingClick = (event, building) => {
    const rect = event.target.getBoundingClientRect();
    const textRect = event.target.getBoundingClientRect();
    setModalPosition({
      x: textRect.right,
      y: rect.top + window.scrollY
    });
    setSelectedBuilding(building);
    setModalVisible(true);
    setShowFloorButton(classBuildings.includes(building));
  };
  
  const navigate = useNavigate();
  
    const handleNavigation = (path) => {
      navigate(path);
    };

  return (
    <div>
      <NavBar />
      <div className={styles.bg} />
      <div className={styles.content}>
        <img src={mapImage} alt="Campus Map" className={styles.map} />
        <div className={styles.buildingList}>
          <ul>
            {buildings.map((building, index) => {
              const prefix = buildings.includes(building) ? `${String.fromCharCode(65 + index)}. ` : ""; // A, B, C... 접두사 추가
              return (
                <li
                  key={index}
                  className={styles.buildingItem}
                  onClick={(event) => handleBuildingClick(event, building)}
                >
                  {prefix + building}
                </li>
              );
            })}
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
            <div
              className={styles.modalButtons}
              onClick={() => handleNavigation("/map")}
            >
              <button>지도 보기</button>
            </div>
            <div
              className={styles.modalButtons}
              onClick={() => handleNavigation("/ar")}
            >
              <button>로드뷰 보기</button>
            </div>
            {showFloorButton && (
              <div
                className={styles.modalButtons}
                onClick={() => handleNavigation(`/building/${selectedBuilding}/1`)}
              >
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
