import { Library, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { LikeButton } from "./like-button";

interface Props {
  id: string;
  name: string;
  imageUrl: string;
  isLiked?: boolean;
  types: Array<{ id: string; name: string; icon?: string | null }>;
  commentsCount?: number;
  collectionsCount?: number;
}

export const PokemonCard = ({
  id,
  name,
  imageUrl,
  isLiked,
  types,
  commentsCount = 0,
  collectionsCount = 0,
}: Props) => {
  return (
    <Card>
      <Link href={`/pokemon/${id}`}>
        <CardHeader>
          <CardTitle className="text-center text-xl uppercase">
            {name}
          </CardTitle>
          <div className="flex flex-wrap justify-center gap-1">
            {types.map((type) => (
              <Badge key={type.id} variant="outline" className="uppercase">
                {type.icon} {type.name}
              </Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Image src={imageUrl} alt={name} width={96} height={96} />
        </CardContent>
      </Link>

      <CardFooter className="justify-between border-t py-3">
        <LikeButton pokemonId={id} isLiked={isLiked} />
        <div className="relative">
          <MessageCircle />
          <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-400 text-xs font-bold text-white">
            {commentsCount < 10 ? commentsCount : "9+"}
          </span>
        </div>
        <div className="relative">
          <Library />
          <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-400 text-xs font-bold text-white">
            {collectionsCount < 10 ? collectionsCount : "9+"}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};
