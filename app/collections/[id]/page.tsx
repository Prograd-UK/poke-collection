import { PokemonCard } from "@/components/pokemon/pokemon-card";
import * as collectionsApi from "@/lib/api/collections";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

const CollectionPage = async ({ params: { id } }: Props) => {
  const collection = await collectionsApi.getOne(id);

  if (!collection) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h1 className="font-bold text-xl">{collection.name}</h1>
        <p>{collection.description}</p>
      </div>
      <ul className="grid md:grid-cols-3 gap-4 w-full">
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
