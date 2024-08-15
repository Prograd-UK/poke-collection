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

const addToCollectionInputSchema = z.object({
  collectionId: z.string().min(1),
});

type AddToCollectionInput = z.infer<typeof addToCollectionInputSchema>;

interface Props {
  pokemonId: string;
  collections: Array<{ id: string; name: string }>;
}

export const AddToCollectionModal = ({ pokemonId, collections }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<AddToCollectionInput>({
    resolver: zodResolver(addToCollectionInputSchema),
    defaultValues: { collectionId: "" },
  });

  function handleSubmit(values: AddToCollectionInput) {
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
        <Button className="flex items-center gap-2">
          <PlusCircleIcon />
          Add To Collection
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
              name="collectionId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Collection</FormLabel>
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
                            ? collections.find(
                                (collection) => collection.id === field.value
                              )?.name
                            : "Select Collection"}
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
                        <CommandInput placeholder="Search collection..." />
                        <CommandList>
                          <CommandEmpty>No collection found.</CommandEmpty>
                          <CommandGroup>
                            {collections.map((collection) => (
                              <CommandItem
                                value={collection.name}
                                key={collection.id}
                                onSelect={() => {
                                  form.setValue("collectionId", collection.id);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    collection.id === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {collection.name}
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
