import React from "react";
import ContactList from "../../components/ContactList/ContactList";
import Slidebar from "../../components/Slidebar";
import "./Contact.css";

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
