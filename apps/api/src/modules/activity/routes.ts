import type { FastifyPluginAsync } from "fastify";

export const activityRoutes: FastifyPluginAsync = async (app) => {
  app.get("/leaderboard", async () => ({
    data: [],
    scoringVersion: "unpublished",
    nextCursor: null,
  }));
};
