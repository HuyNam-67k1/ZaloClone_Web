import React, {useEffect} from "react";
import ConversationList from "../../components/ConversationList/ConversationList";
import MessageList from "../../components/MessageList";
import Slidebar from "../../components/Slidebar";
import "./Messenger.css";
import InfoUserModal from "../../components/Modals/InfoUserModal";
import { DataStore } from "aws-amplify";
export default function Messenger(props) {
  // useEffect(() => {
  //   clear();
  // }, [])
  

  // const clear = async () => {
  //   // await DataStore.clear();
  //   await DataStore.start();
  // };

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
    </div>
  );
}
