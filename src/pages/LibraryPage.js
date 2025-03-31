import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import styles from "./LibraryPage.module.css";

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
          onClick={() => handleNavigation("/library/eleclibrary")}
        >
          <span className={styles.buttonText}>전자정보도서관</span>
        </div>
        <div
          className={styles.button}
          onClick={() => handleNavigation("/library/centrallibrary")}
        >
          <span className={styles.buttonText}>중앙도서관</span>
        </div>
        </div>
    </div>
  );
}

export default LibraryPage;
