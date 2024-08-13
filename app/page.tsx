import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/prisma";

const HomePage = async () => {
  const pokemon = await prisma.pokemon.findMany();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-6">
      <h1 className="font-bold text-3xl">Poke Collection</h1>
      <ul className="grid grid-cols-3 gap-4">
        {pokemon.map((pokemon) => (
          <li key={pokemon.id}>
            <Card>
              <CardHeader>
                <CardTitle className="uppercase text-xl text-center">
                  {pokemon.name}
                </CardTitle>
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
          </li>
        ))}
      </ul>
    </main>
  );
};

export default HomePage;
