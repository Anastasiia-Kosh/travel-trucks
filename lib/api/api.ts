import axios from "axios";

export const nextServerInstance = axios.create({
  baseURL: "/api",
});
