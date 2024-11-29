import React, { useContext, useEffect, useState } from "react";
import "../styles/lancamento.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import banner from "../assets/banners/banner(lancamentos).png";
import ProdutosV from "../components/ProdutoV";
import { AuthContext } from "../contexts/AuthContext";
import api from "../services/api";

export default function Lancamentos() {
   const [produtos, setProdutos] = useState([]); // Produtos totais
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState("");
   const { user } = useContext(AuthContext); // Pega o usuário logado

   // Buscar produtos e ordenar por ID decrescente
   useEffect(() => {
      const fetchData = async () => {
         try {
            const produtosResponse = await api.get(`/produtos`);
            
            // Ordenar produtos por ID de forma decrescente
            const produtosOrdenados = produtosResponse.data.sort(
               (a, b) => b.id - a.id // Ordena por ID em ordem decrescente
            );

            setProdutos(produtosOrdenados);
         } catch (err) {
            setError("Erro ao carregar dados. Tente novamente.");
            console.error(err);
         } finally {
            setLoading(false);
         }
      };

      fetchData();
   }, [user?.role]);

   if (loading) {
      return <div>Carregando...</div>;
   }

   return (
      <div className="lancamentos_container">
         <Header />
         <div className="div_banner_pages">
            <img src={banner} />
            <div className="detalhamento_banner">
               <div className="autenticidade_det">
                  <h2>PRODUTOS 100% AUTÊNTICOS</h2>
                  <div>
                     <text>
                        Pode pesquisar na Internet: a BodyFit é uma das poucas
                        marcas aprovadas no famoso teste que avaliou a qualidade
                        dos suplementos brasileiros.
                     </text>
                  </div>
               </div>
               <div className="qualidade_det">
                  <h2>O MELHOR PREÇO, MÁXIMA QUALIDADE</h2>
                  <div>
                     <text>
                        Compre direto de nossa fábrica e economize. Sem
                        intermediadores entre nós e nosso cliente, repassamos o
                        custo de distribuidores em forma de desconto para nossos
                        clientes.
                     </text>
                  </div>
               </div>
               <div className="velocidade_det">
                  <h2>ENTREGAS MAIS RÁPIDAS DO PAÍS.</h2>
                  <div>
                     <text>
                        Pode confiar quando for pedir um produto da nossa loja,
                        em menos de 3 dias ele estará em sua casa em perfeita
                        qualidade. Vem com a BodyFit vida!!
                     </text>
                  </div>
               </div>
            </div>
         </div>
         <div className="produtos_main">
            <div className="todos_produtos_lancados">
               {produtos.length > 0 ? (
                  produtos.map((produto) => (
                     <ProdutosV key={produto.id} produto={produto} />
                  ))
               ) : (
                  <p>Nenhum produto encontrado.</p>
               )}
            </div>
         </div>
         <Footer />
      </div>
   );
}
