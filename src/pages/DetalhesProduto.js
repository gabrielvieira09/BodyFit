import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/detalhesProduto.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { IoIosArrowBack } from "react-icons/io";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { RiShoppingBag4Fill } from "react-icons/ri";
import { TbCoinFilled } from "react-icons/tb";
import { FaTruck } from "react-icons/fa6";
import api from "../services/api";
import { AuthContext } from "../contexts/AuthContext";

export default function DetalhesProduto() {
  const [isFavorited, setIsFavorited] = useState(false);
  const [produto, setProduto] = useState(null);
  const [quantidade, setQuantidade] = useState(1); // Estado para a quantidade
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const response = await api.get(`/produtos/${id}`);
        setProduto(response.data);
        setLoading(false);
      } catch (error) {
        setError(
          error.response?.data?.message || "Erro ao carregar produto. Por favor, tente novamente."
        );
        setLoading(false);
      }
    };

    fetchProduto();
  }, [id]);

  if (loading) return <div>Carregando produto...</div>;
  if (error) return <div>{error}</div>;
  if (!produto) return <div>Produto não encontrado</div>;

  const handleAddToCart = async () => {
    if (!user) {
      alert("Você precisa estar logado para adicionar ao carrinho.");
      return navigate("/login");
    }

    try {
      await api.post("/carrinho", {
        userId: user.id,
        produtoId: produto.id,
        quantidade,
      });
      alert("Produto adicionado ao carrinho com sucesso!");
      navigate("/carrinho");
    } catch (error) {
      setError(
        error.response?.data?.message || "Erro ao adicionar ao carrinho. Por favor, tente novamente."
      );
    }
  };

  return (
    <div className="detalhesProduto_container">
      <Header />
      <div className="div_detalhesProduto">
        <div className="div_detalhesProduto_esquerda">
          <div className="back_detalhesProduto">
            <IoIosArrowBack className="icon_arrow_back" onClick={() => navigate(-1)} />
          </div>
          <div className="image_detalhesProduto">
            <img src={produto.imagens[0]} alt={produto.nome} />
          </div>
          <div className="heart_detalhesProduto" onClick={toggleFavorite}>
            {isFavorited ? (
              <FaHeart className="icon_heart_heart-Favorite" />
            ) : (
              <FaRegHeart className="icon_heart_heart-notFavorite" />
            )}
          </div>
        </div>
        <div className="div_detalhesProduto_direita">
          <div className="name_description_detalhesProduto">
            <div className="name_detalhesProduto">
              <h1>{produto.nome}</h1>
            </div>
            <div className="description_detalhesProduto">
              <p>{produto.descricao}</p>
            </div>
          </div>
          <div className="pagamento_detalhesProduto">
            <div className="div_pagamento">
              <div className="pagamento_preco">
                <h3>R$ {produto.preco.toFixed(2)}</h3>
              </div>
              <div className="pagamento_estoque_carrinho">
                <div className="estoque_pagamento">
                  <span>Quantidade Estoque:</span>
                  <h5>{produto.estoque}</h5>
                </div>
                <div className="quantidade_carrinho_pagamento">
                  <div className="quantidade_pagamento">
                    <span>Quantidade:</span>
                    <input
                      type="number"
                      min="1"
                      max={produto.estoque}
                      value={quantidade}
                      onChange={(e) => setQuantidade(Number(e.target.value))}
                    />
                  </div>
                  <button onClick={handleAddToCart}>ADICIONAR AO CARRINHO</button>
                </div>
              </div>
              <div className="pagamento_compra_detalhe_frete">
                <div className="detalhe_pagamento">
                  <TbCoinFilled className="coin_pagamento_detalhe" />
                  <p>COMPRE E GANHE ATÉ</p>
                  <span>R$ {produto.cashback?.toFixed(2) || "0,00"} DE CASHBACK</span>
                </div>
                <div className="frete_pagamento">
                  <FaTruck className="icon_truck_frete" />
                  <div>
                    <h5>FRETE GRÁTIS</h5>
                    <span>Para todo o Brasil</span>
                  </div>
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
