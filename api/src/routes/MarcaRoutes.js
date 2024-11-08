import express from "express";

import {
  criarMarcaController,
  obterMarcas,
  obterMarca,
  editarMarca,
  removerMarca,
} from "../controllers/marcaController.js";

import {
  verificarToken,
  verificarAdmin,
  verificarTokenOpcional,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Rota pública para listar todos os marcas
router.get("/marcas", verificarTokenOpcional, obterMarcas);

// Rota pública para obter um marca específico por ID
router.get("/marcas/:marcaId", verificarTokenOpcional, obterMarca);

// Rota para cadastrar um novo marca (Admin Only)
router.post(
  "/marcas",
  verificarToken,
  verificarAdmin,
  criarMarcaController
);

router.put(
  "/marcas/:marcaId",
  verificarToken,
  verificarAdmin,
  editarMarca
);

// Rota para remover um marca (Admin Only)
router.delete(
  "/marcas/:marcaId",
  verificarToken,
  verificarAdmin,
  removerMarca
);

export default router;
