import React from "react";
import "./style.css";
import { FaPix } from "react-icons/fa6";
import { FaTruck } from "react-icons/fa6";
import { FaWallet } from "react-icons/fa";
import { FaMedal } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa6";
import { IoMdPerson } from "react-icons/io";
import logo from "../../assets/logos/logo(comFundo).png"

export default function Header() {
  return (
    <div className="header_container">
      <div className="header_superior">
         <div className="header_superior_div">
            <FaPix className="header_superior_icone" />
            <text>Pix e Boleto 12% de Desconto</text>
         </div>
         <div className="header_superior_div">
            <FaTruck className="header_superior_icone" />
            <text>Frete Grátis</text>
         </div>
         <div className="header_superior_div">
            <FaWallet className="header_superior_icone" />
            <text>Parcelamento em até 12x sem Juros</text>
         </div>
         <div className="header_superior_div">
            <FaMedal className="header_superior_icone" />
            <text>Garantia da originalidade</text>
         </div>
      </div>
      <div className="header_inferior">
         <div className="header_inferior_logo">
            <img src={logo}/>
         </div>
         <div className="header_inferior_navigation">
            <div className="header_inferior_navigation_cima">
               <div className="navigation_cima_search">
                  <div className="search">
                     <input className="input_header" placeholder="O que você está procurando?"/>
                     <IoSearch id="lupa" />
                  </div>
               </div>
               <div className="search_usuario">
                  <div className="search_usuario_person">
                     <FaRegHeart />
                     <text>Lista de desejos</text>
                  </div>
                  <div className="search_usuario_person">
                     <IoMdPerson />
                     <text>Entrar</text> 
                  </div>
                  <PiShoppingCartSimpleBold id="compra" />
               </div>
            </div>
            <div className="header_inferior_navigation_baixo">
               <a className="divs_nav_individual" href="#">Todos os Produtos</a>
               <a className="divs_nav_individual" href="#">Lançamentos</a>
               <a className="divs_nav_individual" href="#">Whey Protein</a>
               <a className="divs_nav_individual" href="#">Barra de Proteina</a>
               <a className="divs_nav_individual" href="#">Creatina</a>
               <a className="divs_nav_individual" href="#">Pré-Treino</a>
            </div>
         </div>
      </div>
    </div>
  );
}
