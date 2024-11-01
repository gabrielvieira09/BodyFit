import React, { useEffect, useState } from "react";
import "./style.css";
import { FaEyeSlash, FaPix, FaUser } from "react-icons/fa6";
import { FaTruck } from "react-icons/fa6";
import { FaWallet } from "react-icons/fa";
import { FaMedal } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa6";
import { IoMdPerson } from "react-icons/io";
import logo from "../../assets/logos/logo(comFundo).png"
import { Link } from "react-router-dom";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdClose } from "react-icons/md";

export default function Header() {

      const [modalVisible, setModalVisible] = useState(false);
      const [mostrarSenha, setMostrarSenha] = useState(false);
      
      const openModal = () => setModalVisible(true);
      const closeModal = () => setModalVisible(false);
      
      useEffect(() => {
         if (modalVisible) {
            document.body.classList.add('no-scroll');
         } else {
            document.body.classList.remove('no-scroll');
         }
         
         return () => document.body.classList.remove('no-scroll');
      }, [modalVisible]);

  return (
   <div>
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
            <a href="/">
               <img src={logo}/>
            </a>
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
                     <text onClick={openModal}>Entrar</text> 
                  </div>
                  <PiShoppingCartSimpleBold id="compra" />
               </div>
            </div>
            <div className="header_inferior_navigation_baixo">
               <a className="divs_nav_individual" href="produtos">Todos os Produtos</a>
               <a className="divs_nav_individual" href="lancamentos">Lançamentos</a>
               <a className="divs_nav_individual" href="#">Whey Protein</a>
               <a className="divs_nav_individual" href="#">Barra de Proteina</a>
               <a className="divs_nav_individual" href="#">Creatina</a>
               <a className="divs_nav_individual" href="#">Pré-Treino</a>
            </div>
         </div>
      </div>
    </div>
   {modalVisible &&
      <div className="modal-login_container">
         <div className="caixa_de_informacoes">
            <div className="caixa_icone_fechar" onClick={closeModal}>
               <MdClose className="icone_de_fechar" />
            </div>

            <div className="informe_seus_dados">
               <p>Informe seus dados para continuar</p>
            </div>

            <div className="caixas_de_textos_gerais">

               <div className="caixa_de_texto_usuario">
                  <FaUser className="icone_usuario" />
                  <input type="email" className="digite_aqui" placeholder="DIGITE SEU EMAIL" />
               </div>

               <br />

               <div className="caixa_de_texto_senha">
                  <RiLockPasswordFill className="icone_senha" />
                  <input type={mostrarSenha ? "text" : "password"} className="digite_aqui" placeholder="DIGITE SEU SENHA" />
                  <FaEyeSlash className="icone_olho"
                  onMouseDown={() => setMostrarSenha(true)}
                  onMouseUp={() => setMostrarSenha(false)}
                  onMouseLeave={() => setMostrarSenha(false)}
                  />
               </div>

            </div>
            <div className="botao_continuar_definitivo">
               <p className="texto_do_botao">CONTINUAR</p>
            </div>
            <br />
            <div className="pergunta_cadastrar">
               <p>Não tem conta?</p> <Link to="/cadastro" className="cadastrar_se">Cadastre-se</Link>
            </div>
         </div>
      </div>
   }
   </div>
  );
}
