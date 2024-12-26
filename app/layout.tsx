"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"; // Import React Query DevTools for debugging
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // React Query setup
import { useState } from "react"; // Import `useState` to manage the QueryClient instance

// Load and configure Google Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// RootLayout component to wrap the app
// this code section provides global structure and context to the app
// add cinsistent fonts and styles
// enables React Query for API fetching and caching
// and add debugging tools for development
export default function RootLayout({
  children,
}: {
  children: React.ReactNode; // Type definition for children props
}) {
  // Initialize a single instance of QueryClient
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Apply fonts and antialiasing for better rendering */}
        <QueryClientProvider client={queryClient}>
          {/* Provide the QueryClient to the application */}
          {children}
          {/* Include React Query DevTools for debugging (hidden by default) */}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </body>
    </html>
  );
}
