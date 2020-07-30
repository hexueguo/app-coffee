import React from "react";
// import PropTypes from "prop-types";
import styles from "./Loading.less";

Loading.propTypes = {};

function Loading() {
  return (
    <div className={styles.cover}>
      <div className={styles.loader}>
        <div className={styles.dot} />
        <div className={styles.dot} />
        <div className={styles.dot} />
        <div className={styles.dot} />
        <div className={styles.dot} />
      </div>
    </div>
  );
}

export default Loading;
