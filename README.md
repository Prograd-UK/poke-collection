# Pokémon Collection App

Welcome to the **Pokémon Collection App**! This is a base application designed for a technical challenge where you'll extend the app by implementing new features. The app allows users to browse Pokémon, like them, add them to collections, and leave comments. Authentication is handled via Clerk.

## Requirements

- **Node.js**: v20 or higher
- **pnpm**: Package manager used for managing dependencies and scripts

## Stack

- **Next.js**: React framework for building the frontend and API routes.
- **TypeScript**: Statically typed JavaScript for writing type-safe code.
- **SQLite**: Simple, lightweight database used via Prisma ORM.
- **Prisma**: Next-generation ORM for interacting with the SQLite database.

## Getting Started

To set up the project locally, follow these steps:

1. **Fork the Repository**: Click on the "Fork" button in the top right corner of the repository to create your own copy of the project.

2. **Clone Your Fork**:

   ```bash
   git clone https://github.com/<your-username>/poke-collection.git
   cd poke-collection
   ```

3. **Install Dependencies**:

   ```bash
   pnpm install
   ```

4. **Create your local `.env` file**

   ```bash
   cp .env.example .env
   ```

   Replace placeholder Clerk keys values:

   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_123
   CLERK_SECRET_KEY=sk_test_123
   ```

5. **Run the Application Locally**
   ```
   pnpm dev
   ```

The application will start on `http://localhost:3000`

## Features

The base application includes the following features:

- **Authentication via Clerk**: Users can sign up, log in, and manage their sessions.
- **Browse Pokémon**: View a list of Pokémon fetched from an external API and stored in a SQLite database.
- **Like Pokémon**: Users can like Pokémon and see the like count.
- **Create Collections**: Users can create personal collections to organize their favorite Pokémon.
- **Add Pokémon to Collections**: Users can add specific Pokémon to their created collections.
- **Comment on Pokémon**: Users can leave comments on individual Pokémon.

## Useful Documentation

Here are some useful links to documentation that may assist you during development:

- [Next.js Documentation](https://nextjs.org/docs): Official documentation for Next.js, covering setup, API routes, and more.
- [TypeScript Documentation](https://www.typescriptlang.org/docs/): Comprehensive guide to TypeScript.
- [Prisma Documentation](https://www.prisma.io/docs): Official Prisma docs, including guides on schema modeling, migrations, and querying data.
- [SQLite Documentation](https://www.sqlite.org/docs.html): Official SQLite documentation.
- [Clerk Documentation](https://clerk.dev/docs): Documentation for setting up and using Clerk for authentication.

## Tasks

- [Checklists Backend](./tasks/be-checklist.md)

## Contributing

If you wish to contribute to this project, please make sure to create a new branch from `main` for your changes and submit a pull request once your changes are ready for review.

Happy coding! 🎉
