import express from "express";
import {
  adicionarItemAoCarrinhoController,
  excluirItemDoCarrinhoController,
  listarItensDoCarrinhoController,
} from "../controllers/listaDesejoController.js";
import { verificarToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Rota para listar os itens do lista-desejos do usuário autenticado
router.get("/lista-desejos", verificarToken, listarItensDoCarrinhoController);

// Rota para adicionar um item ao lista-desejos do usuário autenticado
router.post("/lista-desejos", verificarToken, adicionarItemAoCarrinhoController);


// Rota para excluir um item do lista-desejos do usuário autenticado
router.delete(
  "/lista-desejos/:produtoId",
  verificarToken,
  excluirItemDoCarrinhoController
);

export default router;
