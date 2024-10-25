import React from "react";
import "../styles/detalhesProduto.css"
import Header from "../components/Header";
import Footer from "../components/Footer";
import image1 from "../assets/image_pages/image(detalhe).png"
import image2 from "../assets/image_pages/image2(detalhe).png"
import image3 from "../assets/image_pages/image3(detalhe).png"
import image4 from "../assets/image_pages/image4(detalhe).png"

export default function DetalhesProduto() {
  return (
   <div className="detalhesProduto_container">
      <Header/>
      <div className="div_detalhesProduto"></div>
      <div className="div_curiosidades">
         <img src={image1}/>
         <div>
            <h2>COMO USAR NA DIETA</h2>
            <text>Os suplementos devem complementar a dieta. Proteína e creatina ajudam no ganho de massa, enquanto BCAAs e glutamina auxiliam na recuperação. Pré-treinos aumentam a energia antes do exercício, e termogênicos e L-carnitina ajudam na queima de gordura. É importante equilibrar com uma alimentação saudável e seguir a orientação de um profissional.</text>
         </div>
      </div> 
      <div className="div_curiosidades2">
         <div>
            <h2>CONSTURÇÃO DO CORPO PERFEITO</h2>
            <text>Construir um corpo perfeito com suplementos requer equilíbrio entre treino e alimentação. Proteínas e creatina promovem ganho e definição muscular, enquanto termogênicos e L-carnitina ajudam na queima de gordura. BCAAs e glutamina preservam a massa muscular e melhoram a recuperação, e pré-treinos aumentam a energia para treinos intensos. Multivitamínicos e ômega-3 garantem saúde geral. Usados com orientação profissional, esses suplementos potencializam resultados e ajudam a esculpir um corpo tonificado.</text>
         </div>
         <img src={image2}/>
      </div> 
      <div className="div_curiosidades">
         <img src={image3}/>
         <div>
            <h2>COMO UTILIZAR OS SUPLEMENTOS</h2>
            <text>O uso de suplementos deve ser alinhado aos seus objetivos. Proteína e creatina são ótimos para ganho de massa, sendo a proteína usada após o treino e a creatina diariamente. BCAAs e glutamina ajudam na recuperação, enquanto pré-treinos com cafeína melhoram o desempenho quando tomados antes do exercício. Para queima de gordura, termogênicos e L-carnitina podem ser usados antes dos treinos. É importante ajustar as doses com orientação profissional.</text>
         </div>
      </div> 
      <div className="div_curiosidades2">
         <div>
            <h2>BENEFÍCIOS DOS SUPLEMENTOS NA ACADEMIA</h2>
            <ul>
               <li>Ganho Muscular e Definição :Suplementos ajudam a melhorar o ganho muscular e a definição.</li>
               <li>Proteínas e Creatina: Promovem músculos mais volumosos e firmes.</li>
               <li>Termogênicos e L-Carnitina: Auxiliam na queima de gordura, contribuindo para um corpo mais definido.</li>
               <li>BCAAs: Aceleram a recuperação e preservam a massa magra, resultando em uma aparência mais tonificada.</li>
            </ul>
         </div>
         <img src={image4}/>
      </div> 
      <Footer/>
   </div>
  );
}
