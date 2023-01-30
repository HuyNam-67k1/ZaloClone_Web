import React from "react";
import ContactList from "../../components/ContactList/ContactList";
import MessageList from "../../components/MessageList";
import Slidebar from "../../components/Slidebar";
import "./Contact.css";
import InfoUserModal from "../../components/Modals/InfoUserModal";

export default function Contact(props) {
  return (
    <div className="messenger">
      <div className="slidebar">
          <Slidebar/>
      </div>
      <div className="scrollable sidebar">
        <ContactList />
      </div>
      <div className="scrollable content">
        {/* <MessageList /> */}
      </div>
      
    </div>
  );
}
