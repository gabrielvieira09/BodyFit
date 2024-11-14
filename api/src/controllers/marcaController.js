import { criarMarca, atualizarMarca, deletarMarca, listarMarcas, obterMarcaPorId } from "../services/marcaService.js";


export const getMarcas = async (req, res) => {
  try {
    const products = await listarMarcas();
    res.json(products);
  } catch (error) {
    res.status(500).json({
      error: "Erro ao buscar marcas",
    });
  }
};

export const createMarcaController = async (req, res) => {
  try {
    const newMarca = await criarMarca(req.body);
    res.status(201).json(newMarca);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar marca" });
  }
};

export const getMarca = async (req, res) => {
console.log(req.params);
console.log(req.body);

  try {
    const product = await obterMarcaPorId(parseInt(req.params.marcaId));
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
     const { marcaId } = req.params;
     const { nome } = req.body;
 
     // Validação para garantir que o campo 'nome' seja uma string
     if (!nome || typeof nome !== 'string') {
       return res.status(400).json({ error: "O campo 'nome' é obrigatório e deve ser uma string." });
     }
 
     const updatedMarca = await atualizarMarca(marcaId, req.body);
     
     if (!updatedMarca) {
       return res.status(404).json({ error: "Marca não encontrada." });
     }
 
     res.status(200).json(updatedMarca);
   } catch (error) {
     console.error("Erro ao atualizar marca:", error);
     res.status(500).json({ error: "Erro ao atualizar marca." });
   }
 };
 

export const deleteMarcaController = async (req, res) => {
  try {
    await deletarMarca(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar marca" });
  }
};
