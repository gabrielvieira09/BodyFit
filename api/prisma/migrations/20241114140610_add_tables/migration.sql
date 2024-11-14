/*
  Warnings:

  - You are about to drop the column `visibilidade` on the `Produto` table. All the data in the column will be lost.
  - You are about to drop the column `imagem` on the `User` table. All the data in the column will be lost.
  - Added the required column `desconto` to the `Produto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `marcaId` to the `Produto` table without a default value. This is not possible if the table is not empty.
  - Made the column `descricao` on table `Produto` required. This step will fail if there are existing NULL values in that column.
  - Made the column `telefone` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `complemento` on table `Endereco` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateTable
CREATE TABLE "ListaDesejos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "produtoId" INTEGER NOT NULL,
    CONSTRAINT "ListaDesejos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ListaDesejos_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Marca" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Produto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "preco" REAL NOT NULL,
    "desconto" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "estoque" INTEGER NOT NULL,
    "marcaId" INTEGER NOT NULL,
    CONSTRAINT "Produto_marcaId_fkey" FOREIGN KEY ("marcaId") REFERENCES "Marca" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Produto" ("descricao", "estoque", "id", "nome", "preco") SELECT "descricao", "estoque", "id", "nome", "preco" FROM "Produto";
DROP TABLE "Produto";
ALTER TABLE "new_Produto" RENAME TO "Produto";
CREATE UNIQUE INDEX "Produto_nome_key" ON "Produto"("nome");
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "cpf" TEXT NOT NULL
);
INSERT INTO "new_User" ("cpf", "email", "id", "nome", "password", "role", "telefone") SELECT "cpf", "email", "id", "nome", "password", "role", "telefone" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_cpf_key" ON "User"("cpf");
CREATE TABLE "new_Endereco" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cep" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "logradouro" TEXT NOT NULL,
    "complemento" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Endereco_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Endereco" ("bairro", "cep", "cidade", "complemento", "id", "logradouro", "numero", "userId") SELECT "bairro", "cep", "cidade", "complemento", "id", "logradouro", "numero", "userId" FROM "Endereco";
DROP TABLE "Endereco";
ALTER TABLE "new_Endereco" RENAME TO "Endereco";
CREATE UNIQUE INDEX "Endereco_userId_key" ON "Endereco"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Marca_nome_key" ON "Marca"("nome");
