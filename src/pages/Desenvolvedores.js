import React, { useEffect, useState } from "react";
import "../styles/desenvolvedores.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import gabriel from "../assets/desenvolvedores/gabriel.jpg"
import arthur from "../assets/desenvolvedores/arthur.jpg"
import miguel from "../assets/desenvolvedores/miguel.jpg"
import jose from "../assets/desenvolvedores/jose.jpg"
import octavio from "../assets/desenvolvedores/octavio.jpg"
import { IoLogoInstagram } from "react-icons/io";
import { FaGithub } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io5";

export default function Desenvolvedores() {
  
  return (
    <div className="desenvolvedores_container">
      <Header />
         <div className="desenvolvedores_main">
            <div className="desenvolvedores_title">
               <h1>Desenvolvedores</h1>
            </div>
            <div className="desenvolvedores_div">
               <div className="desenvolvedores_card">
                  <div className="card_image">
                     <img src={gabriel}/>
                  </div>
                  <div className="card_name">
                     <h3>Gabriel Afonso</h3>
                  </div>
                  <div className="card_funcao">
                     <p>Programou todo o site em React</p>
                  </div>
                  <div className="redes">
                     <div className="div_dev_redes">
                        <a href="https://www.instagram.com/">
                           <IoLogoInstagram className="desenvolvedores_redes_sociais"/>
                        </a>
                        <a href="https://github.com/">
                           <FaGithub className="desenvolvedores_redes_sociais"/>
                        </a>
                        <a href="https://br.linkedin.com/">
                           <IoLogoLinkedin className="desenvolvedores_redes_sociais"/>
                        </a>
                     </div>
                     <div className="div_dev_email">
                        <text>gabrielafonsovieira09@gmail.com</text>
                     </div>
                  </div>
               </div>
               <div className="desenvolvedores_card">
                  <div className="card_image">
                     <img src={arthur}/>
                  </div>
                  <div className="card_name">
                     <h3>Arthur Marcel</h3>
                  </div>
                  <div className="card_funcao">
                     <p>Criou o manual do administrador</p>
                  </div>
                  <div className="redes">
                     <div className="div_dev_redes">
                        <a href="https://www.instagram.com/">
                           <IoLogoInstagram className="desenvolvedores_redes_sociais"/>
                        </a>
                        <a href="https://github.com/">
                           <FaGithub className="desenvolvedores_redes_sociais"/>
                        </a>
                        <a href="https://br.linkedin.com/">
                           <IoLogoLinkedin className="desenvolvedores_redes_sociais"/>
                        </a>
                     </div>
                     <div className="div_dev_email">
                        <text>arthurmarcelbdossantos@gmail.com</text>
                     </div>
                  </div>
               </div>
               <div className="desenvolvedores_card">
                  <div className="card_image">
                     <img src={jose}/>
                  </div>
                  <div className="card_name">
                     <h3>José Afonso</h3>
                  </div>
                  <div className="card_funcao">
                     <p>Desenvolveu o layout e o FIGMA</p>
                  </div>
                  <div className="redes">
                     <div className="div_dev_redes">
                        <a href="https://www.instagram.com/">
                           <IoLogoInstagram className="desenvolvedores_redes_sociais"/>
                        </a>
                        <a href="https://github.com/">
                           <FaGithub className="desenvolvedores_redes_sociais"/>
                        </a>
                        <a href="https://br.linkedin.com/">
                           <IoLogoLinkedin className="desenvolvedores_redes_sociais"/>
                        </a>
                     </div>
                     <div className="div_dev_email">
                        <text>j2007afonso@gmail.com</text>
                     </div>
                  </div>
               </div>
            </div>
            <div className="desenvolvedores_div">
            <div className="desenvolvedores_card">
                  <div className="card_image">
                     <img src={octavio}/>
                  </div>
                  <div className="card_name">
                     <h3>Octávio Faria</h3>
                  </div>
                  <div className="card_funcao">
                     <p>Programou os components do site</p>
                  </div>
                  <div className="redes">
                     <div className="div_dev_redes">
                        <a href="https://www.instagram.com/">
                           <IoLogoInstagram className="desenvolvedores_redes_sociais"/>
                        </a>
                        <a href="https://github.com/">
                           <FaGithub className="desenvolvedores_redes_sociais"/>
                        </a>
                        <a href="https://br.linkedin.com/">
                           <IoLogoLinkedin className="desenvolvedores_redes_sociais"/>
                        </a>
                     </div>
                     <div className="div_dev_email">
                        <text>octaviofaria07@gmail.com</text>
                     </div>
                  </div>
               </div>
               <div className="desenvolvedores_card">
                  <div className="card_image">
                     <img src={miguel}/>
                  </div>
                  <div className="card_name">
                     <h3>Miguel Aguiar</h3>
                  </div>
                  <div className="card_funcao">
                     <p>Criou a apresentação sobre o site</p>
                  </div>
                  <div className="redes">
                     <div className="div_dev_redes">
                        <a href="https://www.instagram.com/">
                           <IoLogoInstagram className="desenvolvedores_redes_sociais"/>
                        </a>
                        <a href="https://github.com/">
                           <FaGithub className="desenvolvedores_redes_sociais"/>
                        </a>
                        <a href="https://br.linkedin.com/">
                           <IoLogoLinkedin className="desenvolvedores_redes_sociais"/>
                        </a>
                     </div>
                     <div className="div_dev_email">
                        <text>@gmail.com</text>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      <Footer />
    </div>
  );
}
