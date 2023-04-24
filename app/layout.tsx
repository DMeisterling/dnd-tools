import "./globals.css";

export const metadata = {
  title: "DnD-Tools",
  description: "Tools for the game 'Dungeons and Dragons'",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
