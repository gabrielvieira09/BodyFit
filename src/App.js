import React from "react";
import AppRoutes from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import "./styles/global.css";
import Header from "./components/Header";

export default function App() {
  return (
    <AuthProvider>
      < AppRoutes />
    </AuthProvider>
  );
}
