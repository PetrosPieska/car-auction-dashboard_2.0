export type FuelType = "Petrol" | "Diesel" | "Hybrid" | "Electric";
export type Transmission = "Manual" | "Automatic";

export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: FuelType;
  transmission: Transmission;
  location: string;
  imageUrls: string[];
  features: string[];
  createdAt: string;
}
