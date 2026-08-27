"use client";

import { useMutation } from "@tanstack/react-query";
import { Field, Form, Formik } from "formik";
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
        {({ errors, values, submitCount }) => {
          const nameHasError = Boolean(
            errors.name && (values.name.trim().length > 0 || submitCount > 0),
          );

          const emailHasError = Boolean(
            errors.email && (values.email.trim().length > 0 || submitCount > 0),
          );

          return (
            <Form className={css.form} noValidate>
              <div className={css.fieldGroup}>
                <div className={css.inputWrapper}>
                  {nameHasError && (
                    <span className={css.errorLabel} aria-hidden="true">
                      Name*
                    </span>
                  )}
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Name*"
                    aria-label="Name"
                    className={`${css.input} ${
                      nameHasError ? css.inputError : ""
                    }`}
                    aria-invalid={nameHasError}
                    aria-describedby={nameHasError ? "name-error" : undefined}
                  />

                  {nameHasError && (
                    <span className={css.errorIcon} aria-hidden="true">
                      !
                    </span>
                  )}
                </div>

                {nameHasError && (
                  <p id="name-error" className={css.errorMessage}>
                    {errors.name}
                  </p>
                )}
              </div>

              <div className={css.fieldGroup}>
                <div className={css.inputWrapper}>
                  {emailHasError && (
                    <span className={css.errorLabel} aria-hidden="true">
                      Email*
                    </span>
                  )}
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Email*"
                    aria-label="Email"
                    className={`${css.input} ${
                      emailHasError ? css.inputError : ""
                    }`}
                    aria-invalid={emailHasError}
                    aria-describedby={emailHasError ? "email-error" : undefined}
                  />

                  {emailHasError && (
                    <span className={css.errorIcon} aria-hidden="true">
                      !
                    </span>
                  )}
                </div>

                {emailHasError && (
                  <p id="email-error" className={css.errorMessage}>
                    {errors.email}
                  </p>
                )}
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
