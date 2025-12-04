import { cars } from "../../../api/car";

interface StatCardProps {
  label: string;
  value: string;
  helper?: string;
}

function StatCard({ label, value, helper }: StatCardProps) {
  return (
    <div className="bg-bg-card border border-gray-800 rounded-2xl p-4 space-y-1">
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-xl font-semibold">{value}</p>
      {helper && <p className="text-[11px] text-gray-500">{helper}</p>}
    </div>
  );
}

export function DashboardPage() {
  const totalCars = cars.length;
  const avgPrice = Math.round(
    cars.reduce((sum, c) => sum + c.price, 0) / totalCars
  );
  const avgYear = Math.round(
    cars.reduce((sum, c) => sum + c.year, 0) / totalCars
  );
  const avgMileage = Math.round(
    cars.reduce((sum, c) => sum + c.mileage, 0) / totalCars
  );

  const byFuel = cars.reduce<Record<string, number>>((acc, car) => {
    acc[car.fuelType] = (acc[car.fuelType] ?? 0) + 1;
    return acc;
  }, {});

  const byLocation = cars.reduce<Record<string, number>>((acc, car) => {
    acc[car.location] = (acc[car.location] ?? 0) + 1;
    return acc;
  }, {});

  const maxFuelCount = Math.max(...Object.values(byFuel));
  const maxLocationCount = Math.max(...Object.values(byLocation));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end gap-2">
        <div>
          <h1 className="text-xl font-semibold">Inventory overview</h1>
          <p className="text-xs text-gray-400">
            Quick snapshot of the current demo inventory.
          </p>
        </div>
        <span className="text-xs text-gray-500">{totalCars} cars total</span>
      </div>

      {/* Top stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Average asking price"
          value={`${avgPrice.toLocaleString()} €`}
          helper="Across all listed cars"
        />
        <StatCard
          label="Average year"
          value={avgYear.toString()}
          helper="Newer = typically higher demand"
        />
        <StatCard
          label="Average mileage"
          value={`${avgMileage.toLocaleString()} km`}
          helper="Total mileage across the fleet"
        />
        <StatCard
          label="Fuel types"
          value={`${Object.keys(byFuel).length}`}
          helper="Diversity of powertrains"
        />
      </div>

      {/* Distribution by fuel */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-bg-card border border-gray-800 rounded-2xl p-4 space-y-3">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-semibold">Cars by fuel type</h2>
            <span className="text-[11px] text-gray-500">
              Simple distribution (no backend)
            </span>
          </div>

          <div className="space-y-2">
            {Object.entries(byFuel).map(([fuel, count]) => {
              const width =
                maxFuelCount === 0 ? 0 : (count / maxFuelCount) * 100;
              return (
                <div key={fuel} className="space-y-1">
                  <div className="flex justify-between text-[11px] text-gray-400">
                    <span>{fuel}</span>
                    <span>{count} cars</span>
                  </div>
                  <div className="h-2 rounded-full bg-bg-main overflow-hidden">
                    <div
                      className="h-full bg-accent-alt rounded-full"
                      style={{ width: `${width}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Distribution by location */}
        <div className="bg-bg-card border border-gray-800 rounded-2xl p-4 space-y-3">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-semibold">Cars by location</h2>
            <span className="text-[11px] text-gray-500">
              Where the inventory is concentrated
            </span>
          </div>

          <div className="space-y-2">
            {Object.entries(byLocation).map(([city, count]) => {
              const width =
                maxLocationCount === 0 ? 0 : (count / maxLocationCount) * 100;
              return (
                <div key={city} className="space-y-1">
                  <div className="flex justify-between text-[11px] text-gray-400">
                    <span>{city}</span>
                    <span>{count} cars</span>
                  </div>
                  <div className="h-2 rounded-full bg-bg-main overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full"
                      style={{ width: `${width}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
