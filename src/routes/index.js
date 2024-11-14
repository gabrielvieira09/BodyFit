import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import AdminRoutes from "./AdminRoutes";
import Cadastro from "../pages/Cadastro";
import Home from "../pages/Home";
import Perfil from "../pages/Perfil";
import Carrinho from "../pages/Carrinho";
import Produtos from "../pages/Produtos";
import DetalhesProduto from "../pages/DetalhesProduto";
//import AdicionarProduto from "../pages/AdicionarProduto";
//import EditarProduto from "../pages/EditarProduto";
//import ListaDesejo from "./pages/ListaDesejo"
import HistoricoVendas from "../pages/HistoricoVendas";
import Usuarios from "../pages/Usuarios";


export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Rotas públicas */}
        
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/produtos/:id" element={<DetalhesProduto />} />

        {/* Rotas protegidas (apenas usuários logados) */}
        
        <Route element={<PrivateRoutes />}>
         {/* <Route path="/listadesejo" element={<ListaDesejo />} /> */}
         <Route path="/carrinho" element={<Carrinho />} />
         <Route path="/perfil" element={<Perfil />} />
        </Route>

        {/* Rotas protegidas de admin (apenas administradores) */}

        <Route element={<AdminRoutes />}>
          {/* <Route path="/admin/produto" element={<AdicionarProduto />} /> */}
          {/* <Route path="/admin/produto/:id" element={<EditarProduto />} /> */}
          <Route path="/admin/historico-vendas" element={<HistoricoVendas />} />
          <Route path="/admin/usuarios" element={<Usuarios />} />
        </Route>
      </Routes>
    </Router>
  );
}
