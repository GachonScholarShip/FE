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
        left: `${position.x}px`, 
        top: `${position.y}px`,
      }}
    >
      <div className="lecture-modal-content">
        <p className="lecture-time">{formattedTime}</p>
        <p className="lecture-location">{building} - <strong>{room}</strong></p>
        <h2 className="lecture-status">〈현재 진행 중인 강의〉</h2>
        <h3 className="lecture-title">{lectureData.title}</h3>
        <p className="lecture-professor">{lectureData.professor}</p>
        <p className="lecture-schedule">{lectureData.schedule}</p>
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
