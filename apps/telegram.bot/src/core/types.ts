export interface TelegramUser {
  id: number;
  is_bot: boolean;
  first_name: string;
  username?: string;
}

export interface TelegramChat {
  id: number;
  type: "private" | "group" | "supergroup" | "channel";
  title?: string;
  username?: string;
  is_direct_messages?: true;
}

export interface TelegramMessage {
  message_id?: number;
  ephemeral_message_id?: string;
  message_thread_id?: number;
  date: number;
  chat: TelegramChat;
  from?: TelegramUser;
  text?: string;
  rich_message?: unknown;
  receiver_user?: TelegramUser;
  guest_query_id?: string;
  community_chat_added?: unknown;
  community_chat_removed?: unknown;
}

export interface TelegramUpdate {
  update_id: number;
  message?: TelegramMessage;
  edited_message?: TelegramMessage;
  channel_post?: TelegramMessage;
  edited_channel_post?: TelegramMessage;
  guest_message?: TelegramMessage;
  callback_query?: unknown;
  my_chat_member?: unknown;
  chat_member?: unknown;
  chat_join_request?: unknown;
  message_reaction?: unknown;
  message_reaction_count?: unknown;
  managed_bot?: unknown;
  subscription?: unknown;
}

export interface TelegramResponse<T> {
  ok: boolean;
  result?: T;
  description?: string;
  error_code?: number;
  parameters?: { retry_after?: number; migrate_to_chat_id?: number };
}

export function messageFromUpdate(
  update: TelegramUpdate,
): TelegramMessage | undefined {
  return (
    update.message ??
    update.edited_message ??
    update.channel_post ??
    update.edited_channel_post ??
    update.guest_message
  );
}
