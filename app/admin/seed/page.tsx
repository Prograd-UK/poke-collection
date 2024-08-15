import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { SeedDataButton } from "./_components/seed-data-button";

const SeedPage = () => {
  const { sessionClaims } = auth();

  // If the user does not have the admin role, redirect them to the home page
  if (sessionClaims?.metadata?.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-6">
      <h1>Seed Page</h1>
      <SeedDataButton />
    </div>
  );
};

export default SeedPage;
