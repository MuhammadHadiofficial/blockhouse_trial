import React from 'react'
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import Sidebar from '@/components/ui/global/sidebar'
import { queryAllCoins } from '@/actions/coins'
import CoinTable from '@/components/ui/CoinTable';
type Props = {
  
}

const Layout = async ({ }: Props) => {

  // const { query } = useSearch("get-coins", "COINS");
  const query = new QueryClient();
  await query.prefetchQuery({
    queryKey: ['get-all-coins'],
    queryFn: () => queryAllCoins(),
  });

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className="flex h-screen w-screen">
        <Sidebar  />
        <div className="w-full pt-28  overflow-y-scroll overflow-x-hidden">
          {/* <GlobalHeader  /> */}
          <div className="mt-4">
            <CoinTable />
      
          </div>
        </div>
      </div>
    </HydrationBoundary>
  )
}

export default Layout
