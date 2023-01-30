import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Row, Typography } from "antd";

import IMAGE_ACCOUNT_PAGE from "../../assets/images/accountbg.png";
import "./forgotpassword.scss";

import { useForm } from "react-hook-form";
import CustomInput from "../../components/Custom/CustomInput";
import { Amplify, Auth } from "aws-amplify";
import awsconfig from "../../aws-exports";

import { AppContext } from "../../context/AppProvider";

Amplify.configure(awsconfig);
const { Text, Title } = Typography;

function ForgotPassword() {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm();
  const onSendPressed = async (data) => {
    try {
      await Auth.forgotPassword(data.username);
      navigate("/resetpassword", { replace: true });
      console.log("Thanh cong");
    } catch (error) {
      alert(error);
      console.log("error fogotpassWord", error);
    }
  };
  return (
    <div className="account-common-page-forgotpassword">
      <div className="account-wrapper-forgotpassword">
        <div className="account_left-forgotpassword">
          <img src={IMAGE_ACCOUNT_PAGE} alt="zelo_login" />
        </div>

        <div className="account_right-forgotpassword">
          <Title level={2} style={{ textAlign: "center" }}>
            <Text style={{ color: "#4d93ff" }}>Forgot Password</Text>
          </Title>

          <div className="form-account-forgotpassword">
            <Row gutter={[0, 8]}>
              <Col span={18}>
                <div className="box">
                  <CustomInput
                    name="username"
                    control={control}
                    placeholder="Username"
                    rules={{
                      required: "Username is required",
                    }}
                  />
                </div>
              </Col>

              <Col span={18}>
                <br />
                <Button
                  onClick={handleSubmit(onSendPressed)}
                  className="btnContinue"
                  type="primary"
                  htmlType="submit"
                  block
                >
                  Tiếp tục
                </Button>
              </Col>
            </Row>
          </div>
          <div className="addtional-link-forgotpassword">
            <Link to="/resetpassword">Go Back</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
