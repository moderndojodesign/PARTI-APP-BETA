import type { Metadata } from "next";
import { ProfilePanel } from "./profile-panel";

export const metadata: Metadata = {
  title: "Civic Profile",
  description: "Your interests, anchor, and civic lens. Nothing is shared.",
};

export default function ProfilePage() {
  return (
    <div className="container-page py-14 md:py-20">
      <header className="border-b border-rule pb-8">
        <div className="eyebrow mb-3">Civic Profile</div>
        <h1 className="editorial-h2 max-w-[26ch]">
          Your civic profile is yours, and yours alone.
        </h1>
        <p className="mt-4 body max-w-prose">
          PARTI personalizes your daily briefing, bill relevance, and politician
          coverage using the inputs below. In this preview, everything lives in
          your browser — nothing is transmitted, stored on a server, or shared.
        </p>
      </header>

      <div className="mt-10">
        <ProfilePanel />
      </div>
    </div>
  );
}
