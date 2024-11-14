import React, { useState, useEffect, useContext } from "react";
import "../styles/perfil.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Compra from "../components/Compra";
import { AuthContext } from "../contexts/AuthContext"; // Importe o AuthContext
import api from "../services/api"; // Assumindo que você tenha um arquivo de serviços API

export default function Perfil() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    password: "",
    cpf: "",
    cep: "",
    cidade: "",
    bairro: "",
    logradouro: "",
    complemento: "",
    numero: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [disabled, setDisabled] = useState(true);
  const { user, loading } = useContext(AuthContext); // Acesso ao contexto do usuário
  const [activeSection, setActiveSection] = useState("dadosPessoais");

  // Carrega os dados do perfil
  useEffect(() => {
    if (!user || loading) {
      return;
    }

    const fetchPerfil = async () => {
      try {
        const responsePerfil = await api.get("/perfil");
        setFormData({
          nome: responsePerfil.data.nome,
          email: responsePerfil.data.email,
          telefone: responsePerfil.data.telefone,
          password: "",
          cpf: responsePerfil.data.cpf,
          cep: responsePerfil.data.endereco.cep,
          cidade: responsePerfil.data.endereco.cidade,
          bairro: responsePerfil.data.endereco.bairro,
          logradouro: responsePerfil.data.endereco.logradouro,
          complemento: responsePerfil.data.endereco.complemento,
          numero: responsePerfil.data.endereco.numero,
        });
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Erro desconhecido. Por favor, tente novamente."
        );
      }
    };

    fetchPerfil();
  }, [user, loading]);

  // Função para lidar com alterações nos inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Função para salvar as alterações
  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      await api.patch("/perfil/update", formData);
      setSuccessMessage("Perfil atualizado com sucesso!");
      setDisabled(true);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Erro desconhecido. Por favor, tente novamente."
      );
    }
  };

  // Função para habilitar a edição
  const handleEdit = () => {
    setDisabled(false);
  };

  // Verifica se está carregando e retorna antes de continuar com a renderização
  if (loading) {
    return <p>Carregando perfil...</p>;
  }


  return (
    <div className="perfil_container">
      <Header />
      <div className="perfil_main">
        <div className="perfil_name">
          <h3>Olá,</h3>
          <text>{user?.nome || "Usuário"}</text>
        </div>
        <div className="perfil_components">
          <div className="perfil_options">
            <button
              className={activeSection === "dadosPessoais" ? "perfil_options_button active" : "perfil_options_button"}
              onClick={() => setActiveSection("dadosPessoais")}
            >
              Dados pessoais
            </button>
            <button
              className={activeSection === "historicoCompras" ? "perfil_options_button active" : "perfil_options_button"}
              onClick={() => setActiveSection("historicoCompras")}
            >
              Histórico de compras
            </button>
            <button className="perfil_options_button_sair">Sair</button>
          </div>
          {activeSection === "dadosPessoais" && (
            <div className="perfil_dados">
              <div className="perfil_dados_text">
                <text>Dados pessoais</text>
              </div>
              <form onSubmit={handleSave} className="dadosPessoais_perfil">
                <div className="block_perfil">
                  <div className="componente_cadastro_perfil">
                    <label>Nome Completo *</label>
                    <input
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      className="input_maior_cadastro_perfil"
                      disabled={disabled}
                    />
                  </div>
                  <div className="componente_cadastro_direita_perfil">
                    <label>CPF *</label>
                    <input
                      name="cpf"
                      value={formData.cpf}
                      onChange={handleChange}
                      className="input_menor_cadastro_perfil"
                      type="number"
                      disabled={disabled}
                    />
                  </div>
                </div>
                <div className="block_perfil">
                  <div className="componente_cadastro_perfil">
                    <label>Email *</label>
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="input_maior_cadastro_perfil"
                      type="email"
                      disabled={disabled}
                    />
                  </div>
                  <div className="componente_cadastro_direita_perfil">
                    <label>Senha *</label>
                    <input
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="input_medio_cadastro_perfil"
                      type="password"
                      disabled={disabled}
                    />
                  </div>
                </div>
                <div className="block_menor_perfil">
                  <div className="componente_cadastro_perfil">
                    <label>Telefone *</label>
                    <input
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleChange}
                      className="input_maior_cadastro_perfil"
                      disabled={disabled}
                    />
                  </div>
                  <div className="componente_cadastro_genero_perfil">
                    <label>CEP *</label>
                    <input
                      name="cep"
                      value={formData.cep}
                      onChange={handleChange}
                      className="input_maior_cadastro_perfil"
                      type="number"
                      disabled={disabled}
                    />
                  </div>
                </div>
                <div className="block_perfil">
                  <div className="componente_cadastro_perfil">
                    <label>Cidade *</label>
                    <input
                      name="cidade"
                      value={formData.cidade}
                      onChange={handleChange}
                      className="input_maior_cadastro_perfil"
                      disabled={disabled}
                    />
                  </div>
                  <div className="componente_cadastro_direita_perfil">
                    <label>Logradouro *</label>
                    <input
                      name="logradouro"
                      value={formData.logradouro}
                      onChange={handleChange}
                      className="input_medio_cadastro_perfil"
                      disabled={disabled}
                    />
                  </div>
                </div>
                <div className="block_perfil">
                  <div className="componente_cadastro_perfil">
                    <label>Bairro *</label>
                    <input
                      name="bairro"
                      value={formData.bairro}
                      onChange={handleChange}
                      className="input_maior_cadastro_perfil"
                      disabled={disabled}
                    />
                  </div>
                  <div className="componente_cadastro_direita_perfil">
                    <label>Número *</label>
                    <input
                      name="numero"
                      value={formData.numero}
                      onChange={handleChange}
                      className="input_menor_cadastro_perfil"
                      type="number"
                      disabled={disabled}
                    />
                  </div>
                </div>
                <div className="block_final_perfil">
                  <div className="componente_cadastro_fim_perfil">
                    <label>Complemento *</label>
                    <input
                      name="complemento"
                      value={formData.complemento}
                      onChange={handleChange}
                      className="input_maior_cadastro_fim_perfil"
                      disabled={disabled}
                    />
                  </div>
                  <div>
                    {disabled ? (
                      <button type="button" onClick={handleEdit}>Editar</button>
                    ) : (
                      <button type="submit">Salvar</button>
                    )}
                  </div>
                </div>
              </form>
              {error && <p className="error">{error}</p>}
              {successMessage && <p className="success">{successMessage}</p>}
            </div>
          )}
          {activeSection === "historicoCompras" && (
            <div className="perfil_historico">
              <div className="perfil_historico_text">
                <text>Histórico de compras</text>
              </div>
              <div className="perfil_historico_scroll">
                <div className="perfil_historico_compra">
                  <div className="div_compra">
                    <Compra />
                  </div>
                  <div className="div_compra">
                    <Compra />
                  </div>
                  <div className="div_compra">
                    <Compra />
                  </div>
                  <div>
                    <Compra />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
