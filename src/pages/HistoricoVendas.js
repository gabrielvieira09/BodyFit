import React, { useState, useEffect, useContext } from "react";
import "../styles/historicoVenda.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AuthContext } from "../contexts/AuthContext"; // Importe o AuthContext
import api from "../services/api";
import { MdClose } from "react-icons/md"; // Importando o ícone

export default function HistoricoVendas() {
   const { user } = useContext(AuthContext); // Pega o usuário logado para obter o token
   const [vendas, setVendas] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState("");
   const [modalVisible, setModalVisible] = useState(false); // Estado para controlar o modal
   const [vendaSelecionada, setVendaSelecionada] = useState(null); // Estado para a venda selecionada

   useEffect(() => {
      const fetchVendas = async () => {
         try {
            const response = await api.get("/vendas");
            setVendas(response.data); // Armazena os dados das vendas
            setLoading(false);
         } catch (error) {
            if (
               error.response &&
               error.response.data &&
               error.response.data.message
            ) {
               setError(error.response.data.message); // Exibe a mensagem de erro da API
            } else {
               setError("Erro desconhecido. Por favor, tente novamente.");
            }
         }
      };


      fetchVendas();
   }, [user.token]);

   useEffect(() => {
      if (modalVisible) {
         document.body.classList.add("no-scroll");
      } else {
         document.body.classList.remove("no-scroll");
      }

      return () => document.body.classList.remove("no-scroll");
   }, [modalVisible]);
   // Alterna o modal
   const alternarModal = (venda = null) => {
      setModalVisible(!modalVisible);
      setVendaSelecionada(venda); // Define a venda selecionada
   };

   if (loading) {
      return <p>Carregando vendas...</p>;
   }

   if (error) {
      return <p>{error}</p>;
   }

   return (
      <div className="historicoVenda_Container">
         <Header />
         <div className="historiocoVenda_main">
            <div className="historicoVenda_title">
               <h1>Histórico de Vendas</h1>
            </div>

            <div className="historicoVenda_components">
               {error && <p className="error">{error}</p>}
               {!loading && !error && vendas.length === 0 && <p>Não há vendas registradas.</p>}

               <div className="vendas-list">
                  {vendas.map((venda) => (
                     <div className="venda-item" key={venda.id}>
                        <div className="compra_descricao_venda">
                           <p>Pedido {venda.id} - {new Date(venda.data).toLocaleDateString()}</p>
                           <p>{venda.metodoPagamento}</p>
                           <h3>R$ {venda.total.toFixed(2)}</h3>
                        </div>
                        <div className="compra_detalhes">
                           <button onClick={() => alternarModal(venda)}>Ver detalhes</button>
                        </div>
                     </div>
                  ))}
               </div>

               {modalVisible && vendaSelecionada && (
                  <div className="detalhes_overlay">
                     <div className="detalhes_content">
                        <div className="Topo_Caixa">
                           <div className="Pedido">
                              <h1>Pedido {vendaSelecionada.id} - {new Date(vendaSelecionada.data).toLocaleDateString()}</h1>
                           </div>
                           <div className="Fechar">
                              <MdClose className="Icone_Fechar" onClick={() => alternarModal()} />
                           </div>
                        </div>

                        <div className="Blocos_Endereço">
                           <div className="Local_Exato">
                              <p>{vendaSelecionada.enderecoEntrega}</p>
                           </div>
                        </div>

                        <div className="Credenciais_Pessoais">
                           <div className="Pessoa_Real">
                              <p>{user.nome}</p>
                              <p>{user.email}</p>
                           </div>
                           <div className="Número_Telefone">
                              <p>{user.telefone}</p>
                           </div>
                        </div>

                        <div className="Título">Itens do Pedido:</div>
                        <div className="Informações_Produtos">
                           {vendaSelecionada.itens.map((item, index) => (
                              <div key={index} className="Produto_Específico">
                                 <p>{item.quantidade} x {item.produto.nome} - R$ {item.preco.toFixed(2)}</p>
                              </div>
                           ))}
                        </div>

                        <div className="Valor_Total">
                           <p className="Pix">{vendaSelecionada.metodoPagamento}</p>
                           <p className="Diferentinho">R$ {vendaSelecionada.total.toFixed(2)}</p>
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
