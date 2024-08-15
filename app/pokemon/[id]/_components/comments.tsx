import { formatRelative } from "date-fns";
import { MessageCircle } from "lucide-react";
import Image from "next/image";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import * as commentsApi from "@/lib/api/comments";

interface Props {
  pokemonId: string;
}

export const Comments = async ({ pokemonId }: Props) => {
  const comments = await commentsApi.getAllByPokemonId(pokemonId);

  if (!comments.length) {
    return (
      <div className="flex flex-col items-center mx-auto gap-2">
        <MessageCircle />
        <p>No comments yet...</p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {comments.map((comment) => (
        <li key={comment.id}>
          <Card>
            <CardHeader className="flex-row items-start space-y-0 gap-3">
              <Image
                src={comment.author?.avatar || "/placeholder-avatar.png"}
                alt={comment.author?.username || "Unknown author"}
                width={32}
                height={32}
                className="rounded-full"
              />
              <div>
                <h3 className="leading-none text-sm font-bold">
                  {comment.author?.username || "Unknown author"}
                </h3>
                <small>
                  {formatRelative(new Date(comment.createdAt), new Date())}
                </small>
              </div>
            </CardHeader>
            <CardContent className="text-sm">{comment.content}</CardContent>
          </Card>
        </li>
      ))}
    </ul>
  );
};
