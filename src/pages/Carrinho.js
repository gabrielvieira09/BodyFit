import React from "react";
import "../styles/carrinho.css"
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProdutosH from "../components/ProdutoH";
import Integralmedica_creatina from "../assets/produtos/creatina/Integralmedica.png"
import { FaTruck } from "react-icons/fa6";


export default function Carrinho() {
  return (
   <div className="carrinho_container">
      <Header />
      <div className="carrinho_container_main">
         <div className="carrinho_produtos_main">
            <div className="container_title_carrinho">
               <div><h1>Meu carrinho</h1></div>
            </div>
            <div className="carrinho_produtos">
               <ProdutosH
               image={Integralmedica_creatina}
               name="Creatina Hardcore"
               price="110,99"
               discount="6"
               />
               <ProdutosH
               image={Integralmedica_creatina}
               name="Creatina Hardcore"
               price="110,99"
               discount="6"
               />
               <ProdutosH
               image={Integralmedica_creatina}
               name="Creatina Hardcore"
               price="110,99"
               discount="6"
               />
               <ProdutosH
               image={Integralmedica_creatina}
               name="Creatina Hardcore"
               price="110,99"
               discount="6"
               />
            </div>
         </div>
         <div className="carrinho_pedido_main">
            <div className="pedido_container">
               <div className="pedido_title">
                  <div>
                     <h3>Resumo do pedido</h3>
                  </div>
               </div>
               <div className="pedido_produtosSeleicionados">
                  <div>
                     <h3>Produtos selecionados:</h3>
                     <text>4</text>
                  </div>
               </div>
               <div className="pedido_produtosEntrega">
                  <div>
                     <h3>Entrega</h3>
                     <text>RS 0,00</text>
                  </div>
               </div>
               <div className="pedido_total_div">
                  <div className="pedido_total">
                     <h2>TOTAL</h2>
                     <text>R$ 306,88</text>
                  </div>
                  <div className="total_descriptio_pedido">
                     <ul>
                        <li>Tenha  5% de desconto com pagamento a vista ou até 7% com benefícios </li>
                     </ul>
                  </div>
               </div>
               <div className="pedido_pagamento_compra_frete">
                  <div className="pedido_pagamento_compra">
                     <select>
                        <option>PIX</option>
                        <option>Cartão</option>
                     </select>
                     <div>
                        <a className="pedido_adicionar_produto"><button>Adicionar mais produtos</button></a>
                        <butto className="pedido_limparCache">Limpar carrinho</butto>
                     </div>
                        <button className="pedido_finalizarPedido">Finalizar Compra</button>
                  </div>
                  <div className="pedido_frete_text">
                     <div>
                        <FaTruck className="pedido_icon_truck_frete" />
                     </div>
                     <div className="pedido_text_fim">
                        <text>Envio e entrega rápida, 99% das entregas foram realizadas antes do prazo, conforme os estudos Ebit.</text>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <Footer />
   </div>
  );
}
