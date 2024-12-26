"use client";
// This marks the file as a client-side component in Next.js, enabling the use of React hooks like `useQuery`.

// Import necessary modules and components
import { apiData, columns } from "./users/component/userPagination"; // Data and column configuration for the table
import { DataTable } from "./users/component/userTable"; // DataTable component to render the table
import { fetchUsers } from "@/lib/api"; // Function to fetch data from the API
import { useQuery } from "@tanstack/react-query"; // React Query hook for data fetching and caching

export default function DemoPage() {
  // Use React Query's `useQuery` hook to fetch and manage API data
  const { data, isLoading, isError, error } = useQuery<apiData[], Error>({
    queryKey: ["users"], // Unique key for caching and identifying the query
    queryFn: fetchUsers, // Function to fetch data from the API
  });

  // Display a loading state while the data is being fetched
  if (isLoading) {
    return <div className="container mx-auto py-10">Loading...</div>;
  }

  // Display an error message if the API request fails
  if (isError) {
    return (
      <div className="container mx-auto py-10">
        <p className="text-red-500">Error: {(error as Error).message}</p>
      </div>
    );
  }

  // Render the page when data is successfully fetched
  return (
    <div className="container mx-auto py-10">
      {/* Page heading */}
      <h1 className="text-3xl font-bold text-center mb-6">
        FETCH API DATA USING TANSTACK
      </h1>

      {/* DataTable component to display data in a table format */}
      <DataTable columns={columns} data={data || []} />
    </div>
  );
}
