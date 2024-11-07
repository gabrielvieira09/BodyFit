import React from "react";
import AppRoutes from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import "./styles/global.css";
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

import ProdutoH from "./components/ProdutoH"
import Compra from "./components/Compra";

export default function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Perfil />
      </div>
    </AuthProvider>
  );
}
