import React from "react";
import "./style.css";
import { RiInstagramFill } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";
import { RiWhatsappFill } from "react-icons/ri";
import logo from "../../assets/logos/logo(comFundo).png"

export default function Footer() {
  return (
   <div className="footer_container">
      <div className="footer_superior">
         <div className="footer_superior_dev">
            <img src={logo}/><br/><br/>

            <text className="footer_superior_negrito">Horário de atendimento</text><br/>
            <text>Das 9h -18h</text><br/><br/>

            <text className="footer_superior_negrito">Telefone comercial:</text>
            <text> (16) 99627-9001</text><br/><br/>

            <text className="footer_superior_negrito">Email:</text>
            <text> bodyfit023@gmail.com</text><br/><br/>

            <a id="footer_superior_link" href="#">Desenvolvedores do SITE</a>
         </div>
         <div className="footer_superior_redes">
            <div className="footer_superior_redes_div">
               <text id="footer_superior_redes_titulo">Redes Sociais</text>
               <div>
                  <RiInstagramFill id="insta" className="redes_icons"/>
                  <FaFacebook id="face" className="redes_icons"/>
                  <RiWhatsappFill id="zap" className="redes_icons"/>
               </div>
            </div>
         </div>
         <div className="footer_superior_pagamento"></div>
      </div>
      <div className="footer_inferior">
         <text>Copyright © 2024 BodyFit. Todos os direitos reservados.</text>
      </div>
   </div>
  );
}
