import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import styles from "./MainPage.module.css";

import roadIcon from "../assets/road.svg";
import floorIcon from "../assets/floor.svg";
import libraryIcon from "../assets/library.svg";
import conversationIcon from "../assets/conversation.svg";

function MainPage() {
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
          onClick={() => handleNavigation("/road")}
        >
          <img src={roadIcon} alt="Road" className={styles.icon} />
          <span className={styles.buttonText}>길찾기</span>
        </div>
        <div
          className={styles.button}
          onClick={() => handleNavigation("/building/비전타워/1")}
        >
          <img src={floorIcon} alt="Floor" className={styles.icon} />
          <span className={styles.buttonText}>층별 안내</span>
        </div>
        <div
          className={styles.button}
          onClick={() => handleNavigation("/library")}
        >
          <img src={libraryIcon} alt="Library" className={styles.icon} />
          <span className={styles.buttonText}>도서관</span>
        </div>
        <div
          className={styles.button}
          onClick={() => handleNavigation("/conversation")}
        >
          <img
            src={conversationIcon}
            alt="Conversation"
            className={styles.icon}
          />
          <span className={styles.buttonText}>AI 대화</span>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
