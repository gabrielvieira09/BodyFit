import React, { useEffect, useState } from "react";
import "../styles/cadastro.css"
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaEyeSlash, FaUser } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdClose } from "react-icons/md";

export default function Cadastro() {
   
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
    <div className="cadastro_container">
      <Header openModal={openModal}/>
      <div className="login_no_cadastro">
         <text>JÁ SOU CLIENTE</text>
         <button onClick={openModal}>Clique aqui para fazer Login</button>
      </div>
      <div className="line_cadastro">
         <div></div>
      </div>
      <div className="div_cadastro">
         <div className="title_cadastro"><text>CADASTRE-SE</text></div>
         <div className="block">
            <div className="componente_cadastro">
               <text>Nome Completo *</text>
               <input className="input_maior_cadastro"></input>
            </div>
            <div className="componente_cadastro">
               <text>CPF *</text>
               <input className="input_menor_cadastro" type="number"></input>
            </div>
         </div>
         <div className="block">
            <div className="componente_cadastro">
               <text>Email *</text>
               <input className="input_maior_cadastro" type="email"></input>
            </div>
            <div className="componente_cadastro">
               <text>Senha *</text>
               <input className="input_medio_cadastro" type="password"></input>
            </div>
         </div>
         <div className="block_menor">
            <div className="componente_cadastro">
               <text>Telefone *</text>
               <input className="input_maior_cadastro"></input>
            </div>
            <div className="componente_cadastro_genero">
            <text>CEP *</text>
            <input className="input_maior_cadastro" type="number"></input>
            </div>
         </div>
         <div className="block">
            <div className="componente_cadastro">
               <text>Cidade *</text>
               <input className="input_maior_cadastro"></input>
            </div>
            <div className="componente_cadastro">
               <text>Logradouro *</text>
               <input className="input_medio_cadastro" placeholder=""></input>
            </div>
         </div>
         <div className="block">
            <div className="componente_cadastro">
               <text>Bairro *</text>
               <input className="input_maior_cadastro"></input>
            </div>
            <div className="componente_cadastro">
               <text>Número *</text>
               <input className="input_menor_cadastro" type="number"></input>
            </div>
         </div>
         <div className="block_final">
            <div className="componente_cadastro">
               <text>Complemento *</text>
               <input className="input_maior_cadastro"></input>
            </div>
         </div>   
      </div>
      <button className="botao_cadastrar">CADASTRAR</button>
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
            </div>
         </div>
      }
      <Footer />
    </div>
  );
}
