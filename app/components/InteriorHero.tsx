import type { CSSProperties, ReactNode } from "react";
import { ArrowRight, type LucideIcon } from "lucide-react";
import Image from "next/image";

type InteriorHeroProps = {
  id?: string;
  titleId?: string;
  eyebrow: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  description?: ReactNode;
  imageSrc: string;
  mobileImageSrc?: string;
  imageAlt: string;
  imagePosition?: string;
  ctaHref?: string;
  ctaLabel?: string;
  badgeIcon?: LucideIcon;
  badgeEyebrow?: string;
  badgeText?: string;
  priority?: boolean;
  className?: string;
};

export default function InteriorHero({
  id,
  titleId,
  eyebrow,
  title,
  lead,
  description,
  imageSrc,
  mobileImageSrc,
  imageAlt,
  imagePosition = "center",
  ctaHref = "mailto:info@clinoramedbill.com",
  ctaLabel = "Request a free audit",
  priority = true,
  className = "",
}: InteriorHeroProps) {
  const style = { "--interior-hero-image-position": imagePosition } as CSSProperties;

  return (
    <section
      id={id}
      className={`interior-hero ${className}`.trim()}
      aria-labelledby={titleId}
      style={style}
    >
      <div className="interior-hero-frame">
        <picture className="interior-hero-picture">
          {mobileImageSrc ? <source media="(max-width: 760px)" srcSet={mobileImageSrc} /> : null}
          <Image
            className="interior-hero-image"
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 760px) calc(100vw - 24px), (max-width: 1440px) calc(100vw - 48px), 1360px"
            priority={priority}
            quality={92}
            unoptimized
          />
        </picture>
        <div className="interior-hero-shade" aria-hidden="true" />

        <div className="interior-hero-copy">
          <span className="eyebrow eyebrow-light interior-hero-eyebrow">{eyebrow}</span>
          <h1 id={titleId}>{title}</h1>
          {lead ? <strong>{lead}</strong> : null}
          {description ? <p>{description}</p> : null}
          {ctaHref && ctaLabel ? (
            <a className="button button-large" href={ctaHref}>
              {ctaLabel} <ArrowRight aria-hidden="true" size={18} />
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
