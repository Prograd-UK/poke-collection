"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Check,
  ChevronsUpDown,
  Loader2Icon,
  PlusCircleIcon,
} from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import * as collectionsApi from "@/lib/api/collections";
import { cn } from "@/lib/utils";

const addPokemonInputSchema = z.object({
  pokemonId: z.string().min(1),
});

type AddPokemonInput = z.infer<typeof addPokemonInputSchema>;

interface Props {
  collectionId: string;
  pokemon: Array<{ id: string; name: string }>;
}

export const AddPokemonModal = ({ collectionId, pokemon }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<AddPokemonInput>({
    resolver: zodResolver(addPokemonInputSchema),
    defaultValues: { pokemonId: "" },
  });

  function handleSubmit(values: AddPokemonInput) {
    startTransition(() => {
      collectionsApi
        .addPokemon({ ...values, collectionId })
        .then(() => {
          toast({
            description: "Pokemon added to collection",
          });
          form.reset();
          setIsOpen(false);
        })
        .catch(() => {
          toast({
            variant: "destructive",
            description: "Error adding pokemon to collection",
          });
        });
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <PlusCircleIcon />
          Add Pokemon
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Pokemon to Collection</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="pokemonId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Pokemon</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? pokemon.find(
                                (pokemon) => pokemon.id === field.value
                              )?.name
                            : "Select Pokemon"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="p-0"
                      style={{
                        width: "var(--radix-popover-trigger-width)",
                      }}
                    >
                      <Command>
                        <CommandInput placeholder="Search pokemon..." />
                        <CommandList>
                          <CommandEmpty>No pokemon found.</CommandEmpty>
                          <CommandGroup>
                            {pokemon.map((pokemon) => (
                              <CommandItem
                                value={pokemon.name}
                                key={pokemon.id}
                                onSelect={() => {
                                  form.setValue("pokemonId", pokemon.id);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    pokemon.id === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {pokemon.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <Loader2Icon className="h-5 w-5 animate-spin" />
                ) : (
                  "Save"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
