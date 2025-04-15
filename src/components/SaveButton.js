import React from "react";
import styles from "./SaveButton.module.css";

function SaveButton({ onClick }) {
  return (
    <div className={styles.button} onClick={onClick}>
      <span className={styles.text}>저장</span>
    </div>
  );
}

export default SaveButton;
