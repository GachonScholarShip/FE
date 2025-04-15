import { useState } from "react";
import ManagerNavBar from "../../components/ManagerNavBar";
import SearchBar from "../../components/SearchBar";
import UpdateButton from "../../components/UpdateButton";
import DeleteButton from "../../components/DeleteButton";
import AddButton from "../../components/AddButton";
import userIcon from "../../assets/user.svg";
import styles from "./UserAccountPage.module.css";
import DeleteConfirmPopup from "../../components/DeleteConfirmPopup";
import { useNavigate } from "react-router-dom";

function UserAccountPage() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([
    {
      baseId: 1,
      name: "홍길동",
      joinDate: "2025.01.15",
      email: "fsjdjf@gmail.com",
    },
    {
      baseId: 2,
      name: "김철수",
      joinDate: "2024.12.20",
      email: "kimchulsoo@gmail.com",
    },
    {
      baseId: 3,
      name: "이영희",
      joinDate: "2025.02.25",
      email: "leeyounghee@gmail.com",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (selectedUser) {
      setUsers((prevUsers) =>
        prevUsers.filter((u) => u.baseId !== selectedUser.baseId)
      );
      setShowConfirm(false);
      setSelectedUser(null);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
    setSelectedUser(null);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
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
            {filteredUsers.map((user) => (
              <div className={styles.userCard} key={user.baseId}>
                <div className={styles.userInfo}>
                  <img src={userIcon} alt="user" className={styles.userImage} />

                  <div className={styles.userTextGroup}>
                    <div className={styles.userText}>
                      <div className={styles.label}>사용자</div>
                      <div className={styles.value}>{user.name}</div>
                    </div>
                    <div className={styles.userText}>
                      <div className={styles.label}>가입일</div>
                      <div className={styles.value}>{user.joinDate}</div>
                    </div>
                    <div className={styles.userText}>
                      <div className={styles.label}>이메일</div>
                      <div className={styles.value}>{user.email}</div>
                    </div>
                  </div>
                </div>

                <div className={styles.buttonGroup}>
                  <UpdateButton
                    onClick={() =>
                      navigate(`/uau/${user.baseId}`, {
                        state: {
                          name: user.name,
                          gender: user.gender,
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
                message={`${selectedUser.name}님을 정말 삭제하시겠습니까?`}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
              />
            )}

            <div className={styles.addButtonBox}>
              <AddButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserAccountPage;
