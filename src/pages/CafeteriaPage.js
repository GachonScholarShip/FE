import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import styles from "./CafeteriaPage.module.css";

function LibraryPage() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div>
      <NavBar />
      <div className={styles.bg} />
      <div className={styles.buttonContainer}>
      <div
          className={styles.button}
          onClick={() => handleNavigation("/cafeteria/visionCafe")}
        >
          <span className={styles.buttonText}>비전타워 식당</span>
        </div>
        <div
          className={styles.button}
          onClick={() => handleNavigation("/cafeteria/eduCafe")}
        >
          <span className={styles.buttonText}>교육대학원 식당</span>
        </div>
        <div
          className={styles.button}
          onClick={() => handleNavigation("/cafeteria/dormCafe")}
        >
          <span className={styles.buttonText}>학생생활관 식당</span>
        </div>
        </div>
    </div>
  );
}

export default LibraryPage;
