import type { Metadata } from "next";
import { BriefingHeader } from "@/components/briefing-header";
import { BriefingList } from "@/components/briefing-list";
import { BriefingSidebar } from "@/components/briefing-sidebar";

export const metadata: Metadata = {
  title: "Daily Briefing",
  description: "Your personalized civic briefing — calm, contextualized, useful.",
};

export default function BriefingPage() {
  return (
    <div className="container-page py-14 md:py-20">
      <BriefingHeader />
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
        <BriefingList />
        <aside className="space-y-8 lg:sticky lg:top-20 self-start">
          <BriefingSidebar />
        </aside>
      </div>
    </div>
  );
}
