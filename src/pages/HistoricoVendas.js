import React from "react";
import "../styles/historicoVenda.css"
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function HistoricoVendas() {
  return (
   <div className="historicoVenda_Container">
      <Header />
      <div className="historiocoVenda_main">
         <div className="historicoVenda_title"><h1>Histórico de Vendas</h1></div>
         <div className="historicoVenda_components">

         </div>
      </div>
      <Footer/>
   </div>
  );
}
