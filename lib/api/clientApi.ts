
import { FetchCampersResponse } from "@/types/camper";
import { nextServerInstance } from "./api";

export const fetchCampers = async () => {
  const response = await nextServerInstance.get<FetchCampersResponse>("/campers", {
  });
  return response.data;
};
