"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Loader2Icon, PlusCircleIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import * as collectionsApi from "@/lib/api/collections";
import { toast } from "@/components/ui/use-toast";

const addPokemonToCollectionInputSchema = z.object({
  collectionId: z.string(),
});

type AddPokemonToCollectionInput = z.infer<
  typeof addPokemonToCollectionInputSchema
>;

interface Props {
  pokemonId: string;
}

export const AddPokemonToCollectionModal = ({ pokemonId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<AddPokemonToCollectionInput>({
    resolver: zodResolver(addPokemonToCollectionInputSchema),
    defaultValues: { collectionId: "" },
  });

  function handleSubmit(values: AddPokemonToCollectionInput) {
    startTransition(() => {
      collectionsApi
        .addPokemon({ ...values, pokemonId })
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
        <button>
          <PlusCircleIcon />
          <span className="sr-only">Add to collection</span>
        </button>
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
              name="collectionId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Collection</FormLabel>
                  <FormControl>
                    <Input placeholder="My fancy collection" {...field} />
                  </FormControl>
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
