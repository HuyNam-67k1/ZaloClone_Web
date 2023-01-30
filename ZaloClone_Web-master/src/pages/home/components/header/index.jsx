import React from "react";
import NavBar from "../navbar";
import Logo from "../../../../assets/images/messenger.png";


function Header() {
    return ( 
        <div className="wrap">
         <div className="inner">
            <div className="logo-link" >
                     <img src={Logo} alt="Zalo" style={{width:40, height:40}}/>
                    <span name='Ten San Pham'>Messenger</span>            
            </div>
                    <NavBar />                      
         </div>
          
        </div>
     );
}

export default Header;