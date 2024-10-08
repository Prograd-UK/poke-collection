import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { LikeButton } from "@/components/pokemon/like-button";
import { Badge } from "@/components/ui/badge";
import * as collectionsApi from "@/lib/api/collections";
import * as pokemonApi from "@/lib/api/pokemon";

import { AddToCollectionModal } from "./_components/add-to-collection-modal";
import { CommentForm } from "./_components/comment-form";
import { Comments } from "./_components/comments";

interface Props {
  params: { id: string };
}

const PokemonPage = async ({ params: { id } }: Props) => {
  const pokemon = await pokemonApi.getOne(id);

  if (!pokemon) {
    notFound();
  }

  const collections = await collectionsApi.getList();

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-xl font-bold uppercase">{pokemon.name}</h1>
          <div className="flex items-center gap-3">
            <AddToCollectionModal pokemonId={id} collections={collections} />
            <LikeButton pokemonId={id} isLiked={pokemon.isLiked} />
          </div>
        </div>
        <div className="flex flex-wrap gap-1">
          {pokemon.types.map((type) => (
            <Badge key={type.id} variant="outline" className="uppercase">
              {type.icon} {type.name}
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap gap-1 empty:hidden">
          {pokemon.collections.map((collection) => (
            <Link key={collection.id} href={`/collections/${collection.id}`}>
              <Badge className="uppercase">{collection.name}</Badge>
            </Link>
          ))}
        </div>
      </div>
      <Image
        src={pokemon.imageUrl}
        alt={pokemon.name}
        width={96}
        height={96}
        className="mx-auto"
      />
      <section className="mx-auto flex max-w-[320px] flex-col justify-center gap-6">
        <Comments pokemonId={id} />
        <CommentForm pokemonId={id} />
      </section>
    </div>
  );
};

export default PokemonPage;
