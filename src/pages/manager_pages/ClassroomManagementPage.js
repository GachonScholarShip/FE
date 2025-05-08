// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import ManagerNavBar from "../../components/ManagerNavBar";
// import SearchBar from "../../components/SearchBar";
// import AddButton from "../../components/AddButton";
// import DeleteButton from "../../components/DeleteButton";
// import UpdateButton from "../../components/UpdateButton";
// import styles from "./ClassroomManagementPage.module.css";
// import DeleteConfirmPopup from "../../components/DeleteConfirmPopup";
// import axios from "axios";

// function ClassroomManagementPage() {
//   const navigate = useNavigate();
//   const [selectedBuilding, setSelectedBuilding] = useState("");
//   const [selectedFloor, setSelectedFloor] = useState("");
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [selectedRoom, setSelectedRoom] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [roomData, setRoomData] = useState([]);
//   const [buildingFloorsMap, setBuildingFloorsMap] = useState({});
//   const [currentPage, setCurrentPage] = useState(1);

//   const itemsPerPage = 9;

//   useEffect(() => {
//     const fetchClasses = async () => {
//       try {
//         const response = await axios.get(
//           "http://110.15.135.250:8000/building-service/admin/classes",
//           {
//             headers: {
//               Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsInJvbGUiOiJBRE1JTiIsInN1YiI6IkF1dGhvcml6YXRpb24iLCJpYXQiOjE3NDU0MTEzMjUsImV4cCI6MTc1NDA1MTMyNX0.V0RNqeCd4j7XznWD6c5x1wVhf4QNwoXGKhgWa2C5rJs`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         console.log("API 응답 데이터:", response.data);

//         // 응답에서 실제 강의실 정보는 'content'에 있음
//         const parsedData = response.data.data?.content
//           ? Array.isArray(response.data.data.content)
//             ? response.data.data.content
//             : []
//           : [];

//         console.log("추출된 강의실 데이터:", parsedData);
//         setRoomData(parsedData);
//       } catch (err) {
//         console.error("강의실 정보 불러오기 실패:", err);
//       }
//     };

//     const fetchBuildings = async () => {
//       try {
//         const response = await axios.get(
//           "http://110.15.135.250:8000/building-service/admin/building",
//           {
//             headers: {
//               Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsInJvbGUiOiJBRE1JTiIsInN1YiI6IkF1dGhvcml6YXRpb24iLCJpYXQiOjE3NDU0MTEzMjUsImV4cCI6MTc1NDA1MTMyNX0.V0RNqeCd4j7XznWD6c5x1wVhf4QNwoXGKhgWa2C5rJs`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         const map = {};
//         response.data.data.forEach((building) => {
//           map[building.buildingName] = building.floors
//             .map((floor) => {
//               // 'B'로 시작하는 경우 처리, 숫자일 경우 'F' 추가
//               if (floor.startsWith("B")) {
//                 return floor; // 'B1', 'B2' 등 그대로 처리
//               } else if (floor === "0") {
//                 return null; // '0F'는 제외
//               } else {
//                 return `${floor}F`; // '1', '2', '3' -> '1F', '2F', '3F'
//               }
//             })
//             .filter((floor) => floor !== null); // '0F' 제외
//         });

//         setBuildingFloorsMap(map);
//       } catch (err) {
//         console.error("강의실 정보 불러오기 실패:", err);
//       }
//     };

//     fetchBuildings();
//     fetchClasses();
//   }, []);

//   const handleDeleteClick = (roomId) => {
//     setSelectedRoom(roomId); // roomId를 사용
//     setShowConfirm(true);
//   };
//   const handleConfirmDelete = async () => {
//     try {
//       // 삭제할 강의실 찾기
//       const classToDelete = roomData.find(
//         (room) => room.id === selectedRoom // room.id로 찾도록 수정
//       );

//       if (!classToDelete) {
//         alert("삭제할 강의실을 찾을 수 없습니다.");
//         return;
//       }

//       // 삭제 요청 보내기
//       const response = await axios.delete(
//         `http://110.15.135.250:8000/building-service/admin/classes/${classToDelete.id}`,
//         {
//           headers: {
//             Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsInJvbGUiOiJBRE1JTiIsInN1YiI6IkF1dGhvcml6YXRpb24iLCJpYXQiOjE3NDU0MTEzMjUsImV4cCI6MTc1NDA1MTMyNX0.V0RNqeCd4j7XznWD6c5x1wVhf4QNwoXGKhgWa2C5rJs`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       // 응답의 코드 확인하여 성공 여부 판단
//       console.log("응답 데이터:", response.data); // 응답 확인용 로그
//       if (response.data.code === 204) {
//         // 삭제 성공
//         setRoomData((prev) => prev.filter((room) => room.id !== selectedRoom));
//         alert("강의실 삭제 성공!"); // 삭제 성공 메시지
//         setCurrentPage(1);

