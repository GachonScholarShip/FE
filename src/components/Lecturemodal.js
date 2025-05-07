import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const LectureModal = ({ building, room, lectureData, position, styles }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = `${currentTime.getFullYear()}년 ${currentTime.getMonth() + 1}월 ${currentTime.getDate()}일 ` +
    `${['일', '월', '화', '수', '목', '금', '토'][currentTime.getDay()]}요일 ` +
    `${currentTime.getHours()}시 ${currentTime.getMinutes()}분`;

  return (
    <div 
      className={styles['lecture-modal']}
      style={{ 
        position: 'absolute',
        left: `calc(${position.x}vw + 9vw)`, 
        top: `${position.y}vh`,
      }}
    >
      <div className={styles['lecture-modal-content']}>
        <p className={styles['lecture-time']}>{formattedTime}</p>
        <p className={styles['lecture-location']}>{building} - <strong>{room}</strong></p>
        <p className={styles['lecture-status']}>〈현재 진행 중인 강의〉</p>
        <p className={styles['lecture-title']}>{lectureData.title}</p>
        <p className={styles['lecture-professor']}>{lectureData.professor}</p>
        <p className={styles['lecture-schedule']}>{lectureData.courseTime}</p>
      </div>
    </div>
  );
};
LectureModal.propTypes = { // prop-types 정의 (권장)
  building: PropTypes.string.isRequired,
  room: PropTypes.string.isRequired,
  lectureData: PropTypes.object.isRequired,
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  styles: PropTypes.object.isRequired,
};
export default LectureModal;
