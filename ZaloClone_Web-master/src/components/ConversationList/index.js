import React, { useState, useEffect } from "react";
import ConversationSearch from "../ConversationSearch";
import ConversationListItem from "../ConversationListItem";
import Toolbar from "../Toolbar";
import ToolbarButton from "../ToolbarButton";

import { AppContext } from "../../context/AppProvider";
import { PlusCircleOutlined, UserOutlined } from "@ant-design/icons";
import { User } from "../../models";
import { DataStore } from "aws-amplify";

import "./ConversationList.css";

export default function ConversationList(props) {
  const { setIsModalOpen } = React.useContext(AppContext);
  const [users, setUsers] = useState([]);
  const handleInfouser = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    DataStore.query(User).then(setUsers);
  }, []);

  return (
    <div className="conversation-list">
      <Toolbar
        title="Messenger"
        leftItems={[
          // <ToolbarButton key="cog" icon="ion-ios-cog" onClick={handleInfouser} />
          <UserOutlined
            key="cog"
            onClick={handleInfouser}
            className="toolbar-button user"
          />,
        ]}
        rightItems={[
          <PlusCircleOutlined
            key="cog"
            // onClick={handleInfouser}
            className="toolbar-button add"
          />,
        ]}
      />
      <ConversationSearch />
      {users.map((conversation) => (
        <ConversationListItem key={conversation.id} data={conversation} />
      ))}
    </div>
  );
}
