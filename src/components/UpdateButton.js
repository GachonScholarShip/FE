import React from "react";
import styles from "./UpdateButton.module.css";

function UpdateButton({ onClick }) {
  return (
    <div className={styles.button} onClick={onClick}>
      <span className={styles.text}>수정</span>
    </div>
  );
}

export default UpdateButton;
