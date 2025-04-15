import React from "react";
import styles from "./DeleteButton.module.css";

function DeleteButton({ onClick }) {
  return (
    <div className={styles.button} onClick={onClick}>
      <span className={styles.text}>삭제</span>
    </div>
  );
}

export default DeleteButton;
