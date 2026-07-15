import type { BotContext, BotModule } from "./module.js";

export class UpdateRouter {
  constructor(private readonly modules: readonly BotModule[]) {}

  async route(context: BotContext): Promise<void> {
    for (const module of this.modules) {
      if (module.supports(context)) await module.handle(context);
    }
  }

  moduleNames(): readonly string[] {
    return this.modules.map(({ name }) => name);
  }
}
