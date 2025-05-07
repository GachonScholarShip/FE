import React, { useState, useEffect, useRef, useCallback } from "react";
import NavBar from "../components/NavBar";
import styles from "./RoadPage.module.css";
import mapImage from "../assets/gachomap.png";
import { useNavigate } from "react-router-dom";

const buildingCoords = [
  { name: "가천관", coords: [0.679, 0.487, 0.726, 0.465, 0.783, 0.534, 0.781, 0.644, 0.727, 0.667, 0.675, 0.616], shape: "poly" },
  { name: "산학협력관", coords: [0.785, 0.640, 0.822, 0.627, 0.893, 0.698, 0.891, 0.772, 0.850, 0.784, 0.786, 0.707], shape: "poly" },
  { name: "공과대학2", coords: [0.696, 0.829, 0.759, 0.769, 0.779, 0.769, 0.791, 0.758, 0.814, 0.758, 0.814, 0.821, 0.718, 0.902, 0.696, 0.894], shape: "poly" },
  { name: "한의과대학", coords: [0.634, 0.733, 0.642, 0.712, 0.704, 0.699, 0.714, 0.721, 0.714, 0.758, 0.657, 0.786, 0.649, 0.770, 0.639, 0.783, 0.629, 0.760], shape: "poly" },
  { name: "바이오나노연구원", coords: [0.580, 0.792, 0.583, 0.835, 0.662, 0.885, 0.688, 0.869, 0.688, 0.823, 0.657, 0.798, 0.651, 0.783, 0.642, 0.783, 0.608, 0.774], shape: "poly" },
  { name: "법과대학", coords: [0.624, 0.910, 0.638, 0.919, 0.637, 0.934, 0.627, 0.938, 0.627, 0.987, 0.641, 0.987, 0.673, 0.967, 0.672, 0.919, 0.665, 0.909, 0.657, 0.897, 0.643, 0.894, 0.626, 0.887], shape: "poly" },
  { name: "전자정보도서관", coords: [0.431, 0.729, 0.429, 0.755, 0.442, 0.751, 0.456, 0.777, 0.491, 0.755, 0.533, 0.797, 0.573, 0.760, 0.549, 0.737, 0.549, 0.720, 0.539, 0.712, 0.529, 0.715, 0.519, 0.706, 0.505, 0.694], shape: "poly" },
  { name: "반도체대학", coords: [0.289, 0.738, 0.288, 0.828, 0.398, 0.897, 0.452, 0.853, 0.438, 0.835, 0.438, 0.784, 0.320, 0.713], shape: "poly" },
  { name: "글로벌센터", coords: [0.140, 0.644, 0.138, 0.735, 0.223, 0.783, 0.274, 0.735, 0.270, 0.643, 0.212, 0.612, 0.172, 0.627, 0.150, 0.617], shape: "poly" },
  { name: "공과대학1", coords: [0.320, 0.567, 0.307, 0.637, 0.302, 0.708, 0.311, 0.717, 0.319, 0.709, 0.350, 0.728, 0.367, 0.697, 0.367, 0.629, 0.371, 0.580, 0.330, 0.553], shape: "poly" },
  { name: "학군단", coords: [0.391, 0.502, 0.395, 0.562, 0.421, 0.569, 0.422, 0.587, 0.443, 0.591, 0.458, 0.571, 0.458, 0.516, 0.417, 0.506, 0.408, 0.492, 0.398, 0.491], shape: "poly" },
  { name: "바이오나노대학", coords: [0.549, 0.493, 0.545, 0.507, 0.545, 0.519, 0.519, 0.528, 0.518, 0.560, 0.501, 0.572, 0.537, 0.609, 0.553, 0.615, 0.566, 0.610, 0.606, 0.579, 0.622, 0.566, 0.638, 0.572, 0.647, 0.560, 0.655, 0.572, 0.667, 0.580, 0.672, 0.570, 0.689, 0.558, 0.693, 0.521, 0.675, 0.505, 0.667, 0.493, 0.650, 0.483, 0.634, 0.475, 0.617, 0.465, 0.584, 0.455, 0.558, 0.445, 0.533, 0.437, 0.507, 0.431, 0.496, 0.423, 0.485, 0.417], shape: "poly" },
  { name: "예술.체육대학2", coords: [0.453, 0.436, 0.435, 0.477, 0.436, 0.507, 0.458, 0.513, 0.458, 0.536, 0.559, 0.483, 0.560, 0.436, 0.547, 0.426, 0.498, 0.425, 0.480, 0.401, 0.478, 0.407], shape: "poly" },
  { name: "예술.체육대학1", coords: [0.246, 0.401, 0.318, 0.319, 0.342, 0.329, 0.343, 0.374, 0.380, 0.388, 0.378, 0.447, 0.320, 0.522, 0.248, 0.499], shape: "poly" },
  { name: "대학원", coords: [0.342, 0.329, 0.343, 0.371, 0.373, 0.377, 0.417, 0.308, 0.412, 0.258, 0.382, 0.238, 0.322, 0.319], shape: "poly" },
  { name: "교육대학원", coords: [0.747, 0.226, 0.710, 0.285, 0.716, 0.326, 0.754, 0.401, 0.779, 0.389, 0.783, 0.334, 0.768, 0.310, 0.773, 0.294, 0.778, 0.243], shape: "poly" },
  { name: "중앙도서관", coords: [0.668, 0.117, 0.666, 0.155, 0.722, 0.216, 0.778, 0.216, 0.796, 0.185, 0.793, 0.167, 0.765, 0.129, 0.727, 0.115], shape: "poly" },
  { name: "학생회관", coords: [0.528, 0.083, 0.527, 0.105, 0.576, 0.124, 0.602, 0.114, 0.604, 0.097, 0.578, 0.069, 0.558, 0.059], shape: "poly" },
  { name: "제2학생생활관", coords: [0.130, 0.115, 0.130, 0.169, 0.172, 0.180, 0.219, 0.117, 0.216, 0.076, 0.202, 0.085, 0.193, 0.080, 0.191, 0.066, 0.179, 0.058, 0.171, 0.067], shape: "poly" },
  { name: "AI공학관", coords: [0.222, 0.156, 0.188, 0.233, 0.190, 0.292, 0.228, 0.303, 0.256, 0.255, 0.262, 0.258, 0.271, 0.249, 0.271, 0.233, 0.262, 0.219, 0.277, 0.195, 0.279, 0.160, 0.248, 0.163], shape: "poly" },
  { name: "잔디광장", coords: [0.498, 0.679, 0.588, 0.744, 0.675, 0.692, 0.608, 0.624], shape: "poly" },
  { name: "프리덤광장", coords: [0.529, 0.838, 0.528, 0.848, 0.533, 0.864, 0.542, 0.867, 0.551, 0.862, 0.568, 0.879, 0.574, 0.873, 0.583, 0.873, 0.585, 0.886, 0.623, 0.909, 0.629, 0.901, 0.552, 0.844, 0.543, 0.833, 0.537, 0.833], shape: "poly" },
  { name: "스타덤광장", coords: [0.456, 0.779, 0.491, 0.757, 0.531, 0.808, 0.482, 0.836], shape: "poly" },
  { name: "바람개비동산", coords: [0.435, 0.359, 0.452, 0.312, 0.559, 0.312, 0.628, 0.309, 0.672, 0.335, 0.700, 0.379, 0.704, 0.449, 0.677, 0.508, 0.630, 0.465, 0.565, 0.408, 0.503, 0.408], shape: "poly" },
  { name: "대운동장", coords: [0.252, 0.098, 0.261, 0.119, 0.462, 0.119, 0.490, 0.087, 0.480, 0.072, 0.431, 0.062, 0.370, 0.058, 0.298, 0.058, 0.256, 0.078], shape: "poly" },
  { name: "제3학생생활관", coords: [0.126, 0.319, 0.179, 0.224, 0.178, 0.198, 0.122, 0.179, 0.065, 0.247, 0.073, 0.308], shape: "poly" },
  { name: "제1학생생활관", coords: [0.159, 0.060, 0.169, 0.064, 0.181, 0.053, 0.192, 0.062, 0.198, 0.078, 0.220, 0.056, 0.242, 0.060, 0.254, 0.044, 0.254, 0.030, 0.205, 0.016], shape: "poly" },
  { name: "비전타워", coords: [0.568, 0.883, 0.576, 0.874, 0.584, 0.877, 0.588, 0.890, 0.590, 0.893, 0.637, 0.920, 0.635, 0.931, 0.625, 0.936, 0.624, 0.989, 0.606, 0.995, 0.491, 0.930, 0.484, 0.871, 0.496, 0.839, 0.519, 0.826, 0.527, 0.840, 0.530, 0.851, 0.543, 0.857, 0.549, 0.851], shape: "poly" },
  { name: "정문", coords: [0.394, 0.905, 0.366, 0.939, 0.445, 0.987, 0.466, 0.948], shape: "poly" }
];

