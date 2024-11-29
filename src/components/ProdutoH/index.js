import React, { useState } from "react";
import "./style.css";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import api from "../../services/api";

export default function ProdutosH({ produto, onRemoverProduto }) {
   const [isFavorited, setIsFavorited] = useState(false); // Estado para favorito
   const [error, setError] = useState(""); // Estado para erros

   // Alterna o estado de favorito
   const toggleFavorite = () => {
      setIsFavorited(!isFavorited);
   };

   // Função para remover o produto do carrinho
   const handleRemoverProduto = async () => {
      try {
         await api.delete(`/carrinho/${produto.produtoId}`); // Chama a API para remoção
         onRemoverProduto(produto.produtoId); // Atualiza o estado no componente pai
      } catch (err) {
         setError(
            err.response?.data?.message || "Erro ao remover o produto do carrinho."
         );
      }
   };

   return (
      <div className="ProdutosH_component">
         <div className="ProdutosH_heart">
            <div onClick={toggleFavorite}>
               {isFavorited ? (
                  <FaHeart className="heart_icon_ProdutosH-Favorite" />
               ) : (
                  <FaRegHeart className="heart_icon_ProdutosH-notFavorite" />
               )}
            </div>
         </div>
         <div className="ProdutosH_image">
            <img
               src={produto?.produto?.imagens?.[0] || "placeholder.png"}
               alt={produto?.produto?.nome || "Produto"}
            />
         </div>
         <div className="ProdutosH_mobile_direita">
            <div className="ProdutosH_name">
               <span>{produto?.produto?.nome || "Produto"}</span>
            </div>
            <div className="ProdutosH_values_remover">
               <div className="ProdutosH_values">
                  <div className="ProdutosH_values_price">
                     <span>R$ {produto?.produto?.preco?.toFixed(2) || "0.00"}</span>
                  </div>
                  <div className="ProdutosH_values_discount">
                     <span>Com desconto à vista ou em {produto?.produto?.desconto || "0"}x no cartão</span>
                  </div>
                  <div className="ProdutosH_quantidade">
                     <span>Quantidade: {produto?.quantidade || "1"}</span>
                  </div>
               </div>
               <div className="ProdutosH_remover">
                  <button onClick={handleRemoverProduto}>Remover</button>
               </div>
            </div>
         </div>
         {error && <p className="ProdutosH_error">{error}</p>}
      </div>
   );
}
