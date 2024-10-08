import Link from "next/link";

import { CollectionCard } from "@/components/collections/collection-card";
import * as collectionsApi from "@/lib/api/collections";

import { AddCollectionModal } from "./_components/add-collection-modal";

const CollectionsPage = async () => {
  const collections = await collectionsApi.getAll();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-xl font-bold">Your collections</h1>
        <AddCollectionModal />
      </div>
      <ul className="grid w-full gap-4 md:grid-cols-3">
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
