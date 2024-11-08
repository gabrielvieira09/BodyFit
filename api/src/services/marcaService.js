import prisma from "./prismaClient.js";

export const criarMarca = async (data) => {
  const { nome } = data;

  return await prisma.marca.create({
    data: {
      nome,
    },
  });
};

export const listarMarcas = async () => {
  const marcas = await prisma.marca.findMany();

  return marcas;
};

export const obterMarcaPorId = async (marcaId) => {
  const marca = await prisma.marca.findUnique({
    where: { id: marcaId },
  });

  return {
    marca,
  };
};

export const atualizarMarca = async (marcaId, data) => {
  const { nome } = data;

  let updateData = {
    nome,
  };

  return await prisma.marca.update({
    where: { id: marcaId },
    data: updateData,
  });
};

export const deletarMarca = async (marcaId) => {
 
    return await prisma.marca.delete({
      where: { id: marcaId },
    });
 
};
