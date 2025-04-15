import React from "react";
import ManagerNavBar from "../../components/ManagerNavBar";
import SearchBar from "../../components/SearchBar";
import SaveButton from "../../components/SaveButton";
import UserIcon from "../../assets/user.svg";
import styles from "./UserAccountAddPage.module.css";

function UserAccountAddPage() {
  return (
    <div>
      <ManagerNavBar />
      <div className={styles.bg}>
        <div className={styles.container}>
          <div className={styles.topBox}>
            <SearchBar placeholder="사용자를 입력해주세요" />
          </div>

          <div className={styles.bottomBox}>
            <div className={styles.title}>추가</div>
            <div className={styles.formContainer}>
              <div className={styles.iconAndFormRow}>
                <div className={styles.userIcon}>
                  <img
                    src={UserIcon}
                    alt="사용자 아이콘"
                    className={styles.userIconImg}
                  />
                </div>
                <div className={styles.inforForm}>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>사용자 이름</label>
                      <input type="text" placeholder="이름을 입력해주세요" />
                    </div>
                    <div className={styles.formGroup}>
                      <label>성별</label>
                      <select className={styles.select}>
                        <option value="">성별을 선택해주세요</option>
                        <option value="남">남</option>
                        <option value="여">여</option>
                      </select>
                    </div>
                  </div>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label>Email</label>
                      <input type="text" placeholder="Email을 입력해주세요" />
                    </div>
                    <div className={styles.formGroup}>
                      <label>학번</label>
                      <input type="text" placeholder="학번을 입력해주세요" />
                    </div>
                  </div>
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

export default UserAccountAddPage;
