import Image from "next/image";
import SiteHeader from "../components/site-header";
import { freeYourMindTee } from "../lib/products";

const services = [
  {
    index: "01",
    title: "Identity",
    description: "Naming, direction, and visual systems with a tighter point of view.",
  },
  {
    index: "02",
    title: "Digital",
    description: "Websites designed and built with restraint, speed, and custom detail.",
  },
  {
    index: "03",
    title: "Merch",
    description: "Limited apparel and objects that extend the brand without feeling promotional.",
  },
];

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://blackmirror.studio/#organization",
        name: "Black Mirror Studio",
        url: "https://blackmirror.studio",
        logo: "https://blackmirror.studio/icon.svg",
        email: "hello@blackmirror.studio",
        description:
          "Black Mirror Studio is a creative design and development agency building identity systems, websites, and limited merch.",
      },
      {
        "@type": "WebSite",
        "@id": "https://blackmirror.studio/#website",
        url: "https://blackmirror.studio",
        name: "Black Mirror Studio",
        publisher: {
          "@id": "https://blackmirror.studio/#organization",
        },
        inLanguage: "en",
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://blackmirror.studio/#service",
        name: "Black Mirror Studio",
        url: "https://blackmirror.studio",
        description:
          "Creative agency offering brand identity, web design, web development, and merch direction.",
        provider: {
          "@id": "https://blackmirror.studio/#organization",
        },
        serviceType: [
          "Brand identity design",
          "Web design",
          "Web development",
          "Merch design",
        ],
      },
    ],
  };

  return (
    <main className="page-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SiteHeader />

      <section className="hero" id="top">
        <div className="hero-background" aria-hidden="true">
          <div className="hero-aura" />
          <div className="hero-vortex hero-vortex-large" />
          <div className="hero-vortex hero-vortex-small" />
          <div className="hero-grid" />
          <div className="hero-ring hero-ring-large" />
          <div className="hero-ring hero-ring-small" />
          <div className="hero-beam hero-beam-left" />
          <div className="hero-beam hero-beam-right" />
        </div>

        <div className="hero-copy hero-copy-centered">
          <p className="eyebrow">Creative design and development studio</p>
          <h1 className="wordmark" aria-label="Black Mirror">
            <span>BLACK</span>
            <span>MIRROR</span>
          </h1>
          <p className="hero-note">Creative agency for design, development, and merch.</p>

          <div className="hero-actions">
            <a
              className="button button-primary"
              href="mailto:hello@blackmirror.studio?subject=Project%20Inquiry"
            >
              Start a project
            </a>
            <a className="button button-secondary" href="#studio">
              View studio
            </a>
          </div>
        </div>
      </section>

      <section className="statement" id="studio">
        <p className="section-label">Studio</p>
        <div className="statement-grid">
          <h2>Built for brands that need precision, atmosphere, and clean execution.</h2>
          <p>
            Black Mirror Studio is a creative design and development agency
            building identity systems, websites, and limited merch with a
            minimal visual language.
          </p>
        </div>
      </section>

      <section className="services" id="services">
        <div className="section-heading">
          <p className="section-label">Services</p>
          <h2>Three focused areas.</h2>
        </div>

        <div className="service-list">
          {services.map((service) => (
            <article className="service-item" key={service.index}>
              <span className="service-index">{service.index}</span>
              <div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="merch" id="merch">
        <div className="merch-intro">
          <p className="section-label">Merch</p>
          <h2>Drop 1.</h2>
          <p>Free Your Mind Tee, now available.</p>
        </div>

        <div className="featured-product">
          <a className="featured-product-visual" href="/merch/free-your-mind-tee" aria-label="View Free Your Mind Tee">
            <Image
              src={freeYourMindTee.images[0].src}
              alt={freeYourMindTee.images[0].alt}
              priority={false}
              sizes="(max-width: 960px) 100vw, 42vw"
              className="featured-product-image"
            />
          </a>

          <div className="featured-product-copy">
            <div className="product-meta-row">
              <span className="product-badge">New</span>
              <span className="product-collection">{freeYourMindTee.collection}</span>
            </div>

            <h3>{freeYourMindTee.name}</h3>
            <p>Oversized black tee in heavyweight cotton.</p>

            <a className="inline-merch-link" href="/merch/free-your-mind-tee">
              View product
            </a>
          </div>

          <div className="product-list" aria-label="Product highlights">
            {freeYourMindTee.attributes.slice(0, 4).map((attribute) => (
              <div className="product-row" key={attribute.label}>
                <span>{attribute.label}</span>
                <span>{attribute.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta" id="contact">
        <p className="section-label">Contact</p>
        <h2>Available for selected projects.</h2>
        <p className="cta-copy">
          For new work, collaborations, or future drops.
        </p>

        <div className="hero-actions">
          <a
            className="button button-primary"
            href="mailto:hello@blackmirror.studio?subject=Let%27s%20build%20something"
          >
            hello@blackmirror.studio
          </a>
          <a className="button button-secondary" href="#top">
            Back to top
          </a>
        </div>
      </section>
    </main>
  );
}
