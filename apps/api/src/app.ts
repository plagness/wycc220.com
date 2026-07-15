import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";
import Fastify from "fastify";

export async function buildApp() {
  const app = Fastify({
    logger: {
      redact: [
        "req.headers.authorization",
        "req.headers.cookie",
        "res.headers.set-cookie",
      ],
    },
    trustProxy: true,
    bodyLimit: 64 * 1024,
  });

  await app.register(helmet);
  await app.register(cors, { origin: false });
  await app.register(rateLimit, { max: 120, timeWindow: "1 minute" });

  app.get("/health", async () => ({ status: "ok" }));
  app.get("/v1", async () => ({
    name: "wycc220 public API",
    version: "v1",
    status: "foundation",
  }));

  return app;
}
