import type { SVGProps } from "react";

export type NavigationIconName = "home" | "art" | "games" | "development";

export function NavigationIcon({
  name,
  ...props
}: SVGProps<SVGSVGElement> & { name: NavigationIconName }) {
  const paths: Record<NavigationIconName, React.ReactNode> = {
    home: <path d="M4 11.5 12 5l8 6.5V20h-5v-5H9v5H4v-8.5Z" />,
    art: (
      <>
        <path d="M4 5h16v14H4z" />
        <path d="m6.5 16 4-4 2.5 2 2.5-3 2 2.5" />
        <circle cx="15.5" cy="8.5" r="1.5" />
      </>
    ),
    games: (
      <>
        <path d="M7.5 8h9a4.5 4.5 0 0 1 4.2 6.2l-1.1 2.7a2.3 2.3 0 0 1-3.8.7L14 16h-4l-1.8 1.6a2.3 2.3 0 0 1-3.8-.7l-1.1-2.7A4.5 4.5 0 0 1 7.5 8Z" />
        <path d="M7 12v4M5 14h4M16 13h.01M18 15h.01" />
      </>
    ),
    development: (
      <>
        <path d="m9 6-6 6 6 6M15 6l6 6-6 6M13.5 4 10.5 20" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinecap="square"
      strokeLinejoin="miter"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
