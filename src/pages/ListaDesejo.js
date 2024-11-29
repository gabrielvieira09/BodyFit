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
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [error, setError] = useState(""); // Estado de erro
  const { user } = useContext(AuthContext); // Pega o usuário logado

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [listaDesejosResponse] = await Promise.all([
          api.get(`/lista-desejos?userId=${user.id}`), // Busca os produtos na lista de desejos do usuário
        ]);

        const listaDesejos = listaDesejosResponse.data; // Obtém a lista de produtos na lista de desejos
        
        console.log(listaDesejos["produtos-listaDesejo"])
        // Verifique a estrutura da resposta da API e ajuste conforme necessário.
        // Exemplo: se os produtos estiverem diretamente em listaDesejos
        setProdutos( listaDesejos["produtos-listaDesejo"]); // Proteção caso a chave não exista
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

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="listaDesejo_container">
      <Header />
      <div className="listaDesejo_main">        
        <div className="listaDesejo_produtos">
          <div className="listaDesejo_produtos_text">
            <div>
              <img src={heartBlack} alt="Coração" />
              <h1>Meus Desejos</h1>
            </div>
          </div>
          <div className="listaDesejo_produtos_lista">
            {produtos.length > 0 ? (
              produtos.map((item) => (
                <ProdutosV key={item.id} produto={item.produto} />
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
