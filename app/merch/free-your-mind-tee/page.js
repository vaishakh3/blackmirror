import SiteHeader from "../../../components/site-header";
import ProductGallery from "../../../components/product-gallery";
import { freeYourMindTee } from "../../../lib/products";

export const metadata = {
  title: "Free Your Mind Tee",
  description:
    "Free Your Mind Tee by Black Mirror Studio. Premium oversized heavyweight cotton tee from Drop 1.",
  alternates: {
    canonical: "/merch/free-your-mind-tee",
  },
  openGraph: {
    title: "Free Your Mind Tee | Black Mirror Studio",
    description:
      "Premium oversized heavyweight cotton tee from Drop 1 by Black Mirror Studio.",
    images: [
      {
        url: freeYourMindTee.images[0].src.src,
        width: 1024,
        height: 1536,
        alt: freeYourMindTee.images[0].alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Your Mind Tee | Black Mirror Studio",
    description:
      "Premium oversized heavyweight cotton tee from Drop 1 by Black Mirror Studio.",
    images: [freeYourMindTee.images[0].src.src],
  },
};

export default function FreeYourMindTeePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: freeYourMindTee.name,
    image: freeYourMindTee.images.map((image) => `https://blackmirror.studio${image.src.src}`),
    description: freeYourMindTee.description,
    brand: {
      "@type": "Brand",
      name: freeYourMindTee.brand,
    },
    category: freeYourMindTee.category,
    color: "Black",
    material: "Heavyweight cotton",
  };

  return (
    <main className="page-shell merch-page-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SiteHeader />

      <section className="product-hero">
        <div className="product-copy">
          <div className="product-meta-row">
            <span className="product-badge">New</span>
            <span className="product-collection">{freeYourMindTee.collection}</span>
          </div>

          <p className="section-label">T-Shirts</p>
          <h1 className="product-title">{freeYourMindTee.name}</h1>
          <p className="product-subtitle">
            {freeYourMindTee.brand} / Oversized heavyweight cotton / Screen printed
          </p>
          <p className="product-description">{freeYourMindTee.description}</p>
          <p className="product-story">{freeYourMindTee.story}</p>

          <div className="product-compact-specs" aria-label="Product specifications">
            {freeYourMindTee.attributes.map((attribute) => (
              <div className="product-compact-spec" key={attribute.label}>
                <span>{attribute.label}</span>
                <span>{attribute.value}</span>
              </div>
            ))}
          </div>

          <div className="product-actions">
            <a className="button button-primary" href="mailto:hello@blackmirror.studio?subject=Free%20Your%20Mind%20Tee%20Inquiry">
              Request this piece
            </a>
            <a className="button button-secondary" href="/#merch">
              Back to merch
            </a>
          </div>
        </div>

        <ProductGallery images={freeYourMindTee.images} productName={freeYourMindTee.name} />
      </section>
    </main>
  );
}
