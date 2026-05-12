export type Party = "D" | "R" | "I";
export type Chamber = "House" | "Senate";

export type IssueTag =
  | "housing"
  | "cost-of-living"
  | "healthcare"
  | "immigration"
  | "education"
  | "labor"
  | "infrastructure"
  | "technology"
  | "ai"
  | "criminal-justice"
  | "climate"
  | "agriculture"
  | "entrepreneurship"
  | "energy"
  | "small-business"
  | "transportation"
  | "public-safety"
  | "voting-rights"
  | "childcare"
  | "foreign-policy"
  | "manufacturing"
  | "trade"
  | "taxation"
  | "privacy";

export type Issue = {
  slug: IssueTag;
  name: string;
  short: string;
  description: string;
  pulse: "Cooling" | "Steady" | "Heating" | "Critical";
};

export type Bill = {
  id: string;
  chamber: Chamber;
  number: string;
  title: string;
  oneLiner: string;
  status:
    | "Introduced"
    | "In Committee"
    | "Floor Vote Pending"
    | "Passed Chamber"
    | "Conference"
    | "Awaiting Signature"
    | "Enacted"
    | "Stalled";
  introduced: string;
  sponsorId: string;
  cosponsors: number;
  issues: IssueTag[];
  summaryPlain: string;
  problem: string;
  intended: string[];
  unintended: string[];
  economicImpact: string;
  communityImpact: string;
  timeline: { date: string; event: string }[];
  lobbying: { entity: string; amount: string; position: "For" | "Against" }[];
  support: string[];
  opposition: string[];
  related: string[];
  constitutional?: string;
  history?: string;
  sentiment: { for: number; against: number; unsure: number };
};

export type AthleteScore = {
  promiseFulfillment: number;
  bipartisanship: number;
  constituentApproval: number;
  attendance: number;
  billSuccess: number;
  responsiveness: number;
};

export type Politician = {
  id: string;
  name: string;
  party: Party;
  role: string;
  state: string;
  district?: string;
  yearsInOffice: number;
  bio: string;
  committees: string[];
  topIssues: IssueTag[];
  scores: AthleteScore;
  promises: { label: string; status: "Kept" | "Broken" | "Partial" | "Pending" }[];
  topDonors: { name: string; sector: string; amount: string }[];
  recentVotes: { bill: string; vote: "Yea" | "Nay" | "Present" | "No Vote" }[];
  ethicalNotes?: string;
  monogramColor: string;
};

export type BriefingItem =
  | {
      kind: "bill";
      billId: string;
      headline: string;
      why: string;
      tag: string;
    }
  | {
      kind: "politician";
      politicianId: string;
      headline: string;
      why: string;
      tag: string;
    }
  | {
      kind: "issue";
      issueSlug: IssueTag;
      headline: string;
      why: string;
      tag: string;
    }
  | {
      kind: "geopolitical";
      headline: string;
      why: string;
      tag: string;
      summary: string;
    };
