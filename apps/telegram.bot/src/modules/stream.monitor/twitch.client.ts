export interface LiveStream {
  id: string;
  title: string;
  gameName?: string;
  startedAt: string;
  viewerCount: number;
}

interface TwitchTokenResponse {
  access_token: string;
  expires_in: number;
}

interface TwitchStreamResponse {
  data: Array<{
    id: string;
    title: string;
    game_name: string;
    started_at: string;
    viewer_count: number;
  }>;
}

export class TwitchClient {
  private token?: { value: string; expiresAt: number };

  constructor(
    private readonly clientId: string,
    private readonly clientSecret: string,
    private readonly fetchImpl: typeof fetch = fetch,
  ) {}

  async getLiveStream(login: string): Promise<LiveStream | undefined> {
    const token = await this.getAccessToken();
    const response = await this.fetchImpl(
      `https://api.twitch.tv/helix/streams?user_login=${encodeURIComponent(login)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Client-Id": this.clientId,
        },
        signal: AbortSignal.timeout(15_000),
      },
    );
    if (!response.ok)
      throw new Error(
        `Twitch streams request failed with HTTP ${response.status}`,
      );
    const body = (await response.json()) as TwitchStreamResponse;
    const stream = body.data[0];
    if (!stream) return undefined;
    return {
      id: stream.id,
      title: stream.title,
      ...(stream.game_name ? { gameName: stream.game_name } : {}),
      startedAt: stream.started_at,
      viewerCount: stream.viewer_count,
    };
  }

  private async getAccessToken(): Promise<string> {
    if (this.token && this.token.expiresAt > Date.now() + 60_000)
      return this.token.value;
    const query = new URLSearchParams({
      client_id: this.clientId,
      client_secret: this.clientSecret,
      grant_type: "client_credentials",
    });
    const response = await this.fetchImpl("https://id.twitch.tv/oauth2/token", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: query,
      signal: AbortSignal.timeout(15_000),
    });
    if (!response.ok)
      throw new Error(
        `Twitch token request failed with HTTP ${response.status}`,
      );
    const body = (await response.json()) as TwitchTokenResponse;
    this.token = {
      value: body.access_token,
      expiresAt: Date.now() + body.expires_in * 1000,
    };
    return this.token.value;
  }
}
