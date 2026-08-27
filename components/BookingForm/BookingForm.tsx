"use client";

import { useMutation } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import toast from "react-hot-toast";
import { createBookingRequest } from "@/lib/api/clientApi";
import { bookingSchema } from "@/lib/validation/bookingSchema";
import type { BookingRequestData } from "@/types/camper";
import css from "./BookingForm.module.css";

interface BookingFormProps {
  camperId: string;
}

const initialValues: BookingRequestData = {
  name: "",
  email: "",
};

export default function BookingForm({ camperId }: BookingFormProps) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (bookingData: BookingRequestData) =>
      createBookingRequest(camperId, bookingData),

    onSuccess: (response) => {
      toast.success(response.message);
    },

    onError: () => {
      toast.error("Something went wrong. Please try again.");
    },
  });

  return (
    <div className={css.sectionBooking}>
      <h2 className={css.title}>Book your campervan now</h2>
      <p className={css.description}>
        Stay connected! We are always ready to help you.
      </p>
      <Formik<BookingRequestData>
        initialValues={initialValues}
        validationSchema={bookingSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            await mutateAsync(values);
            resetForm();
          } catch {
            // Повідомлення про помилку вже показує onError
          }
        }}
      >
        {({ errors, touched }) => {
          const nameHasError = Boolean(touched.name && errors.name);

          const emailHasError = Boolean(touched.email && errors.email);

          return (
            <Form className={css.form} noValidate>
              <div className={css.fieldGroup}>
                <div className={css.inputWrapper}>
                  {nameHasError && (
                    <label className={css.errorLabel} htmlFor="name">
                      Name*
                    </label>
                  )}

                  <Field
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Name*"
                    className={`${css.input} ${
                      nameHasError ? css.inputError : ""
                    }`}
                    aria-invalid={nameHasError}
                    aria-describedby="name-error"
                  />

                  {nameHasError && (
                    <span className={css.errorIcon} aria-hidden="true">
                      !
                    </span>
                  )}
                </div>

                <ErrorMessage
                  id="name-error"
                  name="name"
                  component="p"
                  className={css.errorMessage}
                />
              </div>

              <div className={css.fieldGroup}>
                <div className={css.inputWrapper}>
                  {emailHasError && (
                    <label className={css.errorLabel} htmlFor="email">
                      Email*
                    </label>
                  )}

                  <Field
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email*"
                    className={`${css.input} ${
                      emailHasError ? css.inputError : ""
                    }`}
                    aria-invalid={emailHasError}
                    aria-describedby="email-error"
                  />

                  {emailHasError && (
                    <span className={css.errorIcon} aria-hidden="true">
                      !
                    </span>
                  )}
                </div>

                <ErrorMessage
                  id="email-error"
                  name="email"
                  component="p"
                  className={css.errorMessage}
                />
              </div>

              <button type="submit" className={css.button} disabled={isPending}>
                {isPending ? "Sending..." : "Send"}
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
