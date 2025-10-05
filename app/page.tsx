import { Button } from "@/components/ui/button";
import React from "react";
import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import Cta from "@/components/Cta";
import { recentSessions } from "@/constants";

const Page = () => {
   return (
      <main>
         <section className="home-section">
            <CompanionsList
               title="Recently completed sessions"
               companions={recentSessions}
               classNames="w-2/3 max-lg:w-full"
            />
         <Cta />
         </section>

         <h1 className="text-2xl underline">Popular Companions</h1>

         <section className="home-section items-stretch flex-wrap">
               <CompanionCard
                  id="123"
                  name="Neura the Brainy Explorer"
                  topic="Neural Network of the Brain"
                  subject="Science"
                  duration={45}
                  color="#ffda6e"
               />
               <CompanionCard
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
               />
         </section>
      </main>
   );
};

export default Page;
