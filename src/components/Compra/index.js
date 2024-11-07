import React, { useState } from "react";
import "./style.css"
import compras from "../../assets/compras.png"

export default function Compra(){
   return(
      <div className="compra_container">
         <img src={compras}></img>   
         <div className="compra_descricao">
            <div className="compra_descricao_pedido">
               <text>Pedido 1 - 16/10/2024 - 09:29</text>
            </div>
            <div className="compra_descricao_pagamento">
               <text>PIX</text>
               <h3>R$ 320,98</h3>
            </div>
         </div>
         <div className="compra_detalhes">
            <button>Ver detalhes</button>
         </div>
      </div>
   )
}