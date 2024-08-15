import Link from "next/link";
import { AddCollectionModal } from "./_components/add-collection-modal";
import * as collectionsApi from "@/lib/api/collections";
import { CollectionCard } from "@/components/collections/collection-card";

const CollectionsPage = async () => {
  const collections = await collectionsApi.getAll();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-bold text-xl">Your collections</h1>
        <AddCollectionModal />
      </div>
      <ul className="grid md:grid-cols-3 gap-4 w-full">
        {collections.map((collection) => (
          <li key={collection.id}>
            <Link href={`/collections/${collection.id}`}>
              <CollectionCard
                name={collection.name}
                description={collection.description}
                pokemonCount={collection.pokemon.length}
                className="h-full"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CollectionsPage;
