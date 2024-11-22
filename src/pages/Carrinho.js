import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/carrinho.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProdutosH from "../components/ProdutoH";
import { FaTruck } from "react-icons/fa6";
import { AuthContext } from "../contexts/AuthContext";
import api from "../services/api";

export default function Carrinho() {
   const { user, loading: authLoading } = useContext(AuthContext); // Pega o usuário e o estado de carregamento do AuthContext
   const [carrinho, setCarrinho] = useState([]);
   const [error, setError] = useState("");
   const [loading, setLoading] = useState(false); // Carregamento local do carrinho
   const [metodoPagamento, setMetodoPagamento] = useState("");
   const navigate = useNavigate();

   useEffect(() => {
      if (authLoading || !user) return; // Aguarda o fim do carregamento do AuthContext e que o usuário esteja logado

      const fetchCarrinho = async () => {
         setLoading(true);
         try {
            const response = await api.get("/carrinho", {
               params: { userId: user.id },
            });
            setCarrinho(response.data["produtos-carrinho"] || []);
         } catch (error) {
            setError(
               error.response?.data?.message ||
               "Erro ao carregar o carrinho. Tente novamente."
            );
         } finally {
            setLoading(false);
         }
      };

      fetchCarrinho();
   }, [authLoading, user]);

   const handleQuantidadeChange = async (produtoId, quantidade) => {
      setCarrinho((prevCarrinho) =>
         prevCarrinho.map((item) =>
            item.produtoId === produtoId
               ? { ...item, quantidade: Number(quantidade) }
               : item
         )
      );

      try {
         await api.put(
            `/carrinho`,
            { produtoId, quantidade: Number(quantidade) },
            { params: { userId: user.id } }
         );
      } catch (error) {
         setError(
            error.response?.data?.message ||
            "Erro ao atualizar a quantidade do produto."
         );
      }
   };

   const handleDeletarItem = async (produtoId) => {
      try {
         await api.delete(`/carrinho/${produtoId}`);
         setCarrinho((prevCarrinho) =>
            prevCarrinho.filter((item) => item.produtoId !== produtoId)
         );
      } catch (error) {
         setError(
            error.response?.data?.message || "Erro ao remover o produto do carrinho."
         );
      }
   };

   const handleCriarPedido = async () => {
      if (!metodoPagamento) {
         setError("Por favor, selecione um método de pagamento.");
         return;
      }

      try {
         await api.post("/pedidos", { metodoPagamento });
         alert("Pedido realizado com sucesso!");
         setCarrinho([]);
         navigate("/");
      } catch (error) {
         setError(
            error.response?.data?.message || "Erro ao finalizar o pedido."
         );
      }
   };

   if (authLoading || loading) {
      return <p>Carregando carrinho...</p>;
   }

   if (error) {
      return <p>{error}</p>;
   }

   // Total de produtos no carrinho
   const totalProdutos = carrinho.reduce((acc, item) => acc + (item.quantidade || 0), 0);

   // Preço total
   const totalPreco = carrinho
      .reduce((acc, item) => acc + (item.quantidade || 0) * (item.produto.preco || 0), 0)
      .toFixed(2);

   console.log(carrinho);


   return (
      <div className="carrinho_container">
         <Header />
         <div className="carrinho_container_main">
            <div className="carrinho_produtos_main">
               <div className="container_title_carrinho">
                  <div><h1>Meu carrinho</h1></div>
               </div>
               {carrinho.map((item) => (
                  <ProdutosH
                     key={item.produtoId}
                     produto={item}
                     onRemoverProduto={(produtoId) =>
                        setCarrinho((prevCarrinho) =>
                           prevCarrinho.filter((item) => item.produtoId !== produtoId)
                        )
                     }
                  />
               ))}

            </div>
            <div className="carrinho_pedido_main">
               <div className="pedido_container">
                  <div className="pedido_title">
                     <div>
                        <h3>Resumo do pedido</h3>
                     </div>
                  </div>
                  <div className="pedido_produtosSeleicionados">
                     <div>
                        <h3>Produtos selecionados:</h3>
                        <text>{totalProdutos}</text>
                     </div>
                  </div>
                  <div className="pedido_produtosEntrega">
                     <div>
                        <h3>Entrega</h3>
                        <text>RS 0,00</text>
                     </div>
                  </div>
                  <div className="pedido_total_div">
                     <div className="pedido_total">
                        <h2>TOTAL</h2>
                        <text>R$ {totalPreco}</text>
                     </div>
                     <div className="total_descriptio_pedido">
                        <ul>
                           <li>Tenha  5% de desconto com pagamento a vista ou até 7% com benefícios </li>
                        </ul>
                     </div>
                  </div>
                  <div className="pedido_pagamento_compra_frete">
                     <div className="pedido_pagamento_compra">
                        <select
                           value={metodoPagamento}
                           onChange={(e) => setMetodoPagamento(e.target.value)}
                        >
                           <option value="">Selecione o método</option>
                           <option value="PIX">PIX</option>
                           <option value="Cartão">Cartão</option>
                        </select>
                        <div>
                           <a className="pedido_adicionar_produto" href="/produtos"><button>Adicionar mais produtos</button></a>
                           <button onClick={() => setCarrinho([])} className="pedido_limparCache">Limpar carrinho</button>
                        </div>
                        <button onClick={handleCriarPedido} className="pedido_finalizarPedido">Finalizar Compra</button>
                     </div>
                     <div className="pedido_frete_text">
                        <div>
                           <FaTruck className="pedido_icon_truck_frete" />
                        </div>
                        <div className="pedido_text_fim">
                           <text>Envio e entrega rápida, 99% das entregas foram realizadas antes do prazo, conforme os estudos Ebit.</text>
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

