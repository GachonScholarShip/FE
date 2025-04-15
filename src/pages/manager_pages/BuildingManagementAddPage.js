import React from "react";
import ManagerNavBar from "../../components/ManagerNavBar";
import SearchBar from "../../components/SearchBar";
import SaveButton from "../../components/SaveButton";
import styles from "./BuildingManagementAddPage.module.css";

function BuildingManagementAddPage() {
  return (
    <div>
      <ManagerNavBar />
      <div className={styles.bg}>
        <div className={styles.container}>
          <div className={styles.topBox}>
            <SearchBar placeholder="건물명을 입력해주세요" />
          </div>

          <div className={styles.bottomBox}>
            <div className={styles.title}>추가</div>
            <div className={styles.formContainer}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>건물명</label>
                  <select className={styles.select}>
                    <option value="">건물을 선택해주세요</option>
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
                  <label>이용 가능 여부</label>
                  <select className={styles.select}>
                    <option value="">선택해주세요</option>
                    <option value="가능">가능</option>
                    <option value="불가능">불가능</option>
                  </select>
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>최고층</label>
                  <input type="text" placeholder="최고층을 입력해주세요" />
                </div>
                <div className={styles.formGroup}>
                  <label>최하층</label>
                  <input type="text" placeholder="최하층을 입력해주세요" />
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

export default BuildingManagementAddPage;
