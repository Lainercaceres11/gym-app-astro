interface ImportMetaEnv {
  readonly DATABASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

type User = import("better-auth").User & {
  role: "USER" | "ADMIN";
  plan: "FREE" | "BASIC" | "PRO";
};

declare namespace App {
  // Note: 'import {} from ""' syntax does not work in .d.ts files.
  interface Locals {
    user: User | null;
    session: import("better-auth").Session | null;
  }
}
