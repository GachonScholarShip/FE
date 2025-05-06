import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import styles from "./ConversationPage.module.css";
import profile from "../assets/ai profile.png";
import axios from "axios";

function ConversationPage() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [busTime, setBusTime] = useState(""); // 현재 무당이 도착 예정 시간
  const [nextBusTimes, setNextBusTimes] = useState([]); // 다음 무당이 시간
  const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지

  // 무당이 도착 시간 가져오기
  const fetchBusSchedule = async () => {
    try {
      const response = await axios.get(
        `http://110.15.135.250:8000/movement-service/member/mudang`,
        {
          headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsInJvbGUiOiJBRE1JTiIsInN1YiI6IkF1dGhvcml6YXRpb24iLCJpYXQiOjE3NDU0MTE3NzMsImV4cCI6MTc1NDA1MTc3M30.VBuP9Li37A7YGPTlv3Jc2dn8E1h6WK2CBOUTxi92cZU",
              "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        console.log("무당이 시간표 API 응답:", data);

        if (data.code === 200) {
          setErrorMessage("");
          setBusTime(data.data); // 도착 예정 시간 설정
          fetchNextBusSchedule(); // 다음 무당이 시간 가져오기
        } else {
          setBusTime(""); // 예외 처리
          setErrorMessage(data.message); // 예외 메시지 처리
        }
      } else {
        setErrorMessage("버스 시간 정보를 가져오는 데 실패했습니다.");
      }
    } catch (error) {
      setErrorMessage("버스 시간 정보를 가져오는 데 실패했습니다.");
      console.error("버스 시간 가져오기 실패:", error);
    }
  };

  // 다음 무당이 시간 가져오기
  const fetchNextBusSchedule = async () => {
    try {
      const response = await axios.get(
        `http://110.15.135.250:8000/movement-service/admin/mudang?pageNum=0&pageSize=10`,
        {
          headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsInJvbGUiOiJBRE1JTiIsInN1YiI6IkF1dGhvcml6YXRpb24iLCJpYXQiOjE3NDU0MTE3NzMsImV4cCI6MTc1NDA1MTc3M30.VBuP9Li37A7YGPTlv3Jc2dn8E1h6WK2CBOUTxi92cZU",
              "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        console.log("다음 무당이 시간:", data);

        if (data.code === 200 && Array.isArray(data.data)) {
          filterUpcomingTimes(data.data); // 시간대 목록 필터링
        } else {
          setNextBusTimes([]); // 배열이 아니면 빈 배열로 처리
          setErrorMessage("무당이 시간 데이터가 배열이 아닙니다.");
        }
      } else {
        setErrorMessage("다음 무당이 시간 정보를 가져오는 데 실패했습니다.");
      }
    } catch (error) {
      setErrorMessage("다음 무당이 시간 정보를 가져오는 데 실패했습니다.");
      console.error("다음 무당이 시간 가져오기 실패:", error);
    }
  };

  // 현재 시간 이후의 무당이 시간 필터링
  const filterUpcomingTimes = (times) => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    const currentTimeString = `${currentHour}:${currentMinute < 10 ? "0" + currentMinute : currentMinute}`;

    // 현재 시간 이후의 시간만 필터링
    const upcomingTimes = times.filter((timeSlot) => {
      return timeSlot.timeslot > currentTimeString;
    });

    setNextBusTimes(upcomingTimes); // 상태 업데이트
  };

  useEffect(() => {
    fetchBusSchedule(); // 컴포넌트가 마운트되면 버스 시간 정보 가져오기
  }, []);

  // AI 답변 처리 함수
  const fetchChatResponse = async (userMessage) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ response: `GC: ${userMessage}에 대한 답변입니다.` });
      }, 1000);
    });
  };

  // 메시지 전송 처리
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const currentTime = new Date().toLocaleTimeString(); // 메시지 전송 시간

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: inputMessage, sender: "user", time: currentTime },
    ]);
    setInputMessage("");

    const aiResponse = await fetchChatResponse(inputMessage);
    const aiResponseTime = new Date().toLocaleTimeString(); // AI 답변 시간

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: aiResponse.response, sender: "ai", time: aiResponseTime },
    ]);
  };

  return (
    <div>
      <NavBar />
      <div className={styles.bg} />
      <div className={styles.content}>
        <div className={styles.chatContent}>
          <div className={styles.messages}>
            {messages.map((msg, index) => (
              <div key={index} className={styles.messageWrapper}>
              {msg.sender === "ai" && (
                <div className={styles.aiProfile}>
                  <img src={profile} alt="AI Profile" className={styles.profileImage} />
                </div>
              )}
              <div
                className={
                  msg.sender === "user"
                    ? styles.messageRowRight
                    : styles.messageRowLeft
                }
              >
                {msg.sender === "user" ? (
                  <>
                    <div className={styles.userMessage}>{msg.text}</div>
                    <div className={styles.messageTime}>{msg.time}</div>
                  </>
                ) : (
                  <>
                    <div className={styles.aiMessage}>{msg.text}</div>
                    <div className={styles.messageTime}>{msg.time}</div>
                  </>
                )}
              </div>
            </div>            
            ))}
          </div>

          {/* 입력창 고정 */}
          <div className={styles.inputContent}>
            <input
              type="text"
              placeholder="Send a message"
              className={styles.input}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
          </div>
        </div>

        <div className={styles.busContent}>
          <span className={styles.busText}>무당이 시간표</span>
          <div className={styles.busBox}>
            {errorMessage ? (
              <div className={styles.error}>{errorMessage}</div>
            ) : (
              <div className={styles.busTime}>
                {/* 무당이 도착 예정 시간 출력 */}
                {busTime && (
                  <div>
                    <h4>
                      <span style={{ color: 'red', fontWeight: 'bold' }}>! </span>
                      {busTime}
                      <span style={{ color: 'red', fontWeight: 'bold' }}> !</span>
                    </h4>
                  </div>
                )}

                {/* "다음 무당이" 시간 5개 출력 */}
                <h4 className={styles.nextBusTextWrapper}>
                  <span className={styles.nextBusText}>
                    &lt; 다음 무당이 &gt;
                  </span>
                </h4>
                <ul className={styles.busTimesList}>
                  {nextBusTimes.length > 0 ? (
                    nextBusTimes.map((bus, index) => (
                      <li key={index} className={styles.nextBusItem}>
                      🐞 {bus.timeslot}
                    </li>
                    ))
                  ) : (
                    <li className={styles.noNextBus}>현재 이후의 시간이 없습니다.</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConversationPage;
