import React, { useContext, useEffect } from "react";
import { Button, Modal } from "antd";
import { AppContext } from "../../context/AppProvider";
import "./InfoUser.scss";
import { Auth, DataStore } from "aws-amplify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AmplifyS3Image }  from '@aws-amplify/ui-react/legacy';
import {User} from "../../../src/models";

function InfoUserModal() {
  const [currentUsers, setCurrentUsers] = useState();
  const { isModalOpen, setIsModalOpen } = useContext(AppContext);
  const [user, setUser] = useState({});
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const navigate = useNavigate();
  async function signOut() {
    try {
      await Auth.signOut();
      navigate("/", { replace: true });
      setIsModalOpen(false);
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  const fetchUsers = async () => {
    const currentUserCognito = await Auth.currentAuthenticatedUser();
    const dbUser = await DataStore.query(
      User,
      currentUserCognito.attributes.sub
    );
    setCurrentUsers(dbUser);
  };
 
  useEffect(() => {
  fetchUsers();
  }, []);


  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await Auth.currentAuthenticatedUser();
      var name = currentUser.attributes.name;
      var email = currentUser.attributes.email;
      var sub = currentUser.attributes.sub;
      var imageUri = currentUser.attributes.imageUri;
      setUser({ name, email, sub, imageUri });
      
    };
    fetchUser();
  }, []);
  // console.log(User);
  return (
    <div className="container_info">
      <Modal
        title="Profile"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className="modal"
        footer={null}
      > 
        <div className="img_info">
        {currentUsers?.imageUri && (
        
                   <div  className="imguser_info">
                   <AmplifyS3Image
                     imgKey={currentUsers?.imageUri}
                     style={{"--height": "50px", "--width": "50px"}}
                    //  style={{ width: 100, height: 100 }}
                   />
                 </div>
         

        )}
         </div>
       
{/* <div className="img_info">
          <img
            className="imguser_info"
            alt="Ảnh User"
            src="http://www.psdgraphics.com/file/user-icon.jpg"
            style={{ width: 100, height: 100 }}
          />
        </div> */}
  


        <h2>{user.name}</h2>
        <h3>Info</h3>
        <div className="content">
          <div className="content_top">
            <div>
              <span className="lable_info" style={{ paddingRight: 5 }}>
                Email
              </span>
              <span className="lable_infoA">{user.email}</span>
            </div>
            <div>
              <span className="lable_info" style={{ paddingRight: 10 }}>
                Gender:{" "}
              </span>
              <span className="lable_infoA"> Nam</span>
            </div>
            <div>
              <span className="lable_info">Date: </span>
              <span className="lable_infoA">10/10/2022</span>
            </div>
          </div>
          <div className="btn_info">
            <Button className="btn_capnhat">Update</Button>
            <Button className="btn_dangxuat" onClick={signOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default InfoUserModal;
