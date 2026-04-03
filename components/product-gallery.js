"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProductGallery({ images, productName }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const [canZoom, setCanZoom] = useState(false);

  const activeImage = images[activeIndex];
  const totalImages = images.length;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    const syncZoomCapability = () => {
      setCanZoom(mediaQuery.matches);

      if (!mediaQuery.matches) {
        setIsZoomed(false);
        setOrigin("50% 50%");
      }
    };

    syncZoomCapability();
    mediaQuery.addEventListener("change", syncZoomCapability);

    return () => mediaQuery.removeEventListener("change", syncZoomCapability);
  }, []);

  const handlePointerMove = (event) => {
    if (!canZoom || event.pointerType !== "mouse") {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;

    setOrigin(`${x}% ${y}%`);
  };

  const handleImageChange = (nextIndex) => {
    setActiveIndex(nextIndex);
    setIsZoomed(false);
    setOrigin("50% 50%");
  };

  const handlePrevious = () => {
    handleImageChange((activeIndex - 1 + totalImages) % totalImages);
  };

  const handleNext = () => {
    handleImageChange((activeIndex + 1) % totalImages);
  };

  const resetZoom = () => {
    setIsZoomed(false);
    setOrigin("50% 50%");
  };

  return (
    <div className="product-gallery">
      <div className="product-gallery-stage">
        <div className="product-gallery-head">
          <div className="product-gallery-status">
            <p className="product-gallery-count" aria-live="polite">
              {String(activeIndex + 1).padStart(2, "0")} / {String(totalImages).padStart(2, "0")}
            </p>

            <div className="product-gallery-arrows" aria-label="Product image controls">
              <button
                type="button"
                className="product-gallery-arrow"
                onClick={handlePrevious}
                aria-label="Show previous product image"
              >
                <span aria-hidden="true">‹</span>
              </button>
              <button
                type="button"
                className="product-gallery-arrow"
                onClick={handleNext}
                aria-label="Show next product image"
              >
                <span aria-hidden="true">›</span>
              </button>
            </div>
          </div>
        </div>

        <button
          type="button"
          className={`product-gallery-main${canZoom && isZoomed ? " is-zoomed" : ""}${!canZoom ? " is-static" : ""}`}
          onClick={() => {
            if (canZoom) {
              setIsZoomed((zoomed) => !zoomed);
            }
          }}
          onPointerMove={handlePointerMove}
          onPointerLeave={resetZoom}
          aria-label={
            canZoom
              ? `${productName} image viewer. Click to ${isZoomed ? "reset zoom" : "zoom in"}.`
              : `${productName} image viewer.`
          }
        >
          <Image
            src={activeImage.src}
            alt={activeImage.alt}
            preload={activeIndex === 0}
            loading={activeIndex === 0 ? "eager" : "lazy"}
            fetchPriority={activeIndex === 0 ? "high" : "auto"}
            placeholder="blur"
            quality={82}
            sizes="(max-width: 640px) 92vw, (max-width: 960px) 96vw, 58vw"
            className="product-gallery-image"
            style={{ transformOrigin: origin }}
          />
        </button>
      </div>

      <div className="product-gallery-filmstrip" aria-label="Product image thumbnails">
        {images.map((image, index) => (
          <button
            key={image.label}
            type="button"
            className={`product-thumb${index === activeIndex ? " is-active" : ""}`}
            onClick={() => handleImageChange(index)}
            aria-pressed={index === activeIndex}
            aria-label={`Show ${image.label}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              quality={70}
              sizes="72px"
              className="product-thumb-image"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
