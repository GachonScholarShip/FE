import React from "react";
import NavBar from "../components/NavBar";
import styles from "./LibraryPage.module.css";

function LibraryPage() {
  return (
    <div>
      <NavBar />
      <div className={styles.bg} />
    </div>
  );
}

export default LibraryPage;
