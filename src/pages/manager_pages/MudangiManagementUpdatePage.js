import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ManagerNavBar from "../../components/ManagerNavBar";
import SaveButton from "../../components/SaveButton";
import styles from "./MudangiManagementUpdatePage.module.css";

function MudangiManagementUpdatePage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { id = "09:00", available, mudangId } = location.state || {};

  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");

  useEffect(() => {
    if (!mudangId) {
      alert("잘못된 접근입니다. 무당 ID가 없습니다.");
      navigate("/mu");
      return;
    }

    if (id) {
      const parts = id.split(":");
      if (parts.length === 2) {
        const [h, m] = parts;
        setHour(String(h).padStart(2, "0"));
        setMinute(String(m).padStart(2, "0"));
      }
    }
  }, [id, mudangId, navigate]);

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

  const handleSave = async () => {
    const timeslot = `${hour}:${minute}`;

    if (!hour || !minute) {
      alert("시간을 올바르게 입력해주세요.");
      return;
    }

    try {
      const token =
        "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsInJvbGUiOiJBRE1JTiIsInN1YiI6IkF1dGhvcml6YXRpb24iLCJpYXQiOjE3NDU0MTE3NzMsImV4cCI6MTc1NDA1MTc3M30.VBuP9Li37A7YGPTlv3Jc2dn8E1h6WK2CBOUTxi92cZU";

      if (!token) {
        alert("인증 토큰이 없습니다. 로그인 해주세요.");
        return;
      }

      const response = await axios.patch(
        "http://110.15.135.250:8000/movement-service/admin/mudang",
        {
          mudangId,
          timeslot,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.code === 200) {
        alert(response.data.message);
        navigate("/mu");
      } else {
        alert(response.data.message);
      }
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
            <div className={styles.title}>수정</div>
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

export default MudangiManagementUpdatePage;
