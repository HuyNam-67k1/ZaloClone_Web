import Home from "../pages/home";
import chat from "../pages/chat";
import Login from "../pages/login";
import Resign from "../pages/resign";
import AuthResign from "../pages/authResign";
import ForgotPassword from "../pages/forgotpassword/index";
import ResetPassword from "../pages/forgotpassword/resetpassword";
import Contact from "../pages/Contact";
import VideoCall from "../pages/videocall";

const publicRoutes = [
  { path: "/", component: Home },
  { path: "/chat", component: chat },
  { path: "/login", component: Login },
  { path: "/resign", component: Resign },
  { path: "/authResign", component: AuthResign },
  { path: "/forgotpassword", component: ForgotPassword },
  { path: "/resetpassword", component: ResetPassword },
  { path: "/contact", component: Contact },
  { path: "/videocall", component: VideoCall },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
