import React from "react";
import { useLocation } from "react-router-dom";
import ManagerNavBar from "../../components/ManagerNavBar";
import SaveButton from "../../components/SaveButton";
import styles from "./RoadviewManagementUpdatePage.module.css";

function RoadviewManagementUpdatePage() {
  const location = useLocation();
  const { id, url } = location.state || {};

  return (
    <div>
      <ManagerNavBar />
      <div className={styles.bg}>
        <div className={styles.container}>
          <div className={styles.Box}>
            <div className={styles.title}>수정</div>
            <div className={styles.formContainer}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>목적지</label>
                  <input type="text" defaultValue={id} />
                </div>
                <div className={styles.formGroup}>
                  <label>네이버 지도 URL (URL 단축 서비스 이용)</label>
                  <input type="text" defaultValue={url} />
                </div>
              </div>
            </div>
            <div className={styles.savebuttonContainer}>
              <SaveButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoadviewManagementUpdatePage;
