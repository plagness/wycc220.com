import type { Metadata } from "next";
import "./styles.css";

export const metadata: Metadata = {
  title: "wycc220.com — фанатский хаб",
  description:
    "Некоммерческая платформа фанатского творчества сообщества wycc220 / elwycco",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
