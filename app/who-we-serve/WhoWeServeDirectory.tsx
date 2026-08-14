"use client";

/* eslint-disable @next/next/no-img-element */
import {
  ArrowRight,
  Brain,
  Building2,
  HeartPulse,
  Home,
  Hospital,
  PackageOpen,
  Stethoscope,
} from "lucide-react";
import { Fragment, useState } from "react";
import { audiences } from "./audiences";

const icons = [Stethoscope, Building2, HeartPulse, Brain, Hospital, Home, PackageOpen];

export default function WhoWeServeDirectory() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = audiences[activeIndex];

  const feature = (className: string) => (
    <article className={`audience-explorer-feature ${className}`} aria-live="polite">
      <img key={active.image + activeIndex} src={active.image} alt={active.alt} />
      <div className="audience-explorer-shade" aria-hidden="true" />
      <div className="audience-explorer-feature-copy" key={active.title}>
        <span>Built for your environment</span>
        <h3>{active.title}</h3>
        <p>{active.description}</p>
        <a href="mailto:info@clinoramedbill.com">Discuss your billing needs <ArrowRight aria-hidden="true" size={17} /></a>
      </div>
      <div className="audience-explorer-count" aria-hidden="true">{String(activeIndex + 1).padStart(2, "0")} / 07</div>
    </article>
  );

  return (
    <div className="audience-explorer">
      <div className="audience-explorer-list" aria-label="Healthcare organizations we serve">
        {audiences.map((audience, index) => {
          const Icon = icons[index];
          const isActive = activeIndex === index;
          return (
            <Fragment key={audience.title}>
            <button
              className={`audience-explorer-item${isActive ? " is-active" : ""}`}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              onMouseEnter={() => setActiveIndex(index)}
            >
              <span className="audience-explorer-icon"><Icon aria-hidden="true" /></span>
              <span className="audience-explorer-label">
                <small>{String(index + 1).padStart(2, "0")}</small>
                <strong>{audience.title}</strong>
              </span>
              <ArrowRight aria-hidden="true" />
            </button>
            {isActive ? feature("audience-explorer-feature-mobile") : null}
            </Fragment>
          );
        })}
      </div>

      {feature("audience-explorer-feature-desktop")}
    </div>
  );
}
