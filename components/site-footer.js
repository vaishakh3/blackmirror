"use client";

const konamiHint = [
  { label: "↑", value: "ArrowUp" },
  { label: "↑", value: "ArrowUp" },
  { label: "↓", value: "ArrowDown" },
  { label: "↓", value: "ArrowDown" },
  { label: "←", value: "ArrowLeft" },
  { label: "→", value: "ArrowRight" },
  { label: "←", value: "ArrowLeft" },
  { label: "→", value: "ArrowRight" },
  { label: "B", value: "b" },
  { label: "A", value: "a" },
];

export default function SiteFooter() {
  const sendKonamiInput = (key) => {
    window.dispatchEvent(new CustomEvent("mirror-konami-input", { detail: { key } }));
  };

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <p className="site-footer-label">Mirror mode</p>
        <div className="site-footer-hint" aria-label="Konami code hint">
          {konamiHint.map((token, index) => (
            <button
              key={`${token.value}-${index}`}
              type="button"
              className="site-footer-token"
              onClick={() => sendKonamiInput(token.value)}
              aria-label={`Konami input ${token.label}`}
            >
              {token.label}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}
