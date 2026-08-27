import * as Yup from "yup";
import type { BookingRequestData } from "@/types/camper";

export const bookingSchema: Yup.ObjectSchema<BookingRequestData> =
  Yup.object({
    name: Yup.string()
      .trim()
      .min(2, "Name must contain at least 2 characters.")
      .max(50, "Name must contain no more than 50 characters.")
      .matches(
        /^[\p{L}' -]+$/u,
        "Please enter your name.",
      )
      .required("Name is required."),

    email: Yup.string()
      .trim()
      .email("Please enter a valid email.")
      .required("Email is required."),
  });