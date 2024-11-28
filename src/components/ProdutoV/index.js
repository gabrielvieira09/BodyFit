import React, { useContext, useState } from "react";
import "./style.css";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { RiPencilFill } from "react-icons/ri";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function ProdutosV({ produto }) {
  const [error, setError] = useState(""); // Estado para capturar erros
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // Pega o usuário do AuthContext
  const [isFavorited, setIsFavorited] = useState(false); // Estado para favoritar produto

  // Função para redirecionar à página de edição (admin)
  const handleEdit = () => {
    navigate(`/admin/editar-produto/${produto.id}`); // Navega para a rota com o ID do produto
  };

  // Adicionar produto à lista de desejos
  const handleAddToWishlist = async (produtoId) => {
    try {
      await api.post("/lista-desejos", {
        userId: user.id, // ID do usuário logado
        produtoId, // ID do produto
      });
      setIsFavorited(true); // Marca como favoritado
      alert("Produto adicionado à lista de desejos com sucesso!"); // Notifica o sucesso
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message); // Exibe mensagem de erro específica da API
      } else {
        setError("Erro ao adicionar à lista de desejos. Tente novamente.");
      }
    }
  };

  // Adicionar produto ao carrinho
  const handleAddToCart = async (produtoId) => {
    try {
      await api.post("/carrinho", {
        userId: user.id, // Certifique-se de que o ID do usuário está correto
        produtoId, // ID do produto
        quantidade: 1, // Quantidade a ser adicionada
      });
      alert("Produto adicionado ao carrinho com sucesso!"); // Notifica o sucesso
      navigate("/carrinho"); // Redireciona para a página do carrinho
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message); // Exibe a mensagem de erro da API
      } else {
        setError("Erro desconhecido. Por favor, tente novamente.");
      }
    }
  };

  return (
    <div className="ProdutosV_component">
      <div className="ProdutosV_heart">
        {user && user.role !== "ADMIN" && (
          <div>
            {isFavorited ? (
              <FaHeart className="heart_icon_ProdutosV-Favorite" />
            ) : (
              <FaRegHeart 
              className="heart_icon_ProdutosV-notFavorite"
              onClick={(e) => {
               e.stopPropagation(); // Evita propagação do evento
               if (!isFavorited) {
                 handleAddToWishlist(produto.id); // Adiciona à lista de desejos
               }
             }}
             />
            )}
          </div>
        )}
        {user && user.role === "ADMIN" && (
          <a onClick={handleEdit}>
            <RiPencilFill className="pencil" />
          </a>
        )}
      </div>
      <a className="link_detalhesProduto" href={`/produtos/${produto.id}`}>
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
            <text>
              Com desconto à vista ou em {produto?.desconto || "0"}x no cartão
            </text>{" "}
            {/* Verifica se desconto existe */}
          </div>
        </div>
      </a>
      <div className="ProdutosV_carrinho">
        {user && user.role !== "ADMIN" && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(produto.id);
            }}
          >
            Adicionar ao carrinho
          </button>
        )}
      </div>
    </div>
  );
}
