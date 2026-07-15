import type { StreamStateStore } from "./stream.state.js";
import type { LiveStream } from "./twitch.client.js";

export interface StreamLookup {
  getLiveStream(login: string): Promise<LiveStream | undefined>;
}

export interface StreamAnnouncementPublisher {
  publishStreamStarted(stream: LiveStream): Promise<void>;
}

export class StreamMonitor {
  private timer?: ReturnType<typeof setInterval>;
  private running = false;

  constructor(
    private readonly twitch: StreamLookup,
    private readonly publisher: StreamAnnouncementPublisher,
    private readonly state: StreamStateStore,
    private readonly channelLogin: string,
    private readonly intervalMs: number,
  ) {}

  start(): void {
    void this.tick();
    this.timer = setInterval(() => void this.tick(), this.intervalMs);
  }

  stop(): void {
    if (this.timer) clearInterval(this.timer);
  }

  async tick(): Promise<void> {
    if (this.running) return;
    this.running = true;
    try {
      const stream = await this.twitch.getLiveStream(this.channelLogin);
      if (
        !stream ||
        stream.id === (await this.state.getLastAnnouncedStreamId())
      )
        return;
      await this.publisher.publishStreamStarted(stream);
      await this.state.setLastAnnouncedStreamId(stream.id);
      console.info("Twitch live transition announced", {
        source: this.channelLogin,
      });
    } catch (error) {
      console.error(
        "Stream monitor tick failed",
        error instanceof Error ? error.message : "unknown error",
      );
    } finally {
      this.running = false;
    }
  }
}
