"use client";
import Image from "next/image";
import React from "react";
import { useQueryData } from "@/hooks/useQueryData";
import { Separator } from "../../separator";
import { Menu, } from "lucide-react";
import SidebarItem from "./sidebar-item";
import { Button } from "../../button";
import Loader from '@/components/ui/global/loader'
import { Sheet, SheetContent, SheetTrigger } from "../../sheet";
import { queryAllCoins } from "@/actions/coins";
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
  </DropdownMenu>
  )
}



const Sidebar = () => {
  const {data,isError,isFetching}=useQueryData(['get-all-coins'],queryAllCoins,)
 
  const Sidebar = (
    <div className=" flex-none relative p-4 w-[250px] flex flex-col gap-2 items-center ">
      <div className=" p-4 flex gap-2 justify-center items-center ">
        <Image src={"/black.svg"} width={40} height={40} alt="Coinbase" />
        <p className="text-2xl">Coinbase</p>  <ModeToggle/> 
      </div>
   
   
      <p className="w-full text-[#9D9D9D] font-bold mt-4 ">Coins</p>
      <nav className="w-full  h-screen overflow-auto overflow-hidden-x-hidden fade-layer scroll-smooth" >
       <Loader     state={isFetching}
          color="#000">
       <ul>
          {data && data.map((item) => (
            <SidebarItem
              href={item.explorer||"/"}
              icon={`https://assets.coincap.io/assets/icons/${item.symbol.toLowerCase()}@2x.png`}
              // selected={pathname === item.href}
              title={item.name}
              key={item.id}
          
            ></SidebarItem>
          ))}
        </ul>
       </Loader>
      </nav>
  
      <Separator className="w-4/5" />
   
    </div>
  );
  return (
    <div className="full">
      <div className="md:hidden fixed my-4">
        <Sheet>
          <SheetTrigger asChild className="ml-2">
            <Button variant={"ghost"} className="mt-[2px]">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side={"left"} className="p-0 w-fit h-full">
        
            {Sidebar}
          </SheetContent>
        </Sheet>
      </div>
      <div className="md:block hidden h-full"> {Sidebar}</div>
    </div>
  );
};

export default Sidebar;
