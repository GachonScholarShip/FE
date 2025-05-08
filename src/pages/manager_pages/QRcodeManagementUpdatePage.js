import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ManagerNavBar from "../../components/ManagerNavBar";
import SaveButton from "../../components/SaveButton";
import styles from "./QRcodeManagementUpdatePage.module.css";

function QRcodeManagementUpdatePage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { id, buildingName, imageUrl } = location.state || {};

  const [selectedName, setSelectedName] = useState(buildingName || "");
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(imageUrl || "");

  const token =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsInJvbGUiOiJBRE1JTiIsInN1YiI6IkF1dGhvcml6YXRpb24iLCJpYXQiOjE3NDU0MTE3NzMsImV4cCI6MTc1NDA1MTc3M30.VBuP9Li37A7YGPTlv3Jc2dn8E1h6WK2CBOUTxi92cZU";

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file)); // 로컬 미리보기
  };

  const getPresignedUrl = async (fileName) => {
    const response = await axios.get(
      "http://110.15.135.250:8000/movement-service/image/presigned-url",
      {
        params: { fileName },
        headers: { Authorization: token },
      }
    );
    return response.data.data;
  };

  const uploadToS3 = async (file, presignedUrl) => {
    await axios.put(presignedUrl, file, {
      headers: { "Content-Type": file.type },
    });
    return presignedUrl.split("?")[0]; // 최종 S3 URL
  };
  const handleSubmit = async () => {
    if (!selectedName || (!previewUrl && !image)) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    let finalImageUrl = previewUrl;

    try {
      // 이미지가 새로 업로드된 경우
      if (image) {
        const presignedUrl = await getPresignedUrl(image.name);
        finalImageUrl = await uploadToS3(image, presignedUrl);
      }

      const response = await axios.patch(
        "http://110.15.135.250:8000/movement-service/admin/qrcode",
        {
          id,
          buildingName: selectedName,
          imageUrl: finalImageUrl,
        },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.code === 200) {
        alert("QR 코드 정보가 수정되었습니다.");
        navigate("/qrm");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert(
        error.response?.data?.message || "QR 코드 수정 중 오류가 발생했습니다."
      );
    }
  };

  return (
    <div>
      <ManagerNavBar />
      <div className={styles.bg}>
        <div className={styles.container}>
          <div className={styles.Box}>
            <div className={styles.title}>수정</div>
            <div className={styles.formContainer}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>건물 이름</label>
                  <select
                    className={styles.select}
                    value={selectedName}
                    onChange={(e) => setSelectedName(e.target.value)}
                  >
                    <option value="">목적지를 선택해주세요</option>
                    <option value="가천관">가천관</option>
                    <option value="공과대학1">공과대학1</option>
                    <option value="공과대학2">공과대학2</option>
                    <option value="교육대학원">교육대학원</option>
                    <option value="글로벌센터">글로벌센터</option>
                    <option value="바이오나노연구원">바이오나노연구원</option>
                    <option value="바이오나노대학">바이오나노대학</option>
                    <option value="반도체대학">반도체대학</option>
                    <option value="법과대학">법과대학</option>
                    <option value="비전타워">비전타워</option>
                    <option value="예술체육대학1">예술체육대학1</option>
                    <option value="예술체육대학2">예술체육대학2</option>
                    <option value="한의과대학">한의과대학</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label>URL</label>

                  <input
                    type="text"
                    value={previewUrl}
                    readOnly
                    className={styles.readonlyInput}
                  />
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>이미지 업로드</label>

                  <input
                    type="file"
                    onChange={handleFileChange}
                    className={styles.fileInput}
                  />
                </div>
                <div className={styles.formGroup}></div>
              </div>
            </div>
            <div className={styles.savebuttonContainer}>
              <SaveButton onClick={handleSubmit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QRcodeManagementUpdatePage;
