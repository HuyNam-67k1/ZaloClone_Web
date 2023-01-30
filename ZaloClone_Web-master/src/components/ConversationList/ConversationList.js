import React, { useState, useEffect } from "react";
import ConversationSearch from "../ConversationSearch";
import ConversationListItem from "../ConversationListItem/ItemConversationList";
import Toolbar from "../Toolbar";
import ToolbarButton from "../ToolbarButton";
import { PlusCircleOutlined, UserOutlined } from "@ant-design/icons";
import "./ConversationList.css";
import { AppContext } from "../../context/AppProvider";
import { User, ChatRoomUser, ChatRoom, Message } from "../../models";
import { Auth, DataStore } from "aws-amplify";
import { Link } from "react-router-dom";
import { set } from "lodash";
import { getGrid2UtilityClass } from "@mui/material";

export default function ConversationList(props) {
  const { setIsModalOpen,setSelectedRoomId ,RenderContent } = React.useContext(AppContext);
  //const [users, setUsers] = useState([]);
  const handleInfouser = () => {
    setIsModalOpen(true);
  };
  useEffect(() => {
    setChatRooms(chatRooms);
    fetchChatRooms();
    // console.log(chatRooms);
  }, [RenderContent]);
  
  const [chatRooms, setChatRooms] = useState([]);
  const fetchChatRooms = async () => {
    const currentUser = await Auth.currentAuthenticatedUser();

    console.log(currentUser);
    const chatRooms = (await DataStore.query(ChatRoomUser))
      .filter(
        (chatRoomUser) =>
          chatRoomUser.user.id === currentUser.attributes.sub &&
          chatRoomUser.chatRoom.name !== "Deleted"
      )
      .map((chatRoomUser) => chatRoomUser.chatRoom);
    setChatRooms(chatRooms);
    // console.log(chatRooms);
  };

 


  // const GetRommId=()=>{
  //   console.log(chatRooms);
  // }
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
      {chatRooms.map((conversation) => (
        <Link
          key={conversation.id}
          onClick={() => setSelectedRoomId(conversation.id)}
        >
          <ConversationListItem key={conversation.id} data={conversation} />
        </Link>
      ))}
    </div>
  );
}
