import React from "react";
import NavBar from "../components/NavBar";
import styles from "./RoadPage.module.css";

function RoadPage() {
  return (
    <div>
      <NavBar />
      <div className={styles.bg} />
    </div>
  );
}

export default RoadPage;