const buildings = [
  "가천관", "산학협력관", "공과대학2", "한의과대학", "바이오나노연구원",
  "법과대학", "비전타워", "정문", "전자정보도서관", "반도체대학",
  "글로벌센터", "공과대학1", "학군단", "바이오나노대학", "예술.체육대학2",
  "예술.체육대학1", "대학원", "교육대학원", "중앙도서관", "학생회관",
  "제3학생생활관", "제2학생생활관", "제1학생생활관", "AI공학관"
];
const classBuildings = [
  "가천관", "공과대학2", "한의과대학", "바이오나노연구원",
  "법과대학", "비전타워", "반도체대학", "글로벌센터", "공과대학1", "바이오나노대학",
  "예술.체육대학2", "예술.체육대학1", "교육대학원"
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

  const openModal = useCallback((buildingName, event) => {
    const img = mapImageRef.current;
    if (!img) return;
  
    const rect = img.getBoundingClientRect();
    const relativeX = (event.clientX - rect.left) / rect.width;
    const relativeY = (event.clientY - rect.top) / rect.height;
  
    setModalPosition({ x: relativeX, y: relativeY });
    setSelectedBuilding(buildingName);
    setShowFloorButton(classBuildings?.includes(buildingName) || false);
    setModalVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalVisible(false);
    setSelectedBuilding(null);
    setShowFloorButton(false);
  }, [setModalVisible, setSelectedBuilding, setShowFloorButton]);

  const handleNavigation = (path) => {
    if (path === "/ar" || path === "/map" && selectedBuilding) {
      navigate(path, { state: { selectedBuilding: selectedBuilding } });
    } else {
      navigate(path);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalVisible && !event.target.closest(`.${styles.modal}`)) {
        closeModal();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalVisible, closeModal]); // styles.modal은 useEffect 외부 스코프에서 정의되었으므로 dependency array에서 제거

  useEffect(() => {
    const img = mapImageRef.current;

    const updateCoords = () => {
      if (!img) return;

      const width = img.clientWidth;
      const height = img.clientHeight;

      const map = document.querySelector(`map[name="campusMap"]`);
      if (!map) return;

      const areas = map.querySelectorAll("area");

      areas.forEach((area, index) => {
        const coords = buildingCoords[index]?.coords;
        if (!coords || !Array.isArray(coords)) return;

        const scaledCoords = coords.map((val, i) =>
          i % 2 === 0 ? Math.round(val * width) : Math.round(val * height)
        );

        area.coords = scaledCoords.join(",");
      });
    };

    const handleResize = () => updateCoords();

    if (img && img.complete) {
      updateCoords();
    } else if (img) {
      img.addEventListener("load", updateCoords);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      if (img) {
        img.removeEventListener("load", updateCoords);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <NavBar />
      <div className={styles.bg} />
      <div className={styles.content}>
        <div className={styles.mapWrapper}>
          <img
            ref={mapImageRef}
            src={mapImage}
            alt="Campus Map"
            useMap="#campusMap"
            className={styles.map}
          />
        </div>
        <map name="campusMap">
          {buildingCoords.map((item, index) => (
            <area
              key={index}
              alt={item.name}
              title={item.name}
              coords={item.coords?.join(',')}
              shape={item.shape}
              href="#"
              onClick={(event) => openModal(item.name, event)}
            />
          ))}
        </map>
        <div className={styles.buildingList}>
          <ul>
            {buildings?.map((building, index) => (
              <li
                key={`building-${index}`}
                className={styles.buildingItem}
                onClick={(event) => openModal(building, event)}
              >
                {`${String.fromCharCode(65 + index)}. ${building}`}
              </li>
            ))}
            {etc?.map((building, index) => (
              <li
                key={`etc-${index}`}
                className={styles.buildingItem}
                onClick={(event) => openModal(building, event)}
              >
                {`${index + 1}. ${building}`}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {modalVisible && mapImageRef.current && (() => {
      const imgRect = mapImageRef.current.getBoundingClientRect();
      const modalX = imgRect.left + modalPosition.x * imgRect.width;
      const modalY = imgRect.top + modalPosition.y * imgRect.height;

      return (
        <div
          className={styles.modal}
          style={{
            position: 'absolute',
            top: `${modalY}px`,
            left: `${modalX}px`,
          }}
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
      );
    })()}
    </div>
  );
}

export default RoadPage;