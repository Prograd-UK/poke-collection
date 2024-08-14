import { auth } from "@clerk/nextjs/server";
import { SeedDataButton } from "./_components/seed-data-button";
import { redirect } from "next/navigation";

const SeedPage = () => {
  const { sessionClaims } = auth();

  // If the user does not have the admin role, redirect them to the home page
  if (sessionClaims?.metadata?.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="flex h-screen flex-col gap-6 items-center justify-center">
      <h1>Seed Page</h1>
      <SeedDataButton />
    </div>
  );
};

export default SeedPage;
