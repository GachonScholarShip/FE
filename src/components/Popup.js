import React from "react";
import styles from "./Popup.module.css";
import errorIcon from "../assets/error.svg";
import successIcon from "../assets/success.svg";

const Popup = ({ message, onClose, isSuccess }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <div className={styles.iconContainer}>
          <img
            src={isSuccess ? successIcon : errorIcon}
            alt={isSuccess ? "Success Icon" : "Error Icon"}
            width="40"
            height="40"
          />
        </div>
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  );
};

export default Popup;
