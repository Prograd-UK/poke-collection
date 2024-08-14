"use client";

import { cn } from "@/lib/utils";
import { HeartIcon } from "lucide-react";
import { useTransition } from "react";
import * as pokemonApi from "@/lib/api/pokemon";

interface Props {
  pokemonId: string;
  isLiked?: boolean;
}

export const LikeButton = ({ pokemonId, isLiked }: Props) => {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(() => {
      if (isLiked) {
        pokemonApi
          .unlike(pokemonId)
          .then(() => {
            console.log("Pokemon unliked successfully");
          })
          .catch((error) => {
            console.error("Error unliking pokemon", error);
          });
      } else {
        pokemonApi
          .like(pokemonId)
          .then(() => {
            console.log("Pokemon liked successfully");
          })
          .catch((error) => {
            console.error("Error liking pokemon", error);
          });
      }
    });
  }

  return (
    <button onClick={handleClick} disabled={isPending} className="group">
      <span className="sr-only">{isLiked ? "unlike" : "like"}</span>
      <HeartIcon
        className={cn(
          "group-hover:fill-red-400",
          isLiked && "fill-red-400",
          isPending && "animate-pulse"
        )}
      />
    </button>
  );
};
