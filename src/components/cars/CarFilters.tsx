import { useEffect, useState } from "react";
import { useFiltersStore } from "../../store/filtersStore";

import { PriceSlider } from "./PriceSlider";

export function CarFilters() {
  const {
    search,
    minPrice,
    maxPrice,
    fuelType,
    transmission,
    setFilter,
    reset,
  } = useFiltersStore();

  const [priceRange, setPriceRange] = useState<[number, number]>([
    minPrice,
    maxPrice,
  ]);

  // synkkaa sliderin arvot storeen
  useEffect(() => {
    setFilter("minPrice", priceRange[0]);
    setFilter("maxPrice", priceRange[1]);
  }, [priceRange, setFilter]);

  return (
    <aside className="bg-bg-card border border-gray-800 rounded-2xl p-4 space-y-4 w-full md:w-72 md:sticky md:top-20 h-fit">
      <div>
        <label className="block text-xs mb-1 text-gray-400">Search</label>
        <input
          value={search}
          onChange={(e) => setFilter("search", e.target.value)}
          placeholder="Search make, model, location..."
          className="w-full rounded-xl bg-bg-main border border-gray-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      <PriceSlider
        min={0}
        max={60000}
        value={priceRange}
        onChange={setPriceRange}
      />

      <div className="space-y-2">
        <p className="text-xs text-gray-400">Fuel type</p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {["All", "Petrol", "Diesel", "Hybrid", "Electric"].map((ft) => (
            <button
              key={ft}
              onClick={() => setFilter("fuelType", ft as any)}
              className={`px-3 py-2 rounded-xl border transition ${
                fuelType === ft
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-gray-700 text-gray-300 hover:border-accent/60"
              }`}
            >
              {ft}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs text-gray-400">Transmission</p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {["All", "Automatic", "Manual"].map((tr) => (
            <button
              key={tr}
              onClick={() => setFilter("transmission", tr as any)}
              className={`px-3 py-2 rounded-xl border transition ${
                transmission === tr
                  ? "border-accent-alt bg-accent-alt/10 text-accent-alt"
                  : "border-gray-700 text-gray-300 hover:border-accent-alt/60"
              }`}
            >
              {tr}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={reset}
        className="w-full mt-2 text-xs text-gray-300 hover:text-accent"
      >
        Reset filters
      </button>
    </aside>
  );
}
