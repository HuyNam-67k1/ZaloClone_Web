import React, { useState } from "react";

export const AppContext = React.createContext();
function AppProvider({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddFriendVisible, setisAddFriendVisible] = useState(false);
  const [userContext, setuserContext] = useState("");
  const [PasswordContext, setPassWordContext] = useState("");
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [isModalOpenGroup, setIsModalOpenGroup] = useState(false);
  const [RenderContent, setRenderContent] = useState(false);

  const clearState = () => {
    setIsModalOpen(false);
    setisAddFriendVisible(false);
    setuserContext("");
    setSelectedRoomId("");
    setIsEmojiPickerOpen(false);
    setIsModalOpenGroup("");
    setPassWordContext("");
    setRenderContent(false);
  };
  return (
    <AppContext.Provider
      value={{
        isModalOpen,
        setIsModalOpen,
        clearState,
        isAddFriendVisible,
        setisAddFriendVisible,
        userContext,
        setuserContext,
        selectedRoomId,
        setSelectedRoomId,
        isEmojiPickerOpen,
        setIsEmojiPickerOpen,
        isModalOpenGroup,
        setIsModalOpenGroup,
        PasswordContext, 
        setPassWordContext,
        RenderContent, 
        setRenderContent
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
