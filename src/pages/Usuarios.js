import React from "react";
import "../styles/usuario.css"
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Usuarios() {
  return (
   <div className="usuarios_container">
      <Header />
      <div className="usuarios_main">
         <div className="usuarios_title">
            <h1>Gestão de usuários</h1>
         </div>
         <div className="usuarios_components"></div>
      </div>
      <Footer />  
   </div>
  );
}
