import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { cars } from "../../../api/car";
import type { Car } from "../../../types/car";

export function CarDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const car: Car | undefined = useMemo(
    () => cars.find((c) => c.id === id),
    [id]
  );

  const [currentBid, setCurrentBid] = useState(
    car ? Math.max(car.price - 1500, car.price * 0.9) : 0
  );
  const [bidInput, setBidInput] = useState("");
  const [message, setMessage] = useState<null | { type: "ok" | "error"; text: string }>(
    null
  );

  if (!car) {
    return (
      <div className="space-y-4">
        <button
          onClick={() => navigate(-1)}
          className="text-xs text-gray-400 hover:text-accent"
        >
          ← Back to list
        </button>
        <div className="border border-gray-800 rounded-2xl p-8 text-center text-sm text-gray-300">
          Car not found.
        </div>
      </div>
    );
  }

  const handleBidSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = Number(bidInput.replace(/\s/g, ""));
    if (!value || Number.isNaN(value)) {
      setMessage({ type: "error", text: "Enter a valid amount." });
      return;
    }
    if (value <= currentBid) {
      setMessage({
        type: "error",
        text: `Your bid must be higher than the current bid (${currentBid.toLocaleString()} €).`,
      });
      return;
    }
    setCurrentBid(value);
    setMessage({
      type: "ok",
      text: "Your bid has been placed (simulated).",
    });
    setBidInput("");
  };

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="text-xs text-gray-400 hover:text-accent"
      >
        ← Back to list
      </button>

      <div className="grid lg:grid-cols-[2fr,1.3fr] gap-6 items-start">
        {/* Left: images + specs */}
        <div className="space-y-4">
          <div className="bg-bg-card border border-gray-800 rounded-2xl overflow-hidden">
            <div className="aspect-video bg-bg-main relative">
              {car.imageUrls[0] && (
                <img
                  src={car.imageUrls[0]}
                  alt={`${car.make} ${car.model}`}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute top-3 left-3 text-xs px-3 py-1 rounded-full bg-black/60 text-accent-alt">
                {car.location}
              </div>
              <div className="absolute bottom-3 left-3 text-xs px-3 py-1 rounded-full bg-black/60 text-gray-100">
                {car.year} • {car.mileage.toLocaleString()} km
              </div>
            </div>
          </div>

          <div className="bg-bg-card border border-gray-800 rounded-2xl p-4 space-y-3">
            <div>
              <h1 className="text-xl font-semibold">
                {car.make} {car.model}
              </h1>
              <p className="text-xs text-gray-400">
                {car.fuelType} • {car.transmission} • {car.location}
              </p>
            </div>

            <div className="flex flex-wrap gap-1">
              {car.features.map((f) => (
                <span
                  key={f}
                  className="text-[10px] px-2 py-1 rounded-full bg-accent-alt/10 text-accent-alt"
                >
                  {f}
                </span>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-2 text-xs text-gray-300">
              <div className="flex justify-between bg-bg-main/60 rounded-xl px-3 py-2 border border-gray-800">
                <span>Year</span>
                <span className="font-medium">{car.year}</span>
              </div>
              <div className="flex justify-between bg-bg-main/60 rounded-xl px-3 py-2 border border-gray-800">
                <span>Mileage</span>
                <span className="font-medium">
                  {car.mileage.toLocaleString()} km
                </span>
              </div>
              <div className="flex justify-between bg-bg-main/60 rounded-xl px-3 py-2 border border-gray-800">
                <span>Asking price</span>
                <span className="font-semibold text-accent">
                  {car.price.toLocaleString()} €
                </span>
              </div>
              <div className="flex justify-between bg-bg-main/60 rounded-xl px-3 py-2 border border-gray-800">
                <span>Fuel</span>
                <span className="font-medium">{car.fuelType}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: bidding card */}
        <div className="bg-bg-card border border-gray-800 rounded-2xl p-4 space-y-4">
          <h2 className="text-sm font-semibold">Auction (simulated)</h2>

          <div className="bg-bg-main/60 rounded-xl px-3 py-3 border border-gray-800 space-y-1">
            <div className="text-xs text-gray-400">Current highest bid</div>
            <div className="text-2xl font-semibold text-accent">
              {currentBid.toLocaleString()} €
            </div>
            <div className="text-[11px] text-gray-500">
              Asking price:{" "}
              <span className="text-gray-300">
                {car.price.toLocaleString()} €
              </span>
            </div>
          </div>

          <form onSubmit={handleBidSubmit} className="space-y-3">
            <div>
              <label className="block text-xs mb-1 text-gray-400">
                Your bid (simulated)
              </label>
              <div className="flex gap-2">
                <input
                  value={bidInput}
                  onChange={(e) => setBidInput(e.target.value)}
                  placeholder={`${(currentBid + 500).toLocaleString()} € or more`}
                  className="flex-1 rounded-xl bg-bg-main border border-gray-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-accent text-sm font-medium hover:bg-accent/80 transition"
                >
                  Place bid
                </button>
              </div>
            </div>

            {message && (
              <div
                className={`text-xs rounded-xl px-3 py-2 border ${
                  message.type === "ok"
                    ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                    : "border-red-500/40 bg-red-500/10 text-red-300"
                }`}
              >
                {message.text}
              </div>
            )}

            <p className="text-[11px] text-gray-500">
              This is a frontend-only simulation for portfolio purposes. No real
              bids are placed.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
