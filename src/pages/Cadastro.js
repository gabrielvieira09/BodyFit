import React from "react";
import "../styles/cadastro.css"
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Cadastro() {
  return (
    <div className="cadastro_container">
      <Header/>
      <div className="login_no_cadastro">
         <text>JÁ SOU CLIENTE</text>
         <button>Clique aqui para fazer Login</button>
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
      <Footer />
    </div>
  );
}
