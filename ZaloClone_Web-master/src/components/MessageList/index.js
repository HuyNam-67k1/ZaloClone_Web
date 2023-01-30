import React, {useContext } from "react";
import MessageListSelected from "../MessageListSelected";
import MessageListEnty from "../MessageListEnty";
import { AppContext } from "../../context/AppProvider";

export default function MessageList(props) {
  const { selectedRoomId } =useContext(AppContext);

  return (
  
   
    <div className="Wrapped">
    { selectedRoomId ? (
        <MessageListSelected/>
          
         ) : (  <MessageListEnty/>
         )}
          </div>
       
  );
}
