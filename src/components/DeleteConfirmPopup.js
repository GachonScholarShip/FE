import React from "react";
import styles from "./DeleteConfirmPopup.module.css";
import errorIcon from "../assets/error.svg";

const DeleteConfirmPopup = ({ message, onConfirm, onCancel }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <button className={styles.closeButton} onClick={onCancel}>
          &times;
        </button>
        <div className={styles.iconContainer}>
          <img src={errorIcon} alt="Error Icon" width="40" height="40" />
        </div>
        <p className={styles.message}>{message}</p>
        <div className={styles.buttonContainer}>
          <button className={styles.confirmButton} onClick={onConfirm}>
            예
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmPopup;
