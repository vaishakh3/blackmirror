import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://blackmirror.studio"),
  applicationName: "Black Mirror Studio",
  title: {
    default: "Black Mirror Studio | Creative Design and Development Agency",
    template: "%s | Black Mirror Studio",
  },
  description:
    "Black Mirror Studio is a creative design and development agency building identity systems, websites, and limited merch.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://blackmirror.studio",
    siteName: "Black Mirror Studio",
    title: "Black Mirror Studio | Creative Design and Development Agency",
    description:
      "Creative design and development agency for identity systems, digital experiences, and limited merch.",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Black Mirror Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Black Mirror Studio | Creative Design and Development Agency",
    description:
      "Creative design and development agency for identity systems, digital experiences, and limited merch.",
    images: ["/twitter-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "creative agency",
  creator: "Black Mirror Studio",
  publisher: "Black Mirror Studio",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: ["/icon.svg"],
  },
};

export const viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
