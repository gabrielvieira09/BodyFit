import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/usuario.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UsuarioComponent from "../components/UsuarioComponent";
import { AuthContext } from "../contexts/AuthContext";
import api from "../services/api";
import { MdClose } from "react-icons/md";

export default function Usuarios() {
   const { user } = useContext(AuthContext);
   const [usuarios, setUsuarios] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState("");
   const [showModal, setShowModal] = useState(false); // Controle da visibilidade da modal
   const [selectedUser, setSelectedUser] = useState(null); // Usuário selecionado
   const navigate = useNavigate();

   // Função para buscar a lista de usuários
   useEffect(() => {
      const fetchUsuarios = async () => {
         try {
            const response = await api.get("/users");
            setUsuarios(response.data);
            setLoading(false);
         } catch (error) {
            if (
               error.response &&
               error.response.data &&
               error.response.data.message
            ) {
               setError(error.response.data.message);
            } else {
               setError("Erro desconhecido. Por favor, tente novamente.");
            }
            setLoading(false);
         }
      };

      fetchUsuarios();
   }, [user.token]);

   // Função para excluir um usuário
   const handleDelete = async (userId) => {
      const confirmed = window.confirm(
         "Tem certeza que deseja excluir este usuário?"
      );
      if (confirmed) {
         try {
            await api.delete(`/users/${userId}`);
            setUsuarios((prevUsuarios) =>
               prevUsuarios.filter((usuario) => usuario.id !== userId)
            );
            alert("Usuário excluído com sucesso!");
         } catch (error) {
            if (
               error.response &&
               error.response.data &&
               error.response.data.message
            ) {
               setError(error.response.data.message);
            } else {
               setError("Erro desconhecido. Por favor, tente novamente.");
            }
         }
      }
   };

   // Função para abrir a modal e preencher os dados do usuário
   const handleEdit = (userId) => {
      const userToEdit = usuarios.find((usuario) => usuario.id === userId);
      setSelectedUser(userToEdit); // Define o usuário selecionado
      setShowModal(true); // Exibe a modal
   };

   // Função para fechar a modal
   const handleCloseModal = () => {
      setShowModal(false); // Esconde a modal
      setSelectedUser(null); // Limpa o usuário selecionado
   };

   if (loading) {
      return <p>Carregando usuários...</p>;
   }

   if (error) {
      return <p>{error}</p>;
   }

   console.log(selectedUser)
   return (
      <div className="usuarios_container">
         <Header />
         <div className="usuarios_main">
            <div className="usuarios_title">
               <h1>Gestão de usuários</h1>
            </div>
            <div className="usuarios_components">
               <div className="usuarios_div">
                  {usuarios.length > 0 ? (
                     usuarios.map((usuario) => (
                        <UsuarioComponent
                           key={usuario.id}
                           name={usuario.nome}
                           email={usuario.email}
                           onEdit={() => handleEdit(usuario.id)}
                           onDelete={() => handleDelete(usuario.id)}
                        />
                     ))
                  ) : (
                     <p>Nenhum usuário encontrado.</p>
                  )}
               </div>
            </div>
            {/* Modal de edição */}
            {showModal && (
               <div className="fundo_dados_perfil_usuario">
               <div className="dadosPessoais_perfil_usuario">
                  <div className="fechar_perfil_usuario" onClick={handleCloseModal}>
                     <MdClose className="icone_fechar_perfil_usuario" />
                  </div>
                  <div className="block_perfil_usuario">
                     <div className="componente_cadastro_perfil_usuario">
                        <text>Nome Completo *</text>
                        <input
                           className="input_maior_cadastro_perfil_usuario"
                           value={selectedUser?.nome || ""}
                           readOnly
                        />
                     </div>
                     <div className="componente_cadastro_direita_perfil_usuario">
                        <text>CPF *</text>
                        <input
                           className="input_menor_cadastro_perfil_usuario"
                           type="text"
                           value={selectedUser?.cpf || ""}
                           readOnly
                        />
                     </div>
                  </div>
                  <div className="block_perfil_usuario">
                     <div className="componente_cadastro_perfil_usuario">
                        <text>Email *</text>
                        <input
                           className="input_maior_cadastro_perfil_usuario"
                           type="email"
                           value={selectedUser?.email || ""}
                           readOnly
                        />
                     </div>
                     <div className="componente_cadastro_direita_perfil_usuario">
                        <text>Senha *</text>
                        <input
                           className="input_medio_cadastro_perfil_usuario"
                           type="password"
                           value={selectedUser?.senha || ""}
                           readOnly
                        />
                     </div>
                  </div>
                  <div className="block_menor_perfil_usuario">
                     <div className="componente_cadastro_perfil_usuario">
                        <text>Telefone *</text>
                        <input
                           className="input_maior_cadastro_perfil_usuario"
                           value={selectedUser?.telefone || ""}
                           readOnly
                        />
                     </div>
                  </div>
                  {selectedUser?.endereco && selectedUser.endereco.length > 0 && (
                     <>
                        {selectedUser.endereco.map((end, index) => (
                           <React.Fragment key={index}>
                              <div className="block_menor_perfil_usuario">
                                 <div className="componente_cadastro_perfil_usuario">
                                    <text>CEP *</text>
                                    <input
                                       className="input_maior_cadastro_perfil_usuario"
                                       type="text"
                                       value={end.cep || ""}
                                       readOnly
                                    />
                                 </div>
                              </div>
                              <div className="block_perfil_usuario">
                                 <div className="componente_cadastro_perfil_usuario">
                                    <text>Cidade *</text>
                                    <input
                                       className="input_maior_cadastro_perfil_usuario"
                                       value={end.cidade || ""}
                                       readOnly
                                    />
                                 </div>
                                 <div className="componente_cadastro_direita_perfil_usuario">
                                    <text>Logradouro *</text>
                                    <input
                                       className="input_medio_cadastro_perfil_usuario"
                                       value={end.logradouro || ""}
                                       readOnly
                                    />
                                 </div>
                              </div>
                              <div className="block_perfil_usuario">
                                 <div className="componente_cadastro_perfil_usuario">
                                    <text>Bairro *</text>
                                    <input
                                       className="input_maior_cadastro_perfil_usuario"
                                       value={end.bairro || ""}
                                       readOnly
                                    />
                                 </div>
                                 <div className="componente_cadastro_direita_perfil_usuario">
                                    <text>Número *</text>
                                    <input
                                       className="input_menor_cadastro_perfil_usuario"
                                       type="number"
                                       value={end.numero || ""}
                                       readOnly
                                    />
                                 </div>
                              </div>
                              <div className="block_perfil_usuario">
                                 <div className="componente_cadastro_perfil_usuario">
                                    <text>Complemento *</text>
                                    <input
                                       className="input_maior_cadastro_perfil_usuario"
                                       value={end.complemento || ""}
                                       readOnly
                                    />
                                 </div>
                              </div>
                           </React.Fragment>
                        ))}
                     </>
                  )}
                  <div className="block_final_perfil_usuario">
                     <div className="componente_cadastro_fim_perfil_usuario">
                        <button onClick={handleCloseModal}>Confirmar</button>
                     </div>
                  </div>
               </div>
            </div>            
            )}
         </div>
         <Footer />
      </div>
   );
}
