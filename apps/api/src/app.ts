import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";
import Fastify from "fastify";
import { activityRoutes } from "./modules/activity/routes.js";
import { gameRoutes } from "./modules/games/routes.js";
import { mediaRoutes } from "./modules/media/routes.js";
import { systemRoutes } from "./modules/system/routes.js";

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

  await app.register(systemRoutes);
  await app.register(mediaRoutes, { prefix: "/v1/media" });
  await app.register(gameRoutes, { prefix: "/v1/games" });
  await app.register(activityRoutes, { prefix: "/v1/activity" });

  return app;
}
