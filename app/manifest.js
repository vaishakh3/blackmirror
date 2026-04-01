export default function manifest() {
  return {
    name: "Black Mirror Studio",
    short_name: "Black Mirror",
    description:
      "Creative design and development agency building identity systems, websites, and limited merch.",
    start_url: "/",
    display: "standalone",
    background_color: "#050505",
    theme_color: "#050505",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
