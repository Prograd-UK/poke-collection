import { CatIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Props {
  name: string;
  description?: string | null;
  pokemonCount: number;
  className?: string;
}

export const CollectionCard = ({
  name,
  description,
  pokemonCount,
  className,
}: Props) => {
  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader>
        <CardTitle className="text-center text-xl uppercase">{name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-grow justify-center">
        {description && <p>{description}</p>}
      </CardContent>
      <CardFooter className="justify-between border-t py-3">
        <Badge variant="outline" className="flex items-center gap-1">
          <CatIcon className="h-4 w-4" />
          <span>{pokemonCount}</span>
        </Badge>
      </CardFooter>
    </Card>
  );
};
