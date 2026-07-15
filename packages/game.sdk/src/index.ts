export interface HostMessage<T = unknown> {
  channel: "wycc220.game.v1";
  type: string;
  payload: T;
}

export function notifyHost<T>(
  hostOrigin: string,
  type: string,
  payload: T,
): void {
  const message: HostMessage<T> = { channel: "wycc220.game.v1", type, payload };
  window.parent.postMessage(message, hostOrigin);
}

export function isTelegramMiniApp(): boolean {
  return typeof window !== "undefined" && "Telegram" in window;
}
