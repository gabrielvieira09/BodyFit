-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Produto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "preco" REAL NOT NULL,
    "desconto" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "estoque" INTEGER NOT NULL,
    "marcaId" INTEGER NOT NULL,
    CONSTRAINT "Produto_marcaId_fkey" FOREIGN KEY ("marcaId") REFERENCES "Marca" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Produto" ("desconto", "descricao", "estoque", "id", "marcaId", "nome", "preco") SELECT "desconto", "descricao", "estoque", "id", "marcaId", "nome", "preco" FROM "Produto";
DROP TABLE "Produto";
ALTER TABLE "new_Produto" RENAME TO "Produto";
CREATE UNIQUE INDEX "Produto_nome_key" ON "Produto"("nome");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
