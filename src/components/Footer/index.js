import React from "react";
import "./style.css";
import { RiInstagramFill } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";
import { RiWhatsappFill } from "react-icons/ri";
import { FaCcVisa } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa";
import { FaCcAmex } from "react-icons/fa6";
import { SiPicpay } from "react-icons/si";
import { FaBarcode } from "react-icons/fa6";
import { FaPix } from "react-icons/fa6";
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

            <a id="footer_superior_link" href="/desenvolvedores">Desenvolvedores do SITE</a>
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
         <div className="footer_superior_pagamento">
            <div className="footer_superior_pagamento_div">
               <text>Formas de pagamento</text>
               <div className="pagamento_icons_div">
                  <div>
                     <FaCcVisa className="pagamento_icons"/>
                     <FaCcMastercard className="pagamento_icons"/>
                     <FaCcAmex className="pagamento_icons"/>
                  </div>
                  <div>
                     <SiPicpay className="pagamento_icons"/>
                     <FaBarcode className="pagamento_icons"/>
                     <FaPix className="pagamento_icons"/>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <div className="footer_inferior">
         <text>Copyright © 2024 BodyFit. Todos os direitos reservados.</text>
      </div>
   </div>
  );
}
