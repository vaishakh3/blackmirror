"use client";

import { useEffect, useState } from "react";

const navItems = [
  { href: "#studio", label: "Studio" },
  { href: "#services", label: "Services" },
  { href: "#merch", label: "Merch" },
  { href: "#contact", label: "Contact" },
];

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="site-header">
      <div className="nav-shell desktop-nav-shell">
        <a className="nav-signature" href="#top" aria-label="Black Mirror Studio home">
          blackmirror.studio
        </a>

        <nav className="site-nav" aria-label="Primary">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a
          className="nav-cta"
          href="mailto:hello@blackmirror.studio?subject=Project%20Inquiry"
        >
          hello
        </a>
      </div>

      <div className="mobile-header-shell">
        <div className="mobile-topbar">
          <a className="nav-signature mobile-brand" href="#top" aria-label="Black Mirror Studio home">
            blackmirror.studio
          </a>

          <button
            className="mobile-menu-button"
            type="button"
            aria-expanded={isOpen}
            aria-controls="mobile-menu-panel"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setIsOpen((open) => !open)}
          >
            <span className="mobile-menu-icon" aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>

        <div
          className={`mobile-menu-panel${isOpen ? " is-open" : ""}`}
          id="mobile-menu-panel"
        >
          <nav className="mobile-menu-links" aria-label="Mobile Primary">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="mobile-menu-link" onClick={closeMenu}>
                {item.label}
              </a>
            ))}
          </nav>

          <a
            className="mobile-menu-cta"
            href="mailto:hello@blackmirror.studio?subject=Project%20Inquiry"
            onClick={closeMenu}
          >
            hello@blackmirror.studio
          </a>
        </div>
      </div>
    </header>
  );
}
