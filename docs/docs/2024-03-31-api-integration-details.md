# API Integration Details

This document outlines the integration process with the CoinCap API to fetch cryptocurrency data. The integration is built using Axios for API calls, React Query for state management, and Next.js for server-side rendering.

## 1. API Calls

- **Functions:**  
  - `queryCoinData(coinId)`: Fetches data for a specific coin.
  - `queryAllCoins()`: Retrieves data for all available coins.
  
- **Key Points:**  
  - Axios is used for HTTP GET requests.
  - Data is returned from `response.data.data`.
  - Basic error handling is implemented to log and rethrow errors.

## 2. Data Fetching with React Query

- **Custom Hook:**  
  A custom hook wraps React Query's `useQuery` to standardize fetching logic across components.  
  - Returns properties such as `data`, `isLoading`, `isError`, and `refetch`.

## 3. Server-Side Prefetching

- **Prefetching Data:**  
  The Next.js page component initializes a QueryClient to prefetch coin data on the server, which is then rehydrated on the client.  
  - This approach improves page load times and overall user experience.

## 4. Client-Side Rendering and User Interaction

- **CoinTable Component:**  
  - Uses React Query to display coin data in a table.
  - Provides search functionality with a custom hook.
  - Includes a manual data refresh button to re-fetch data.
  - Displays loading skeletons while fetching data and error messages if the fetch fails.

## Conclusion

This integration efficiently combines API calls, React Query caching, and Next.js rendering to provide a seamless and responsive user experience. The modular approach simplifies maintenance and scaling, ensuring that both server and client-side data management are optimized.
