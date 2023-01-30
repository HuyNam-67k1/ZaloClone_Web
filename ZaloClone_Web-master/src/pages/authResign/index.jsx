import Input from "rc-input";
import React from "react";
import "./index.scss";
import { Button } from "antd";
import IMAGE_ACCOUNT_PAGE from "../../assets/images/accountbg.png";

import { useLocation, useNavigate } from "react-router-dom";
import CustomInput from "../../components/Custom/CustomInput";
import { Controller, useForm } from "react-hook-form";

import { Amplify, Auth } from "aws-amplify";
import awsconfig from "../../aws-exports";

import { AppContext } from "../../context/AppProvider";

Amplify.configure(awsconfig);

function AuthResign() {
  // const route = useRoute();
  //Lấy UserName từ Context;
  const { userContext,PasswordContext } = React.useContext(AppContext);

  const navigate = useNavigate();
  const { control, handleSubmit, watch } = useForm({
    defaultValues: { username: userContext,   password:PasswordContext },
  });

  const onConfirmPressed = async (data) => {
    try {
      await Auth.confirmSignUp(data.username, data.code);
      console.log("Thanh cong");
    } catch (error) {
      console.log("error confirming sign up", error);
    }
    try {
      const response = await Auth.signIn(data.username, PasswordContext );
      console.log("Login log", response);
     navigate("/chat", { replace: true });
    } catch (error) {
      console.log("error confirming sign up", error);
    }
  };

  return (
    <div className="container-authResign">
      <div className="content_Auth">
        <img
          src={IMAGE_ACCOUNT_PAGE}
          alt="Anh Trang chu"
          className="AnhXacThuc"
        />

        <div className="Auth">
          <h1>Vertification Code</h1>
          <p>Input vertification code sent from mail</p>
          <div className="Auth_Input">
            <div className="NhapUser">
              <CustomInput
                name="username"
                control={control}
                placeholder="Username"
                rules={{
                  required: "Username code is required",
                }}
              />
            </div>
            <div className="NhapCode">
              <CustomInput
                name="code"
                control={control}
                placeholder="Enter your confirmation code"
                rules={{
                  required: "Confirmation code is required",
                }}
              />
            </div>

            <Button className="Btn" onClick={handleSubmit(onConfirmPressed)}>
              Confirm
            </Button>
            {console.log(userContext)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthResign;
