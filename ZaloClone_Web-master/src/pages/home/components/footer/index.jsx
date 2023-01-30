import { Button } from "antd";
import React,{useState} from "react";
import {LoginOutlined,EditOutlined  } from '@ant-design/icons';
import {AppContext} from '../../../../context/AppProvider';

import {  DataStore } from "aws-amplify";
import {User} from '../../../../models';
function Footers() {
  const {setisAddFriendVisible} =  React.useContext(AppContext);
  // const [users, setUsers] = useState<User>({});
  const handleAddfriend = () =>{
    setisAddFriendVisible(true);
  }
//  async function a(){
//     const fetchUser= (await DataStore.query(User,"1397f2a2-e1ef-44be-8035-e1a88b7798a5"));
//     console.log(fetchUser);
//     setUsers(fetchUser);
//     // DataStore.query(User).then(setUsers);
//     console.log(users);
//   }
    return (  
        <div className="infooter">
            
            <Button className="dir-control" >Đăng Nhập<LoginOutlined /> </Button>
            <Button className="dir-control" onClick={handleAddfriend} ><EditOutlined />Đăng Ký</Button>
            
        </div>
    );
}

export default Footers;