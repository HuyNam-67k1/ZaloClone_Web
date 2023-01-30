import React, { useState, useEffect } from "react";
import ConversationSearch from "../ConversationSearch";
import ConversationListItem from "../ConversationListItem/ItemConversationList";
import Toolbar from "../Toolbar";
import ToolbarButton from "../ToolbarButton";
import { PlusCircleOutlined, UserOutlined } from "@ant-design/icons";
import { AppContext } from "../../context/AppProvider";
import "./ContactList.css";

import { ChatRoom, User, ChatRoomUser } from "../../models";
import { Auth, DataStore } from "aws-amplify";
import ContactListItem from "../ContactListItem/ItemContactList";
import { Button, Image, Alert } from "antd";
import { UsergroupAddOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function ContactList(props) {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);
  const { setIsModalOpen,  setRenderContent,RenderContent} = React.useContext(AppContext);
  // const [users, setUsers] = useState([]);

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isNewGroup, setIsNewGroup] = useState(false);
  // const [Render, setRender] = useState(false);
  const handleInfouser = () => {
    setIsModalOpen(true);
  };
  useEffect(() => {
    const fetchUserList = async () => {
      const GetUser = await DataStore.query(User);
      // console.log(GetUser);
      setConversations(GetUser);
    };
    fetchUserList();
  }, []);

  // useEffect(() => { 
  //   const subscription = DataStore.observe(ChatRoomUser).subscribe((msg) => {
  //     console.log("1test:",msg.model);
  //     console.log("2test2",msg.opType);
  //     console.log("3test",msg.element);
  //     if (msg.model === ChatRoomUser && msg.opType === "INSERT"){
  //       setRenderContent(!RenderContent);
  //       console.log("Chay");     
  //     }
  //   });
  //   return () => subscription.unsubscribe();
  // }, []);

  
  //Add User to ChatRoom
  const addUserToChatRoom = async (user, chatRoom) => {
    DataStore.save(new ChatRoomUser({ user, chatRoom }));
  };
  //CreateChatRoom
  const createChatRoom = async (users) => {
    // TODO if there is already a chat room between 2 users
    // then redirect to the existing chat room
    // otherwise, create a new chatroom with these users.

    // connect authenticated user with the chat room
    const authUser = await Auth.currentAuthenticatedUser();
    const dbUser = await DataStore.query(User, authUser.attributes.sub);
    console.log("dbUser", dbUser);
    if (!dbUser) {
      Alert("There was an error creating the group");
      return;
    }
    // Create a chat room
    const newChatRoomData = {
      newMessages: 0,
      Admin: dbUser,
    };
    if (users.length > 1) {
      newChatRoomData.name = "Friend Group";
      newChatRoomData.imageUri = "group.jpeg";
    }
    const newChatRoom = await DataStore.save(new ChatRoom(newChatRoomData));

    if (dbUser) {
      await addUserToChatRoom(dbUser, newChatRoom);
    }

    // connect users user with the chat room
    await Promise.all(
      users.map((user) => addUserToChatRoom(user, newChatRoom))
    );

    navigate("/chat", { replace: true });
  };

  const isUserSelected = (user) => {
    return selectedUsers.some((selectedUser) => selectedUser.id === user.id);
  };
  const onUserPress = async (user) => {
    if (isNewGroup) {
      if (isUserSelected(user)) {
        // remove it from selected
        setSelectedUsers(
          selectedUsers.filter((selectedUser) => selectedUser.id !== user.id)
        );
      } else {
        setSelectedUsers([...selectedUsers, user]);
      }
    } else {
      await createChatRoom([user]);
    }
  };

  const saveGroup = async () => {
    await createChatRoom(selectedUsers);
    // setRender(!Render);
  };

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

      <Button
        className="btn_newGroup"
        onClick={() => setIsNewGroup(!isNewGroup)}
      >
        <UsergroupAddOutlined name="group" size={50} color="#4f4f4f" />
        New Group
      </Button>
      {conversations.map((conversation) => (
        <ContactListItem
          key={conversation.id}
          data={conversation}
          user={conversation}
          onClick={() => onUserPress(conversation)}
          isSelected={isNewGroup ? isUserSelected(conversation) : undefined}
        />
      ))}
      {isNewGroup && (
        <Button className="btn_Save" onClick={saveGroup}>
          Save group ({selectedUsers.length})
        </Button>
      )}
    </div>
  );
}
