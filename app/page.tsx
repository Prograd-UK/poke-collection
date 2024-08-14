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
import { PokemonCard } from "@/components/pokemon/pokemon-card";

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
    <main className="flex flex-col items-center justify-center gap-6">
      <ul className="grid md:grid-cols-3 gap-4 w-full">
        {pokemon.map((pokemon) => (
          <li key={pokemon.id}>
            <PokemonCard
              name={pokemon.name}
              imageUrl={pokemon.imageUrl}
              types={pokemon.types}
            />
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
