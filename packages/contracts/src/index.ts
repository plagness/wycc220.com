export const platformNames = ["youtube", "twitch", "telegram"] as const;
export type PlatformName = (typeof platformNames)[number];

export interface PublicMediaItem {
  id: string;
  platform: PlatformName;
  externalId: string;
  title: string;
  originalUrl: string;
  publishedAt: string;
}

export interface FanProjectManifest {
  schemaVersion: 1;
  slug: string;
  title: string;
  summary: string;
  authors: ReadonlyArray<{ name: string; profileUrl?: string }>;
  launchUrl: string;
  sourceUrl: string;
  license: string;
  permissions: ReadonlyArray<"fullscreen" | "gamepad">;
}
