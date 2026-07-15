import type { TelegramResponse, TelegramUpdate } from "../core/types.js";

export interface SendMessageParams {
  chat_id: string | number;
  text: string;
  parse_mode?: "HTML" | "MarkdownV2";
  disable_notification?: boolean;
  link_preview_options?: {
    is_disabled?: boolean;
    url?: string;
    prefer_large_media?: boolean;
  };
  reply_parameters?: { message_id?: number; ephemeral_message_id?: string };
  receiver_user_id?: number;
  callback_query_id?: string;
}

export class TelegramApiError extends Error {
  constructor(
    readonly method: string,
    readonly code: number | undefined,
    readonly retryAfter: number | undefined,
    description: string,
  ) {
    super(`Telegram ${method} failed: ${description}`);
    this.name = "TelegramApiError";
  }
}

export class TelegramClient {
  private readonly endpoint: string;

  constructor(
    token: string,
    private readonly fetchImpl: typeof fetch = fetch,
  ) {
    this.endpoint = `https://api.telegram.org/bot${token}`;
  }

  async call<T>(
    method: string,
    params: Readonly<Record<string, unknown>> = {},
    signal?: AbortSignal,
    timeoutMs = 15_000,
  ): Promise<T> {
    const requestSignal = signal
      ? AbortSignal.any([signal, AbortSignal.timeout(timeoutMs)])
      : AbortSignal.timeout(timeoutMs);
    const response = await this.fetchImpl(`${this.endpoint}/${method}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(params),
      signal: requestSignal,
    });
    const body = (await response.json()) as TelegramResponse<T>;
    if (!response.ok || !body.ok || body.result === undefined) {
      throw new TelegramApiError(
        method,
        body.error_code,
        body.parameters?.retry_after,
        body.description ?? `HTTP ${response.status}`,
      );
    }
    return body.result;
  }

  sendMessage(params: SendMessageParams): Promise<unknown> {
    return this.call(
      "sendMessage",
      params as unknown as Record<string, unknown>,
    );
  }

  getUpdates(
    offset: number,
    allowedUpdates: readonly string[],
    signal?: AbortSignal,
  ) {
    return this.call<TelegramUpdate[]>(
      "getUpdates",
      { offset, timeout: 30, allowed_updates: allowedUpdates },
      signal,
      40_000,
    );
  }
}
