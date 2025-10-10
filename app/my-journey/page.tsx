import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import {
   getUserCompanions,
   getUserSessions,
} from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from "@radix-ui/react-accordion";
import Image from "next/image";
import { redirect } from "next/navigation";

// tapikan aku nge-map data dari companions (walaupun diambil dari yang diakses terbaru pada riwayat yg tersimpan di tabel session_history)

const Profile = async () => {
   const user = await currentUser();

   if (!user) redirect("/sign-in");
   const companions = await getUserCompanions(user.id);
   const sessionHistory = await getUserSessions(user.id);
   return (
      <main className="min-lg:w-3/4">
         <section className="flex justify-between gap-4 max-sm:flex-col items-center">
            <div className="flex gap-4 items-center">
               <Image
                  src={user?.imageUrl!}
                  alt={user?.firstName!}
                  width={80}
                  height={80}
                  className="max-sm:w-fit rounded-lg"
               />
               <div className="flex flex-col gap-2">
                  <h1>
                     {user.firstName} {user.lastName}
                  </h1>
                  <p className="text-sm text-muted-foreground">
                     {user.emailAddresses[0].emailAddress}
                  </p>
               </div>
            </div>
            <div className="flex gap-4">
               <div className="border border-black rounded-lg p-3 gap-2 flex flex-col h-fit">
                  <div className="flex items-center gap-2">
                     <Image
                        src="/icons/check.svg"
                        alt="checkmark"
                        width={22}
                        height={22}
                     />
                     <p className="text-2xl font-bold">
                        {sessionHistory.length}
                     </p>
                  </div>

                  <p>Lessons Completed</p>
               </div>

               <div className="border border-black rounded-lg p-3 gap-2 flex flex-col h-fit">
                  <div className="flex items-center gap-2">
                     <Image
                        src="/icons/cap.svg"
                        alt="cap"
                        width={22}
                        height={22}
                     />
                     <p className="text-xl font-bold">{companions.length}</p>
                  </div>

                  <p>Companions Created</p>
               </div>
            </div>
         </section>

         <Accordion type="multiple">
            <AccordionItem value="recent">
               <AccordionTrigger className="text-2xl font-bold p-3">
                  Recent Sessions
               </AccordionTrigger>
               <AccordionContent>
                  <CompanionsList
                     title="Recent Sessions"
                     sessions={sessionHistory}
                     classNames="w-2/3 max-lg:w-full"
                  />
               </AccordionContent>
            </AccordionItem>

            <AccordionItem value="companions">
               <AccordionTrigger className="text-2xl font-bold p-3">My Companions {`(${companions.length})`}</AccordionTrigger>
               <AccordionContent>
                  <CompanionsList
                     title="My Companions"
                     companions={companions}
                     classNames="w-2/3 max-lg:w-full"
                  />
               </AccordionContent>
            </AccordionItem>
         </Accordion>
      </main>
   );
};

export default Profile;
