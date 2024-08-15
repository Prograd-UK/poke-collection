import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CatIcon } from "lucide-react";

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
        <CardTitle className="uppercase text-xl text-center">{name}</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center flex-grow">
        {description && <p>{description}</p>}
      </CardContent>
      <CardFooter className="border-t justify-between py-3">
        <Badge variant="outline" className="flex items-center gap-1">
          <CatIcon className="w-4 h-4" />
          <span>{pokemonCount}</span>
        </Badge>
      </CardFooter>
    </Card>
  );
};
