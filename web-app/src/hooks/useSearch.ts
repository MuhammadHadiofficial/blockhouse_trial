import { useEffect, useState } from "react";

// Define the coin type based on your existing code
interface Coin {
  id: string;
  rank: number;
  name: string;
  symbol: string;
  priceUsd: string;
  marketCapUsd: string;
  supply: string;
  vwap24Hr: string;
  changePercent24Hr: string;
  explorer: string;
}

export const useSearch = (initialData: Coin[] = []) => {
  const [query, setQuery] = useState("");
  const [debounce, setDebounce] = useState("");
  const [data, setData] = useState<Coin[]>(initialData);
  const [filteredData, setFilteredData] = useState<Coin[]>(initialData);
  const [isFetching, setIsFetching] = useState(false);
  
  // Handle input change
  const onSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  
  // Set debounced value after delay to avoid excessive filtering
  useEffect(() => {
    setIsFetching(true);
    const delayInputTimeoutId = setTimeout(() => {
      setDebounce(query);
      setIsFetching(false);
    }, 500);
    
    return () => clearTimeout(delayInputTimeoutId);
  }, [query]);
  
  // Update data if initialData changes
  useEffect(() => {
    setData(initialData);
  }, [initialData]);
  
  // Filter data based on search query
  useEffect(() => {
    if (!debounce.trim()) {
      setFilteredData(data);
      return;
    }
    
    const lowerCaseQuery = debounce.toLowerCase();
    const filtered = data.filter(
      (coin) => 
        coin.name.toLowerCase().includes(lowerCaseQuery) || 
        coin.symbol.toLowerCase().includes(lowerCaseQuery)
    );
    
    setFilteredData(filtered);
  }, [debounce, data]);

  return { 
    query, 
    onSearchQuery, 
    filteredData, 
    isFetching,
    setData
  };
};