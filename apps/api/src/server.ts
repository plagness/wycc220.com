import { buildApp } from "./app.js";

const port = Number.parseInt(process.env.API_PORT ?? "3001", 10);
const app = await buildApp();

try {
  await app.listen({ host: "0.0.0.0", port });
} catch (error) {
  app.log.error(error);
  process.exitCode = 1;
}
