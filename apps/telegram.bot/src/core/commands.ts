export function commandFromText(
  text: string | undefined,
  botUsername: string,
): string | undefined {
  if (!text?.startsWith("/")) return undefined;
  const [raw] = text.trim().split(/\s+/, 1);
  if (!raw) return undefined;
  const [command, target] = raw.slice(1).toLowerCase().split("@", 2);
  if (target && target !== botUsername.toLowerCase()) return undefined;
  return command;
}
