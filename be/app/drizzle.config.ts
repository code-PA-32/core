import type { Config } from "drizzle-kit";

// eslint-disable-next-line import/no-default-export
export default {
  schema: "@core/database-schema/src/index.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: "postgresql://root:root@localhost:5432/core",
  },
} satisfies Config;
