import { create } from "zustand";
import type { FuelType, Transmission } from "../types/car";

interface FiltersState {
  search: string;
  minPrice: number;
  maxPrice: number;
  fuelType: FuelType | "All";
  transmission: Transmission | "All";
  setFilter: <K extends keyof FiltersState>(key: K, value: FiltersState[K]) => void;
  reset: () => void;
}

export const useFiltersStore = create<FiltersState>((set) => ({
  search: "",
  minPrice: 0,
  maxPrice: 60000,
  fuelType: "All",
  transmission: "All",
  setFilter: (key, value) => set({ [key]: value }),
  reset: () =>
    set({
      search: "",
      minPrice: 0,
      maxPrice: 60000,
      fuelType: "All",
      transmission: "All",
    }),
}));
