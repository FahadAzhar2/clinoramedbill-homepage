"use client";

/* eslint-disable @next/next/no-img-element -- Local JPEGs avoid the current Vinext image shim issue. */
import { FormEvent, useMemo, useState } from "react";
import { ArrowRight, MapPin, Search } from "lucide-react";
import { stateSolutions } from "./states";

export default function StateDirectory() {
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  const filteredStates = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return stateSolutions;
    return stateSolutions.filter((state) =>
      `${state.name} ${state.capital} ${state.region}`.toLowerCase().includes(normalized),
    );
  }, [query]);

  const visibleStates = query || showAll ? filteredStates : filteredStates.slice(0, 16);

  const preventEmptySubmit = (event: FormEvent<HTMLFormElement>) => event.preventDefault();

  return (
    <>
      <form className="state-search" role="search" onSubmit={preventEmptySubmit}>
        <Search aria-hidden="true" size={20} />
        <label className="sr-only" htmlFor="state-search">Search by state, capital, or region</label>
        <input
          id="state-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search a state, capital, or region"
          autoComplete="off"
        />
        <span aria-live="polite">{filteredStates.length} states</span>
      </form>

      <div className="state-directory-grid">
        {visibleStates.map((state, index) => (
          <article className="state-card" id={state.slug} key={state.slug} style={{ "--card-order": index } as React.CSSProperties}>
            <div className="state-card-media">
              <img src={`/media/states/${state.slug}.jpg`} alt={`${state.capital}, ${state.name}`} loading="lazy" />
              <span>{state.region}</span>
              <strong>{String(stateSolutions.indexOf(state) + 1).padStart(2, "0")}</strong>
            </div>
            <div className="state-card-content">
              <p className="state-capital"><MapPin aria-hidden="true" size={14} /> Serving practices across {state.name}</p>
              <h3>{state.name}</h3>
              <p>{state.description}</p>
              <a href="/contact-us#contact-form" aria-label={`Discuss medical billing services in ${state.name}`}>
                Discuss your billing <ArrowRight aria-hidden="true" size={17} />
              </a>
            </div>
          </article>
        ))}
      </div>

      {filteredStates.length === 0 && (
        <div className="state-empty" role="status">
          <MapPin aria-hidden="true" />
          <h3>No state matched that search.</h3>
          <p>Try a state name, capital city, or region such as Midwest.</p>
          <button type="button" onClick={() => setQuery("")}>Clear search</button>
        </div>
      )}

      {!query && !showAll && (
        <button className="state-show-all" type="button" onClick={() => setShowAll(true)}>
          View all 50 states <ArrowRight aria-hidden="true" size={18} />
        </button>
      )}
    </>
  );
}
