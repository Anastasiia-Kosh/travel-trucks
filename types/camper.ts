export type CamperForm = "alcove" | "panel_van" | "integrated" | "semi_integrated";
export type CamperEngine = "diesel" | "petrol" | "hybrid" | "electric";
export type CamperTransmission = "automatic" | "manual";

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
export interface FetchCampersParams extends CamperFilterValues {
  page: number;
}
export interface CamperFiltersResponse {
  forms: CamperForm[];
  engines: CamperEngine[];
  transmissions: CamperTransmission[];
}
export interface CamperFilterValues {
  location: string;
  form: CamperForm | "";
  engine: CamperEngine | "";
  transmission: CamperTransmission | "";
}