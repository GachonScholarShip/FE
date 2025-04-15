import React from "react";
import ManagerNavBar from "../../components/ManagerNavBar";
import SearchBar from "../../components/SearchBar";
import SaveButton from "../../components/SaveButton";
import styles from "./ClassroomManagementAddPage.module.css";

function ClassroomManagementAddPage() {
  return (
    <div>
      <ManagerNavBar />
      <div className={styles.bg}>
        <div className={styles.container}>
          <div className={styles.topBox}>
            <SearchBar placeholder="강의실을 입력해주세요" />
          </div>

          <div className={styles.bottomBox}>
            <div className={styles.title}>추가</div>
            <div className={styles.formContainer}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>강의실</label>
                  <input type="text" placeholder="강의실을 입력해주세요" />
                </div>
                <div className={styles.formGroup}>
                  <label>강의명</label>
                  <input type="text" placeholder="강의명을 입력해주세요" />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>교수</label>
                  <input type="text" placeholder="교수명을 입력해주세요" />
                </div>
                <div className={styles.formGroup}>
                  <label>시간</label>
                  <input type="text" placeholder="시간을 입력해주세요" />
                </div>
              </div>

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
                  <label>층</label>
                  <select className={styles.select}>
                    <option value="">층 수를 선택해주세요</option>
                    <option value="B3">B3</option>
                    <option value="B2">B2</option>
                    <option value="B1">B1</option>
                    <option value="1F">1F</option>
                    <option value="2F">2F</option>
                    <option value="3F">3F</option>
                    <option value="4F">4F</option>
                    <option value="5F">5F</option>
                    <option value="6F">6F</option>
                    <option value="7F">7F</option>
                    <option value="8F">8F</option>
                    <option value="9F">9F</option>
                    <option value="10F">10F</option>
                    <option value="11F">11F</option>
                    <option value="12F">12F</option>
                  </select>
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

export default ClassroomManagementAddPage;
