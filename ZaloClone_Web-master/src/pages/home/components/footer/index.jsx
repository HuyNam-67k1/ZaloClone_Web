import { Button } from "antd";
import React from "react";
import {LoginOutlined,EditOutlined  } from '@ant-design/icons';
import {AppContext} from '../../../../context/AppProvider';

function Footers() {
  const {setisAddFriendVisible} =  React.useContext(AppContext);
  const handleAddfriend = () =>{
    setisAddFriendVisible(true);
  }

    return (  
        <div className="infooter">
            
            <Button className="dir-control" >Đăng Nhập<LoginOutlined /> </Button>
            <Button className="dir-control" onClick={handleAddfriend} ><EditOutlined />Đăng Ký</Button>
            
        </div>
    );
}

export default Footers;