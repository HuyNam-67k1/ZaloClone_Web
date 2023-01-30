import React from "react";
import { Image } from "antd";
import AnhMau from "../../../../assets/images/homeabout.png";

import { FireOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
function About() {
  return (
    <div className="homeabout">
      <div className="info">
        <div className="content-left">
          <ul>
            <li>Gửi file, ảnh, video cực nhanh lên đến 1GB</li>
            <li>Đồng bộ tin nhắn với điện thoại</li>
            <li>Tối ưu cho chat nhóm và trao đổi công việc</li>
          </ul>
          <Link to="/login" className="btn">
            <FireOutlined /> Trải nghiệm phiên bản web
          </Link>
        </div>
        <div className="content-right">
          <Image src={AnhMau} alt="anh minh hoa" className="aboutinfo" />
        </div>
      </div>
    </div>
  );
}

export default About;
