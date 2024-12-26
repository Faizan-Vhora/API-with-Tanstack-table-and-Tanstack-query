"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";

// Define the data type for the table rows
export type apiData = {
  username: string;
  email: string;
  city: string;
  Zipcode: string;
};

export const columns: ColumnDef<apiData>[] = [
  // "Select" column for row selection using checkboxes
  {
    id: "select",
    header: ({ table }) => (
      // Checkbox in the header to select/deselect all rows
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || // All rows selected
          (table.getIsSomePageRowsSelected() && "indeterminate") // Some rows selected
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} // Toggle all row selection
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      // Checkbox in individual rows to toggle row selection
      <Checkbox
        checked={row.getIsSelected()} // Row selection state
        onCheckedChange={(value) => row.toggleSelected(!!value)} // Toggle selection
        aria-label="Select row"
      />
    ),
  },
  // Username column
  {
    accessorKey: "username", // Access the "username" field from the data
    header: "USERNAME", // Column header label
  },
  // Email column with sorting functionality
  {
    accessorKey: "email", // Access the "email" field from the data
    header: ({ column }) => {
      return (
        // Sort button for the email column
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} // Toggle sorting order
        >
          EMAIL
          <ArrowUpDown className="ml-2 h-4 w-4" /> {/* Sorting icon */}
        </Button>
      );
    },
  },
  // City column
  {
    accessorKey: "address.city", // Access "city" inside the "address" object in the data
    header: "CITY", // Column header label
  },
  // Zip code column
  {
    accessorKey: "address.zipcode", // Access "zipcode" inside the "address" object in the data
    header: "ZIP CODE", // Column header label
  },
  // Actions column for row-specific actions
  {
    id: "actions",
    cell: ({ row }) => {
      const apiData = row.original; // Get the original row data

      return (
        <DropdownMenu>
          {/* Trigger for the dropdown menu */}
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>{" "}
              {/* Screen reader-only text */}
              <MoreHorizontal className="h-4 w-4" />{" "}
              {/* Icon for the dropdown menu */}
            </Button>
          </DropdownMenuTrigger>
          {/* Dropdown menu content */}
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>{" "}
            {/* Label for actions */}
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(apiData.email)} // Copy email to clipboard
            >
              Copy Email ID
            </DropdownMenuItem>
            <DropdownMenuSeparator /> {/* Separator line */}
            <DropdownMenuItem>View Users</DropdownMenuItem>{" "}
            {/* View users action */}
            <DropdownMenuItem>View user details</DropdownMenuItem>{" "}
            {/* View user details action */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
