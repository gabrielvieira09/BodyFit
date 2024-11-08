import React, { useState } from "react";
import "../styles/perfil.css"
import Header from "../components/Header";
import Footer from "../components/Footer";
import Compra from "../components/Compra";

export default function Perfil() {

   const [activeSection, setActiveSection] = useState("dadosPessoais");

   return (
   <div className="perfil_container">
       <Header/>
       <div className="perfil_main">
         <div className="perfil_name">
            <h3>Olá,</h3>
            <text>Gabriel Afonso Santos Vieira</text>
         </div>
         <div className="perfil_components">
               <div className="perfil_options">
                  <button 
                  className={activeSection === "dadosPessoais" ? "perfil_options_button active" : "perfil_options_button"} 
                  onClick={() => setActiveSection("dadosPessoais")}
                  >Dados pessoais</button>
                  <button
                  className={activeSection === "historicoCompras" ? "perfil_options_button active" : "perfil_options_button"}
                  onClick={() => setActiveSection("historicoCompras")}
                  >Histórico de compras</button>
                  <button className="perfil_options_button_sair" >Sair</button>
               </div>
            {activeSection === "dadosPessoais" && (
               <div className="perfil_dados">
                     <div className="perfil_dados_text">
                        <text>Dados pessoais</text>
                     </div>
                  <div className="dadosPessoais_perfil">
                     <div className="block_perfil">
                        <div className="componente_cadastro_perfil">
                           <text>Nome Completo *</text>
                           <input className="input_maior_cadastro_perfil"></input>
                        </div>
                        <div className="componente_cadastro_direita_perfil">
                           <text>CPF *</text>
                           <input className="input_menor_cadastro_perfil" type="number"></input>
                        </div>
                     </div>
                     <div className="block_perfil">
                        <div className="componente_cadastro_perfil">
                           <text>Email *</text>
                           <input className="input_maior_cadastro_perfil" type="email"></input>
                        </div>
                        <div className="componente_cadastro_direita_perfil">
                           <text>Senha *</text>
                           <input className="input_medio_cadastro_perfil" type="password"></input>
                        </div>
                     </div>
                     <div className="block_menor_perfil">
                        <div className="componente_cadastro_perfil">
                           <text>Telefone *</text>
                           <input className="input_maior_cadastro_perfil"></input>
                        </div>
                        <div className="componente_cadastro_genero_perfil">
                        <text>CEP *</text>
                        <input className="input_maior_cadastro_perfil" type="number"></input>
                        </div>
                     </div>
                     <div className="block_perfil">
                        <div className="componente_cadastro_perfil">
                           <text>Cidade *</text>
                           <input className="input_maior_cadastro_perfil"></input>
                        </div>
                        <div className="componente_cadastro_direita_perfil">
                           <text>Logradouro *</text>
                           <input className="input_medio_cadastro_perfil" placeholder=""></input>
                        </div>
                     </div>
                     <div className="block_perfil">
                        <div className="componente_cadastro_perfil">
                           <text>Bairro *</text>
                           <input className="input_maior_cadastro_perfil"></input>
                        </div>
                        <div className="componente_cadastro_direita_perfil">
                           <text>Número *</text>
                           <input className="input_menor_cadastro_perfil" type="number"></input>
                        </div>
                     </div>
                     <div className="block_final_perfil">
                        <div className="componente_cadastro_fim_perfil">
                           <div>
                              <text>Complemento *</text>
                              <input className="input_maior_cadastro_fim_perfil"></input>
                           </div>
                           <div>
                              <button>EDITAR</button>
                           </div>
                        </div>
                     </div>   
                  </div>
               </div>
            )}
            {activeSection === "historicoCompras" && (
            <div className="perfil_historico">
               <div className="perfil_historico_text">
                  <text>Histórico de compras</text>
               </div>
               <div className="perfil_historico_scroll">
                  <div className="perfil_historico_compra">
                     <div className="div_compra">
                        <Compra/>
                     </div>
                     <div className="div_compra">
                        <Compra/>
                     </div>
                     <div className="div_compra">
                        <Compra/>
                     </div>
                     <div>
                        <Compra/>
                     </div>
                  </div>
               </div>
            </div>
            )}
         </div>
       </div>
       <Footer/>  
   </div>
  );
}
