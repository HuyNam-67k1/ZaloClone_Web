import React, { useState } from "react";
import ConversationList from "../../components/ConversationList";
import MessageList from "../../components/MessageList";
import Slidebar from "../../components/Slidebar";
import AddFriendModal from "../../components/Modals/AddFrienModal";
import InfoUserModal from "../../components/Modals/InfoUserModal";
import "./Messenger.css";

export default function Messenger(props) {
  return (
    <div className="messenger">
      <div className="slidebar">
        <Slidebar />
      </div>
      <div className="scrollable sidebar">
        <ConversationList />
      </div>
      <div className="content">
        <MessageList />
      </div>
      <InfoUserModal />
      <AddFriendModal />
    </div>
  );
}
