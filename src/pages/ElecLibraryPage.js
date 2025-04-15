import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import NavBar from "../components/NavBar";
import styles from "./ElecLibraryPage.module.css";

function ElecLibraryPage() {
  const navigate = useNavigate();
  const [seatsData, setSeatsData] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // 컴포넌트가 마운트될 때 fetchData()를 호출하도록 useEffect 사용
  useEffect(() => {
    // 데이터베이스 API 호출
    // const fetchData = async () => {
    //   try {
    //     const response = await axios.get(""); // 실제 API URL로 변경
    //     setSeatsData(response.data);
    //     setLoading(false); 
    //   } catch (error) {
    //     setError(error.message);
    //     setLoading(false);
    //   }
    // };

    // fetchData();

    
 // 데이터베이스 연결 전 하드코딩한 데이터
    const mockData = [
      { name: "자작나무라운지(B1)", total: 92, used: 0, remaining: 92, usageRate: "0%" },
      { name: "그룹스터디룸(B1)", total: 4, used: 0, remaining: 4, usageRate: "0%" },
      { name: "멀티미디어실(B1)", total: 1, used: 0, remaining: 1, usageRate: "0%" },
      { name: "멀티미디어열람석(B1)", total: 6, used: 0, remaining: 6, usageRate: "0%" },
      { name: "노트북열람석(1F)", total: 15, used: 0, remaining: 15, usageRate: "0%" },
      { name: "그룹스터디룸(1F)", total: 2, used: 0, remaining: 2, usageRate: "0%" },
      { name: "노트북열람석(2F)", total: 54, used: 0, remaining: 54, usageRate: "0%" },
      { name: "일반열람석(2F)", total: 90, used: 0, remaining: 90, usageRate: "0%" },
    ];

    // 실제로는 여기서 API 호출로 데이터를 가져오는 부분을 작성
    setSeatsData(mockData);
  }, []); 

  const handleNavigation = (path) => {
    navigate(path);
  };

  // // 로딩 중일 때 표시할 메시지
  // if (loading) {
  //   return <div>로딩 중...</div>;
  // }

  // // 오류 발생 시 표시할 메시지
  // if (error) {
  //   return <div>오류: {error}</div>;
  // }

  return (
    <div>
      <NavBar />
      <div className={styles.bg} />
      <div className={styles.buttonContainer}>
        <div
          className={`${styles.button} ${styles.activeButton} `}
          onClick={() => handleNavigation("/library/eleclibrary")}
        >
          <span className={`${styles.buttonText} ${styles.activeButtonText}`}>전자정보도서관</span>
        </div>
        <div
          className={styles.button}
          onClick={() => handleNavigation("/library/centrallibrary")}
        >
          <span className={styles.buttonText}>중앙도서관</span>
        </div>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>열람실명</th>
            <th>전체</th>
            <th>사용</th>
            <th>잔여</th>
            <th>이용률</th>
          </tr>
        </thead>
        <tbody>
          {seatsData.map((room, index) => (
            <tr key={index}>
              <td>{room.name}</td>
              <td>{room.total}</td>
              <td>{room.used}</td>
              <td>{room.remaining}</td>
              <td>{room.usageRate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ElecLibraryPage;
