import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AddButton.module.css";

function AddButton() {
  const navigate = useNavigate();

  const handleNavigation = () => {
    const currentPath = window.location.pathname;

    if (currentPath === "/ua") {
      navigate("/uaa");
    } else if (currentPath === "/cm") {
      navigate("/cma");
    } else if (currentPath === "/bm") {
      navigate("/bma");
    } else if (currentPath === "/mu") {
      navigate("/mua");
    } else if (currentPath === "/rm") {
      navigate("/rma");
    } else if (currentPath === "/rvm") {
      navigate("/rvma");
    } else if (currentPath === "/qrm") {
      navigate("/qrma");
    }
  };

  return (
    <div className={styles.button} onClick={handleNavigation}>
      <span className={styles.text}>추가</span>
    </div>
  );
}

export default AddButton;
