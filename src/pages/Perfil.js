import React, { useState, useEffect, useContext } from "react";
import "../styles/perfil.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Compra from "../components/Compra";
import { AuthContext } from "../contexts/AuthContext"; // Importe o AuthContext
import api from "../services/api"; // Assumindo que você tenha um arquivo de serviços API
import { useNavigate } from "react-router-dom";

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
   const [pedidos, setPedidos] = useState([]);
   const [usuario, setUsuario] = useState();
   const [activeSection, setActiveSection] = useState("dadosPessoais");
   const [showLogoutModal, setShowLogoutModal] = useState(false);

   const { user, loading, logout } = useContext(AuthContext);
   const navigate = useNavigate();

   // Carregar os dados do perfil
   useEffect(() => {
      if (!user || loading) return;

      const fetchPerfil = async () => {
         try {
            const responsePerfil = await api.get("/perfil");
            setUsuario(responsePerfil.data)
         } catch (error) {
            setError(error.response?.data?.message || "Erro desconhecido. Por favor, tente novamente.");
         }
      };

      fetchPerfil();
   }, [user, loading]);

   console.log(usuario)

   // Carregar os pedidos do usuário
   useEffect(() => {
      if (!user || loading) return;

      const fetchPedidos = async () => {
         try {
            const responsePedidos = await api.get("/pedidos");
            setPedidos(responsePedidos.data);
         } catch (error) {
            setError(error.response?.data?.message || "Erro desconhecido. Por favor, tente novamente.");
         }
      };

      fetchPedidos();
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
        await api.patch("/perfil", formData);
        setSuccessMessage("Perfil atualizado com sucesso!");
        setDisabled(true);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Erro desconhecido. Por favor, tente novamente."
        );
      }
    };
    const handleAddressChange = (e, index, field) => {
      const updatedAddress = [...(formData.endereco || usuario?.endereco || [])];
      if (!updatedAddress[index]) {
         updatedAddress[index] = {};
      }
      updatedAddress[index][field] = e.target.value;
      setFormData({
         ...formData,
         endereco: updatedAddress,
      });
   };
   

   // Função para habilitar a edição
   const handleEdit = () => {
      setDisabled(false);
   };

   // Função para mostrar a modal de logout
   const handleLogoutModal = () => {
      setShowLogoutModal(true);
   };

   // Função para lidar com o logout
   const handleLogout = () => {
      logout(); // Desloga o usuário
      navigate("/"); // Redireciona para a página de login
      setShowLogoutModal(false); // Fecha a modal
   };

   // Função para fechar a modal sem fazer logout
   const handleCloseLogoutModal = () => {
      setShowLogoutModal(false); // Fecha a modal
   };

   // Verifica se está carregando e retorna antes de continuar com a renderização
   if (loading) {
      return <p>Carregando perfil...</p>;
   }


   console.log(pedidos)
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
                  {user && user.role !== "ADMIN" && (
                     <button
                        className={activeSection === "historicoCompras" ? "perfil_options_button active" : "perfil_options_button"}
                        onClick={() => setActiveSection("historicoCompras")}
                     >
                        Histórico de compras
                     </button>
                  )}
                  <button className="perfil_options_button_sair" onClick={handleLogoutModal}>
                     Sair
                  </button>
               </div>

               {activeSection === "dadosPessoais" && (
                  <div className="perfil_dados">
                  <div className="perfil_dados_text">
                     <text>Dados pessoais</text>
                  </div>
                  <form onSubmit={handleSave} className="dadosPessoais_perfil">
                     {/* Inputs de dados pessoais preenchidos dinamicamente */}
                     <div className="form_group">
                        <label>Nome:</label>
                        <input
                           type="text"
                           name="nome"
                           value={formData.nome || usuario?.nome || ""}
                           onChange={handleChange}
                           disabled={disabled}
                        />
                     </div>
                     <div className="form_group">
                        <label>Email:</label>
                        <input
                           type="email"
                           name="email"
                           value={formData.email || usuario?.email || ""}
                           onChange={handleChange}
                           disabled={disabled}
                        />
                     </div>
                     <div className="form_group">
                        <label>Telefone:</label>
                        <input
                           type="text"
                           name="telefone"
                           value={formData.telefone || usuario?.telefone || ""}
                           onChange={handleChange}
                           disabled={disabled}
                        />
                     </div>
                     <div className="form_group">
                        <label>CPF:</label>
                        <input
                           type="text"
                           name="cpf"
                           value={formData.cpf || usuario?.cpf || ""}
                           onChange={handleChange}
                           disabled={disabled}
                        />
                     </div>
                     <div className="form_group">
                        <label>Endereço:</label>
                        {usuario?.endereco && usuario.endereco.length > 0 ? (
                           usuario.endereco.map((end, index) => (
                              <div key={index} className="endereco_group">
                                 <input
                                    type="text"
                                    name="logradouro"
                                    placeholder="Logradouro"
                                    value={formData.endereco?.[index]?.logradouro || end.logradouro || ""}
                                    onChange={(e) => handleAddressChange(e, index, "logradouro")}
                                    disabled={disabled}
                                 />
                                 <input
                                    type="text"
                                    name="numero"
                                    placeholder="Número"
                                    value={formData.endereco?.[index]?.numero || end.numero || ""}
                                    onChange={(e) => handleAddressChange(e, index, "numero")}
                                    disabled={disabled}
                                 />
                                 <input
                                    type="text"
                                    name="bairro"
                                    placeholder="Bairro"
                                    value={formData.endereco?.[index]?.bairro || end.bairro || ""}
                                    onChange={(e) => handleAddressChange(e, index, "bairro")}
                                    disabled={disabled}
                                 />
                                 <input
                                    type="text"
                                    name="cidade"
                                    placeholder="Cidade"
                                    value={formData.endereco?.[index]?.cidade || end.cidade || ""}
                                    onChange={(e) => handleAddressChange(e, index, "cidade")}
                                    disabled={disabled}
                                 />
                                 <input
                                    type="text"
                                    name="cep"
                                    placeholder="CEP"
                                    value={formData.endereco?.[index]?.cep || end.cep || ""}
                                    onChange={(e) => handleAddressChange(e, index, "cep")}
                                    disabled={disabled}
                                 />
                              </div>
                           ))
                        ) : (
                           <p>Não informado</p>
                        )}
                     </div>
                     <div className="form_buttons">
                        {disabled ? (
                           <button type="button" onClick={handleEdit}>
                              Editar
                           </button>
                        ) : (
                           <button type="submit">Salvar</button>
                        )}
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
                        {pedidos.length > 0 ? (
                           pedidos.map((pedido) => (
                              <div key={pedido.id} className="perfil_historico_compra">
                                 <Compra pedido={pedido} />
                              </div>
                           ))
                        ) : (
                           <p>Nenhum pedido encontrado.</p>
                        )}
                     </div>
                  </div>
               )}
            </div>
         </div>

         {/* Modal de confirmação de logout */}
         {showLogoutModal && (
            <div className="modal_sair_fundo">
            <div className="modal_sair_perfil_container">
               <div className="modal_sair_perfil">
                  <p>Deseja sair da conta?</p>
                  <div>
                     <button className="modal_sair_botao" onClick={handleLogout}>Sim</button>
                     <button className="modal_sair_botao" onClick={handleCloseLogoutModal}>Não</button>
                  </div>
               </div>
            </div>
            </div>
         )}

         <Footer />
      </div>
   );
}
