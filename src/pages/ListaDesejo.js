import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/listaDesejo.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import heartBlack from "../assets/heart.png";
import api from "../services/api"; // Certifique-se de que sua API esteja configurada
import { AuthContext } from "../contexts/AuthContext";
import ProdutosV from "../components/ProdutoV";

export default function ListaDesejo() {
  const [produtos, setProdutos] = useState([]); // Produtos totais
  const [produtosFiltrados, setProdutosFiltrados] = useState([]); // Produtos filtrados
  const [marcas, setMarcas] = useState([]); // Marcas disponíveis
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [error, setError] = useState(""); // Estado de erro
  const [filtros, setFiltros] = useState([]); // Filtros aplicados (marcas selecionadas)
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // Pega o usuário logado

  // Buscar produtos da lista de desejos e marcas
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [listaDesejosResponse, marcasResponse] = await Promise.all([
          api.get(`/lista-desejos?userId=${user.id}`), // Busca os produtos na lista de desejos do usuário
          api.get("/marcas"), // Busca as marcas
        ]);

        const listaDesejos = listaDesejosResponse.data; // Obtém a lista de produtos na lista de desejos
        
        setProdutos(listaDesejos["produtos-listaDesejo"]); // Armazena a lista de produtos na lista de desejos
        setProdutosFiltrados(listaDesejos["produtos-listaDesejo"]); // Inicialmente, todos os produtos na lista de desejos são visíveis
        setMarcas(marcasResponse.data); // Armazena as marcas disponíveis para filtragem
      } catch (err) {
        setError("Erro ao carregar dados. Tente novamente.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchData(); // Só busca os dados se o usuário estiver logado
    }
  }, [user?.id]); // Recarregar quando o ID do usuário mudar

  // Atualizar filtros
  const handleFiltroChange = (marcaId) => {
    setFiltros((prevFiltros) =>
      prevFiltros.includes(marcaId)
        ? prevFiltros.filter((id) => id !== marcaId) // Remove o filtro
        : [...prevFiltros, marcaId] // Adiciona o filtro
    );
  };

  // Filtrar produtos com base nas marcas selecionadas
  useEffect(() => {
    if (filtros.length === 0) {
      setProdutosFiltrados(produtos); // Se nenhum filtro for selecionado, mostra todos os produtos
    } else {
      const produtosFiltrados = produtos.filter((item) =>
        filtros.includes(item.produto.marca.id) // Filtra os produtos que pertencem a alguma marca selecionada
      );
      setProdutosFiltrados(produtosFiltrados);
    }
  }, [filtros, produtos]);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="listaDesejo_container">
      <Header />
      <div className="listaDesejo_main">
        <div className="listaDesejo_filtragem">
          <div className="listaDesejo_div_filtragem">
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
            </div>
          </div>
        </div>
        <div className="listaDesejo_produtos">
          <div className="listaDesejo_produtos_text">
            <div>
              <img src={heartBlack} alt="Coração" />
              <h1>Meus Desejos</h1>
            </div>
          </div>
          <div className="listaDesejo_produtos_lista">
            {produtosFiltrados.length > 0 ? (
              produtosFiltrados.map((item) => (
                <ProdutosV
                  key={item.produtoId}
                  produto={item.produto} // Passando o objeto do produto
                />
              ))
            ) : (
              <p>Nenhum produto encontrado.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
