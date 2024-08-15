-- CreateTable
CREATE TABLE "Collection" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "PokemonOnCollection" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pokemonId" TEXT NOT NULL,
    "collectionId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "PokemonOnCollection_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "PokemonOnCollection_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "Collection_userId_idx" ON "Collection"("userId");

-- CreateIndex
CREATE INDEX "PokemonOnCollection_pokemonId_idx" ON "PokemonOnCollection"("pokemonId");

-- CreateIndex
CREATE INDEX "PokemonOnCollection_collectionId_idx" ON "PokemonOnCollection"("collectionId");

-- CreateIndex
CREATE UNIQUE INDEX "PokemonOnCollection_pokemonId_collectionId_key" ON "PokemonOnCollection"("pokemonId", "collectionId");
