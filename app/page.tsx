import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/prisma";

const HomePage = async () => {
  const pokemon = await prisma.pokemon.findMany();

  return (
    <main className="flex flex-col items-center justify-center h-screen gap-6">
      <h1 className="font-bold text-3xl">Poke Collection</h1>
      {pokemon.map((pokemon) => (
        <Card key={pokemon.id}>
          <CardHeader>
            <CardTitle className="uppercase text-xl">{pokemon.name}</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Image
              src={pokemon.imageUrl}
              alt={pokemon.name}
              width={96}
              height={96}
            />
          </CardContent>
        </Card>
      ))}
    </main>
  );
};

export default HomePage;
