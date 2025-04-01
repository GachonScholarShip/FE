import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import styles from "./FloorPage.module.css";

const floorPlans = {
  비전타워: {
    B3 : require("../assets/visiontowerB3.png"),
    B2 : require("../assets/visiontowerB2.png"),
    B1 : require("../assets/visiontowerB1.png"),
    1 : require("../assets/visiontower1.png"),
    2 : require("../assets/visiontower1.png"),
    3: require("../assets/visiontower3.png"),
    4: require("../assets/visiontower4.png"),
    5 : require("../assets/visiontower1.png"),
    6 : require("../assets/visiontower1.png"),
    7 : require("../assets/visiontower1.png"),
  },
  가천관: {
    B1 : require("../assets/visiontowerB3.png"),
    1 : require("../assets/visiontowerB3.png"),
    2 : require("../assets/visiontowerB3.png"),
    3 : require("../assets/visiontowerB3.png"),
    4 : require("../assets/visiontowerB3.png"),
    5 : require("../assets/visiontowerB3.png"),
    6 : require("../assets/visiontowerB3.png"),
    7 : require("../assets/visiontowerB3.png"),
    8 : require("../assets/visiontowerB3.png"),
  },

  공과대학2: {
    1 : require("../assets/visiontowerB3.png"),
    2 : require("../assets/visiontowerB3.png"),
    3 : require("../assets/visiontowerB3.png"),
    4 : require("../assets/visiontowerB3.png"),
    5 : require("../assets/visiontowerB3.png"),
    6 : require("../assets/visiontowerB3.png"),
  },

  한의과대학: {
    1 : require("../assets/visiontowerB3.png"),
    2 : require("../assets/visiontowerB3.png"),
    3 : require("../assets/visiontowerB3.png"),
  },

  바이오나노연구원: {
    1 : require("../assets/visiontowerB3.png"),
    2 : require("../assets/visiontowerB3.png"),
    3 : require("../assets/visiontowerB3.png"),
    4 : require("../assets/visiontowerB3.png"),
    5 : require("../assets/visiontowerB3.png"),
  },

  법과대학: {
    1 : require("../assets/visiontowerB3.png"),
    2 : require("../assets/visiontowerB3.png"),
    3 : require("../assets/visiontowerB3.png"),
    4 : require("../assets/visiontowerB3.png"),
    5 : require("../assets/visiontowerB3.png"),
  },

  반도체대학: {
    1 : require("../assets/visiontowerB3.png"),
    2 : require("../assets/visiontowerB3.png"),
    3 : require("../assets/visiontowerB3.png"),
    4 : require("../assets/visiontowerB3.png"),
    5 : require("../assets/visiontowerB3.png"),
  },

  글로벌센터: {
    1 : require("../assets/visiontowerB3.png"),
    2 : require("../assets/visiontowerB3.png"),
    3 : require("../assets/visiontowerB3.png"),
    4 : require("../assets/visiontowerB3.png"),
    5 : require("../assets/visiontowerB3.png"),
  },

  공과대학1: {
    1 : require("../assets/visiontowerB3.png"),
    2 : require("../assets/visiontowerB3.png"),
    3 : require("../assets/visiontowerB3.png"),
    4 : require("../assets/visiontowerB3.png"),
    5 : require("../assets/visiontowerB3.png"),
  },

  바이오나노대학: {
    1 : require("../assets/visiontowerB3.png"),
    2 : require("../assets/visiontowerB3.png"),
    3 : require("../assets/visiontowerB3.png"),
    4 : require("../assets/visiontowerB3.png"),
    5 : require("../assets/visiontowerB3.png"),
  },

  '예술.체육대학2' : {
    1 : require("../assets/visiontowerB3.png"),
    2 : require("../assets/visiontowerB3.png"),
    3 : require("../assets/visiontowerB3.png"),
    4 : require("../assets/visiontowerB3.png"),
    5 : require("../assets/visiontowerB3.png"),
  },

  '예술.체육대학1': {
    1 : require("../assets/visiontowerB3.png"),
    2 : require("../assets/visiontowerB3.png"),
    3 : require("../assets/visiontowerB3.png"),
    4 : require("../assets/visiontowerB3.png"),
    5 : require("../assets/visiontowerB3.png"),
  },

  교육대학원: {
    1 : require("../assets/visiontowerB3.png"),
    2 : require("../assets/visiontowerB3.png"),
    3 : require("../assets/visiontowerB3.png"),
    4 : require("../assets/visiontowerB3.png"),
    5 : require("../assets/visiontowerB3.png"),
  },

  AI공학관: {
    1 : require("../assets/visiontowerB3.png"),
    2 : require("../assets/visiontowerB3.png"),
    3 : require("../assets/visiontowerB3.png"),
    4 : require("../assets/visiontowerB3.png"),
    5 : require("../assets/visiontowerB3.png"),
  },
  // 다른 건물 추가 
};


const buildings = [
  "가천관", "공과대학2", "한의과대학", "바이오나노연구원", "법과대학",
  "비전타워", "반도체대학", "글로벌센터", "공과대학1", "바이오나노대학",
  "예술.체육대학2", "예술.체육대학1", "교육대학원", "AI공학관"
];

function FloorPage() {
  const { building = "비전타워", floor = "1" } = useParams();
  const navigate = useNavigate();

  function handleBuildingClick(building) {
    navigate(`/building/${building}/1`);
  }
  
  function handleFloorClick(floor) {
    navigate(`/building/${building}/${floor}`);
  }

  const floorImage = floorPlans[building]?.[floor] || floorPlans["비전타워"][1]; // 기본값은 비전타워 1층

  return (
    <div>
      <NavBar />
      <div className={styles.bg} />
      <div className={styles.content}>
        <div className={styles.titleBox}>
          <h2 className={styles.title}>{building} {floor}층</h2>
        </div>

        <div className={styles.mainContainer}>
          <img
            src={floorImage}
            alt={`${building} ${floor}층`}
            className={styles.floorImage}
          />

          <div className={styles.floorList}>
            <ul>
              {Object.keys(floorPlans[building] || {}).map((fl) => (
                <li 
                  key={fl} 
                  onClick={() => handleFloorClick(fl)}
                  className={fl === floor ? `${styles.floorItem} ${styles.active}` : styles.floorItem}
                >
                  {fl}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.buildingList}>
          <ul>
            {buildings.map((bld, index) => (
              <li
                key={index}
                onClick={() => handleBuildingClick(bld)}
                className={bld === building ? `${styles.buildingItem} ${styles.active}` : styles.buildingItem}
              >
                {bld}
              </li>
            ))}
          </ul>
        </div>
        </div>
      </div>
    </div>
  );
}

export default FloorPage;
