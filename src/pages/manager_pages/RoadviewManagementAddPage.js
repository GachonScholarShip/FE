import React from "react";
import ManagerNavBar from "../../components/ManagerNavBar";
import SaveButton from "../../components/SaveButton";
import styles from "./RoadviewManagementAddPage.module.css";
import { useState } from "react";

function RoadviewManagementAddPage() {
  const [selectedName, setSelectedName] = useState("");

  return (
    <div>
      <ManagerNavBar />
      <div className={styles.bg}>
        <div className={styles.container}>
          <div className={styles.Box}>
            <div className={styles.title}>추가</div>
            <div className={styles.formContainer}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>목적지</label>
                  <select
                    className={styles.select}
                    value={selectedName}
                    onChange={(e) => setSelectedName(e.target.value)}
                  >
                    <option value="">목적지를 선택해주세요</option>
                    <option value="가천관">가천관</option>
                    <option value="공과대학1">공과대학1</option>
                    <option value="공과대학2">공과대학2</option>
                    <option value="교육대학원">교육대학원</option>
                    <option value="글로벌센터">글로벌센터</option>
                    <option value="바이오나노연구원">바이오나노연구원</option>
                    <option value="바이오나노대학">바이오나노대학</option>
                    <option value="반도체대학">반도체대학</option>
                    <option value="법과대학">법과대학</option>
                    <option value="비전타워">비전타워</option>
                    <option value="예술체육대학1">예술체육대학1</option>
                    <option value="예술체육대학2">예술체육대학2</option>
                    <option value="한의과대학">한의과대학</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>네이버 지도 URL (URL 단축 서비스 이용)</label>
                  <input type="text" placeholder="URL을 입력해주세요" />
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

export default RoadviewManagementAddPage;
