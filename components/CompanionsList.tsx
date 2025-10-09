import React from "react";
import {
   Table,
   TableBody,
   TableCaption,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import { cn, getSubjectColor } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface SessionWithCompanion {
   id: number | string
   companions: Companion[]
}

interface CompanionsListProps {
   title: string;
   companions?: Companion[];
   classNames?: string;
   sessions?: SessionWithCompanion[]
}

const CompanionsList = ({
   title,
   companions,
   classNames,
   sessions,
}: CompanionsListProps) => {
     const displayItems = React.useMemo(() => {
    // If we get sessions, use session.id for the key and session.companions for the data
    if (sessions) {
      return sessions.map((session) => ({
        key: session.id,
        data: session.companions,
      }));
    }
    // If we get companions, use companion.id for the key and the companion itself for the data
    if (companions) {
      return companions.map((companion) => ({
        key: companion.id,
        data: companion,
      }));
    }
    // If neither is provided, return an empty array
    return [];
  }, [sessions, companions])
   return (
      <article className={cn("companion-list", classNames)}>
         <h2 className="font-bold text-3xl">{title}</h2>

         <Table>
            <TableHeader>
               <TableRow>
                  <TableHead className="text-lg w-2/3">Lessons</TableHead>
                  <TableHead className="text-lg">Subject</TableHead>
                  <TableHead className="text-lg text-right">Duration</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {displayItems?.map((item) => (
                  <TableRow key={item.key}>
                     <TableCell>
                        <Link href={`/companions/${item.data.id}`}>
                           <div
                              className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden"
                              style={{
                                 backgroundColor: getSubjectColor(item.data.subject),
                              }}
                           >
                              <Image
                                 src={`/icons/${item.data.subject}.svg`}
                                 alt={item.data.subject}
                                 width={35}
                                 height={35}
                              />
                           </div>

                           <div className="flex flex-col gap-2">
                              <p className="font-bold text-2xl">{item.data.name}</p>

                              <p className="text-lg">{item.data.topic}</p>
                           </div>
                        </Link>
                     </TableCell>

                     <TableCell>
                        <div className="subject-badge w-fit max-md:hidden">
                           {item.data.subject}
                        </div>

                        <div
                           className="flex items-center justify-center rounded-lg p-2 w-fit md:hidden"
                           style={{ backgroundColor: getSubjectColor(item.data.subject) }}
                        >
                           <Image
                              src={`/icons/${item.data.subject}.svg`}
                              alt={item.data.subject}
                              width={18}
                              height={18}
                           />
                        </div>
                     </TableCell>

                     <TableCell>
                        <div className="flex items-center gap-2 w-full justify-end">
                           <p className="text-2xl">
                              {item.data.duration} {' '}
                              <span className="max-md:hidden">mins</span>
                           </p>

                           <Image src="/icons/clock.svg" alt="minutes" width={14} height={14} className="md:hidden" />
                        </div>
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </article>
   );
};

export default CompanionsList;
