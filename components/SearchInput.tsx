"use client";

import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";
import Image from "next/image";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SearchInput = () => {
   // as soon as you use something that start with 'use', make it a client side rendering
   const pathname = usePathname();
   const router = useRouter();
   const searchParams = useSearchParams();

   const [searchQuery, setSearchQuery] = useState("");

   useEffect(() => {
      const delayDebounceFn = setTimeout(() => {
         if (searchQuery) {
            const newUrl = formUrlQuery({
               params: searchParams.toString(),
               key: "topic",
               value: searchQuery,
            });

            router.push(newUrl, { scroll: false });
         } else {
            if (pathname === "/companions") {
               const newUrl = removeKeysFromUrlQuery({
                  params: searchParams.toString(),
                  keysToRemove: ["topic"],
               });

            router.push(newUrl, { scroll: false });
            }
         }
      }, 1000);
   }, [searchQuery, router, searchParams, pathname]);
   return (
      <div className="relative border border-black rounded-lg items-center flex gap-2 px-2 py-1 h-fit">
         <Image src="/icons/search.svg" alt="search" width={15} height={15} />
         <input
            placeholder="Search companions"
            className="outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
         />
      </div>
   );
};

export default SearchInput;
