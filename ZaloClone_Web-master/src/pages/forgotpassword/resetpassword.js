import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Row, Typography } from "antd";

import IMAGE_ACCOUNT_PAGE from "../../assets/images/accountbg.png";
import "./resetpassword.scss";

import { useForm } from "react-hook-form";
import CustomInput from "../../components/Custom/CustomInput";
import { Amplify, Auth } from "aws-amplify";
import awsconfig from "../../aws-exports";

Amplify.configure(awsconfig);
const { Text, Title } = Typography;

function ResetPassword() {
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm();
  const onSubmitPressed = async (data) => {
    try {
      await Auth.forgotPasswordSubmit(data.username, data.code, data.password);
      navigate("/login", { replace: true });
      console.log("Thanh cong");
    } catch (error) {
      alert(error);
      console.log("error send Code password", error);
    }
  };
  return (
    <div className="account-common-page-resetpassword">
      <div className="account-wrapper-resetpassword">
        <div className="account_left-resetpassword">
          <img src={IMAGE_ACCOUNT_PAGE} alt="zelo_login" />
        </div>

        <div className="account_right-resetpassword">
          <Title level={2} style={{ textAlign: "center" }}>
            <Text style={{ color: "#4d93ff" }}>Reset Password</Text>
          </Title>

          <div className="form-account-resetpassword">
            <Row gutter={[0, 8]}>
              <Col span={18}>
                <div className="box">
                  <CustomInput
                    placeholder="Username"
                    name="username"
                    control={control}
                    rules={{ required: "Username is required" }}
                  />
                </div>
              </Col>
              <Col span={18}>
                <div className="box">
                  <CustomInput
                    placeholder="Code"
                    name="code"
                    control={control}
                    rules={{ required: "Code is required" }}
                  />
                </div>
              </Col>
              <Col span={18}>
                <CustomInput
                  placeholder="Enter your new password"
                  name="password"
                  control={control}
                  secureTextEntry
                  rules={{
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password should be at least 8 characters long",
                    },
                  }}
                />
              </Col>
              <Col span={18}>
                <br />
                <Button
                  onClick={handleSubmit(onSubmitPressed)}
                  className="btnContinue"
                  type="primary"
                  htmlType="submit"
                  block
                >
                  Confirm
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
