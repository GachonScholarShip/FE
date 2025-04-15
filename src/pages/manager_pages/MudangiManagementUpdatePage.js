import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ManagerNavBar from "../../components/ManagerNavBar";
import SaveButton from "../../components/SaveButton";
import styles from "./MudangiManagementUpdatePage.module.css";

function MudangiManagementUpdatePage() {
  const location = useLocation();
  const { id = "AM 9:00", available } = location.state || {};

  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [period, setPeriod] = useState("AM");

  useEffect(() => {
    const parts = id.split(" ");
    if (parts.length === 2) {
      const [ampm, time] = parts;
      const [h, m] = time.split(":");
      setPeriod(ampm);
      setHour(String(h).padStart(2, "0"));
      setMinute(String(m).padStart(2, "0"));
    }
  }, [id]);

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

  const handleHourChange = (e) => {
    setHour(e.target.value);
  };

  const handleMinuteChange = (e) => {
    setMinute(e.target.value);
  };

  const handlePeriodChange = (e) => {
    setPeriod(e.target.value);
  };

  const get12HourFormat = (hour) => {
    let intHour = parseInt(hour, 10);
    if (period === "PM" && intHour < 12) {
      intHour += 12;
    } else if (period === "AM" && intHour === 12) {
      intHour = 0;
    }
    return String(intHour).padStart(2, "0");
  };

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
                  <label>시간</label>
                  <div className={styles.timePicker}>
                    <select
                      value={period}
                      onChange={handlePeriodChange}
                      className={styles.timeSelect}
                    >
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                    <select
                      value={hour}
                      onChange={handleHourChange}
                      className={styles.timeSelect}
                    >
                      {Array.from({ length: 12 }, (_, index) => (
                        <option
                          key={index}
                          value={String(index === 0 ? 12 : index).padStart(
                            2,
                            "0"
                          )}
                        >
                          {String(index === 0 ? 12 : index).padStart(2, "0")}
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
              <SaveButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MudangiManagementUpdatePage;
