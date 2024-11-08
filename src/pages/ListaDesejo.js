import React from "react";
import "../styles/listaDesejo.css"
import Header from "../components/Header";
import Footer from "../components/Footer";
import heartBlack from "../assets/heart.png"

export default function ListaDesejo() {
  return (
   <div className="listaDesejo_container">
      <Header />
      <div className="listaDesejo_main">
         <div className="listaDesejo_filtragem">
            <div className="listaDesejo_div_filtragem">
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
         </div>   
         <div className="listaDesejo_produtos">
            <div className="listaDesejo_produtos_text">
               <div>
                  <img src={heartBlack} />
                  <h1>Meus Desejos</h1>
               </div>
            </div>
            <div></div>
         </div>
      </div>
      <Footer/>
   </div>
  );
}
