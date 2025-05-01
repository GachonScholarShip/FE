import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ManagerNavBar from "../../components/ManagerNavBar";
import SaveButton from "../../components/SaveButton";
import styles from "./MudangiManagementAddPage.module.css";

function MudangiManagementAddPage() {
  const [hour, setHour] = useState("09");
  const [minute, setMinute] = useState("00");
  const navigate = useNavigate();

  const handleHourChange = (e) => {
    setHour(e.target.value);
  };

  const handleMinuteChange = (e) => {
    setMinute(e.target.value);
  };

  const generateMinutesOptions = () => {
    const options = [];
    for (let i = 0; i < 60; i += 5) {
      options.push(
        <option key={i} value={String(i).padStart(2, "0")}>
          {String(i).padStart(2, "0")}
        </option>
      );
    }
    return options;
  };

  const handleSave = async () => {
    const timeslot = `${hour}:${minute}`;

    try {
      const response = await axios.post(
        "http://110.15.135.250:8000/movement-service/admin/mudang",
        { timeslot },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsInJvbGUiOiJBRE1JTiIsInN1YiI6IkF1dGhvcml6YXRpb24iLCJpYXQiOjE3NDU0MTE3NzMsImV4cCI6MTc1NDA1MTc3M30.VBuP9Li37A7YGPTlv3Jc2dn8E1h6WK2CBOUTxi92cZU",
          },
        }
      );

      alert(response.data.message);
      navigate("/mu");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        console.error("Error:", error);
        alert("서버에 연결할 수 없습니다.");
      }
    }
  };

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
                  <label>시간</label>
                  <div className={styles.timePicker}>
                    <select
                      value={hour}
                      onChange={handleHourChange}
                      className={styles.timeSelect}
                    >
                      {Array.from({ length: 24 }, (_, index) => (
                        <option
                          key={index}
                          value={String(index).padStart(2, "0")}
                        >
                          {String(index).padStart(2, "0")}
                        </option>
                      ))}
                    </select>
                    <span>:</span>
                    <select
                      value={minute}
                      onChange={handleMinuteChange}
                      className={styles.timeSelect}
                    >
                      {generateMinutesOptions()}
                    </select>
                  </div>
                </div>

                <div className={styles.formGroupEmpty}></div>
              </div>
            </div>
            <div className={styles.savebuttonContainer}>
              <SaveButton onClick={handleSave} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MudangiManagementAddPage;
