export interface SourceEvent {
  source: "youtube" | "twitch" | "telegram";
  externalId: string;
  occurredAt: string;
  kind: string;
  payload: Readonly<Record<string, unknown>>;
}

export interface SourceCollector {
  readonly source: SourceEvent["source"];
  collect(signal: AbortSignal): AsyncIterable<SourceEvent>;
}
