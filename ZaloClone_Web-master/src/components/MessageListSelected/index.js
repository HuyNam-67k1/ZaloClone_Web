import React, { useEffect, useState, useContext, useRef } from "react";
import Compose from "../Compose";
import Toolbar from "../Toolbar";
import ToolbarButton from "../ToolbarButton";
import Message from "../Message";
import moment from "moment";
import chatData from "../../assets/dummy-data/Chats.js";
import { useNavigate } from "react-router-dom";
import "./MessageList.css";
import { AppContext } from "../../context/AppProvider";
import { Alert } from "antd";
import { ChatRoom, Message as MessageModel, ChatRoomUser } from "../../models";
import { DataStore, SortDirection, Auth } from "aws-amplify";
import {
  InfoCircleTwoTone,
  PhoneOutlined,
  PhoneTwoTone,
} from "@ant-design/icons";
import InfoGroup from "../Modals/InfoGroup";
import EmojiPicker from "emoji-picker-react";
import { AmplifyS3Image } from "@aws-amplify/ui-react/legacy";
import { BsXOctagon } from "react-icons/bs";

const MY_USER_ID = "apple";

function MessageListSelected() {
  const [messages, setMessages] = useState([]);
  const [chatRoom, setChatRoom] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [render, setRender] = useState(false);
  const [messDel, setMessDel] = useState();
  const [messUpdate, setMessUpdate] = useState();
  const [isDelete, setDelete] = useState(false);
  const [selectedMess, setselectedMess] = useState([]);
  const {
    selectedRoomId,
    setIsModalOpenGroup,
    isEmojiPickerOpen,
    RenderContent,
  } = useContext(AppContext);
  const [messageEmoji, setMessageEmoji] = useState("");
  const scrollRef = useRef();
  const navigate = useNavigate();
  const fetchUsers = async () => {
    const fetchedUsers = (await DataStore.query(ChatRoomUser))
      .filter((chatRoomUser) => chatRoomUser.chatRoom.id === selectedRoomId)
      .map((chatRoomUser) => chatRoomUser.user);

    setAllUsers(fetchedUsers);

    const authUser = await Auth.currentAuthenticatedUser();
    setUser(
      fetchedUsers.find((user) => user.id !== authUser.attributes.sub) || null
    );
  };

  useEffect(() => {
    fetchChatRoom();
    fetchUsers();
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedRoomId, RenderContent]);

  useEffect(() => {
    fetchMessages();
  }, [chatRoom, messDel, messUpdate, render]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      const currentUser = await Auth.currentAuthenticatedUser();
      const chatRoom = (await DataStore.query(ChatRoomUser))
        .filter(
          (chatRoomUser) => chatRoomUser.user.id === currentUser.attributes.sub
        )
        .map((chatRoomUser) => chatRoomUser.chatRoom);
      setChatRoom(chatRoom);
    };
    setChatRoom(chatRoom);
    fetchChatRooms();
  }, []);
  useEffect(() => {
    const subscription = DataStore.observe(MessageModel).subscribe((msg) => {
      console.log(msg.model, msg.opType, msg.element);
      if (msg.model === MessageModel && msg.opType === "INSERT") {
        //apend new message to existing messages
        setMessages((existingMessages) => [msg.element, ...existingMessages]);
      }
    });
    return () => subscription.unsubscribe();
  }, []);
  useEffect(() => {
    const subscription = DataStore.observe(MessageModel).subscribe((msg) => {
      console.log(msg.model, msg.opType, msg.element);
      if (msg.model === MessageModel && msg.opType === "DELETE") {
        //apend new message to existing messages

        setMessDel(msg.element.id);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const subscription = DataStore.observe(MessageModel).subscribe((msg) => {
      console.log(msg.model, msg.opType, msg.element);
      if (msg.model === MessageModel && msg.opType === "UPDATE") {
        console.log("vo");
        setMessUpdate(msg.element.id);
      }
    });
    return () => subscription.unsubscribe();
  }, []);
  // useEffect(() => {

  // }, [messages]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchChatRoom = async () => {
    if (!selectedRoomId) {
      console.warn("No chatroom id received");
      return;
    }
    const chatRooms = await DataStore.query(ChatRoom, selectedRoomId);

    if (!chatRooms) {
      console.error("No chatroom found with this id");
    } else {
      setChatRoom(chatRooms);
      console.log(chatRooms);
    }
  };

  const fetchMessages = async () => {
    if (!chatRoom) {
      return;
    }
    const fetchedMessages = await DataStore.query(
      MessageModel,
      (message) => message.chatroomID("eq", chatRoom?.id),
      {
        sort: (message) => message.createdAt(SortDirection.DESCENDING),
      }
    );
    console.log(fetchedMessages);
    setMessages(fetchedMessages);
  };
  // console.log(selectedRoomId);
  // console.log(messages);
  // console.log(chatRoom);
  const pickEmoji = (emojiData: EmojiClickData, event: MouseEvent) => {
    setMessageEmoji((currentMessage) => currentMessage + emojiData.emoji);
  };

  const OpenVideoCall = async () => {
    const user = await Auth.currentAuthenticatedUser();
    await DataStore.save(
      new MessageModel({
        content: "Video Call",
        userID: user.attributes.sub,
        chatroomID: selectedRoomId,
      })
    );
    // window.open(
    //   "https://webrtc-video-room.herokuapp.com/r/64371264",
    //   "_blank",
    //   "noopener,noreferrer"
    // );
    navigate("/videocall", { replace: true });
  };

  const isMessSelected = (mess) => {
    return selectedMess.some((selectedMess) => selectedMess.id === mess.id);
  };
  const onMessPress = (mess) => {
    // console.log("asdL ",mess.id);
    if (isMessSelected(mess)) {
      // remove it from selected
      setselectedMess(
        selectedMess.filter((selectedMess) => selectedMess.id !== mess.id)
      );
    } else {
      setselectedMess([...selectedMess, mess]);
    }
  };
  const deleteMess = async (mess) => {
    const currentUser = await Auth.currentAuthenticatedUser();

    if (currentUser.attributes.sub === mess.userID) {
      await DataStore.delete(MessageModel, (messmodel) =>
        messmodel.id("eq", mess.id)
      );
      setRender(!render);
    } else {
      alert("You are not a messager so you can't delete");
    }
    // console.log("aa:",mess.id);
  };
  const recallMess = async (mess) => {
    const currentUser = await Auth.currentAuthenticatedUser();
    if (currentUser.attributes.sub === mess.userID) {
      await DataStore.save(
        MessageModel.copyOf(mess, (updated) => {
          updated.content = "[message recalled]";
          updated.image = null;
          updated.file = null;
          updated.audio = null;
        })
      );
      setRender(!render);
    } else {
      alert("You are not a messager so you can't recall");
    }
  };
  return (
    <div className="message-list">
      <Toolbar
        // title={chatRoom?.name || user?.name}
        rightItems={[
          <InfoCircleTwoTone
            key="info"
            onClick={() => {
              setIsModalOpenGroup(true);
            }}
            style={{
              fontSize: 32,
              alignItems: "center",
              display: "flex",
              marginLeft: 11,
              marginRight: 30,
            }}
          />,
          <PhoneTwoTone
            key="info"
            onClick={() => {
              OpenVideoCall();
            }}
            style={{
              fontSize: 32,
              alignItems: "center",
              display: "flex",
              marginLeft: 11,
              marginRight: 30,
            }}
          />,
        ]}
        leftItems={[
          <AmplifyS3Image
            imgKey={user?.imageUri || null}
            style={{ "--height": "50px", "--width": "50px" }}
          />,
          <h1 className="toolbar-title">{chatRoom?.name || user?.name}</h1>,
        ]}
      />
      <div className="chatbox">
        <div className="message-list-container">
          {messages.map((messItem) => (
            <div key={messItem.id} ref={scrollRef}>
              <Message
                data={messItem}
                openDelete={() => onMessPress(messItem)}
                isSelected={isMessSelected(messItem)}
                deleteClick={() => deleteMess(messItem)}
                recallClick={() => recallMess(messItem)}
              ></Message>
            </div>
          ))}
        </div>
      </div>

      <Compose
        chatRoom={chatRoom}
        messageEmoji={messageEmoji}
        leftItems={[
          <ToolbarButton key="photo" icon="ion-ios-camera" />,
          <ToolbarButton key="image" icon="ion-ios-image" />,
          <ToolbarButton key="audio" icon="ion-ios-mic" />,
          <ToolbarButton key="emoji" icon="ion-ios-happy" />,
        ]}
        rightItems={[<ToolbarButton key="photo" icon="ion-ios-send" />]}
        // messageEmoji={messageEmoji}
      ></Compose>
      {isEmojiPickerOpen && (
        <div style={{ bottom: 60, position: "sticky" }}>
          <EmojiPicker
            autoFocusSearch={false}
            width="30%"
            onEmojiClick={pickEmoji}
          />
        </div>
      )}
      <InfoGroup />
    </div>
  );
}

export default MessageListSelected;
