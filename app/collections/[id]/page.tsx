import { notFound } from "next/navigation";

import { PokemonCard } from "@/components/pokemon/pokemon-card";
import * as collectionsApi from "@/lib/api/collections";
import * as pokemonApi from "@/lib/api/pokemon";

import { AddPokemonModal } from "./_components/add-pokemon-modal";

interface Props {
  params: { id: string };
}

const CollectionPage = async ({ params: { id } }: Props) => {
  const collection = await collectionsApi.getOne(id);

  if (!collection) {
    notFound();
  }

  const pokemon = await pokemonApi.getList();

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-xl font-bold">{collection.name}</h1>
          <AddPokemonModal collectionId={id} pokemon={pokemon} />
        </div>
        <p>{collection.description}</p>
      </div>
      <ul className="grid w-full gap-4 md:grid-cols-3">
        {collection.pokemon.map((pokemon) => (
          <li key={pokemon.id}>
            <PokemonCard {...pokemon} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CollectionPage;
