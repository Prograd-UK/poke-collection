import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as pokemonApi from "@/lib/api/pokemon";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getPaginationItems } from "@/lib/utils";

interface Props {
  searchParams: { page?: string; limit?: string };
}

const HomePage = async ({ searchParams }: Props) => {
  const page = searchParams.page ? Number(searchParams.page) : 1;
  const limit = searchParams.limit ? Number(searchParams.limit) : 10;

  const {
    data: pokemon,
    pagination: { pages },
  } = await pokemonApi.getAll({ page, limit });

  const paginationItems = getPaginationItems({
    currentPage: page,
    totalPages: pages,
  });

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

      <Pagination>
        <PaginationContent>
          {page !== 1 && (
            <PaginationItem>
              <PaginationPrevious
                href={{ href: "/", query: { limit, page: page - 1 } }}
              />
            </PaginationItem>
          )}
          {paginationItems.map((item) =>
            typeof item === "number" ? (
              <PaginationItem key={item}>
                <PaginationLink
                  href={{ href: "/", query: { limit, page: item } }}
                  isActive={page === item}
                >
                  {item}
                </PaginationLink>
              </PaginationItem>
            ) : (
              <PaginationItem key={item}>
                <PaginationEllipsis />
              </PaginationItem>
            )
          )}
          {page !== pages && (
            <PaginationItem>
              <PaginationNext
                href={{ href: "/", query: { limit, page: page + 1 } }}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </main>
  );
};

export default HomePage;
