import React from "react";
import "./style.css"
import usuario from "../../assets/usuario.png"

export default function UsuarioComponent(name, email){
   return(
      <div className="usuarioComponent_container">
         <div className="usuarioComponent_image">
            <img src={usuario}/>
         </div>
         <div className="usuarioComponent_name">
            <div>
               <h3>Gabriel Afonso Santos Vieira</h3>
               <text>gabrielafonsovieira09@gmail.com</text>
            </div>
         </div>
         <div className="usuarioComponent_opcoes">
            <button className="usuarioComponent_opcoes_editar">EDITAR</button>
            <button className="usuarioComponent_opcoes_remover">REMOVER</button>
         </div>
      </div>
   )
}