import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/editarProduto.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function EditarProduto() {
  const { id } = useParams(); // Pega o ID da URL
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [estoque, setEstoque] = useState("");
  const [marcaSelecionada, setMarcaSelecionada] = useState("");
  const [marcas, setMarcas] = useState([]);
  const [imagensAtuais, setImagensAtuais] = useState([]);
  const [novasImagens, setNovasImagens] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Busca o produto pelo ID
  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const response = await api.get(`/produtos/${id}`); // Busca o produto pelo ID
        const produto = response.data;

        // Preenche os estados com os dados do produto
        setNome(produto.nome);
        setDescricao(produto.descricao);
        setPreco(produto.preco);
        setEstoque(produto.estoque);
        setMarcaSelecionada(produto.marcaId);
        setImagensAtuais(produto.imagens || []);
      } catch (error) {
        console.error("Erro ao carregar produto", error);
        setError("Erro ao carregar produto. Tente novamente.");
      }
    };

    fetchProduto();
  }, [id]);

  // Busca marcas disponíveis
  useEffect(() => {
    const fetchMarcas = async () => {
      try {
        const response = await api.get("/marcas");
        setMarcas(response.data);
      } catch (error) {
        console.error("Erro ao carregar marcas", error);
      }
    };

    fetchMarcas();
  }, []);

  // Função para salvar alterações
  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("nome", nome);
      formData.append("descricao", descricao);
      formData.append("preco", Number(preco));
      formData.append("estoque", Number(estoque));
      formData.append("marcaId", marcaSelecionada);

      // Adiciona as novas imagens ao formData
      Array.from(novasImagens).forEach((imagem) => {
        formData.append("imagens", imagem);
      });

      // Use o ID diretamente da URL
      await api.put(`/produtos/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccessMessage("Produto atualizado com sucesso!");
      navigate("/admin/produtos-admin"); // Retorna para a listagem
    } catch (error) {
      setError("Erro ao salvar o produto. Tente novamente.");
    }
  };

  // Função para lidar com novas imagens
  const handleImageChange = (e) => {
    setNovasImagens(e.target.files);
  };

  // Função para remover o produto
  const handleRemove = async () => {
    const confirmacao = window.confirm(
      "Tem certeza que deseja remover este produto? Essa ação não pode ser desfeita."
    );

    if (confirmacao) {
      try {
        // Use o ID diretamente da URL
        await api.delete(`/produtos/${id}`);
        setSuccessMessage("Produto removido com sucesso!");
        navigate("/admin/produtos-admin"); // Redireciona para a lista de produtos
      } catch (error) {
        setError("Erro ao remover o produto. Tente novamente.");
      }
    }
  };

  return (
    <div className="editarProduto_container">
      <Header />
      <div className="editarProduto_main">
        <div className="editarProduto_informacoes">
          <div className="editarProduto_informacoes_esquerda">
            <div className="editarProduto_imagens_atuais">
              {imagensAtuais.length > 0 ? (
                imagensAtuais.map((img, index) => (
                  <img key={index} src={img} alt={`Imagem ${index}`} />
                ))
              ) : (
                <p>Sem imagens disponíveis.</p>
              )}
            </div>
            <input type="file" multiple onChange={handleImageChange} />
          </div>
          <div className="editarProduto_informacoes_direita">
            <div>
              <label>Nome:</label>
              <input value={nome} onChange={(e) => setNome(e.target.value)} />
            </div>
            <div>
              <label>Marca:</label>
              <select value={marcaSelecionada} onChange={(e) => setMarcaSelecionada(e.target.value)}>
                <option value="">Selecione uma marca</option>
                {marcas.map((marca) => (
                  <option key={marca.id} value={marca.id}>
                    {marca.nome}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Preço:</label>
              <input type="number" value={preco} onChange={(e) => setPreco(e.target.value)} />
            </div>
            <div>
              <label>Descrição:</label>
              <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} />
            </div>
            <div>
              <label>Estoque:</label>
              <input type="number" value={estoque} onChange={(e) => setEstoque(e.target.value)} />
            </div>
          </div>
        </div>
        <div className="editarProduto_botao">
          <button onClick={handleSave}>Salvar</button>
          <button onClick={handleRemove} className="remover">Remover</button>
        </div>
        {error && <p className="error">{error}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
      </div>
      <Footer />
    </div>
  );
}
