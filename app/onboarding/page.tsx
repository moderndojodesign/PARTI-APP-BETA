import type { Metadata } from "next";
import { OnboardingFlow } from "./onboarding-flow";

export const metadata: Metadata = {
  title: "Take Part",
  description: "Tell PARTI what matters to you — not which party you belong to.",
};

export default function OnboardingPage() {
  return (
    <div className="container-page py-16 md:py-24">
      <div className="eyebrow mb-6">Onboarding · No account required</div>
      <h1 className="editorial-h2 max-w-[20ch]">
        We don't ask which side you're on. We ask what matters to you.
      </h1>
      <p className="mt-5 body max-w-prose">
        Three short questions. PARTI uses your answers to personalize your daily
        briefing, bill summaries, and political coverage. Nothing here is stored
        in this preview.
      </p>

      <div className="mt-12">
        <OnboardingFlow />
      </div>
    </div>
  );
}
