import React, { useState } from "react";
import "../styles/home.css"
import Header from "../components/Header";
import Footer from "../components/Footer";
import banner1 from "../assets/banners/banner_1.png";
import banner2 from "../assets/banners/banner_2.png";
import banner3 from "../assets/banners/banner_3.png";
import banner4 from "../assets/banners/banner_4.png";
import banner5 from "../assets/banners/banner_5.png";
import banner6 from "../assets/banners/banner_6.png";

export default function Home() {

   

   return (
      <div className="home_container">
         <Header />
         <div className="div_banner_principal">
            <div className="banner_principal"></div>
         </div>
         <Footer />
      </div>
   );
}
