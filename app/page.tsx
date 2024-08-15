import { PokemonCard } from "@/components/pokemon/pokemon-card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import * as pokemonApi from "@/lib/api/pokemon";
import { getPaginationItems } from "@/lib/utils";

interface Props {
  searchParams: { page?: string; limit?: string };
}

const HomePage = async ({ searchParams }: Props) => {
  const page = searchParams.page ? Number(searchParams.page) : 1;
  const limit = searchParams.limit ? Number(searchParams.limit) : 9;

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
      <ul className="grid w-full gap-4 md:grid-cols-3">
        {pokemon.map((pokemon) => (
          <li key={pokemon.id}>
            <PokemonCard {...pokemon} />
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
            ),
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
