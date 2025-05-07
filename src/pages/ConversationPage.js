import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import styles from "./ConversationPage.module.css";
import profile from "../assets/ai profile.png";
import axios from "axios";

function ConversationPage() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [busTime, setBusTime] = useState(""); // 현재 무당이 도착 예정 시간
  const [nextBusTimes, setNextBusTimes] = useState([]); // 다음 무당이 시간 (현재 이후 5개)
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
        console.log("무당이 현재 시간표 API 응답:", data);
  
        if (data.code === 200) {
          setErrorMessage(""); // 에러 메시지 초기화
          setBusTime(data.data); // 도착 시간 설정
          fetchNextBusSchedule();
        } else if (data.code === 400) {
          setBusTime("");
          setNextBusTimes([]);
          setErrorMessage(data.message || "알 수 없는 오류가 발생했습니다."); // data.message 사용
        } else {
          setBusTime("");
          setNextBusTimes([]);
          setErrorMessage(data.message || "알 수 없는 오류가 발생했습니다."); // data.message 사용
        }
      } else {
        let errorMessageToShow = response.data?.message || "버스 시간 정보를 가져오는 데 실패했습니다.";
        setErrorMessage(errorMessageToShow); // 서버에서 받은 에러 메시지를 사용
        setBusTime("");
        setNextBusTimes([]);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "버스 시간 정보를 가져오는 데 실패했습니다.");
      console.error("버스 시간 가져오기 실패:", error);
      setBusTime("");
      setNextBusTimes([]);
    }
  };
  

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
  
      console.log("다음 무당이 시간표 API 응답 (전체):", response); // 추가
      if (response.status === 200) {
        const data = response.data;
        console.log("다음 무당이 시간표 API 응답 (data):", data); // 추가
  
        if (data.code === 200 && Array.isArray(data.data)) {
          filterUpcomingNextBusTimes(data.data); // 다음 무당이 시간 필터링
        } else {
          setNextBusTimes([]); // 배열이 아니면 빈 배열로 처리
          setErrorMessage(data.message || "다음 무당이 시간 데이터 형식이 올바르지 않습니다."); // data.message 사용
        }
      } else {
        setErrorMessage(response.data?.message || "다음 무당이 시간 정보를 가져오는 데 실패했습니다.");
        setNextBusTimes([]);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "다음 무당이 시간 정보를 가져오는 데 실패했습니다.");
      console.error("다음 무당이 시간 가져오기 실패:", error);
      setNextBusTimes([]);
    }
  };
  

  const filterUpcomingNextBusTimes = (times) => {
    const currentTime = new Date(); // 현재 로컬 시간
    const currentTimeString = `${currentTime.getHours()}:${currentTime.getMinutes() < 10 ? '0' + currentTime.getMinutes() : currentTime.getMinutes()}`;
  
    // 서버에서 반환된 timeslot이 GMT 시간이라면, 이를 한국 시간(KST)으로 변환하여 비교
    const upcomingTimes = times
      .filter((timeSlot) => {
        // GMT 시간을 Date 객체로 변환
        const gmtTime = new Date(timeSlot.timeslot);  // 서버에서 받은 GMT 시간 (ISO 8601 형식일 경우)
        
        // 한국 시간(KST)으로 변환: GMT 시간에 9시간을 더함
        const koreaTime = new Date(gmtTime.getTime() + 9 * 60 * 60 * 1000);  // 9시간을 밀리초로 더함
        const koreaTimeString = `${koreaTime.getHours()}:${koreaTime.getMinutes() < 10 ? '0' + koreaTime.getMinutes() : koreaTime.getMinutes()}`;
  
        return koreaTimeString > currentTimeString;  // 한국 시간대에서 비교
      })
      .map((timeSlot) => timeSlot.timeslot)  // timeslot만 추출
      .sort();  // 시간 순으로 정렬
  
    // 가장 빠른 다음 버스 제외하고 5개만 선택
    const nextFiveTimes = upcomingTimes.slice(1, 6);
    setNextBusTimes(nextFiveTimes);  // 상태 업데이트
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

                {/* "다음 무당이" 시간 5개 출력 (가장 빠른 다음 버스 제외) */}
                <h4 className={styles.nextBusTextWrapper}>
                  <span className={styles.nextBusText}>
                    &lt; 다음 무당이 &gt;
                  </span>
                </h4>
                <ul className={styles.busTimesList}>
                  {nextBusTimes.length > 0 ? (
                    nextBusTimes.map((time, index) => (
                      <li key={index} className={styles.nextBusItem}>
                        🐞 {time}
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