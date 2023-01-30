import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "././routes";
import AddFriendModal from "./components/Modals/AddFrienModal";
import InfoUserModal from "./components/Modals/InfoUserModal";
import AppProvider from "./context/AppProvider";
import { Amplify, Auth } from "aws-amplify";
import awsconfig from "./aws-exports";
Amplify.configure(awsconfig);
function App() {
  return (
    <Router>
      <div className="App">
        <AppProvider>
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component;
              return <Route key={index} path={route.path} element={<Page />} />;
            })}
          </Routes>
          {/* <InfoUserModal/> */}
          <AddFriendModal />
        </AppProvider>
      </div>
    </Router>
  );
}
export default App;
