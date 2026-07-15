import type { SourceCollector } from "../collector.js";

export const telegramCollector: SourceCollector = {
  source: "telegram",
  async *collect() {
    // Bot access and processed chat scope require explicit community and privacy approval.
  },
};
