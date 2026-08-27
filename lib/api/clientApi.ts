import type { BookingRequestData, BookingResponse, CamperDetails, CamperFiltersResponse, CamperReviewPesponse, FetchCampersParams, FetchCampersResponse } from "@/types/camper";
import { nextServerInstance } from "./api";

export const fetchCampers = async (params: FetchCampersParams) : Promise<FetchCampersResponse> => {
  const response = await nextServerInstance.get<FetchCampersResponse>("/catalog", {
    params,
  });
  return response.data;
};

export const fetchCamperFilters = async () : Promise<CamperFiltersResponse> => {
  const response = await nextServerInstance.get<CamperFiltersResponse>("/catalog/filters");
  return response.data;
};

export const fetchCamperById = async (camperId: string) : Promise<CamperDetails> => {
  const response = await nextServerInstance.get<CamperDetails>(`/catalog/${camperId}`);
  return response.data;
};

export const fetchCamperReviews = async (camperId: string) : Promise<CamperReviewPesponse[]> => {
  const response = await nextServerInstance.get<CamperReviewPesponse[]>(`/catalog/${camperId}/reviews`);
  return response.data;
};

export const createBookingRequest  = async ( camperId: string , data: BookingRequestData): Promise<BookingResponse> => {
  const res = await nextServerInstance.post<BookingResponse>(
    `/catalog/${camperId}/booking-requests`, data,
  );
  return res.data;
};