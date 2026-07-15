import assert from "node:assert/strict";
import test from "node:test";
import { buildApp } from "./app.js";

test("health endpoint does not expose internals", async () => {
  const app = await buildApp();
  const response = await app.inject({ method: "GET", url: "/health" });

  assert.equal(response.statusCode, 200);
  assert.deepEqual(response.json(), { status: "ok" });
  await app.close();
});

test("public resources are grouped below v1", async () => {
  const app = await buildApp();
  const response = await app.inject({ method: "GET", url: "/v1" });

  assert.equal(response.statusCode, 200);
  assert.deepEqual(response.json().resources, ["media", "games", "activity"]);
  await app.close();
});
