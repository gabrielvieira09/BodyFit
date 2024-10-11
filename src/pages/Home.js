import React from "react";
import "../styles/home.css"
import Header from "../components/Header";
import Footer from "../components/Footer"

export default function Home() {
  return (
    <div className="home_container">
      <Header />
      <div style={{width:"100%", height:100, backgroundColor:"blue"}}></div>
      <Footer />
    </div>
  );
}
