import React, { useState, useEffect, useRef, useCallback } from "react";
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
  const [, setRemainingMinutes] = useState(null);
  const messagesEndRef = useRef(null); // messages 컨테이너에 대한 ref 생성

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom(); // 메시지가 업데이트될 때마다 스크롤
  }, [messages]);

  const filterUpcomingNextBusTimes = useCallback((times) => {
    const now = new Date();
    const nowKST = new Date(now.getTime() + now.getTimezoneOffset() * 60000 + 9 * 3600000); // UTC -> KST

    const upcomingTimes = times
      .map((timeSlot) => {
        const [hourStr, minuteStr] = timeSlot.timeslot.split(':');
        const hour = parseInt(hourStr, 10);
        const minute = parseInt(minuteStr, 10);

        const koreaTime = new Date(
          nowKST.getFullYear(),
          nowKST.getMonth(),
          nowKST.getDate(),
          hour,
          minute,
          0,
          0
        );
        return koreaTime;
      })
      .filter((koreaTime) => koreaTime > nowKST) // 현재 시간 이후의 시간만 필터링 (KST 기준)
      .sort((a, b) => a - b);

    console.log("✅ 필터링된 upcomingTimes (before):", upcomingTimes);

    // ✅ 현재 도착 예정 시간과 5분 차이 이내의 시간은 제외
    const currentArrivalTimeMatch = busTime.match(/(\d{1,2}):(\d{2})/);
    if (currentArrivalTimeMatch) {
      const currentHour = parseInt(currentArrivalTimeMatch[1], 10);
      const currentMinute = parseInt(currentArrivalTimeMatch[2], 10);
      const currentArrival = new Date(
        nowKST.getFullYear(),
        nowKST.getMonth(),
        nowKST.getDate(),
        currentHour,
        currentMinute
      );

      const filteredUpcomingTimes = upcomingTimes.filter(
        (upcomingTime) => Math.abs(upcomingTime.getTime() - currentArrival.getTime()) > 5 * 60000 // 5분 이상 차이나는 시간만 남김
      );
      console.log("✅ 필터링된 upcomingTimes (after):", filteredUpcomingTimes);
      const nextFiveTimes = filteredUpcomingTimes.slice(0, 5);
      setNextBusTimes(nextFiveTimes);
    } else {
      const nextFiveTimes = upcomingTimes.slice(0, 5);
      setNextBusTimes(nextFiveTimes);
    }

    // 현재 가장 가까운 도착 시간 업데이트 (busTime이 초기화되지 않았을 경우)
    if (!busTime && upcomingTimes.length > 0) {
      const nearestTime = upcomingTimes[0];
      const diffMs = nearestTime - nowKST;
      const diffMin = Math.round(diffMs / (1000 * 60));
      setBusTime(`${nearestTime.getHours().toString().padStart(2, '0')}:${nearestTime.getMinutes().toString().padStart(2, '0')}분 무당이가 ${diffMin}분 뒤 도착 예정입니다.`);
      setRemainingMinutes(diffMin);
    } else if (!busTime && upcomingTimes.length === 0) {
      setBusTime("현재 운행 중인 무당이가 없습니다.");
      setRemainingMinutes(null);
    }
  }, [busTime]);

  const fetchNextBusSchedule = useCallback(async () => {
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

      console.log("다음 무당이 시간표 API 응답 (전체):", response);
      if (response.status === 200) {
        const data = response.data;
        console.log("다음 무당이 시간표 API 응답 (data):", data);

        if (data.code === 200 && Array.isArray(data.data)) {
          filterUpcomingNextBusTimes(data.data);
        } else {
          setNextBusTimes([]);
          setErrorMessage(
            data.message || "다음 무당이 시간 데이터 형식이 올바르지 않습니다."
          );
        }
      } else {
        setErrorMessage(
          response.data?.message ||
            "다음 무당이 시간 정보를 가져오는 데 실패했습니다."
        );
        setNextBusTimes([]);
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "다음 무당이 시간 정보를 가져오는 데 실패했습니다."
      );
      console.error("다음 무당이 시간 가져오기 실패:", error);
      setNextBusTimes([]);
    }
  }, [filterUpcomingNextBusTimes]);

  // 무당이 도착 시간 가져오기
  const fetchBusSchedule = useCallback(async () => {
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
          setErrorMessage("");

          // ✅ 도착 시간 파싱 및 실제 남은 시간 계산 (서버 딜레이 고려)
          const match = data.data.match(/(\d{1,2}):(\d{2})분/);
          if (match) {
            const serverHour = parseInt(match[1], 10);
            const serverMinute = parseInt(match[2], 10);

            const now = new Date();
            const nowKST = new Date(now.getTime() + now.getTimezoneOffset() * 60000 + 9 * 3600000); // UTC -> KST

            const arrivalTimeServer = new Date(
              nowKST.getFullYear(),
              nowKST.getMonth(),
              nowKST.getDate(),
              serverHour,
              serverMinute
            );

            // 프론트에서 5분 딜레이 보정 (가정)
            const arrivalTimeActual = new Date(arrivalTimeServer.getTime() - 5 * 60000);

            const diffMs = arrivalTimeActual - nowKST;
            const diffMin = Math.round(diffMs / (1000 * 60));

            setBusTime(`${arrivalTimeActual.getHours().toString().padStart(2, '0')}:${arrivalTimeActual.getMinutes().toString().padStart(2, '0')}분 무당이가 ${diffMin}분 뒤 도착 예정입니다.`);
            setRemainingMinutes(diffMin);

            // 다음 무당이 시간표를 가져와서 업데이트
            fetchNextBusSchedule();
          }
        } else if (data.code === 400) {
          setBusTime("");
          setNextBusTimes([]);
          setErrorMessage(data.message || "알 수 없는 오류가 발생했습니다.");
        } else {
          setBusTime("");
          setNextBusTimes([]);
          setErrorMessage(data.message || "알 수 없는 오류가 발생했습니다.");
        }
      } else {
        let errorMessageToShow =
          response.data?.message || "버스 시간 정보를 가져오는 데 실패했습니다.";
        setErrorMessage(errorMessageToShow);
        setBusTime("");
        setNextBusTimes([]);
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "버스 시간 정보를 가져오는 데 실패했습니다."
      );
      console.error("버스 시간 가져오기 실패:", error);
      setBusTime("");
      setNextBusTimes([]);
    }
  }, [fetchNextBusSchedule]);

  useEffect(() => {
    fetchBusSchedule();

    const intervalId = setInterval(() => {
      // 1분마다 다음 도착 시간 업데이트 (기존 busTime이 설정된 경우)
      if (busTime) {
        fetchNextBusSchedule();
      }
    }, 60000); // 1분마다

    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 clearInterval
  }, [fetchBusSchedule, busTime, fetchNextBusSchedule]);

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
          <div className={styles.messages} ref={messagesEndRef}>
            {messages.map((msg, index) => (
              <div key={index} className={styles.messageWrapper}>
                {msg.sender === "ai" ? (
                  <div className={styles.aiMessageWrapper}>
                    <div className={styles.aiProfile}>
                      <img src={profile} alt="AI Profile" className={styles.profileImage} />
                    </div>
                    <div className={styles.aiMessage}>{msg.text}</div>
                    <div className={styles.messageTime}>{msg.time}</div>
                  </div>
                ) : (
                  <div className={styles.userMessageWrapper}>
                    <div className={styles.userMessage}>{msg.text}</div>
                    <div className={styles.messageTime}>{msg.time}</div>
                  </div>
                )}
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
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            {busTime && <p className={styles.busTimeText}>📢 {busTime}</p>}
            {nextBusTimes.length > 1 && (
              <div>
                <div className={styles.nextBusTitleWrapper}>
                  <h2 className={styles.nextBusTitle}>&lt; 다음 무당이 도착 시간 &gt;</h2>
                </div>
                <ul className={styles.busTimesList}>
                  {nextBusTimes.slice(1).map((time, idx) => (
                    <li key={idx} className={styles.busTimesListItem}>
                      🐞{time.toLocaleTimeString("ko-KR", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}
                    </li>
                  ))}
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