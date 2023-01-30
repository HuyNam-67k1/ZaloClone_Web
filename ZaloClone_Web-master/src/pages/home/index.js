import React from "react";
import About from "./components/about";
import Header from "./components/header";
import Footers from "./components/footer";
import "./home.scss";
import Title from "./components/title";
function Home() {
  return (
    <div className="homepage">
      <Header />
      <Title />
      <About />
      <Footers />
    </div>
  );
}

export default Home;
