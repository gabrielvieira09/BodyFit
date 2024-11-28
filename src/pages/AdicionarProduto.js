import React, { useEffect, useRef, useState } from "react";
import "../styles/adicionarProduto.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import api from "../services/api"; // Certifique-se de que o serviço da API esteja configurado
import camera from "../assets/camera.png"
import { useNavigate } from "react-router-dom";

export default function AdicionarProduto() {
   const [nome, setNome] = useState("");
   const [descricao, setDescricao] = useState("");
   const [preco, setPreco] = useState("");
   const [estoque, setEstoque] = useState("");
   const [marcas, setMarcas] = useState([]); // Array para armazenar as marcas
   const [marcaSelecionada, setMarcaSelecionada] = useState("");
   const [desconto, setDesconto] = useState("");
   const [imagens, setImagens] = useState([]);
   const [error, setError] = useState("");
   const [successMessage, setSuccessMessage] = useState("");
   const fileInputRef = useRef(null);

   const handleButtonClick = () => {
      fileInputRef.current.click();
   };

   // Função para buscar as marcas na API
   useEffect(() => {
      const fetchMarcas = async () => {
         try {
            const response = await api.get("/marcas"); // Substitua pela sua rota real
            setMarcas(response.data); // Supondo que o array de marcas venha no corpo da resposta
         } catch (error) {
            console.error("Erro ao buscar marcas:", error);
            setError("Não foi possível carregar as marcas. Tente novamente.");
         }
      };

      fetchMarcas();
   }, []);

   // Dentro do componente AdicionarProduto:
   const navigate = useNavigate();

   const handleAddProduto = async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append("nome", nome);
      formData.append("descricao", descricao);
      formData.append("desconto", desconto);
      formData.append("preco", Number(preco));
      formData.append("estoque", Number(estoque));
      formData.append("marcaId", marcaSelecionada);

      Array.from(imagens).forEach((imagem) => {
         formData.append("imagens", imagem); // Remover o índice
      });

      try {
         await api.post("/produtos", formData, {
            headers: {
               "Content-Type": "multipart/form-data",
            },
         });

         setSuccessMessage("Produto adicionado com sucesso!");
         navigate("/"); // Redireciona para a página inicial após o sucesso
      } catch (error) {
         if (error.response && error.response.data && error.response.data.message) {
            setError(error.response.data.message);
         } else {
            setError("Erro desconhecido. Por favor, tente novamente.");
         }
      }
   };

   const handleImageChange = (e) => {
      setImagens(e.target.files);
   };

   return (
      <div className="criarProduto_container">
         <Header />
         <div className="criarProduto_main">
            <div className="criarProduto_informacoes">
               <div className="criarProduto_informacoes_esquerda">

                  <input
                     type="file"
                     multiple
                     accept="image/*"
                     onChange={handleImageChange}
                  />
                  {/* <input 
            
            type="file" 
            ref={fileInputRef}
            multiple 
            onChange={handleImageChange} 
            className="criarProduto_image_input"
            /> */}
                  {/* <button onClick={handleButtonClick} className="criarProduto_image">
               <img src={camera}/>
            </button> */}
               </div>
               <div className="criarProduto_informacoes_direita">
                  <div className="direita_div">
                     <div className="direita_div_name">
                        <div className="direita_div_title">
                           <label>Nome:</label>
                        </div>
                        <input
                           type="text"
                           value={nome}
                           onChange={(e) => setNome(e.target.value)}
                        />
                     </div>
                     <div className="direita_div_marca">
                        <div className="direita_div_title">
                           <label>Marca:</label>
                        </div>
                        <select
                           value={marcaSelecionada}
                           onChange={(e) => setMarcaSelecionada(e.target.value)}
                        >
                           <option value="">Selecionar marca</option>
                           {marcas.map((marca) => (
                              <option key={marca.id} value={marca.id}>
                                 {marca.nome}
                              </option>
                           ))}
                        </select>
                     </div>
                     <div className="direita_div_preco_desconto">
                        <div className="direita_div_preco">
                           <div className="direita_div_title">
                              <label>Preço: R$</label>
                           </div>
                           <input
                              type="number"
                              value={preco}
                              onChange={(e) => setPreco(e.target.value)}
                           />
                        </div>
                        <div className="direita_div_desconto">
                           <div className="direita_div_title_desconto">
                              <label>Desconto:</label>
                           </div>
                           <input
                              type="text"
                              value={desconto}
                              onChange={(e) => setDesconto(e.target.value)}
                           />
                        </div>
                     </div>
                     <div className="direita_div_descricao">
                        <div className="direita_div_title">
                           <label>Descrição:</label>
                        </div>
                        <textarea
                           type="text"
                           value={descricao}
                           onChange={(e) => setDescricao(e.target.value)}
                        />
                     </div>
                     <div className="direita_div_estoque">
                        <div className="direita_div_title">
                           <label>Estoque:</label>
                        </div>
                        <input
                           type="number"
                           value={estoque}
                           onChange={(e) => setEstoque(e.target.value)}
                        />
                     </div>
                  </div>
               </div>
            </div>
            <div className="criarProduto_botao">
               <button onClick={handleAddProduto}>Cadastrar</button>
            </div>
            {error && <p className="error">{error}</p>}
            {successMessage && <p className="success">{successMessage}</p>}
         </div>
         <Footer />
      </div>
   );
}
