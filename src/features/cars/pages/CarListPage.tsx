import { cars } from "../../../api/car";
import { CarCard } from "../../../components/cars/CarCard";
import { CarFilters } from "../../../components/cars/CarFilters";
import { useFiltersStore } from "../../../store/filtersStore";

export function CarsListPage() {
  const { search, minPrice, maxPrice, fuelType, transmission } = useFiltersStore();

  const filtered = cars.filter((c) => {
    if (c.price < minPrice || c.price > maxPrice) return false;
    if (fuelType !== "All" && c.fuelType !== fuelType) return false;
    if (transmission !== "All" && c.transmission !== transmission) return false;

    if (search) {
      const term = search.toLowerCase();
      const haystack = `${c.make} ${c.model} ${c.location}`.toLowerCase();
      if (!haystack.includes(term)) return false;
    }

    return true;
  });

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <CarFilters />

      <section className="flex-1 space-y-4">
        <div className="flex justify-between items-end gap-2">
          <div>
            <h1 className="text-xl font-semibold">Available cars</h1>
            <p className="text-xs text-gray-400">
              Browse currently listed cars in the demo.
            </p>
          </div>
          <span className="text-xs text-gray-500">
            {filtered.length} / {cars.length} cars match filters
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="border border-dashed border-gray-700 rounded-2xl p-8 text-center text-sm text-gray-400">
            No cars found with current filters.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
