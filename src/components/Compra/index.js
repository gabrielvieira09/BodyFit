import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { MdClose } from "react-icons/md";
import api from "../../services/api";
import { AuthContext } from "../../contexts/AuthContext";

export default function Compra({ pedido }) {

  
   
   const { user } = useContext(AuthContext);
   const { id, data, metodoPagamento, total, items } = pedido;
   const [modalVisible, setModalVisible] = useState(false);
   const [itemsDetalhados, setItemsDetalhados] = useState([]); // Estado para armazenar os detalhes dos itens

   console.log('user', user);
   console.log('pedido', pedido);

   useEffect(() => {
      if (modalVisible) {
         document.body.classList.add("no-scroll");
      } else {
         document.body.classList.remove("no-scroll");
      }

      return () => document.body.classList.remove("no-scroll");
   }, [modalVisible]);

   // Busca detalhes dos produtos
   useEffect(() => {
      const fetchProdutos = async () => {
         try {
            const produtosDetalhes = await Promise.all(
               items.map(async (item) => {
                  const response = await api.get(`/produtos/${item.produtoId}`);
                  return { ...item, nome: response.data.nome };
               })
            );
            setItemsDetalhados(produtosDetalhes);
         } catch (error) {
            console.error("Erro ao buscar detalhes dos produtos", error);
         }
      };

      if (items && items.length > 0) {
         fetchProdutos();
      }
   }, [items]);

   const alternarModal = () => setModalVisible(!modalVisible);

   console.log('items',itemsDetalhados);
   
   return (
      <div className="compra_container">
         <div className="compra_descricao">
            <div className="compra_descricao_pedido">
               <p>Pedido {id} - {data}</p>
            </div>
            <div className="compra_descricao_pagamento">
               <p>{metodoPagamento}</p>
               <h3>R$ {total.toFixed(2)}</h3>
            </div>
         </div>
         <div className="compra_detalhes">
            <button onClick={alternarModal}>Ver detalhes</button>
         </div>

         {modalVisible && (
            <div className="detalhes_overlay">
               <div className="detalhes_content">
                  <div className="Topo_Caixa">
                     <div className="Pedido">
                        <h1>Pedido {id} - {data}</h1>
                     </div>
                     <div className="Fechar">
                        <MdClose className="Icone_Fechar" onClick={alternarModal} />
                     </div>
                  </div>

                  <div className="Blocos_Endereço">
                     <div className="Local_Exato">
                        <p>{pedido.enderecoEntrega}</p>
                        <p>{pedido.enderecoEntrega}</p>
                        <p>{pedido.enderecoEntrega}</p>
                     </div>
                     <div className="Referência_Residencial">
                        <p>Casa</p>
                        <p>Praça dos Pombos</p>
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
                     {
                        pedido.itens.map((item, index) => (
                           <div key={index} className="Produto_Específico">
                              <p>{item.quantidade} x {item.produto.nome} - R$ {item.preco.toFixed(2)}</p>
                           </div>
                        ))
                     }
                  </div>

                  <div className="Valor_Total">
                     <p className="Pix">{metodoPagamento}</p>
                     <p className="Diferentinho">R$ {total.toFixed(2)}</p>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}
