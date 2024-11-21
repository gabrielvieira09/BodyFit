import React, { useState } from "react";
import "./style.css"
import heart from "../../assets/heart.png"
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import Integralmedica_creatina from "../../assets/produtos/creatina/Integralmedica.png"


export default function ProdutosH({image, name, price, discount, quantidade}){

   // Estado para controlar se o coração está favoritado
  const [isFavorited, setIsFavorited] = useState(false);

  // Função para alternar o estado do coração
  const toggleFavorite = () => {
    setIsFavorited(!isFavorited); // Inverte o valor atual do estado
  }

   return(
         <div className="ProdutosH_component">
            <div className="ProdutosH_heart">
               <div onClick={toggleFavorite}>
                  {isFavorited ? (
                     <FaHeart src={heart} className="heart_icon_ProdutosH-Favorite"></FaHeart>
                  ) : (
                     <FaRegHeart src={heart} className="heart_icon_ProdutosH-notFavorite"></FaRegHeart>
                  )}
               </div>
            </div>
            <div className="ProdutosH_image">
               <img src={image}/>
            </div>
            <div className="ProdutosH_name">
               <div>
                  <text>{name}</text>
               </div>
            </div>
            <div className="ProdutosH_values_remover">
               <div className="ProdutosH_values">
                  <div className="ProdutosH_values_price">
                     <text>R$ {price}</text>
                  </div>
                  <div className="ProdutosH_values_discount">
                     <text>Com  desconto a vista ou em {discount}x no cartão </text>
                  </div>
                  <div className="ProdutosH_quantidade">
                     <text>Quantidade: {quantidade}</text>
                  </div>
               </div>
               <div className="ProdutosH_remover">
                  <button>Remover</button>
               </div>
            </div>
         </div>
   )
}
