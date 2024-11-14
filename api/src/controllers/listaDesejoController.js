import {
  adicionarItemAoListaDesejo,
  listarItensDoListaDesejo,
  excluirItemDoListaDesejo,
} from "../services/listaDesejoService.js";

// Adicionar um item ao listaDesejo
export const adicionarItemAoListaDesejoController = async (req, res) => {
  const userId = req.user.userId; // ID do usuário autenticado
  const { produtoId } = req.body;

  // Verifica se o usuário é um administrador
  if (req.user.role !== "USER") {
    return res.status(403).json({
      error: "Apenas usuários podem ter listaDesejos.",
    });
  }

  try {
    const listaDesejo = await adicionarItemAoListaDesejo(
      userId,
      produtoId,
    );
    res.status(201).json(listaDesejo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Listar os itens do listaDesejo
export const listarItensDoListaDesejoController = async (req, res) => {
  const userId = req.user.userId; // ID do usuário autenticado

  // Verifica se o usuário é um administrador
  if (req.user.role !== "USER") {
    return res.status(403).json({
      error: "Administradores não têm listaDesejos.",
    });
  }

  try {
    const listaDesejo = await listarItensDoListaDesejo(userId);
    res.status(200).json(listaDesejo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Remover um item do listaDesejo
export const excluirItemDoListaDesejoController = async (req, res) => {
  const userId = req.user.userId; // ID do usuário autenticado
  const produtoId = parseInt(req.params.produtoId); // Converte o produtoId para inteiro

  // Verifica se o usuário é um administrador
  if (req.user.role !== "USER") {
    return res.status(403).json({
      error: "Apenas usuários podem remover itens de seus listaDesejos.",
    });
  }

  try {
    const listaDesejo = await excluirItemDoListaDesejo(userId, produtoId);
    res.status(200).json(listaDesejo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
