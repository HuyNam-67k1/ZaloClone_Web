import React, { useEffect, useState, useContext } from "react";
import "./Compose.css";
import { Button } from "antd";
import { ChatRoomUser, Message, ChatRoom } from "../../models";
import { Auth, DataStore, Storage } from "aws-amplify";
import { AppContext } from "../../context/AppProvider";
import ToolbarButton from "../ToolbarButton";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import { FrownTwoTone, FileAddTwoTone } from "@ant-design/icons";
import Emoji from "../Emoji/Emoji";
import { v4 as uuidv4 } from "uuid";

export default function Compose(props) {
  // console.log("Right", props);
  console.log("chatroom", { props });
  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    setMessage(props.messageEmoji);
  }, [props.messageEmoji]);

  const { selectedRoomId, setIsEmojiPickerOpen } = useContext(AppContext);
  const [showEmojis, setShowEmojis] = useState();
  // const [image, setImage] = useState(null);
  // const [file, setFile] = useState(null);
  var image;
  var file;
  // console.log(props.chatRoom);
  const saveNewMessage = async () => {
    // get all the users of this chatroom
    const user = await Auth.currentAuthenticatedUser();
    const newMessage = await DataStore.save(
      new Message({
        content: message,
        userID: user.attributes.sub,
        chatroomID: selectedRoomId,
      })
    );
    updateLastMessage(newMessage);

    setMessage("");
    setIsEmojiPickerOpen(false);
  };

  const updateLastMessage = async (newMessage) => {
    DataStore.save(
      ChatRoom.copyOf(props.chatRoom, (updatedChatRoom) => {
        updatedChatRoom.newMessages = 1;
        updatedChatRoom.LastMessage = newMessage;
      })
    );
  };

  const onPress = () => {
    saveNewMessage();
  };

  const progressCallback = (progress) => {
    setProgress(progress.loaded / progress.total);
  };
  const getBlob = async (uri) => {
    const link = URL.createObjectURL(uri);
    const respone = await fetch(link);
    const blob = await respone.blob();
    return blob;
  };

  const sendImage = async () => {
    if (!image) {
      return;
    }
    const blob = await getBlob(image);
    const { key } = await Storage.put(`${uuidv4()}.png`, blob, {
      progressCallback,
    });

    // send message with image
    const user = await Auth.currentAuthenticatedUser();
    const newMessage = await DataStore.save(
      new Message({
        content: "Sent Image",
        image: key,
        userID: user.attributes.sub,
        chatroomID: selectedRoomId,
      })
    );
    updateLastMessage(newMessage);
  };
  const sendFile = async () => {
    if (!file) {
      console.log("123");
      return;
    }
    const blob = await getBlob(file);
    const { key } = await Storage.put(`${uuidv4()}.docx`, blob, {
      progressCallback,
    });

    // send message with image
    const user = await Auth.currentAuthenticatedUser();
    const newMessage = await DataStore.save(
      new Message({
        content: "Sent File",
        file: key,
        userID: user.attributes.sub,
        chatroomID: selectedRoomId,
      })
    );
    updateLastMessage(newMessage);
  };
  function handleFile({ target }) {
    console.log("file");
    const loadedfile = target.files[0];
    // setFile(loadedImage);
    file = loadedfile;
    sendFile();
  }
  function handleImage({ target }) {
    console.log("anh");
    const loadedImage = target.files[0];
    // setImage(loadedImage);
    image = loadedImage;
    sendImage();
  }
  return (
    <div className="compose">
      {/* <div className="left-button"> {props.leftItems.} </div> */}
      <div className="left-button">
        <label onChange={handleImage} htmlFor="formIda">
          <input name="Anh" type="file" id="formIda" hidden={true} />
          <ToolbarButton key="photo" icon="ion-ios-camera" />
        </label>

        <ToolbarButton key="audio" icon="ion-ios-mic" />

        <label onChange={handleFile} htmlFor="formId">
          <input name="File" type="file" id="formId" hidden={true} />
          <FileAddTwoTone
            style={{
              fontSize: 24,
              alignItems: "center",
              display: "flex",
              marginLeft: 11,
              marginTop: 10,
            }}
          />
        </label>
        <FrownTwoTone
          onClick={() => setIsEmojiPickerOpen((currentValue) => !currentValue)}
          style={{
            fontSize: 24,
            alignItems: "center",
            display: "flex",
            marginLeft: 11,
          }}
        />
      </div>
      <div className="container">
        <input
          type="text"
          className="compose-input"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          spellCheck="false"
        />

        <div className="right-button" onClick={onPress}>
          <Button type="primary" className="btnSend">
            Send
          </Button>
          {/* {props.rightItems} */}
        </div>
      </div>
    </div>
  );
}
