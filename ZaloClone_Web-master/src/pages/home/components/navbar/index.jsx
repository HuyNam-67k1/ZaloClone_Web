import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar">
      <a href="#">Trang chủ</a>
      <Link to="/">Tính năng</Link>
      <Link to="./authResign">Ứng dụng</Link>
      <Link to="./chat">Team phát triển</Link>
      <Link to="./resign">Đăng ký</Link>
      <Link to="./login">Đăng nhập</Link>
    </nav>
  );
}
export default NavBar;
