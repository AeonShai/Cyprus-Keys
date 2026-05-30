export interface Property {
  id: number;
  title: string;
  location: string;
  city: string;
  type: "villa" | "apartment" | "penthouse" | "bungalow" | "commercial";
  status: "sale" | "rent";
  priceAmount: number;
  currency: string;
  beds: number;
  baths: number;
  area: number; // m²
  photo: string;
  gallery: string[];
  description: string;
  features: { label: string; value: string }[];
  yearBuilt: number;
  floor?: number;
  totalFloors?: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

