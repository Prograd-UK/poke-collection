-- CreateTable
CREATE TABLE "PokemonType" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "icon" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Pokemon" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "PokemonTypeOnPokemon" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slot" INTEGER NOT NULL,
    "pokemonId" TEXT NOT NULL,
    "typeId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "PokemonTypeOnPokemon_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PokemonTypeOnPokemon_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "PokemonType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "PokemonType_name_key" ON "PokemonType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Pokemon_name_key" ON "Pokemon"("name");

-- CreateIndex
CREATE INDEX "PokemonTypeOnPokemon_pokemonId_idx" ON "PokemonTypeOnPokemon"("pokemonId");

-- CreateIndex
CREATE INDEX "PokemonTypeOnPokemon_typeId_idx" ON "PokemonTypeOnPokemon"("typeId");

-- CreateIndex
CREATE UNIQUE INDEX "PokemonTypeOnPokemon_pokemonId_typeId_key" ON "PokemonTypeOnPokemon"("pokemonId", "typeId");

-- CreateIndex
CREATE UNIQUE INDEX "PokemonTypeOnPokemon_pokemonId_slot_key" ON "PokemonTypeOnPokemon"("pokemonId", "slot");
