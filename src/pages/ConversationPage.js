import React, { useState, useRef, useEffect } from "react";
import NavBar from "../components/NavBar";
import styles from "./ConversationPage.module.css";
import profile from "../assets/ai profile.png"

function ConversationPage() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null); // 스크롤 자동 이동을 위한 ref

  const fetchChatResponse = async (userMessage) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ response: `GC: ${userMessage}에 대한 답변입니다.` });
      }, 1000);
    });
  };

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

  // 메시지 추가 시 스크롤을 아래로 이동
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
                    <img
                      src={profile} // 프로필 이미지 URL
                      alt="AI Profile"
                      className={styles.profileImage}
                    />
                  </div>
                )}
                <div
                  className={msg.sender === "user" ? styles.userMessage : styles.aiMessage}
                >
                  {msg.text}
                </div>
                <div className={styles.messageTime}>
                  {msg.time} {/* 메시지 전송 시간 */}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} /> {/* 스크롤 자동 이동을 위한 div */}
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
            {/* <img src={timetable} alt="Qr" className={styles.timetable} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConversationPage;