//         navigate("/cm"); // 삭제 후 페이지 이동
//       } else {
//         alert(`삭제 실패: ${response.data.message || "알 수 없는 오류"}`); // 실패 메시지
//       }
//     } catch (error) {
//       // 에러 처리
//       if (error.response?.data?.message) {
//         alert(`에러 발생: ${error.response.data.message}`);
//       } else {
//         alert("삭제 요청 중 오류가 발생했습니다.");
//       }
//     } finally {
//       // 삭제 후 팝업 닫기
//       setShowConfirm(false);
//       setSelectedRoom(null);
//     }
//   };

//   const handleCancelDelete = () => {
//     setShowConfirm(false);
//     setSelectedRoom(null);
//   };

//   const handleUpdateClick = (room) => {
//     console.log(room); // room 객체를 로그로 출력하여 어떤 필드가 있는지 확인
//     if (!room.id) {
//       console.error("room.id가 undefined입니다.");
//       return;
//     }
//     navigate(`/cmu/${room.id}`, {
//       state: room,
//     });
//   };

//   const filteredRoomData = roomData.filter((room) => {
//     if (!room || !room.roomName) return false;

//     const matchesSearch = room.roomName
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase());

//     const matchesBuilding = selectedBuilding
//       ? room.buildingName === selectedBuilding
//       : true;

//     // selectedFloor가 "4F"일 때 "4"로 변환하여 비교
//     const normalizedFloor =
//       selectedFloor && selectedFloor.endsWith("F")
//         ? selectedFloor.slice(0, -1) // "4F" -> "4"
//         : selectedFloor;

//     const matchesFloor =
//       normalizedFloor === "" || room.floor === normalizedFloor;

