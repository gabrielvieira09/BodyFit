import React from "react";
import "../styles/lancamento.css"
import Header from "../components/Header";
import Footer from "../components/Footer";
import banner from "../assets/banners/banner(lancamentos).png"

export default function Lancamentos() {
  return (
    <div className="lancamentos_container">
      <Header />
      <div className="div_banner_pages">
         <img src={banner}/>
         <div className="detalhamento_banner">
            <div className="autenticidade_det">
               <h2>PRODUTOS 100% AUTÊNTICOS</h2>
               <div>
                  <text>Pode pesquisar na Internet: a BodyFit é uma das poucas marcas aprovadas no famoso teste que avaliou a qualidade dos suplementos brasileiros.</text>
               </div>
            </div>
            <div className="qualidade_det">
               <h2>O MELHOR PREÇO, MÁXIMA QUALIDADE</h2>
               <div>
                  <text>Compre direto de nossa fábrica e economize. Sem intermediadores entre nós e nosso cliente, repassamos o custo de distribuidores em forma de desconto para nossos clientes.</text>
               </div>
            </div>
            <div className="velocidade_det">
               <h2>ENTREGAS MAIS RÁPIDAS DO PAÍS.</h2>
               <div>
                  <text>Pode confiar quando for pedir um produto da nossa loja, em menos de 3 dias ele estará em sua casa em perfeita qualidade. Vem com a BodyFit vida!!</text>
               </div>
            </div>
         </div>
      </div>  
      <div className="produtos_main">
         <div className="div_filtragem">
            <h1>FILTRAGEM</h1>
            <div className="filtragem_container">
               <h3>MARCA</h3>
               <div className="marcas_filtragem">
                  <div>
                     <input type="checkbox"></input>
                     <text>Integralmedica</text>
                  </div>
                  <div>
                     <input type="checkbox"></input>
                     <text>Max Titanium</text>
                  </div>
                  <div>
                     <input type="checkbox"></input>
                     <text>Growth</text>
                  </div>
                  <div>
                     <input type="checkbox"></input>
                     <text>Black Skull</text>
                  </div>
                  <div>
                     <input type="checkbox"></input>
                     <text>Probiótica</text>
                  </div>
                  <div>
                     <input type="checkbox"></input>
                     <text>BodyAction</text>
                  </div>
                  <div>
                     <input type="checkbox"></input>
                     <text>Atlhetica</text>
                  </div>
                  <div>
                     <input type="checkbox"></input>
                     <text>Atlas</text>
                  </div>
                  <div>
                     <input type="checkbox"></input>
                     <text>Diabo Verde</text>
                  </div>
                  <div>
                     <input type="checkbox"></input>
                     <text>Dark Lab</text>
                  </div>
                  <div>
                     <input type="checkbox"></input>
                     <text>Psichotic</text>
                  </div>
                  <div>
                     <input type="checkbox"></input>
                     <text>DUX</text>
                  </div>
                  <div>
                     <input type="checkbox"></input>
                     <text>Four Lab</text>
                  </div>
                  <div>
                     <input type="checkbox"></input>
                     <text>BOLD</text>
                  </div>
                  <div>
                     <input type="checkbox"></input>
                     <text>YoPRO</text>
                  </div>
                  <div>
                     <input type="checkbox"></input>
                     <text>Bio2</text>
                  </div>
                  <div>
                     <input type="checkbox"></input>
                     <text>SharkPro</text>
                  </div>
                  <div>
                     <input type="checkbox"></input>
                     <text>FTW</text>
                  </div>
               </div>
               <button>Buscar</button>   
            </div>   
         </div>   
         <div></div>   
      </div> 
      <Footer />
    </div>
  );
}
