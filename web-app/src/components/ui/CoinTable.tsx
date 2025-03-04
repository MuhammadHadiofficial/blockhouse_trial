"use client";
import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { queryAllCoins } from '@/actions/coins';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown, Search as SearchIcon, Link } from 'lucide-react';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { useSearch } from '@/hooks/useSearch';
import { useIsMobile } from '@/hooks/use-mobile';

const CoinTable = () => {
  const isMobile = useIsMobile();
  const { data: allCoins, error, isLoading, refetch } = useQuery({
    queryKey: ['get-all-coins'],
    queryFn: queryAllCoins
  });

  const { query, onSearchQuery, filteredData, isFetching, setData } = useSearch(allCoins);

  // Update data when allCoins changes
  useEffect(() => {
    if (allCoins) {
      setData(allCoins);
    }
  }, [allCoins, setData]);

  
  if (error) return <div>Error loading data</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center gap-4">
        <div className="relative w-full max-w-md">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            onChange={onSearchQuery}
            value={query}
            className="pl-10 bg-transparent border-2 outline-none"
            placeholder="Search for coins by name or symbol..."
            type="text"
          />
        </div>
        <Button onClick={() => refetch()}>Refresh Data</Button>
      </div>
      
      {isFetching && isLoading? (
        <div className="flex flex-col gap-y-2">
          <Skeleton className="w-full h-64 rounded-xl" />
        </div>
      ) : (
        <div className="relative border rounded-md overflow-y-auto scroll-smooth h-screen max-h-[600px]">
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-background">
              <TableRow>
                <TableHead className="w-16">Rank</TableHead>
                <TableHead className="w-48">Name</TableHead>
                {!isMobile && <TableHead className="w-24">Symbol</TableHead>}
                <TableHead className="w-32">Price (USD)</TableHead>
                {!isMobile && <TableHead className="w-40">Market Cap</TableHead>}
                {!isMobile && <TableHead className="w-32">Supply</TableHead>}
                {!isMobile && <TableHead className="w-32">VWAP (24Hr)</TableHead>}
                {!isMobile && <TableHead className="w-32">Change (24Hr)</TableHead>}
                <TableHead className="w-24">Explorer</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData && filteredData.length > 0 ? (
                filteredData.map((coin) => (
                  <TableRow key={coin.id}>
                    <TableCell className="w-16">{coin.rank}</TableCell>
                    <TableCell className="w-24 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Image 
                          src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`} 
                          alt={coin.name} 
                          width={20} 
                          height={20}
                          onError={(e) => {
                            e.currentTarget.src = "/coin-placeholder.png";
                          }}
                        />
                        <span>{coin.name}</span>
                      </div>
                    </TableCell>
                    {!isMobile && <TableCell className="w-24">{coin.symbol}</TableCell>}
                    <TableCell className="w-32">${parseFloat(coin.priceUsd).toFixed(2)}</TableCell>
                    {!isMobile && <TableCell className="w-40">${parseFloat(coin.marketCapUsd).toFixed(2)}</TableCell>}
                    {!isMobile && <TableCell className="w-32">{parseFloat(coin.supply).toLocaleString()}</TableCell>}
                    {!isMobile && (
                      <TableCell className="w-32">${parseFloat(coin.vwap24Hr).toFixed(2)}</TableCell>
                    )}
                    {!isMobile && (
                      <TableCell className="w-32">
                        <div className="flex items-center gap-1">
                          {parseFloat(coin.changePercent24Hr) > 0 ? (
                            <ArrowUp color="green" />
                          ) : (
                            <ArrowDown color="red" />
                          )}
                          <span className={parseFloat(coin.changePercent24Hr) > 0 ? "text-green-500" : "text-red-500"}>
                            {parseFloat(coin.changePercent24Hr).toFixed(2)}%
                          </span>
                        </div>
                      </TableCell>
                    )}
                    <TableCell className="w-24 flex items-center gap-1">
                      <a href={coin.explorer} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        <Link className="ml-2" size={16} />
                      </a>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-4">
                    {query ? "No coins found matching your search" : "No coins available"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

    </div>
  );
};

export default CoinTable;
