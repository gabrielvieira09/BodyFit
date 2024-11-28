import React, { useState, useEffect } from "react";
import "../styles/cadastro.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaEyeSlash, FaUser } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";  // Importando useNavigate
import api from "../services/api";  // Supondo que você tenha configurado uma instância da API

export default function Cadastro() {
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
    role: "USER",  // Adicionando o campo "role"
  });
  const [error, setError] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const navigate = useNavigate();

  // Função para atualizar os campos do formulário
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Função de envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/registro", formData);
      alert("Cadastro realizado com sucesso!");
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Erro desconhecido. Por favor, tente novamente.");
      }
    }
  };

  // Funções para controlar o modal
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  // Controlar o scroll quando o modal estiver aberto
  useEffect(() => {
    if (modalVisible) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => document.body.classList.remove('no-scroll');
  }, [modalVisible]);

  return (
    <div className="cadastro_container">
      <Header openModal={openModal} />
      <div className="login_no_cadastro">
        <text>JÁ SOU CLIENTE</text>
        <button className="login_cadastro_botao1" onClick={openModal}>Clique aqui para fazer Login</button>
        <button className="login_cadastro_botao2" onClick={openModal}>Fazer Login</button>
      </div>
      <div className="line_cadastro">
        <div></div>
      </div>
      <div className="div_cadastro">
        <div className="title_cadastro"><text>CADASTRE-SE</text></div>
        <form onSubmit={handleSubmit}>
          <div className="block">
            <div className="componente_cadastro">
              <text>Nome Completo *</text>
              <input
                className="input_maior_cadastro"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
              />
            </div>
            <div className="componente_cadastro">
              <text>CPF *</text>
              <input
                className="input_menor_cadastro"
                type="number"
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="block">
            <div className="componente_cadastro">
              <text>Email *</text>
              <input
                className="input_maior_cadastro"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="componente_cadastro">
              <text>Senha *</text>
              <div>
                <input
                  className="input_medio_cadastro_senha"
                  type={mostrarSenha ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <FaEyeSlash
                  className="icone_olho"
                  onMouseDown={() => setMostrarSenha(true)}
                  onMouseUp={() => setMostrarSenha(false)}
                  onMouseLeave={() => setMostrarSenha(false)}
                />
              </div>
            </div>
          </div>
          <div className="block_menor">
            <div className="componente_cadastro">
              <text>Telefone *</text>
              <input
                className="input_maior_cadastro"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="componente_cadastro_genero">
              <text>CEP *</text>
              <input
                className="input_maior_cadastro"
                type="number"
                name="cep"
                value={formData.cep}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="block">
            <div className="componente_cadastro">
              <text>Cidade *</text>
              <input
                className="input_maior_cadastro"
                name="cidade"
                value={formData.cidade}
                onChange={handleChange}
                required
              />
            </div>
            <div className="componente_cadastro">
              <text>Rua *</text>
              <input
                className="input_medio_cadastro"
                name="logradouro"
                value={formData.logradouro}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="block">
            <div className="componente_cadastro">
              <text>Bairro *</text>
              <input
                className="input_maior_cadastro"
                name="bairro"
                value={formData.bairro}
                onChange={handleChange}
                required
              />
            </div>
            <div className="componente_cadastro">
              <text>Número *</text>
              <input
                className="input_menor_cadastro"
                type="number"
                name="numero"
                value={formData.numero}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="block_final">
            <div className="componente_cadastro">
              <text>Complemento *</text>
              <input
                className="input_maior_cadastro"
                name="complemento"
                value={formData.complemento}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="botao_cadastrar">
            CADASTRAR
          </button>
        </form>
      </div>
      {modalVisible && (
        <div className="modal-login_container">
          <div className="caixa_de_informacoes">
            <div className="caixa_icone_fechar" onClick={closeModal}>
              <MdClose className="icone_de_fechar" />
            </div>
            <div className="informe_seus_dados">
              <p>Informe seus dados para continuar</p>
            </div>
            <div className="caixas_de_textos_gerais">
              <div className="caixa_de_texto_usuario">
                <FaUser className="icone_usuario" />
                <input type="email" className="digite_aqui" placeholder="DIGITE SEU EMAIL" />
              </div>
              <div className="caixa_de_texto_senha">
                <RiLockPasswordFill className="icone_senha" />
                <input type={mostrarSenha ? "text" : "password"} className="digite_aqui" placeholder="DIGITE SUA SENHA" />
                <FaEyeSlash
                  className="icone_olho"
                  onMouseDown={() => setMostrarSenha(true)}
                  onMouseUp={() => setMostrarSenha(false)}
                  onMouseLeave={() => setMostrarSenha(false)}
                />
              </div>
            </div>
            <div className="botao_continuar_definitivo">
              <p className="texto_do_botao">CONTINUAR</p>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
