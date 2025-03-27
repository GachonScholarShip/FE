import React from "react";
import NavBar from "../components/NavBar";
import styles from "./ConversationPage.module.css";

function ConversationPage() {
  return (
    <div>
      <NavBar />
      <div className={styles.bg} />
    </div>
  );
}

export default ConversationPage;
