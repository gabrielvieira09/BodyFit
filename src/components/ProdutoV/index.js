import React, { useState } from "react";
import "./style.css"
import heart from "../../assets/heart.png"
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
export default function ProdutosV({image, name, price, discount}){

   // Estado para controlar se o coração está favoritado
  const [isFavorited, setIsFavorited] = useState(false);

  // Função para alternar o estado do coração
  const toggleFavorite = () => {
    setIsFavorited(!isFavorited); // Inverte o valor atual do estado
  }

   return(
         <div className="ProdutosV_component">
            <div className="ProdutosV_heart">
               <div onClick={toggleFavorite}>
                  {isFavorited ? (
                     <FaHeart src={heart} className="heart_icon_ProdutosV-Favorite"></FaHeart>
                  ) : (
                     <FaRegHeart src={heart} className="heart_icon_ProdutosV-notFavorite"></FaRegHeart>
                  )}
               </div>
            </div>
            <div className="ProdutosV_image">
               <img src={image}/>
            </div>
            <div className="ProdutosV_name">
               <div>
                  <text>{name}</text>
               </div>
            </div>
            <div className="ProdutosV_values">
               <div className="values_price">
                  <text>R$ {price}</text>
               </div>
               <div className="values_discount">
                  <text>Com  desconto a vista ou em {discount}x no cartão </text>
               </div>
            </div>
            <div className="ProdutosV_carrinho">
               <button>Adicionar ao carrinho</button>
            </div>
         </div>
   )
}
