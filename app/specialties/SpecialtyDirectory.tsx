"use client";

import { Search, Stethoscope } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { medicalSpecialties, specialtyCategories, type Specialty } from "./specialties";
import { specialtyIcons } from "./specialty-icons";

export default function SpecialtyDirectory() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"All" | Specialty["category"]>("All");
  const [showAll, setShowAll] = useState(false);
  const [flipped, setFlipped] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return medicalSpecialties.filter((specialty) =>
      (category === "All" || specialty.category === category) &&
      (!normalized || `${specialty.name} ${specialty.category} ${specialty.description}`.toLowerCase().includes(normalized)),
    );
  }, [category, query]);

  const visible = query || category !== "All" || showAll ? filtered : filtered.slice(0, 12);
  const preventSubmit = (event: FormEvent<HTMLFormElement>) => event.preventDefault();

  return (
    <>
      <div className="specialty-tools">
        <form className="specialty-search" role="search" onSubmit={preventSubmit}>
          <Search aria-hidden="true" size={19} />
          <label className="sr-only" htmlFor="specialty-search">Search medical specialties</label>
          <input id="specialty-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search a medical specialty" autoComplete="off" />
          <span aria-live="polite">{filtered.length} specialties</span>
        </form>
        <div className="specialty-filters" aria-label="Filter specialties by category">
          {(["All", ...specialtyCategories] as const).map((option) => (
            <button key={option} type="button" className={category === option ? "is-active" : ""} aria-pressed={category === option} onClick={() => { setCategory(option); setShowAll(true); setFlipped(null); }}>
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="specialty-interactive-grid">
        {visible.map((specialty) => {
          const Icon = specialtyIcons[specialty.name] ?? Stethoscope;
          const isFlipped = flipped === specialty.name;
          return (
            <article className="specialty-interactive-card" key={specialty.name}>
              <button type="button" className={isFlipped ? "is-flipped" : ""} aria-pressed={isFlipped} aria-label={`${specialty.name}. ${isFlipped ? "Hide details" : "Show billing details"}`} onClick={() => setFlipped(isFlipped ? null : specialty.name)}>
                <span className="specialty-interactive-inner">
                  <span className="specialty-interactive-face specialty-interactive-front"><span className="specialty-interactive-icon"><Icon aria-hidden="true" /></span><small>{specialty.category}</small><strong>{specialty.name}</strong></span>
                  <span className="specialty-interactive-face specialty-interactive-back"><small>Specialty billing support</small><strong>{specialty.name}</strong><span>{specialty.description}</span></span>
                </span>
              </button>
            </article>
          );
        })}
      </div>

      {filtered.length === 0 ? <div className="specialty-empty" role="status"><Stethoscope aria-hidden="true" /><h3>No specialty matched your search.</h3><p>Try a broader term or clear the current category filter.</p><button type="button" onClick={() => { setQuery(""); setCategory("All"); }}>Clear filters</button></div> : null}
      {!query && category === "All" && !showAll ? <button className="specialty-show-all" type="button" onClick={() => setShowAll(true)}>View all 43 specialties</button> : null}
    </>
  );
}
