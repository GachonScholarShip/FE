import React from "react";
import NavBar from "../components/NavBar";
import styles from "./FloorPage.module.css";

function FloorPage() {
  return (
    <div>
      <NavBar />
      <div className={styles.bg} />
    </div>
  );
}

export default FloorPage;
