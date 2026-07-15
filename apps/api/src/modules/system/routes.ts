import type { FastifyPluginAsync } from "fastify";

export const systemRoutes: FastifyPluginAsync = async (app) => {
  app.get("/health", async () => ({ status: "ok" }));
  app.get("/v1", async () => ({
    name: "wycc220 public API",
    version: "v1",
    status: "foundation",
    resources: ["media", "games", "activity"],
  }));
};
