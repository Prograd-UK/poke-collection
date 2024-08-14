import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

interface Props {
  name: string;
  imageUrl: string;
}

export const PokemonCard = ({ name, imageUrl }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="uppercase text-xl text-center">{name}</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Image src={imageUrl} alt={name} width={96} height={96} />
      </CardContent>
    </Card>
  );
};
