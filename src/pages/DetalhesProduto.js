import React, { useState } from "react";
import "../styles/detalhesProduto.css"
import Header from "../components/Header";
import Footer from "../components/Footer";
import { IoIosArrowBack } from "react-icons/io";
import heart from "../assets/heart.png"
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { RiShoppingBag4Fill } from "react-icons/ri";
import Integralmedica_creatina from "../assets/produtos/creatina/Integralmedica.png"
import image1 from "../assets/image_pages/image(detalhe).png"
import image2 from "../assets/image_pages/image2(detalhe).png"
import image3 from "../assets/image_pages/image3(detalhe).png"
import image4 from "../assets/image_pages/image4(detalhe).png"
import { TbCoinFilled } from "react-icons/tb";
import { FaTruck } from "react-icons/fa6";

export default function DetalhesProduto() {

   // Estado para controlar se o coração está favoritado
  const [isFavorited, setIsFavorited] = useState(false);

  // Função para alternar o estado do coração
  const toggleFavorite = () => {
    setIsFavorited(!isFavorited); // Inverte o valor atual do estado
  }

  return (
   <div className="detalhesProduto_container">
      <Header/>
      <div className="div_detalhesProduto">
         <div className="div_detalhesProduto_esquerda">
            <div className="back_detalhesProduto">
               <IoIosArrowBack className="icon_arrow_back" />
            </div>
            <div className="image_detalhesProduto">
               <img src={Integralmedica_creatina}/>
            </div>
            <div className="heart_detalhesProduto">
               <div  onClick={toggleFavorite}>
                  {isFavorited ? (
                     <FaHeart src={heart} className="icon_heart_heart-Favorite"></FaHeart>
                  ) : (
                     <FaRegHeart src={heart} className="icon_heart_heart-notFavorite"></FaRegHeart>
                  )}
               </div>
            </div>
         </div>
         <div className="div_detalhesProduto_direita">
            <div className="name_description_detalhesProduto">
               <div className="name_detalhesProduto">
                  <h1>Creatina Hardcore</h1>
               </div>
               <div className="description_detalhesProduto">
                  <p>A Creatina Hardcore auxilia no aumento dos estoques e no armazenamento da creatina dentro do músculo, o que é fundamental para a produção da energia usada na contração muscular. A Creatina é um suplemento indispensável para quem deseja ganho de força e aumento de massa muscular.</p>
               </div>
            </div>
            <div className="pagamento_detalhesProduto">
               <div className="div_pagamento">
                  <div className="pagamento_preco">
                     <h3>R$ 110,00</h3>
                  </div>
                  <div className="pagamento_estoque_carrinho">
                     <div className="estoque_pagamento">
                        <text>Quantidade Estoque:</text>
                        <h5>23</h5>
                     </div>
                     <div className="carrinho_pagamento">
                        <button>ADICIONAR AO CARRINHO</button>
                     </div>
                  </div>
                  <div className="pagamento_compra_detalhe_frete">
                     <div className="compra_pagamento">
                        <RiShoppingBag4Fill className="icone_sacola_compra" />
                        <text>COMPRAR AGORA</text>
                     </div>
                     <div className="detalhe_pagamento">
                        <TbCoinFilled className="coin_pagamento_detalhe" />
                        <p>COMPRE E GANHE ATÉ</p>
                        <text>R$10,00 DE CASHBACK</text>
                     </div>
                     <div className="frete_pagamento">
                        <div>
                           <FaTruck className="icon_truck_frete" />
                        </div>
                        <div>
                           <h5>FRETE GRÁTIS</h5>
                           <text>Para todo o Brasil</text>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
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
