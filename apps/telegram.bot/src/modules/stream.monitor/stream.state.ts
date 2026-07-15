export interface StreamStateStore {
  getLastAnnouncedStreamId(): Promise<string | undefined>;
  setLastAnnouncedStreamId(streamId: string): Promise<void>;
}

export class MemoryStreamStateStore implements StreamStateStore {
  private streamId?: string;

  async getLastAnnouncedStreamId(): Promise<string | undefined> {
    return this.streamId;
  }

  async setLastAnnouncedStreamId(streamId: string): Promise<void> {
    this.streamId = streamId;
  }
}
