"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

interface Props {
  children: React.ReactNode;
}

const TanStackProvider = ({ children }: Props) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster
        position="top-center"
        containerStyle={{
          top: "4px",
        }}
        toastOptions={{
          duration: 5000,

          style: {
            minWidth: "320px",
            maxWidth: "480px",
            minHeight: "64px",
            padding: "16px 20px",
            borderRadius: "12px",

            fontSize: "16px",
            fontWeight: 500,
            lineHeight: 1.5,

            color: "var(--main)",
            backgroundColor: "var(--white)",
            boxShadow: "0 8px 32px rgba(16, 24, 40, 0.14)",
          },

          success: {
            duration: 5000,
            iconTheme: {
              primary: "var(--grey-green)",
              secondary: "var(--white)",
            },
          },

          error: {
            duration: 5000,
            iconTheme: {
              primary: "var(--button)",
              secondary: "var(--white)",
            },
          },
        }}
      />
    </QueryClientProvider>
  );
};

export default TanStackProvider;
