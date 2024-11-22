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
            setError(error.response?.data?.message || "Erro desconhecido. Por favor, tente novamente.");
         }
      };

      fetchPerfil();
   }, [user, loading]);

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
         await api.patch("/perfil/update", formData);
         setSuccessMessage("Perfil atualizado com sucesso!");
         setDisabled(true);
      } catch (error) {
         setError(error.response?.data?.message || "Erro desconhecido. Por favor, tente novamente.");
      }
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
                  <button
                     className={activeSection === "historicoCompras" ? "perfil_options_button active" : "perfil_options_button"}
                     onClick={() => setActiveSection("historicoCompras")}
                  >
                     Histórico de compras
                  </button>
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
                        {/* Manter a parte de Dados Pessoais como estava */}
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
            <div className="logout_modal">
               <div className="logout_modal_content">
                  <p>Deseja sair da conta?</p>
                  <button onClick={handleLogout}>Sim</button>
                  <button onClick={handleCloseLogoutModal}>Não</button>
               </div>
            </div>
         )}

         <Footer />
      </div>
   );
}
