import "./globals.css";

export const metadata = {
  title: "Note-Taking App",
  description: "Small note taking app",
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
