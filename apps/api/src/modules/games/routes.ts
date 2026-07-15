import type { FastifyPluginAsync } from "fastify";

export const gameRoutes: FastifyPluginAsync = async (app) => {
  app.get("/", async () => ({ data: [], nextCursor: null }));
};
