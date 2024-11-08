import prisma from "./prismaClient.js";

export const adicionarItemAoListaDesejo = async (
  userId,
  produtoId,
) => {
  // Verifica se o item já existe no listaDesejo do usuário
  const itemExistente = await prisma.listaDesejo.findFirst({
    where: {
      userId: userId,
      produtoId: produtoId,
    },
  });

  if (itemExistente) {
    return await prisma.listaDesejo.update({
      where: { id: itemExistente.id },
    });
  } else {
    // Adiciona o item ao listaDesejo se não existir
    return await prisma.listaDesejo.create({
      data: {
        userId: userId,
        produtoId: produtoId,
      },
    });
  }
};

export const listarItensDoListaDesejo = async (userId) => {
  // Busca todos os itens do listaDesejo do usuário autenticado
  const itensListaDesejo = await prisma.listaDesejo.findMany({
    where: {
      userId: userId, // Filtra pelo userId do usuário autenticado
    },
    include: {
      produto: true, // Inclui os detalhes do produto no retorno
    },
  });

  // Formatar o retorno no formato desejado
  return {
    id: userId, // ID do usuário autenticado
    userId: userId, // Vincula o listaDesejo ao usuário
    "produtos-listaDesejo": itensListaDesejo.map((item) => ({
      produtoId: item.produtoId,
      produto: {
        id: item.produto.id,
        nome: item.produto.nome,
        preco: item.produto.preco,
      },
    })),
  };
};


export const excluirItemDoListaDesejo = async (userId, produtoId) => {
  // Verifica se o item pertence ao listaDesejo do usuário
  const itemListaDesejo = await prisma.listaDesejo.findFirst({
    where: {
      userId: userId,
      produtoId: produtoId,
    },
  });

  if (!itemListaDesejo) {
    throw new Error(
      "Você não tem permissão para excluir este item do listaDesejo ou ele não existe."
    );
  }

  // Exclui o item do listaDesejo
  return await prisma.listaDesejo.delete({
    where: { id: itemListaDesejo.id },
  });
};
