import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./ManagerNavBar.module.css";

import uaIcon from "../assets/ua.svg";
import cmIcon from "../assets/cm.svg";
import bmIcon from "../assets/bm.svg";
import muIcon from "../assets/mu.svg";
import rmIcon from "../assets/rm.svg";
import rvmIcon from "../assets/rvm.svg";
import qrmIcon from "../assets/qrm.svg";
import uaclickIcon from "../assets/uaclick.svg";
import cmclickIcon from "../assets/cmclick.svg";
import bmclickIcon from "../assets/bmclick.svg";
import muclickIcon from "../assets/muclick.svg";
import rmclickIcon from "../assets/rmclick.svg";
import rvmclickIcon from "../assets/rvmclick.svg";
import qrmclickIcon from "../assets/qrmclick.svg";

const navItems = [
  { label: "사용자 계정", path: "/ua", icon: uaIcon, activeIcon: uaclickIcon },
  { label: "강의실 관리", path: "/cm", icon: cmIcon, activeIcon: cmclickIcon },
  { label: "건물 관리", path: "/bm", icon: bmIcon, activeIcon: bmclickIcon },
  { label: "무당이 관리", path: "/mu", icon: muIcon, activeIcon: muclickIcon },
  { label: "길찾기 관리", path: "/rm", icon: rmIcon, activeIcon: rmclickIcon },
  {
    label: "로드뷰 관리",
    path: "/rvm",
    icon: rvmIcon,
    activeIcon: rvmclickIcon,
  },
  {
    label: "QR 코드 관리",
    path: "/qrm",
    icon: qrmIcon,
    activeIcon: qrmclickIcon,
  },
];

export default function ManagerNavBar() {
  const location = useLocation();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className={styles.navbar}>
      <div className={styles.menuList}>
        {navItems.map((item, index) => {
          const isActive = location.pathname.startsWith(item.path);
          const isHovered = hoveredIndex === index;

          const iconSrc = isActive || isHovered ? item.activeIcon : item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`${styles.navItem} ${isActive ? styles.active : ""}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className={styles.navItemInner}>
                <img
                  src={iconSrc}
                  alt={`${item.label} 아이콘`}
                  className={styles.icon}
                />
                <span>{item.label}</span>
              </div>
            </Link>
          );
        })}
      </div>
      <Link to="/" className={styles.logoutButton}>
        로그아웃
      </Link>
    </div>
  );
}
