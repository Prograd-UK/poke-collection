import { Badge } from "@/components/ui/badge";
import * as pokemonApi from "@/lib/api/pokemon";
import * as collectionsApi from "@/lib/api/collections";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { AddToCollectionModal } from "./_components/add-to-collection-modal";
import { LikeButton } from "@/components/pokemon/like-button";
import { Comments } from "./_components/comments";
import { CommentForm } from "./_components/comment-form";

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
          <h1 className="font-bold text-xl uppercase">{pokemon.name}</h1>
          <div className="flex items-center gap-3">
            <AddToCollectionModal pokemonId={id} collections={collections} />
            <LikeButton pokemonId={id} isLiked={pokemon.isLiked} />
          </div>
        </div>
        <div className="flex gap-1 flex-wrap">
          {pokemon.types.map((type) => (
            <Badge key={type.id} variant="outline" className="uppercase">
              {type.icon} {type.name}
            </Badge>
          ))}
        </div>
        <div className="flex gap-1 flex-wrap empty:hidden">
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
      <section className="flex justify-center flex-col gap-6 max-w-[320px] mx-auto">
        <Comments pokemonId={id} />
        <CommentForm pokemonId={id} />
      </section>
    </div>
  );
};

export default PokemonPage;
