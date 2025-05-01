import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import styles from "./AllCafePage.module.css";

function VisionCafePage() {
  const navigate = useNavigate();
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    const menuData = [
      {
        "date": "2025-04-28 (월)",
        "meals": [
          {
            "time": "천원의 아침밥",
            "menu": [
              "고깃집된장찌개",
              "백미밥",
              "한식잡채",
              "계란후라이",
              "양배추들깨무침",
              "배추김치"
            ]
          },
          {
            "time": "점심 (6,000원)",
            "menu": [
              "뚝배기부대찌개*라면사리",
              "백미밥",
              "수제동그랑땡전*케찹",
              "궁중떡볶이",
              "콩나물무침",
              "그린샐러드&드레싱",
              "깍두기"
            ]
          },
          {
            "time": "저녁 (6,000원)",
            "menu": [
              "꼬치어묵잔치국수",
              "후리가케밥",
              "비빔만두*야채",
              "모닝빵&딸기잼",
              "무생채",
              "포기김치"
            ]
          }
        ]
      },
      {
        "date": "2025-04-29 (화)",
        "meals": [
          {
            "time": "천원의 아침밥",
            "menu": [
              "햄오므라이스*케찹",
              "유부미소장국",
              "오징어까스*드레싱",
              "단무지유자무침",
              "짜요짜요",
              "포기김치"
            ]
          },
          {
            "time": "점심 (6,000원)",
            "menu": [
              "☆특식day☆",
              "철판삼겹살구이\"",
              "쌀밥",
              "(특)물냉면",
              "어묵야채볶음",
              "상추겉절이",
              "그린샐러드&드레싱",
              "포기김치"
            ]
          },
          {
            "time": "저녁 (6,000원)",
            "menu": [
              "소고기우거지해장국",
              "쌀밥",
              "치킨너겟*머스타드",
              "두부조림",
              "마늘장아찌",
              "포기김치"
            ]
          }
        ]
      },
      {
        "date": "2025-04-30 (수)",
        "meals": [
          {
            "time": "천원의 아침밥",
            "menu": [
              "떡갈비*파채",
              "백미밥",
              "소고기미역국",
              "맛살굴소스버섯볶음",
              "깻잎지무침*오미자차",
              "배추김치"
            ]
          },
          {
            "time": "점심 (6,000원)",
            "menu": [
              "치킨마요덮밥",
              "팽이장국",
              "맛초킹탕수육",
              "초코꿀호떡",
              "단무지무침",
              "그린샐러드&드레싱",
              "포기김치"
            ]
          },
          {
            "time": "저녁 (6,000원)",
            "menu": [
              "누룽지닭볶음탕",
              "백미밥",
              "두부고추장찌개",
              "계란후라이",
              "양배추고추장무침",
              "배추김치"
            ]
          }
        ]
      },
      {
        "date": "2025-05-01 (목)",
        "meals": [
          {
            "time": "천원의 아침밥",
            "menu": [
              "짬뽕순두부찌개",
              "쌀밥",
              "미니돈까스강정",
              "어묵채볶음",
              "얼갈이겉절이",
              "배추김치"
            ]
          },
          {
            "time": "점심 (6,000원)",
            "menu": [
              "크림카레우동",
              "햄야채볶음밥",
              "콘소메순살치킨",
              "얼큰콩나물국",
              "오복지무침",
              "그린샐러드&드레싱",
              "포기김치"
            ]
          },
          {
            "time": "저녁 (6,000원)",
            "menu": [
              "멘치까스",
              "쌀밥",
              "아욱국",
              "하이라이스소스",
              "단무지/초코우유",
              "배추김치"
            ]
          }
        ]
      },
      {
        "date": "2025-05-02 (금)",
        "meals": [
          {
            "time": "천원의 아침밥",
            "menu": [
              "고추장제육불고기",
              "백미밥",
              "옛날소시지튀김",
              "건파래볶음",
              "상추쌈&쌈장",
              "배추김치"
            ]
          },
          {
            "time": "점심 (6,000원)",
            "menu": [
              "에그함박스테이크",
              "얼큰김칫국",
              "허니버터감자튀김",
              "쫄면야채무침",
              "야쿠르트",
              "그린샐러드&드레싱",
              "포기김치"
            ]
          },
          {
            "time": "저녁 (6,000원)",
            "menu": [
              "소보로비빔밥",
              "허니버터회오리감자",
              "코울슬로우",
              "미소된장국",
              "망고주스",
              "배추김치"
            ]
          }
        ]
      },
      {
        "date": "2025-05-03 (토)",
        "meals": [
          {
            "time": "천원의 아침밥",
            "menu": [
              "라면 + 밥",
              "포기김치"
            ]
          },
          {
            "time": "점심 (6,000원)",
            "menu": [
              "닭다리살간장찜닭",
              "백미밥",
              "시금치된장국",
              "야채고로케*케찹",
              "알감자버터구이",
              "그린샐러드&드레싱",
              "포기김치"
            ]
          },
          {
            "time": "저녁 (6,000원)",
            "menu": [
              "등록된 식단내용이(가) 없습니다."
            ]
          }
        ]
      }
    ]


    setMenuData(menuData);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const mealTimes = ["천원의 아침밥", "점심 (6,000원)", "저녁 (6,000원)"];
  const dates = menuData.map((item) => item.date);

  return (
    <div>
      <NavBar />
      <div className={styles.bg} />
      <div className={styles.buttonContainer}>
        <div
          className={`${styles.button} ${styles.activeButton} `}
          onClick={() => handleNavigation("/cafeteria/visionCafe")}
        >
          <span className={`${styles.buttonText} ${styles.activeButtonText}`}>
            비전타워 식당
          </span>
        </div>
        <div
          className={styles.button}
          onClick={() => handleNavigation("/cafeteria/eduCafe")}
        >
          <span className={styles.buttonText}>교육대학원 식당</span>
        </div>
        <div
          className={styles.button}
          onClick={() => handleNavigation("/cafeteria/dormCafe")}
        >
          <span className={styles.buttonText}>학생생활관 식당</span>
        </div>
      </div>

      <table className={styles.horizontalTable}>
        <thead>
          <tr>
            <th className={styles.headerCell}></th>
            {dates.map((date) => (
              <th key={date} className={styles.dateHeaderCell}>
              {date}
            </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {mealTimes.map((mealTime) => (
            <tr key={mealTime}>
              <th className={styles.mealTimeHeaderCell}>{mealTime}</th>
              {menuData.map((dayMenu) => {
                const meal = dayMenu.meals.find((m) => m.time === mealTime);
                return (
                  <td key={`${dayMenu.date}-${mealTime}`} className={styles.foodCell}> 
                  {meal ? <div dangerouslySetInnerHTML={{ __html: meal.menu.join("<br />") }} /> : "-"}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VisionCafePage;