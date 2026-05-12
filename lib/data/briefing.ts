import type { BriefingItem } from "../types";

export const BRIEFING: BriefingItem[] = [
  {
    kind: "bill",
    billId: "hr-2847",
    headline: "Housing supply bill moves to markup as cosponsors cross 80",
    why: "Tracks the Housing interest you selected and may affect zoning in your municipality.",
    tag: "Legislation · Housing",
  },
  {
    kind: "geopolitical",
    headline: "Red Sea shipping disruption pushes refined fuel prices higher",
    why: "Connects to Cost of Living and could ripple to gasoline prices in your region within 14–28 days.",
    tag: "Geopolitics · Energy",
    summary:
      "Tanker rerouting via the Cape of Good Hope adds 10–14 days to typical Gulf-to-Atlantic transit. Refined product spreads have widened 6% week-over-week. Watch for downstream effects on retail gasoline and diesel pricing in the Southeast and Mid-Atlantic.",
  },
  {
    kind: "politician",
    politicianId: "priya-shah",
    headline: "Senator Shah pushes childcare bill to Senate floor",
    why: "You follow Senator Shah and have flagged Childcare as a top interest.",
    tag: "Sponsor activity · S. 1124",
  },
  {
    kind: "issue",
    issueSlug: "ai",
    headline: "AI Accountability Act clears House — Senate path narrowing",
    why: "Tracks the AI & Technology interest and intersects with regulated industries in your state.",
    tag: "Issue update · AI",
  },
  {
    kind: "bill",
    billId: "s-1124",
    headline: "Childcare bill floor vote set for next Tuesday",
    why: "Affects households earning under $250K — your district has the third-highest concentration of eligible families.",
    tag: "Floor activity · S. 1124",
  },
  {
    kind: "politician",
    politicianId: "maya-chen",
    headline: "Rep. Chen launches bipartisan AI procurement caucus",
    why: "You follow Rep. Chen. Bipartisanship score moved from 68 → 71.",
    tag: "Political Athlete · Chen, M.",
  },
  {
    kind: "issue",
    issueSlug: "voting-rights",
    headline: "Three states advance polling-place consolidation bills",
    why: "Voting Rights is on your watchlist. Two of the three states border your registered jurisdiction.",
    tag: "Issue update · Voting Rights",
  },
  {
    kind: "bill",
    billId: "hr-4501",
    headline: "Climate Resilient Infrastructure Act referred to T&I",
    why: "Climate & Energy is a tracked interest. Your county has two qualifying high-risk grid segments.",
    tag: "Legislation · Climate",
  },
];
