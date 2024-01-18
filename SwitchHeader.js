import React from "react";
import styles from "./common.module.css";
function SwitchHeader() {
  return (
    <div className={styles.header}>
      <a href="http://localhost:3000/ticket">Crux</a>{" "}
      <a href="http://localhost:3002/sales">Sales</a>
      <a href="http://localhost:3001/chat">Chat</a>
    </div>
  );
}

export default SwitchHeader;
