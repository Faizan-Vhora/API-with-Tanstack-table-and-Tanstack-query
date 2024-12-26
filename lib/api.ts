import axios from "axios"; // Import axios for HTTP requests
import { apiData } from "@/app/users/component/userPagination"; // Import the apiData type for type safety

// Fetch users from the API
export const fetchUsers = async (): Promise<apiData[]> => {
  // Make a GET request to the placeholder API to fetch user data
  const response = await axios.get("https://jsonplaceholder.typicode.com/users");

  // Return the response data as an array of apiData objects
  return response.data;
};
