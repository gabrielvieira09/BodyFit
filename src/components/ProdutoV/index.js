import React, { useContext, useState } from "react";
import "./style.css";
import heart from "../../assets/heart.png";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { RiPencilFill } from "react-icons/ri";
import { AuthContext } from "../../contexts/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

export default function ProdutosV({ produto }) {
   const navigate = useNavigate();

   const handleEdit = () => {
      navigate(`/admin/editar-produto/${produto.id}`); // Navega para a rota com o ID do produto
   };

   const { user } = useContext(AuthContext); // Pega o usuário e o estado de carregamento do AuthContext

   // Estado para controlar se o coração está favoritado
   const [isFavorited, setIsFavorited] = useState(false);

   // Função para alternar o estado do coração
   const toggleFavorite = () => {
      setIsFavorited(!isFavorited); // Inverte o valor atual do estado
   };

   return (
      <div className="ProdutosV_component">
         <div className="ProdutosV_heart">
            {user && user.role !== "ADMIN" && (
               <div onClick={toggleFavorite}>
                  {isFavorited ? (
                     <FaHeart className="heart_icon_ProdutosV-Favorite" />
                  ) : (
                     <FaRegHeart className="heart_icon_ProdutosV-notFavorite" />
                  )}
               </div>
            )}
            {user && user.role === "ADMIN" && (
               <a onClick={handleEdit}>
                  <RiPencilFill className="pencil" />
               </a>
            )}
         </div>
         <div className="ProdutosV_image">
            <img
               src={produto?.imagens?.[0] || "placeholder.png"} // Verifica se imagens existe, se não usa o placeholder
               alt={produto?.nome || "Produto"} // Verifica se nome existe para o atributo alt
            />
         </div>
         <div className="ProdutosV_name">
            <div>
               <text>{produto?.nome}</text> {/* Verifica se nome existe */}
            </div>
         </div>
         <div className="ProdutosV_values">
            <div className="values_price">
               <text>R$ {produto?.preco?.toFixed(2) || "0.00"}</text> {/* Verifica se preco existe */}
            </div>
            <div className="values_discount">
               <text>Com desconto à vista ou em {produto?.desconto || "0"}x no cartão</text> {/* Verifica se desconto existe */}
            </div>
         </div>
         <div className="ProdutosV_carrinho">
            <button>Adicionar ao carrinho</button>
         </div>
      </div>
   );
}
