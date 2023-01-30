import React, { useEffect, useState } from "react";
import "./ConversationListItem.css";
import { ChatRoom, User, ChatRoomUser, Message } from "../../models";
import { Auth, DataStore } from "aws-amplify";
import { Spin } from "antd";
import moment from "moment";
import { AppContext } from "../../context/AppProvider";
import { AmplifyS3Image } from "@aws-amplify/ui-react/legacy";
import { useNavigate } from "react-router-dom";
export default function ConversationListItem(props) {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [lastMessage, setLastMessage] = useState();
  const { RenderContent } = React.useContext(AppContext);
  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedChatRoomUsers = (await DataStore.query(ChatRoomUser))
        .filter((chatRoomUser) => chatRoomUser.chatRoom.id === props.data.id)
        .map((chatRoomUser) => chatRoomUser.user);
      // console.log(fetchedChatRoomUsers);

      // setUsers(fetchedChatRoomUsers);

      //Find other user from current user in that chat room
      const authUser = await Auth.currentAuthenticatedUser();
      setUser(
        fetchedChatRoomUsers.find(
          (user) => user.id !== authUser.attributes.sub
        ) || null
      );
    };
    fetchUsers();
  }, [RenderContent]);

  //get last message from that chatroom, query by id
  useEffect(() => {
    if (!props.data.chatRoomLastMessageId) {
      return;
    }
    DataStore.query(Message, props.data.chatRoomLastMessageId).then(
      setLastMessage
    );
  }, []);

  //Loading
  if (!user) {
    return (
      <Spin
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      />
    );
  }

  // get time
  // const time = moment(lastMessage?.createdAt).format("dddd, MMM D, h:mm a");
  const time = moment(lastMessage?.createdAt).from(moment());

  // const { imageUri, name, text } = props.data;
  const onClick = () => {
    const setNewMessageToZero = async () => {
      DataStore.save(
        ChatRoom.copyOf(props.data, (updatedChatRoom) => {
          updatedChatRoom.newMessages = 0;
        })
      );
    };
    setNewMessageToZero();
    navigate("/chat");
  };

  return (
    <div className="conversation-list-item" onClick={onClick}>
      {/* {console.log("alo",chatRoom)} */}
      <div className="new-message">
        <div className="conversation-photo">
          <AmplifyS3Image
            imgKey={props.data.imageUri || user?.imageUri}
            alt="placeholder"
            style={{ "--height": "50px", "--width": "50px" }}
          />
        </div>

        {!!props.data.newMessages && (
          <div className="badge-container">
            <p className="badge-text">N</p>
          </div>
        )}
      </div>

      <div className="conversation-info">
        <h1 className="conversation-title">{props.data.name || user?.name}</h1>

        {lastMessage?.content && (
          <p className="conversation-snippet">
            Last message: {lastMessage?.content}
          </p>
        )}
        {/* <p className="conversation-snippet">
          Last message: {lastMessage?.content}
        </p> */}
        {lastMessage?.content && (
          <h5 className="conversation-snippet">{time}</h5>
        )}
        {/* {console.log(user)} */}
      </div>
    </div>
  );
}
