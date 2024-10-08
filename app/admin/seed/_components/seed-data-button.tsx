"use client";

import { Loader2Icon } from "lucide-react";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";

import { seedPokemonData } from "../_actions/seed";

export const SeedDataButton = () => {
  const [isSeedPending, startSeedTransition] = useTransition();

  function handleClick() {
    startSeedTransition(() => {
      seedPokemonData()
        .then(() => {
          console.log("Data seeded successfully");
        })
        .catch((error) => {
          console.error("Error seeding data", error);
        });
    });
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <Button onClick={handleClick} disabled={isSeedPending}>
        {isSeedPending ? (
          <Loader2Icon className="h-5 w-5 animate-spin" />
        ) : (
          "Seed Data"
        )}
      </Button>
    </div>
  );
};
