import express from "express";

import {
   createMarcaController,
   updateMarcaController,
  deleteMarcaController, getMarca, getMarcas
} from "../controllers/marcaController.js";

import {
  verificarToken,
  verificarAdmin,
  verificarTokenOpcional,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Rota pública para listar todos os marcas
router.get("/marcas", getMarcas);

// Rota pública para obter um marca específico por ID
router.get("/marcas/:marcaId", getMarca);

// Rota para cadastrar um novo marca (Admin Only)
router.post(
  "/marcas",
  verificarToken,
  verificarAdmin,
  createMarcaController
);

router.put(
  "/marcas/:marcaId",
  verificarToken,
  verificarAdmin,
  updateMarcaController
);

// Rota para remover um marca (Admin Only)
router.delete(
  "/marcas/:marcaId",
  verificarToken,
  verificarAdmin,
  deleteMarcaController
);

export default router;
