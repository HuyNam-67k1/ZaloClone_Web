import React, { useEffect } from "react";
import shave from "shave";
import { DataStore, Auth } from "aws-amplify";
import { ChatRoom, User, ChatRoomUser } from "../../models";

import "./ConversationListItem.css";

export default function ConversationListItem(props) {
  // useEffect(() => {
  //   shave(".conversation-snippet", 20);
  // });

  const { imageUri, name, text } = props.data;

  const onPress = async () => {
    //Create a chat room
    const newChatRoom = await DataStore.save(new ChatRoom({ newMessages: 0 }));

    //Connect current user to that chat room
    const authUser = await Auth.currentAuthenticatedUser();
    const dbUser = await DataStore.query(User, authUser.attributes.sub); //query by id
    await DataStore.save(
      new ChatRoomUser({
        user: dbUser,
        chatRoom: newChatRoom,
      })
    );

    //Connect clicked user to the chat room
    await DataStore.save(
      new ChatRoomUser({
        user: props,
        chatRoom: newChatRoom,
      })
    );

    // navigation.navigate("ChatRoom", { id: newChatRoom.id });
  };

  return (
    <div className="conversation-list-item" onClick={onPress}>
      <img className="conversation-photo" src={imageUri} alt="placeholder" />
      <div className="conversation-info">
        <h1 className="conversation-title">{name}</h1>
        <p className="conversation-snippet">{text}</p>
      </div>
    </div>
  );
}