//     return matchesSearch && matchesBuilding && matchesFloor;
//   });

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const paginatedRoomData = filteredRoomData.slice(
//     indexOfFirstItem,
//     indexOfLastItem
//   );

//   const totalPages = Math.ceil(filteredRoomData.length / itemsPerPage);

//   const renderPageNumbers = () => {
//     const pages = [];
//     const maxDisplayedPages = 5;

//     let startPage = Math.max(1, currentPage - 2);
//     let endPage = Math.min(totalPages, currentPage + 2);

//     if (currentPage <= 3) {
//       endPage = Math.min(totalPages, maxDisplayedPages);
//     }

//     if (currentPage > totalPages - 3) {
//       startPage = Math.max(1, totalPages - maxDisplayedPages + 1);
//     }

//     if (startPage > 1) {
//       pages.push(
//         <button
//           key={1}
//           onClick={() => setCurrentPage(1)}
//           className={1 === currentPage ? styles.activePage : styles.pageButton}
//         >
//           1
//         </button>
//       );
//       if (startPage > 2) {
//         pages.push(<span key="start-ellipsis">...</span>);
//       }
//     }

//     for (let i = startPage; i <= endPage; i++) {
//       pages.push(
//         <button
//           key={i}
//           onClick={() => setCurrentPage(i)}
//           className={i === currentPage ? styles.activePage : styles.pageButton}
//         >
//           {i}
//         </button>
//       );
//     }

//     if (endPage < totalPages) {
//       if (endPage < totalPages - 1) {
//         pages.push(<span key="end-ellipsis">...</span>);
//       }
//       pages.push(
//         <button
//           key={totalPages}
//           onClick={() => setCurrentPage(totalPages)}
//           className={
//             totalPages === currentPage ? styles.activePage : styles.pageButton
//           }
//         >
//           {totalPages}
//         </button>
//       );
//     }

//     return pages;
//   };

//   return (
//     <div>
//       <ManagerNavBar />
//       <div className={styles.bg}>
//         <div className={styles.container}>
//           <div className={styles.topBox}>
//             <SearchBar
//               placeholder="강의실을 입력해주세요"
//               onSearch={setSearchTerm}
//             />
//           </div>

//           <div className={styles.bottomBox}>
//             <div className={styles.title}>강의실 현황</div>

//             <div className={styles.selectFloorBuildings}>
//               <div className={styles.floorButtons}>
//                 {/* 층 버튼들 */}
//                 {selectedBuilding &&
//                   buildingFloorsMap[selectedBuilding]?.map((floor) => (
//                     <button
//                       key={floor}
//                       className={`${styles.floorButton} ${
//                         selectedFloor === floor ? styles.active : ""
//                       }`}
//                       onClick={() => setSelectedFloor(floor)}
//                     >
//                       {floor}
//                     </button>
//                   ))}
//               </div>
//               <div className={styles.selectorBox}>
//                 <select
//                   value={selectedBuilding}
//                   onChange={(e) => {
//                     setSelectedBuilding(e.target.value);
//                     setSelectedFloor("");
//                   }}
//                 >
//                   <option value="">건물을 선택해주세요</option>
//                   {Object.keys(buildingFloorsMap).map((building, idx) => (
//                     <option key={idx} value={building}>
//                       {building}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             <div className={styles.tableHeader}>
//               <div className={styles.column}>강의실</div>
//               <div className={styles.column}>강좌명</div>
//               <div className={styles.column}>교수</div>
//               <div className={styles.column}>시간</div>
//               <div className={styles.column}></div>
//             </div>
//             {paginatedRoomData.map((room) => (
//               <div key={room.id} className={styles.tableRow}>
//                 <div className={styles.column}>{room.roomName}</div>
//                 <div className={styles.column}>{room.title}</div>
//                 <div className={styles.column}>{room.professor}</div>
//                 <div className={styles.column}>{room.courseTime}</div>
//                 <div className={styles.column}>
//                   <div className={styles.button}>
//                     <UpdateButton onClick={() => handleUpdateClick(room)} />
//                     <DeleteButton
//                       onClick={() => handleDeleteClick(room.id)} // roomName 대신 id를 전달
//                     />
//                   </div>
//                 </div>
//               </div>
//             ))}

//             {showConfirm && (
//               <DeleteConfirmPopup
//                 message={`${selectedRoom} 강의실을 정말 삭제하시겠습니까?`}
//                 onConfirm={handleConfirmDelete}
//                 onCancel={handleCancelDelete}
//               />
//             )}
//             <div className={styles.pagination}>{renderPageNumbers()}</div>

//             <div className={styles.addbuttonContainer}>
//               <AddButton />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ClassroomManagementPage;// ✅ 클라이언트에서 페이지네이션 처리 + 페이지 그룹 이동 + 좌우 화살표 적용
//----------------------------------------------------------
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ManagerNavBar from "../../components/ManagerNavBar";
import SearchBar from "../../components/SearchBar";
import AddButton from "../../components/AddButton";
import DeleteButton from "../../components/DeleteButton";
import UpdateButton from "../../components/UpdateButton";
import DeleteConfirmPopup from "../../components/DeleteConfirmPopup";
import styles from "./ClassroomManagementPage.module.css";
import axios from "axios";

function ClassroomManagementPage() {
  const navigate = useNavigate();

  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [selectedFloor, setSelectedFloor] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [roomData, setRoomData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [buildingFloorsMap, setBuildingFloorsMap] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroupStart, setPageGroupStart] = useState(1);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const itemsPerPage = 9;
  const pageGroupSize = 10;

  const token =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsInJvbGUiOiJBRE1JTiIsInN1YiI6IkF1dGhvcml6YXRpb24iLCJpYXQiOjE3NDU0MTEzMjUsImV4cCI6MTc1NDA1MTMyNX0.V0RNqeCd4j7XznWD6c5x1wVhf4QNwoXGKhgWa2C5rJs";

  const fetchClasses = async () => {
    try {
      console.log("selectedBuilding:", selectedBuilding); // 디버깅 로그 추가
      const response = await axios.get(
        `http://110.15.135.250:8000/building-service/admin/classes`,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          params: {
            page: currentPage - 1,
            size: itemsPerPage,
            buildingName: selectedBuilding || undefined, // 빈 문자열일 경우 undefined
            floor: selectedFloor?.replace("F", "") || undefined,
            searchTerm: searchTerm || undefined,
          },
        }
      );
      const content = response.data.data?.content || [];
      setRoomData(content);
      const totalElements = response.data.data?.totalElements || 0;
      setTotalPages(Math.ceil(totalElements / itemsPerPage));
    } catch (err) {
      console.error("강의실 정보 불러오기 실패:", err);
    }
  };

  const fetchBuildings = async () => {
    try {
      const response = await axios.get(
        "http://110.15.135.250:8000/building-service/admin/building",
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      const map = {};
      response.data.data.forEach((building) => {
        map[building.buildingName] = building.floors
          .map((floor) => {
            if (floor.startsWith("B")) return floor;
            if (floor === "0") return null;
            return `${floor}F`;
          })
          .filter((floor) => floor !== null);
      });

      setBuildingFloorsMap(map);
    } catch (err) {
      console.error("건물 정보 불러오기 실패:", err);
    }
  };

  useEffect(() => {
    fetchBuildings();
  }, []);

  useEffect(() => {
    fetchClasses();
  }, [selectedBuilding, selectedFloor, searchTerm, currentPage]); // selectedBuilding이 바뀔 때마다 호출

  const handleDeleteClick = (roomId) => {
    setSelectedRoom(roomId);
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const room = roomData.find((r) => r.id === selectedRoom);
      if (!room) return alert("강의실을 찾을 수 없습니다.");

      const response = await axios.delete(
        `http://110.15.135.250:8000/building-service/admin/classes/${selectedRoom}`,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.code === 204) {
        alert("삭제 성공");
        setRoomData((prev) => prev.filter((r) => r.id !== selectedRoom));
      } else {
        alert("삭제 실패: " + response.data.message);
      }
    } catch (e) {
      alert("삭제 중 오류 발생");
    } finally {
      setShowConfirm(false);
      setSelectedRoom(null);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
    setSelectedRoom(null);
  };

  const handleUpdateClick = (room) => {
    navigate(`/cmu/${room.id}`, {
      state: { ...room },
    });
  };

  const pageNumbers = Array.from(
    {
      length: Math.min(pageGroupSize, totalPages - pageGroupStart + 1),
    },
    (_, i) => pageGroupStart + i
  );

  const goToPrevGroup = () => {
    if (pageGroupStart > 1) {
      const newStart = pageGroupStart - pageGroupSize;
      setPageGroupStart(newStart);
      setCurrentPage(newStart);
    }
  };

  const goToNextGroup = () => {
    if (pageGroupStart + pageGroupSize <= totalPages) {
      const newStart = pageGroupStart + pageGroupSize;
      setPageGroupStart(newStart);
      setCurrentPage(newStart);
    }
  };

  return (
    <div>
      <ManagerNavBar />
      <div className={styles.bg}>
        <div className={styles.container}>
          <div className={styles.topBox}>
            <SearchBar
              placeholder="강의실을 입력해주세요"
              onSearch={(term) => {
                setSearchTerm(term);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className={styles.bottomBox}>
            <div className={styles.title}>강의실 현황</div>

            <div className={styles.selectFloorBuildings}>
              <div className={styles.floorButtons}>
                {selectedBuilding &&
                  buildingFloorsMap[selectedBuilding]?.map((floor) => (
                    <button
                      key={floor}
                      className={`${styles.floorButton} ${
                        selectedFloor === floor ? styles.active : ""
                      }`}
                      onClick={() => {
                        setSelectedFloor(floor);
                        setCurrentPage(1);
                      }}
                    >
                      {floor}
                    </button>
                  ))}
              </div>
              <div className={styles.selectorBox}>
                <select
                  value={selectedBuilding}
                  onChange={(e) => {
                    setSelectedBuilding(e.target.value);
                    setSelectedFloor("");
                    setCurrentPage(1);
                  }}
                >
                  <option value="">건물을 선택해주세요</option>
                  {Object.keys(buildingFloorsMap).map((building, idx) => (
                    <option key={idx} value={building}>
                      {building}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.tableHeader}>
              <div className={styles.column}>강의실</div>
              <div className={styles.column}>강좌명</div>
              <div className={styles.column}>교수</div>
              <div className={styles.column}>시간</div>
              <div className={styles.column}></div>
            </div>
            {roomData.map((room) => (
              <div key={room.id} className={styles.tableRow}>
                <div className={styles.column}>{room.roomName}</div>
                <div className={styles.column}>{room.title}</div>
                <div className={styles.column}>{room.professor}</div>
                <div className={styles.column}>{room.timeSlot}</div>
                <div className={styles.column}>
                  <div className={styles.button}>
                    <UpdateButton onClick={() => handleUpdateClick(room)} />
                    <DeleteButton onClick={() => handleDeleteClick(room.id)} />
                  </div>
                </div>
              </div>
            ))}

            <div className={styles.pagination}>
              <button onClick={goToPrevGroup} disabled={pageGroupStart === 1}>
                ◀
              </button>
              {pageNumbers.map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={
                    page === currentPage ? styles.activePage : styles.pageButton
                  }
                >
                  {page}
                </button>
              ))}
              <button
                onClick={goToNextGroup}
                disabled={pageGroupStart + pageGroupSize > totalPages}
              >
                ▶
              </button>
            </div>

            {showConfirm && (
              <DeleteConfirmPopup
                message={`${selectedRoom} 강의실을 정말 삭제하시겠습니까?`}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
              />
            )}

            <div className={styles.addbuttonContainer}>
              <AddButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClassroomManagementPage;
