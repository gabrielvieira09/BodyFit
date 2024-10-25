import React from "react";
import AppRoutes from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import "./styles/global.css";
import Produtos from "./pages/Produtos";
import Cadastro from "./pages/Cadastro";
import ProdutosV from "./components/ProdutoV";
import DetalhesProduto from "./pages/DetalhesProduto";

export default function App() {
  return (
    <AuthProvider>
      <div className="App">
        <AppRoutes />
      </div>
    </AuthProvider>
  );
}
