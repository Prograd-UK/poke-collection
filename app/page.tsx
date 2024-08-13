import prisma from "@/lib/prisma";

const HomePage = async () => {
  const pokemon = await prisma.pokemon.findMany();

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="font-bold text-3xl">Poke Collection</h1>
      <pre>{JSON.stringify(pokemon, null, 2)}</pre>
    </main>
  );
};

export default HomePage;
