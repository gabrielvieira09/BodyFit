import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Cadastro from "./pages/Cadastro";
import ListaDesejo from "./pages/ListaDesejo"
import Perfil from "./pages/Perfil";
import Carrinho from "./pages/Carrinho";
import Produtos from "./pages/Produtos";
import Lancamentos from "./pages/Lancamentos";
import WheyProtein from "./pages/WheyProtein";
import BarraProteina from "./pages/BarraProteina";
import Creatina from "./pages/Creatina";
import PreTreino from "./pages/PreTreino";
import DetalhesProduto from "./pages/DetalhesProduto";
import HistoricoVendas from "./pages/HistoricoVendas";
import Usuarios from "./pages/Usuarios";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/listadesejo" element={<ListaDesejo />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/lancamentos" element={<Lancamentos />} />
        <Route path="/produto/:id" element={<DetalhesProduto />} />
        <Route path="/produto/:categoria" element={<WheyProtein />} />
        <Route path="/produto/:categoria" element={<BarraProteina />} />
        <Route path="/produto/:categoria" element={<Creatina />} />
        <Route path="/produto/:categoria" element={<PreTreino />} />
        <Route path="/admin/produtos" element={<Produtos />} />
        <Route path="/admin/historico-vendas" element={<HistoricoVendas />} />
        <Route path="/admin/usuarios" element={<Usuarios />} />
      </Routes>
    </Router>
  );
}
