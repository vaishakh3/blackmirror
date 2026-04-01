import "./globals.css";

export const metadata = {
  title: "Black Mirror Studio",
  description:
    "Creative design and development studio building brands, digital experiences, and merch.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
