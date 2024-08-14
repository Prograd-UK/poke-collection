"use client";

import { cn } from "@/lib/utils";
import { HeartIcon } from "lucide-react";
import { useTransition } from "react";
import * as pokemonApi from "@/lib/api/pokemon";
import { useToast } from "@/components/ui/use-toast";

interface Props {
  pokemonId: string;
  isLiked?: boolean;
}

export const LikeButton = ({ pokemonId, isLiked }: Props) => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  function handleClick() {
    startTransition(() => {
      if (isLiked) {
        pokemonApi
          .unlike(pokemonId)
          .then(() => {
            toast({
              description: "Pokemon unliked successfully",
            });
          })
          .catch(() => {
            toast({
              variant: "destructive",
              description: "Error unliking pokemon",
            });
          });
      } else {
        pokemonApi
          .like(pokemonId)
          .then(() => {
            toast({ description: "Pokemon liked successfully" });
          })
          .catch(() => {
            toast({
              variant: "destructive",
              description: "Error liking pokemon",
            });
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
