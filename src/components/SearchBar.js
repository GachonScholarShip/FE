import React from "react";
import styles from "./SearchBar.module.css";
import searchIcon from "../assets/search.svg";

function SearchBar({ placeholder, onSearch }) {
  const handleChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <div className={styles.searchBar}>
      <img src={searchIcon} alt="search" className={styles.icon} />
      <input
        type="text"
        className={styles.input}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchBar;
