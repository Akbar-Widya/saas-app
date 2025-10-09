import React from "react";
import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import Cta from "@/components/Cta";
import { recentSessions } from "@/constants";
import {
   getAllCompanions,
   getRecentUniqueSessions,
} from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";

const Page = async () => {
   const companions = await getAllCompanions({ limit: 6 });
   const recentSessionsCompanions = await getRecentUniqueSessions(10);
   return (
      <main>
         <section className="home-section">
            <CompanionsList
               title="Recently completed sessions"
               companions={recentSessionsCompanions}
               classNames="w-2/3 max-lg:w-full"
            />
            <Cta />
         </section>

         <h1 className="text-2xl underline">Popular Companions</h1>

         <section className="companions-grid">
            {companions.map((companion) => (
               <CompanionCard
                  key={companion.id}
                  { ...companion}
                  color={getSubjectColor(companion.subject)}
               />
            ))}
            {/* <CompanionCard
                  id="456"
                  name="Countsy the Number Wizard"
                  topic="Derivatives & Integrals"
                  subject="Maths"
                  duration={30}
                  color="#e5d0ff"
               />
               <CompanionCard
                  id="789"
                  name="Verba the Vocabulary Builder"
                  topic="English Literature"
                  subject="Language"
                  duration={30}
                  color="#bde7ff"
               />
               <CompanionCard
                  id="246"
                  name="Memo, the Memory Keeper"
                  topic="World Wars: Causes & Effects"
                  subject="History"
                  duration={15}
                  color="#C8FFDF"
               />
               
               <CompanionCard
                  id="357"
                  name="Codey, the Logic Hacker"
                  topic="Intro to If-Else Statements"
                  subject="Coding"
                  duration={30}
                  color="#FFC8E4"
               /> */}
         </section>
      </main>
   );
};

export default Page;
