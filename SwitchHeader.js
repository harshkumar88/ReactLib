import React from "react";
import styles from "./common.module.css";
function SwitchHeader() {
  return (
    <div className={styles.header}>
      <a href="http://localhost:3005/ticket">Ticket</a>{" "}
      <a href="http://localhost:3003/sales">Sales</a>
      <a href="http://localhost:3001/chat">Chat</a>
    </div>
  );
}

export default SwitchHeader;
