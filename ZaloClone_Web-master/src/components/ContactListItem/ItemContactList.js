import React, {useEffect, useState} from 'react';
import styles from './ContactListItem.modulo.scss';
import classNames from 'classnames/bind';
import { User, ChatRoomUser ,ChatRoom } from '../../models';
import { Auth,DataStore } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import { AmplifyS3Image }  from '@aws-amplify/ui-react/legacy';
const cx = classNames.bind(styles);
export default function ContactListItem(props) {
  // useEffect(() => {
  //   shave('.conversation-snippet', 20);
  // })
  var isAdmin = false;
   const [user,setUser] = useState(props.data);
    const navigate = useNavigate();
    const { imageUri, name, text } = props.data;
    const [Css,setCss] = useState(true);
    useEffect(() => {
      if(props.isSelected===false){
        setCss(false);
      }
      else if(props.isSelected===true)
      {
        setCss(false);
      }
      else{
        setCss(true);
      }
    }, [props.isSelected]);
  // const onPress = async()=>{
  //   console.log(user);
  //   const authUser = await Auth.currentAuthenticatedUser();
  //   const dbUser = await DataStore.query(User, authUser.attributes.sub); //query by id
  //   console.log(dbUser);

  // }

    // const onPress = async () => {
    //   //Create a chat room
    //   const newChatRoom = await DataStore.save(new ChatRoom({ newMessages: 0 }));
  
    //   //Connect current user to that chat room
    //   const authUser = await Auth.currentAuthenticatedUser();
    //   const dbUser = await DataStore.query(User, authUser.attributes.sub); //query by id
    //   await DataStore.save(
    //     new ChatRoomUser({
    //       user: dbUser,
    //       chatRoom: newChatRoom,
    //     })
    //   );
  
    //   //Connect clicked user to the chat room
    //   await DataStore.save(
    //     new ChatRoomUser({
    //       user,
    //       chatRoom: newChatRoom,
    //     })
    //   );
  
    //   // navigation.navigate("ChatRoom", { id: newChatRoom.id });
    //   navigate("/chat",{replace: true});
    // };
    function Log(){
      console.log("Co");
    }
    return (
      <div className={cx( 'conversation-list-item', Css? 'conversation-list-item-b' : 'conversation-list-item-a')} onClick={props.onClick}>
        {console.log(props)}
        <div className="conversation-photo">
          <AmplifyS3Image  imgKey={props.data.imageUri || user?.imageUri} alt="placeholder" 
           style={{"--height": "50px", "--width": "50px"}}
          />

          </div>
        <div className="conversation-info">
        {isAdmin && <h4>admin</h4>}
          <h1 className="conversation-title">{ name }</h1>
          <p className="conversation-snippet">{ text }</p>
        </div>
        {props.isSelected !== undefined && (
            <input
            type="checkbox"         
            checked={props.isSelected}
            className="chk_Chon"
            onChange={Log}
        />
        )
        }   
      </div>
    );
}