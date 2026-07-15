import type { FastifyPluginAsync } from "fastify";

export const mediaRoutes: FastifyPluginAsync = async (app) => {
  app.get("/", async () => ({ data: [], nextCursor: null }));
};
