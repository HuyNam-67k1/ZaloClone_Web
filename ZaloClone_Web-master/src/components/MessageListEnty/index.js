import React from "react";
import { Alert } from "antd";
function MessageListEnty() {
  return (
    <Alert
      message="Select a room"
      type="info"
      showIcon
      style={{ margin: 5 }}
      closable
    />
  );
}

export default MessageListEnty;
