import prisma from "./prismaClient.js";

export const criarProduto = async (data) => {
   const { nome, preco, estoque, descricao, desconto, imagens, marcaId } = data;

   console.log(data);
   
 
   // Verificar se a marca existe com o campo 'id' corretamente convertido para inteiro
   const marcaExistente = await prisma.marca.findUnique({
     where: {
       id: parseInt(marcaId), // Passa o marcaId convertido para inteiro
     },
   });
 
   // Se a marca não for encontrada, lançar erro
   if (!marcaExistente) {
     throw new Error("Marca não encontrada. Não é possível criar o produto sem uma marca válida.");
   }
 
   // Criar o produto associado à marca existente
   return await prisma.produto.create({
     data: {
       nome,
       preco: parseFloat(preco),
       estoque: parseInt(estoque),
       desconto,
       descricao,
       marcaId: parseInt(marcaId), // Conectar com a marca existente
       imagens: {
         create: imagens.map((imagem) => ({ url: imagem })), // Cria uma entrada para cada imagem
       },
     },
   });
 };
 
 

export const listarProdutos = async () => {
  const produtos = await prisma.produto.findMany({
    include: { imagens: true },
  });

  // Formata a URL das imagens
  const produtosFormatados = produtos.map((produto) => {
    const imagensFormatadas = produto.imagens.map((imagem) => {
      return `${process.env.BASE_URL}/${imagem.url.replace(/\\/g, "/")}`;
    });

    return {
      ...produto,
      imagens: imagensFormatadas,
    };
  });

  return produtosFormatados;
};

export const obterProdutoPorId = async (produtoId, isAdmin = false) => {
  const produto = await prisma.produto.findUnique({
    where: { id: produtoId },
    include: { imagens: true },
  });

  // Formata a URL das imagens
  const imagensFormatadas = produto.imagens.map((imagem) => {
    return `${process.env.BASE_URL}/${imagem.url.replace(/\\/g, "/")}`;
  });

  return {
    ...produto,
    imagens: imagensFormatadas,
  };
};

export const atualizarProduto = async (produtoId, data) => {
  const { nome, preco, estoque, descricao, desconto, imagens, marcaId } = data;


  let updateData = {
    nome,
    preco: parseFloat(preco),
    estoque: parseInt(estoque),
    descricao,
    marcaId,
    desconto,
  };

  if (imagens && imagens.length > 0) {
    updateData.imagens = {
      deleteMany: {},
      create: imagens.map((imagem) => ({ url: imagem })),
    };
  }

  return await prisma.produto.update({
    where: { id: produtoId },
    data: updateData,
    include: {
      imagens: true,
    },
  });
};

export const deletarProduto = async (produtoId) => {
  // Verifica se o produto existe
  const produtoExistente = await prisma.produto.findUnique({
    where: { id: produtoId },
    include: {
      pedidoItens: true, // Inclui itens de pedidos relacionados
      carrinho: true, // Inclui itens no carrinho relacionados
      imagens: true, // Inclui imagens relacionadas
    },
  });

  if (!produtoExistente) {
    throw new Error("Produto não encontrado.");
  }

  // Se o produto já foi vendido (pedidoItens existe), não podemos deletar o histórico de vendas
  if (produtoExistente.pedidoItens.length > 0) {
    throw new Error(
      "Não é possível excluir o produto, pois ele já foi vendido."
    );
  }

  try {
    // Exclui os itens do carrinho relacionados ao produto, se houver
    if (produtoExistente.carrinho.length > 0) {
      await prisma.carrinho.deleteMany({
        where: { produtoId: produtoId },
      });
    }

    // Exclui as imagens relacionadas ao produto, se houver
    if (produtoExistente.imagens.length > 0) {
      await prisma.imagemProduto.deleteMany({
        where: { produtoId: produtoId },
      });
    }

    // Agora, finalmente, exclui o produto
    return await prisma.produto.delete({
      where: { id: produtoId },
    });
  } catch (error) {
    throw new Error(`Erro ao deletar o produto: ${error.message}`);
  }
};
