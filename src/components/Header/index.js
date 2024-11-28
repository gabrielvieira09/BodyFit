import React, { useState, useEffect, useContext } from "react";
import "./style.css";
import { FaEyeSlash, FaPix, FaUser } from "react-icons/fa6";
import { FaTruck } from "react-icons/fa6";
import { FaWallet } from "react-icons/fa";
import { FaMedal } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa6";
import { IoMdPerson } from "react-icons/io";
import logo from "../../assets/logos/logo(comFundo).png";
import { Link, useNavigate } from "react-router-dom";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdClose } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import { AuthContext } from "../../contexts/AuthContext";

export default function Header() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");
   const { user, login } = useContext(AuthContext); // Usando o contexto de autenticação

   const handleLogin = async (event) => {
      event.preventDefault();

      try {
         // Chama a função login do AuthContext
         await login(email, password);
         console.log("deu certo");

         closeModal(); // Fechar a modal após login bem-sucedido
      } catch (error) {
         if (
            error.response &&
            error.response.data &&
            error.response.data.message
         ) {
            setError(error.response.data.message); // Exibe a mensagem de erro da API
         } else {
            setError("Erro desconhecido. Por favor, tente novamente.");
         }
      }
   };


   const [modalVisible, setModalVisible] = useState(false);
   const [mostrarSenha, setMostrarSenha] = useState(false);

   const openModal = () => setModalVisible(true);
   const closeModal = () => {
      setEmail("");
      setPassword("");
      setError(""); // Limpa a mensagem de erro
      setModalVisible(false);
   }


   useEffect(() => {
      if (modalVisible) {
         document.body.classList.add("no-scroll");
      } else {
         document.body.classList.remove("no-scroll");
      }

      return () => document.body.classList.remove("no-scroll");
   }, [modalVisible]);

   return (
      <div>
         <div className="header_container">
            <div className="header_superior">
               <div className="header_superior_div" id="icone1">
                  <FaPix className="header_superior_icone" />
                  <text>Pix e Boleto 12% de Desconto</text>
               </div>
               <div className="header_superior_div" id="icone2">
                  <FaTruck className="header_superior_icone" />
                  <text>Frete Grátis</text>
               </div>
               <div className="header_superior_div" id="icone3">
                  <FaWallet className="header_superior_icone" />
                  <text>Parcelamento em até 12x sem Juros</text>
               </div>
               <div className="header_superior_div" id="icone4">
                  <FaMedal className="header_superior_icone" />
                  <text>Garantia da originalidade</text>
               </div>
            </div>
            <div className="header_inferior">
               <div className="header_inferior_logo">
                  <button onClick={() => openModal()}>
                     <FiMenu id="aba_menu-mobile" />
                  </button>
                  <a href="/">
                     <img src={logo} alt="Logo" />
                  </a>
               </div>
               <div className="header_inferior_navigation">
                  <div className="header_inferior_navigation_cima">
                     <div className="navigation_cima_search">
                        <div className="search">
                           <input
                              className="input_header"
                              placeholder="O que você está procurando?"
                           />
                           <IoSearch id="lupa" />
                        </div>
                     </div>
                     <div className="search_usuario">
                        <div className="search_usuario_person">
                           <FaRegHeart />
                           <a href="/listadesejo">
                              <text>Lista de desejos</text>
                           </a>
                        </div>
                        <div className="search_usuario_person">
                           <IoMdPerson />
                           {user && user.role ? (
                              <Link className="search_usuario_person_link" to={user.role === "ADMIN" ? "/perfil" : "/perfil"}>
                                 {user.role === "ADMIN" ? "ADMIN" : "Perfil"}
                              </Link>
                           ) : (
                              <text onClick={() => openModal()}>Entrar</text>
                           )}
                        </div>
                        <div className="search_usuario_carrinho">
                           <a href="/carrinho">
                              <PiShoppingCartSimpleBold id="compra" />
                           </a>
                        </div>
                     </div>
                  </div>
                  {(!user || (user && user.role !== "ADMIN")) && (
                     <div className="header_inferior_navigation_baixo">
                        <a className="divs_nav_individual" href="/produtos">
                           Todos os Produtos
                        </a>
                        <a className="divs_nav_individual" href="/lancamentos">
                           Lançamentos
                        </a>
                        <a className="divs_nav_individual" href="/wheyprotein">
                           Whey Protein
                        </a>
                        <a className="divs_nav_individual" href="/barraProteina">
                           Barra de Proteina
                        </a>
                        <a className="divs_nav_individual" href="/creatina">
                           Creatina
                        </a>
                        <a className="divs_nav_individual" href="/preTreino">
                           Pré-Treino
                        </a>
                     </div>
                  )}
                  {user && user.role === "ADMIN" && (
                     <div className="header_inferior_navigation_baixo">
                        <a className="divs_nav_individual" href="/produtos">
                           Todos os Produtos
                        </a>
                        <a className="divs_nav_individual" href="/lancamentos">
                           Lançamentos
                        </a>
                        <a className="divs_nav_individual" href="/admin/historico-vendas">
                           Historico de vendas
                        </a>
                        <a className="divs_nav_individual" href="/admin/usuarios">
                           Gestão de usuários
                        </a>
                     </div>
                  )}
               </div>
            </div>
            <div className="header_inferior_input-mobile">
               <div className="search">
                  <input
                     className="input_header"
                     placeholder="O que você está procurando?"
                  />
                  <IoSearch id="lupa" />
               </div>
            </div>
         </div>
         {modalVisible && (
            <div className="menuMobile_container">
               <div className="div_fechar_mobile">
                  <MdClose className="icone_fechar_mobile" onClick={closeModal} />
               </div>
               <div>
                  {user && user.role !== "ADMIN" || user == undefined && (
                     <div className="header_inferior_navigation_baixo_mobile">
                        <a className="divs_nav_individual_mobile" href="/produtos">
                           Todos os Produtos
                        </a>
                        <a className="divs_nav_individual_mobile" href="/lancamentos">
                           Lançamentos
                        </a>
                        <a className="divs_nav_individual_mobile" href="#">
                           Whey Protein
                        </a>
                        <a className="divs_nav_individual_mobile" href="#">
                           Barra de Proteina
                        </a>
                        <a className="divs_nav_individual_mobile" href="#">
                           Creatina
                        </a>
                        <a className="divs_nav_individual_mobile" href="#">
                           Pré-Treino
                        </a>
                     </div>
                  )}
                  {user && user.role === "ADMIN" && (
                     <div className="header_inferior_navigation_baixo_mobile">
                        <a className="divs_nav_individual_mobile" href="/produtos">
                           Todos os Produtos
                        </a>
                        <a className="divs_nav_individual_mobile" href="/lancamentos">
                           Lançamentos
                        </a>
                        <a className="divs_nav_individual_mobile" href="/admin/historico-vendas">
                           Historico de vendas
                        </a>
                        <a className="divs_nav_individual_mobile" href="/admin/usuarios">
                           Gestão de usuários
                        </a>
                     </div>
                  )}
               </div>
            </div>
         )}
         {modalVisible && (
            <div className="modal-login_container">
               <div className="caixa_de_informacoes">
                  <div className="caixa_icone_fechar" onClick={closeModal}>
                     <MdClose className="icone_de_fechar" />
                  </div>

                  <div className="informe_seus_dados">
                     <p>Informe seus dados para continuar</p>
                  </div>

                  <form onSubmit={handleLogin}>
                     <div className="caixas_de_textos_gerais">
                        <div className="caixa_de_texto_usuario">
                           <FaUser className="icone_usuario" />
                           <input
                              type="email"
                              className="digite_aqui"
                              placeholder="DIGITE SEU EMAIL"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                           />
                        </div>

                        <br />

                        <div className="caixa_de_texto_senha">
                           <RiLockPasswordFill className="icone_senha" />
                           <input
                              type={mostrarSenha ? "text" : "password"}
                              className="digite_aqui"
                              placeholder="DIGITE SUA SENHA"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                           />
                           <FaEyeSlash
                              className="icone_olho"
                              onMouseDown={() => setMostrarSenha(true)}
                              onMouseUp={() => setMostrarSenha(false)}
                              onMouseLeave={() => setMostrarSenha(false)}
                           />
                        </div>
                        {error && <div className="error-message">{error}</div>}
                     </div>
                     <div className="botao_continuar_div">
                        <div className="botao_continuar_definitivo">
                           <button type="submit" className="texto_do_botao">
                              CONTINUAR
                           </button>
                        </div>
                     </div>
                  </form>

                  <br />
                  <div className="pergunta_cadastrar">
                     <p>Não tem conta?</p>
                     <Link to="/cadastro" className="cadastrar_se">
                        Cadastre-se
                     </Link>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}
