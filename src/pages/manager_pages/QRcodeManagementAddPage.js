import React, { useState } from "react";
import axios from "axios";
import ManagerNavBar from "../../components/ManagerNavBar";
import SaveButton from "../../components/SaveButton";
import styles from "./QRcodeManagementAddPage.module.css";
import { useNavigate } from "react-router-dom";

function QRcodeManagementAddPage() {
  const [selectedName, setSelectedName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const token =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsInJvbGUiOiJBRE1JTiIsInN1YiI6IkF1dGhvcml6YXRpb24iLCJpYXQiOjE3NDU0MTE3NzMsImV4cCI6MTc1NDA1MTc3M30.VBuP9Li37A7YGPTlv3Jc2dn8E1h6WK2CBOUTxi92cZU";

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const getPresignedUrl = async (fileName) => {
    const response = await axios.get(
      "http://110.15.135.250:8000/movement-service/image/presigned-url",
      {
        params: { fileName },
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data.data;
  };

  const uploadImageToS3 = async (file, presignedUrl) => {
    await axios.put(presignedUrl, file, {
      headers: {
        "Content-Type": file.type,
      },
    });
    return presignedUrl.split("?")[0];
  };

  const handleSubmit = async () => {
    if (!selectedName || !imageFile) {
      alert("건물 이름과 이미지를 모두 선택해주세요.");
      return;
    }

    setUploading(true);
    setError("");

    try {
      // (1) presigned URL을 이용해 S3에 이미지 업로드
      const presignedUrl = await getPresignedUrl(imageFile.name);
      const uploadedImageUrl = await uploadImageToS3(imageFile, presignedUrl);
      console.log("Uploaded Image URL: ", uploadedImageUrl);

      // (2) QR 코드 정보 POST 요청
      const response = await axios.post(
        "http://110.15.135.250:8000/movement-service/admin/qrcode",
        {
          buildingName: selectedName,
          imageUrl: uploadedImageUrl,
        },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.code === 200) {
        alert("QR 코드가 성공적으로 추가되었습니다.");
        navigate("/qrm");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert(error.response?.data?.message || "등록 중 오류 발생");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <ManagerNavBar />
      <div className={styles.bg}>
        <div className={styles.container}>
          <div className={styles.Box}>
            <div className={styles.title}>추가</div>
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
                  <label>QR 코드 이미지</label>
                  <input type="file" onChange={handleFileChange} />
                </div>
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

export default QRcodeManagementAddPage;
