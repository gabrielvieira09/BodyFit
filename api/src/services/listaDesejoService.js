import prisma from "./prismaClient.js";

export const adicionarItemAoListaDesejo = async (userId, produtoId) => {
   // Verifica se o item já existe na listaDesejo do usuário
   const itemExistente = await prisma.listaDesejos.findFirst({
     where: {
       userId: userId,
       produtoId: produtoId,
     },
   });
 
   if (itemExistente) {
     return await prisma.listaDesejos.update({
       where: { id: itemExistente.id },
       data: {}  // Atualize conforme necessário
     });
   } else {
     // Adiciona o item à listaDesejo se não existir
     return await prisma.listaDesejos.create({
       data: {
         userId: userId,
         produtoId: produtoId,
       },
     });
   }
 };
 

 export const listarItensDoListaDesejo = async (userId) => {
   // Busca todos os itens da listaDesejo do usuário autenticado
   const itensListaDesejo = await prisma.listaDesejos.findMany({
     where: {
       userId: userId, // Filtra pelo userId do usuário autenticado
     },
     include: {
       produto: {
         include: {
           marca: true,      // Inclui os dados da marca do produto
           imagens: true,    // Inclui as imagens do produto
         },
       },
     },
   });
 
   // Formatar o retorno no formato desejado
   return {
     id: userId, // ID do usuário autenticado
     userId: userId, // Vincula a listaDesejo ao usuário
     "produtos-listaDesejo": itensListaDesejo.map((item) => {
       // Formata as imagens com a base URL
       const imagensFormatadas = item.produto.imagens.map((imagem) => {
         return `${process.env.BASE_URL}/${imagem.url.replace(/\\/g, "/")}`;
       });
 
       return {
         produtoId: item.produtoId,
         produto: {
           id: item.produto.id,
           nome: item.produto.nome,
           preco: item.produto.preco,
           marca: {
             id: item.produto.marca.id,
             nome: item.produto.marca.nome,
           },
           imagens: imagensFormatadas, // Imagens formatadas com a base URL
         },
       };
     }),
   };
 };
 

export const excluirItemDoListaDesejo = async (userId, produtoId) => {
  // Verifica se o item pertence ao listaDesejo do usuário
  const itemListaDesejo = await prisma.listaDesejos.findFirst({
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
  return await prisma.listaDesejos.delete({
    where: { id: itemListaDesejo.id },
  });
};
