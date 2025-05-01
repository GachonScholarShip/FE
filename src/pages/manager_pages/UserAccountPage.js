import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ManagerNavBar from "../../components/ManagerNavBar";
import SearchBar from "../../components/SearchBar";
import UpdateButton from "../../components/UpdateButton";
import DeleteButton from "../../components/DeleteButton";
import AddButton from "../../components/AddButton";
import DeleteConfirmPopup from "../../components/DeleteConfirmPopup";
import userIcon from "../../assets/user.svg";
import styles from "./UserAccountPage.module.css";
import axios from "axios";

function UserAccountPage() {
  const navigate = useNavigate();

  const [allUsers, setAllUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const pageSize = 5;

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `http://110.15.135.250:8000/user-service/admin/user?pageNum=0&pageSize=1000`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsInJvbGUiOiJBRE1JTiIsInN1YiI6IkF1dGhvcml6YXRpb24iLCJpYXQiOjE3NDU0MTE3NzMsImV4cCI6MTc1NDA1MTc3M30.VBuP9Li37A7YGPTlv3Jc2dn8E1h6WK2CBOUTxi92cZU",
            "Content-Type": "application/json",
          },
        }
      );

      setAllUsers(response.data.data || []);
    } catch (error) {
      console.error("사용자 목록 가져오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      const response = await axios.delete(
        `http://110.15.135.250:8000/user-service/admin/user/${userId}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsInJvbGUiOiJBRE1JTiIsInN1YiI6IkF1dGhvcml6YXRpb24iLCJpYXQiOjE3NDU0MTE3NzMsImV4cCI6MTc1NDA1MTc3M30.VBuP9Li37A7YGPTlv3Jc2dn8E1h6WK2CBOUTxi92cZU",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.code === 200) {
        setAllUsers((prevUsers) =>
          prevUsers.filter((user) => user.userId !== userId)
        );
        setShowConfirm(false);
        setSelectedUser(null);
      }
    } catch (error) {
      console.error("사용자 삭제 실패:", error);
      if (error.response) {
        if (error.response.status === 401) {
          setErrorMessage(
            "로그인 세션이 만료되었습니다. 다시 로그인 해주세요."
          );
        } else if (error.response.status === 400) {
          setErrorMessage("존재하지 않는 사용자입니다.");
        }
      } else {
        setErrorMessage("서버와의 연결에 문제가 발생했습니다.");
      }
    }
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (selectedUser) {
      handleDeleteUser(selectedUser.userId);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
    setSelectedUser(null);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(0);
  };

  const filteredUsers = allUsers.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  const paginatedUsers = filteredUsers.slice(
    currentPage * pageSize,
    currentPage * pageSize + pageSize
  );

  return (
    <div>
      <ManagerNavBar />
      <div className={styles.bg}>
        <div className={styles.container}>
          <div className={styles.topBox}>
            <SearchBar
              placeholder="사용자를 입력해주세요"
              onSearch={handleSearch}
            />
          </div>

          <div className={styles.bottomBox}>
            {paginatedUsers.map((user) => (
              <div className={styles.userCard} key={user.userId}>
                <div className={styles.userInfo}>
                  <img src={userIcon} alt="user" className={styles.userImage} />
                  <div className={styles.userTextGroup}>
                    <div className={styles.userText}>
                      <div className={styles.label}>사용자</div>
                      <div className={styles.value}>{user.username}</div>
                    </div>
                    <div className={styles.userText}>
                      <div className={styles.label}>이메일</div>
                      <div className={styles.value}>{user.email}</div>
                    </div>
                    <div className={styles.userText}>
                      <div className={styles.label}>학번</div>
                      <div className={styles.value}>{user.studentId}</div>
                    </div>
                  </div>
                </div>
                <div className={styles.buttonGroup}>
                  <UpdateButton
                    onClick={() =>
                      navigate(`/uau/${user.userId}`, {
                        state: {
                          name: user.username,
                          gender: user.sex,
                          email: user.email,
                          studentId: user.studentId,
                        },
                      })
                    }
                  />
                  <DeleteButton onClick={() => handleDeleteClick(user)} />
                </div>
              </div>
            ))}

            {showConfirm && selectedUser && (
              <DeleteConfirmPopup
                message={`${selectedUser.username}님을 정말 삭제하시겠습니까?`}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
              />
            )}

            {errorMessage && <div className={styles.error}>{errorMessage}</div>}

            <div className={styles.addButtonBox}>
              <AddButton />
            </div>

            <div className={styles.pagination}>
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx)}
                  className={
                    idx === currentPage ? styles.activePage : styles.pageButton
                  }
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserAccountPage;
