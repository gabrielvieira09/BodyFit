import React, { useState, useEffect, useContext } from "react";
import "../styles/historicoVenda.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AuthContext } from "../contexts/AuthContext"; // Importe o AuthContext


export default function HistoricoVendas() {
  // Estado para armazenar as vendas
  const [vendas, setVendas] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para indicar se os dados estão sendo carregados
  const [error, setError] = useState(null); // Estado para armazenar erros

  const { user } = useContext(AuthContext);

  // Função para buscar as vendas da API
  const fetchVendas = async () => {
    try {
      const response = await fetch("/api/vendas"); // Substitua com o endpoint correto da sua API
      if (!response.ok) {
        throw new Error("Erro ao carregar as vendas");
      }
      const data = await response.json();
      setVendas(data); // Armazena as vendas no estado
    } catch (err) {
      setError(err.message); // Armazena o erro no estado
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  // Usando useEffect para buscar os dados assim que o componente é montado
  useEffect(() => {
    fetchVendas();
  }, []); // O array vazio [] garante que a requisição será feita apenas uma vez

  return (
    <div className="historicoVenda_Container">
      <Header />
      <div className="historiocoVenda_main">
        <div className="historicoVenda_title">
          <h1>Histórico de Vendas</h1>
        </div>

        <div className="historicoVenda_components">
          {error && <p className="error">{error}</p>} {/* Exibe erro, se houver */}
          {!loading && !error && vendas.length === 0 && <p>Não há vendas registradas.</p>} {/* Exibe mensagem caso não haja vendas */}

          {/* Exibe as vendas quando carregadas */}
          <div className="vendas-list">
            {vendas.map((venda) => (
              <div key={venda.id} className="venda-item">
                <h2>Pedido #{venda.id}</h2>
                <p><strong>Data:</strong> {new Date(venda.data).toLocaleDateString()}</p>
                <p><strong>Total:</strong> R${venda.total.toFixed(2)}</p>
                <p><strong>Status:</strong> {venda.status}</p>
                {/* Adicione mais informações sobre a venda conforme necessário */}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
