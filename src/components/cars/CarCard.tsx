import { Link } from "react-router-dom";
import type { Car } from "../../types/car";

interface Props {
  car: Car;
}

export function CarCard({ car }: Props) {
  return (
    <Link
      to={`/cars/${car.id}`}
      className="bg-bg-card border border-gray-800 hover:border-accent/80 rounded-2xl overflow-hidden flex flex-col shadow-lg transition"
    >
      {/* IMAGE */}
      <div className="aspect-video bg-gradient-to-tr from-bg-main to-bg-card relative">
        {car.imageUrls[0] && (
          <img
            src={car.imageUrls[0]}
            alt={`${car.make} ${car.model}`}
            className="w-full h-full object-cover"
          />
        )}

        <div className="absolute top-2 left-2 text-xs px-2 py-1 rounded-full bg-black/60 text-accent-alt">
          {car.location}
        </div>

        <div className="absolute bottom-2 left-2 text-xs px-2 py-1 rounded-full bg-black/60 text-gray-100">
          {car.year} • {car.mileage.toLocaleString()} km
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-sm">
              {car.make} {car.model}
            </h3>
            <p className="text-xs text-gray-400">
              {car.fuelType} • {car.transmission}
            </p>
          </div>

          <div className="text-right">
            <div className="text-accent font-bold text-lg">
              {car.price.toLocaleString()} €
            </div>
            <div className="text-[10px] text-gray-500">Asking price</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mt-1">
          {car.features.slice(0, 3).map((feature) => (
            <span
              key={feature}
              className="text-[10px] px-2 py-1 rounded-full bg-accent-alt/10 text-accent-alt"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
