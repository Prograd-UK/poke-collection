import "@testing-library/jest-dom/vitest";

import { afterEach } from "node:test";

import * as clerk from "@clerk/nextjs/server";
import { faker } from "@faker-js/faker";
import { beforeEach, vi } from "vitest";

beforeEach(() => {
  // @ts-ignore
  vi.spyOn(clerk, "auth").mockReturnValueOnce({ userId: faker.string.uuid() });
});

afterEach(() => {
  vi.resetAllMocks();
});
