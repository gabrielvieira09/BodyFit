import React from "react";
import "./style.css";
import usuario from "../../assets/usuario.png";

export default function UsuarioComponent({ name, email, onEdit, onDelete }) {
  return (
    <div className="usuarioComponent_container">
      <div className="usuarioComponent_image">
        <img src={usuario} alt="Imagem do usuário" />
      </div>
      <div className="usuarioComponent_name">
        <div>
          <h3>{name}</h3>
          <text>{email}</text>
        </div>
      </div>
      <div className="usuarioComponent_opcoes">
        <button className="usuarioComponent_opcoes_editar" onClick={onEdit}>
          EDITAR
        </button>
        <button className="usuarioComponent_opcoes_remover" onClick={onDelete}>
          REMOVER
        </button>
      </div>
    </div>
  );
}
