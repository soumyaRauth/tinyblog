import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [queryShit] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryShit}>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}
