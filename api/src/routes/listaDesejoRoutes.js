import express from "express";
import {
  adicionarItemAoListaDesejoController,
  excluirItemDoListaDesejoController,
  listarItensDoListaDesejoController
} from "../controllers/listaDesejoController.js";
import { verificarToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Rota para listar os itens do lista-desejos do usuário autenticado
router.get("/lista-desejos", verificarToken, listarItensDoListaDesejoController);

// Rota para adicionar um item ao lista-desejos do usuário autenticado
router.post("/lista-desejos", verificarToken, adicionarItemAoListaDesejoController);


// Rota para excluir um item do lista-desejos do usuário autenticado
router.delete(
  "/lista-desejos/:produtoId",
  verificarToken,
  excluirItemDoListaDesejoController
);

export default router;
