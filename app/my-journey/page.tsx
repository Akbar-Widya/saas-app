import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import {
   getAllUserCompanions,
   getAllUserSessions,
} from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

// tapikan aku nge-map data dari companions (walaupun diambil dari yang diakses terbaru pada riwayat yg tersimpan di tabel session_history)

const Profile = async () => {
   const user = await currentUser();
   const emailAddress = user?.emailAddresses[0].emailAddress;
   // const completedLessons = await fetchLatestCompanionsForCurrentUser();
   const sessions = await getAllUserSessions(user?.id!)
   const companions = await getAllUserCompanions(user?.id!);
   return (
      <main>
         <article>
            <div className="flex justify-between gap-3">
               <div className="flex items-center gap-2">
                  <div>
                     <Image
                        src={user?.imageUrl!}
                        alt={user?.firstName!}
                        width={80}
                        height={80}
                        className="max-sm:w-fit rounded-lg"
                     />
                  </div>

                  <div>
                     <p>{user?.firstName!}</p>
                     <p>{emailAddress}</p>
                  </div>
               </div>

               <div className="flex gap-3">
                  <div className="outline p-4 rounded-md">
                     <div className="flex items-center gap-2">
                        <Image
                           src="/icons/check.svg"
                           alt="check"
                           width={20}
                           height={20}
                        />
                        <p className="text-xl font-bold">
                           {sessions.length}
                        </p>
                     </div>

                     <p>Lessons Completed</p>
                  </div>

                  <div className="outline p-4 rounded-md">
                     <div className="flex items-center gap-2">
                        <Image
                           src="/icons/cap.svg"
                           alt="check"
                           width={20}
                           height={20}
                        />
                        <p className="text-xl font-bold">
                           {companions.length}
                        </p>
                     </div>

                     <p>Companions Created</p>
                  </div>
               </div>
            </div>
         </article>

         <CompanionsList
            title="Completed Lessons"
            sessions={sessions}
            classNames="w-2/3 max-lg:w-full"
         />

         <h1 className="text-2xl underline">Created Companions</h1>

         <section className="companions-grid">
            {companions.map((companion) => (
               <CompanionCard
                  key={companion.id}
                  { ...companion}
                  color={getSubjectColor(companion.subject)}
               />
            ))}
         </section>
      </main>
   );
};

export default Profile;
