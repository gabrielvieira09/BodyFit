import {
  createMarca,
  deleteMarca,
  getAllMarcas,
  getMarcaById,
  updateMarca,
} from "../services/marcaService";

export const getMarcas = async (req, res) => {
  try {
    const products = await getAllMarcas();
    res.json(products);
  } catch (error) {
    res.status(500).json({
      error: "Erro ao buscar marcas",
    });
  }
};

export const createMarcaController = async (req, res) => {
  try {
    const newMarca = await createMarca(req.body);
    res.status(201).json(newMarca);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar marca" });
  }
};

export const getMarca = async (req, res) => {
  try {
    const product = await getMarcaById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(500).json({ error: "Produto não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar marca" });
  }
};

export const updateMarcaController = async (req, res) => {
  try {
    const product = await updateMarca(req.params.id, req.body);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar marca" });
  }
};

export const deleteMarcaController = async (req, res) => {
  try {
    await deleteMarca(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar marca" });
  }
};
