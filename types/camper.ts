type CamperForm = "alcove" | "panel_van" | "integrated" | "semi_integrated";
type CamperEngine = "diesel" | "petrol" | "hybrid" | "electric";
type CamperTransmission = "automatic" | "manual";

export interface Camper {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  form: CamperForm;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: CamperTransmission;
  engine: CamperEngine;
  amenities: string[];
  coverImage: string;
  totalReviews: number;
}

export interface FetchCampersResponse {
page: number;
perPage: number;
total: number;
totalPages: number;
campers: Camper[];
}