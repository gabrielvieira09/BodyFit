import "../styles/creatina.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import banner from "../assets/banners/banner(creatina).png";
import React, { useState, useEffect, useContext } from "react";
import ProdutosV from "../components/ProdutoV";
import Add from "../assets/produtos/Add.png";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../contexts/AuthContext";

export default function Creatina() {
   const [produtos, setProdutos] = useState([]); // Todos os produtos
   const [produtosFiltrados, setProdutosFiltrados] = useState([]); // Produtos filtrados
   const [marcas, setMarcas] = useState([]); // Marcas disponíveis
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState("");
   const [filtros, setFiltros] = useState([]); // Filtros de marca
   const navigate = useNavigate();
   const { user } = useContext(AuthContext); // Usuário logado

   // Buscar produtos e marcas ao carregar a página
   useEffect(() => {
      const fetchData = async () => {
         try {
            const [produtosResponse, marcasResponse] = await Promise.all([
               api.get(`/produtos`),
               api.get("/marcas"),
            ]);

            // Filtrar produtos com a palavra "Creatina" no nome (ou outro campo)
            const produtosFiltrados = produtosResponse.data.filter((produto) =>
               produto.nome.toLowerCase().includes("creatina") // Verifica o nome
            );

            setProdutos(produtosFiltrados); // Define produtos com "Creatina"
            setProdutosFiltrados(produtosFiltrados); // Inicialmente, exibe todos os produtos com "Creatina"
            setMarcas(marcasResponse.data);
         } catch (err) {
            setError("Erro ao carregar dados. Tente novamente.");
            console.error(err);
         } finally {
            setLoading(false);
         }
      };

      fetchData();
   }, [user?.role]);

   // Atualizar filtros de marcas
   const handleFiltroChange = (marcaId) => {
      setFiltros((prevFiltros) =>
         prevFiltros.includes(marcaId)
            ? prevFiltros.filter((id) => id !== marcaId) // Remove o filtro
            : [...prevFiltros, marcaId] // Adiciona o filtro
      );
   };

   // Filtrar produtos com base nas marcas selecionadas
   const buscarProdutosFiltrados = () => {
      if (filtros.length === 0) {
         setProdutosFiltrados(produtos); // Se nenhum filtro for selecionado, exibe todos os produtos com "Creatina"
      } else {
         const produtosFiltrados = produtos.filter((produto) =>
            filtros.includes(produto.marcaId) // Filtra produtos pela marca
         );
         setProdutosFiltrados(produtosFiltrados);
      }
   };

   if (loading) {
      return <div>Carregando...</div>;
   }

   return (
      <div className="creatina_container">
         <Header />
         <div className="div_banner_pages">
            <img src={banner} />
            <div className="detalhamento_banner">
               <div className="autenticidade_det">
                  <h2>PRODUTOS 100% AUTÊNTICOS</h2>
                  <div>
                     <text>Pode pesquisar na Internet: a BodyFit é uma das poucas marcas aprovadas no famoso teste que avaliou a qualidade dos suplementos brasileiros.</text>
                  </div>
               </div>
               <div className="qualidade_det">
                  <h2>O MELHOR PREÇO, MÁXIMA QUALIDADE</h2>
                  <div>
                     <text>Compre direto de nossa fábrica e economize. Sem intermediadores entre nós e nosso cliente, repassamos o custo de distribuidores em forma de desconto para nossos clientes.</text>
                  </div>
               </div>
               <div className="velocidade_det">
                  <h2>ENTREGAS MAIS RÁPIDAS DO PAÍS.</h2>
                  <div>
                     <text>Pode confiar quando for pedir um produto da nossa loja, em menos de 3 dias ele estará em sua casa em perfeita qualidade. Vem com a BodyFit vida!!</text>
                  </div>
               </div>
            </div>
         </div>
         <div className="produtos_main">
            <div className="div_filtragem">
               <h1>FILTRAGEM</h1>
               <div className="filtragem_container">
                  <h3>MARCA</h3>
                  <div className="marcas_filtragem">
                     {marcas.map((marca) => (
                        <div key={marca.id}>
                           <input
                              type="checkbox"
                              value={marca.id}
                              onChange={() => handleFiltroChange(marca.id)}
                           />
                           <label>{marca.nome}</label>
                        </div>
                     ))}
                  </div>
                  <button onClick={buscarProdutosFiltrados}>Buscar</button>
               </div>
            </div>
            <div className="div_todosProdutos">
               {user && user.role === "ADMIN" && (
                  <div onClick={() => navigate("/admin/adicionar-produto")} className="div_criarProduto">
                     <img src={Add} alt="Adicionar Produto" />
                  </div>
               )}
               {produtosFiltrados.length > 0 ? (
                  produtosFiltrados.map((produto) => (
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
