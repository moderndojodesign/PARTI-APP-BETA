import type { Bill } from "../types";

export const BILLS: Bill[] = [
  {
    id: "hr-2847",
    chamber: "House",
    number: "H.R. 2847",
    title: "Affordable Housing & Zoning Modernization Act",
    oneLiner:
      "Federal incentives for cities that legalize duplexes, accessory dwelling units, and small-scale multifamily housing near transit.",
    status: "In Committee",
    introduced: "2026-02-04",
    sponsorId: "amara-okonkwo",
    cosponsors: 84,
    issues: ["housing", "cost-of-living", "infrastructure"],
    summaryPlain:
      "Cities that loosen restrictive single-family zoning near transit corridors become eligible for expanded HUD funding and a new federal supply tax credit. Tenant protections and anti-displacement guardrails are tied to participation.",
    problem:
      "America is short roughly 4–7 million homes. Local zoning rules in most major metros prevent the construction of small-scale multifamily housing — the historical engine of affordability.",
    intended: [
      "Increase housing supply in high-cost metros",
      "Reduce cost-burden for renters and first-time buyers",
      "Tie federal funding to evidence-based local reform",
      "Create construction and skilled-trades jobs",
    ],
    unintended: [
      "Speculative pressure on transit-adjacent neighborhoods",
      "Displacement of legacy residents without adequate guardrails",
      "Strain on local infrastructure during rapid buildout",
      "Friction with municipal control of land use",
    ],
    economicImpact:
      "CBO scoring projects $48–61B in new private construction activity over 5 years, with downward pressure on rents of 4–9% in participating metros by year 7.",
    communityImpact:
      "Most affected: renters earning 60–120% of area median income; first-time buyers; legacy homeowners in transit-adjacent neighborhoods; municipal planning offices.",
    timeline: [
      { date: "Feb 4, 2026", event: "Introduced in House" },
      { date: "Feb 19, 2026", event: "Referred to Financial Services Committee" },
      { date: "Mar 14, 2026", event: "Subcommittee hearing held" },
      { date: "Apr 02, 2026", event: "Markup scheduled" },
    ],
    lobbying: [
      { entity: "National Association of Realtors", amount: "$2.1M", position: "For" },
      { entity: "American Planning Association", amount: "$640K", position: "For" },
      { entity: "Local Government Coalition", amount: "$1.4M", position: "Against" },
      { entity: "Mortgage Bankers Association", amount: "$880K", position: "For" },
    ],
    support: [
      "Up For Growth",
      "AARP Livable Communities",
      "Habitat for Humanity",
      "Strong Towns",
    ],
    opposition: [
      "National League of Cities (with conditions)",
      "Sierra Club (regional chapters)",
      "Homeowners Defense Coalition",
    ],
    related: ["s-1124"],
    constitutional:
      "Tenth Amendment scholars dispute the federal conditioning of HUD funds on local zoning reform. Precedent (South Dakota v. Dole) is permissive, but novel application.",
    history:
      "Closest analog: the 1949 Housing Act's federal-state cost-share for urban renewal — though this bill avoids the demolition-led legacy of that era.",
    sentiment: { for: 54, against: 28, unsure: 18 },
  },
  {
    id: "s-1124",
    chamber: "Senate",
    number: "S. 1124",
    title: "Universal Childcare Access Act",
    oneLiner:
      "Caps childcare costs at 7% of household income for families earning under $250K, funded through a graduated payroll contribution.",
    status: "Floor Vote Pending",
    introduced: "2026-01-22",
    sponsorId: "priya-shah",
    cosponsors: 41,
    issues: ["childcare", "cost-of-living", "labor"],
    summaryPlain:
      "Establishes a federal-state childcare partnership that subsidizes care for families up to 400% of the federal poverty line, sets minimum wages for licensed childcare workers, and funds workforce development for early childhood educators.",
    problem:
      "Average annual childcare costs exceed in-state tuition in 33 states. Childcare-driven labor force exits cost the U.S. economy an estimated $122B annually.",
    intended: [
      "Restore labor force participation, especially for mothers",
      "Improve early childhood developmental outcomes",
      "Raise wages and credentials for childcare workers",
      "Reduce household cost burden",
    ],
    unintended: [
      "Provider capacity shortfalls during ramp-up years",
      "Consolidation pressure on small in-home providers",
      "Possible upward price pressure absent supply expansion",
      "Variation in state implementation quality",
    ],
    economicImpact:
      "CBO projects net positive GDP contribution of 0.4–0.7% within 8 years, driven by labor force re-entry. 10-year cost: ~$340B, partly offset by payroll contributions and tax receipts.",
    communityImpact:
      "Most affected: working parents earning 100–400% FPL; childcare workers (predominantly women, disproportionately women of color); small in-home daycare operators.",
    timeline: [
      { date: "Jan 22, 2026", event: "Introduced in Senate" },
      { date: "Feb 8, 2026", event: "HELP Committee markup" },
      { date: "Mar 1, 2026", event: "Reported favorably 13–9" },
      { date: "Apr 18, 2026", event: "Floor vote scheduled" },
    ],
    lobbying: [
      { entity: "First Five Years Fund", amount: "$1.8M", position: "For" },
      { entity: "Service Employees International Union", amount: "$2.3M", position: "For" },
      { entity: "National Federation of Independent Business", amount: "$1.1M", position: "Against" },
      { entity: "U.S. Chamber of Commerce", amount: "$3.4M", position: "Against" },
    ],
    support: ["MomsRising", "Center for American Progress", "Zero to Three", "AFT"],
    opposition: ["Heritage Foundation", "Americans for Tax Reform"],
    related: ["hr-2847"],
    sentiment: { for: 61, against: 24, unsure: 15 },
  },
  {
    id: "hr-3902",
    chamber: "House",
    number: "H.R. 3902",
    title: "AI Accountability & Transparency Act",
    oneLiner:
      "Mandates third-party audits, training data disclosures, and incident reporting for frontier AI models deployed in federal, financial, and healthcare contexts.",
    status: "Passed Chamber",
    introduced: "2026-03-11",
    sponsorId: "maya-chen",
    cosponsors: 156,
    issues: ["ai", "technology", "privacy"],
    summaryPlain:
      "Creates a federal registry for frontier AI systems above a compute threshold, requires structured pre-deployment evaluations for use in regulated sectors, and establishes a public incident database. Protects open-source model development below the threshold.",
    problem:
      "Frontier AI systems are increasingly integrated into consequential decisions (lending, hiring, medical triage, government services) without standardized auditability or incident reporting.",
    intended: [
      "Increase auditability and accountability of frontier systems",
      "Create comparable safety evaluations across labs",
      "Protect open-source innovation below the threshold",
      "Establish trusted incident-reporting infrastructure",
    ],
    unintended: [
      "Regulatory capture by largest model providers",
      "Compliance burden creep into smaller deployments",
      "Threshold gaming via architectural choices",
      "Chilling effects on academic research",
    ],
    economicImpact:
      "Industry estimates $1.4–2.8B in initial compliance costs across regulated deployers, with offsetting demand for AI assurance services.",
    communityImpact:
      "Most affected: AI labs operating at frontier scale; regulated industries deploying AI; auditors and assurance professionals; researchers in adjacent academic fields.",
    timeline: [
      { date: "Mar 11, 2026", event: "Introduced in House" },
      { date: "Mar 25, 2026", event: "E&C Committee hearing" },
      { date: "Apr 09, 2026", event: "Passed Committee 38–17" },
      { date: "May 02, 2026", event: "Passed House 287–143" },
    ],
    lobbying: [
      { entity: "Center for AI Safety", amount: "$1.2M", position: "For" },
      { entity: "Software & Information Industry Association", amount: "$2.4M", position: "Against" },
      { entity: "Mozilla Foundation", amount: "$420K", position: "For" },
      { entity: "Business Roundtable Tech", amount: "$1.9M", position: "Against" },
    ],
    support: [
      "Center for AI Safety",
      "Mozilla Foundation",
      "AFL-CIO Technology Institute",
      "Future of Life Institute",
    ],
    opposition: [
      "Software & Information Industry Association (with conditions)",
      "TechNet (with conditions)",
    ],
    related: [],
    constitutional:
      "First Amendment scrutiny over training data disclosure requirements; commerce clause basis is robust.",
    sentiment: { for: 58, against: 22, unsure: 20 },
  },
  {
    id: "hr-4501",
    chamber: "House",
    number: "H.R. 4501",
    title: "Climate Resilient Infrastructure Act",
    oneLiner:
      "Federal cost-share for state and tribal projects that harden grid, water, and transportation infrastructure against accelerating climate risk.",
    status: "In Committee",
    introduced: "2026-03-28",
    sponsorId: "amara-okonkwo",
    cosponsors: 92,
    issues: ["climate", "infrastructure", "energy"],
    summaryPlain:
      "Authorizes $180B over 8 years for grid hardening, water system modernization, wildfire defense, and climate-adaptive transportation projects. Includes a 70% federal cost-share for high-risk rural jurisdictions.",
    problem:
      "U.S. infrastructure is increasingly being engineered to climate norms that no longer exist. The cost of reactive disaster spending now exceeds the cost of proactive resilience investment.",
    intended: [
      "Reduce frequency and severity of climate-driven outages",
      "Lower long-run disaster relief expenditure",
      "Build domestic climate adaptation industry",
      "Improve outcomes in rural and tribal jurisdictions",
    ],
    unintended: [
      "Misallocation toward politically favored projects",
      "Inflationary pressure on construction labor markets",
      "Maintenance backlog if operations funding lags",
      "Federal entanglement in local utility regulation",
    ],
    economicImpact:
      "OMB scoring estimates net positive return on a 15-year horizon, with $1 of pre-disaster investment offsetting $4–11 of post-disaster spending.",
    communityImpact:
      "Most affected: rural electric cooperatives; flood- and wildfire-prone communities; tribal nations; municipal water utilities; trades workers.",
    timeline: [
      { date: "Mar 28, 2026", event: "Introduced in House" },
      { date: "Apr 15, 2026", event: "Referred to T&I Committee" },
    ],
    lobbying: [
      { entity: "American Public Power Association", amount: "$1.6M", position: "For" },
      { entity: "Edison Electric Institute", amount: "$2.2M", position: "For" },
      { entity: "Taxpayers Against Earmarks", amount: "$540K", position: "Against" },
    ],
    support: [
      "American Society of Civil Engineers",
      "National Tribal Energy Council",
      "Western Governors Association",
    ],
    opposition: ["Heritage Foundation", "Americans for Tax Reform"],
    related: ["hr-2847"],
    sentiment: { for: 49, against: 32, unsure: 19 },
  },
  {
    id: "s-887",
    chamber: "Senate",
    number: "S. 887",
    title: "Small Business Tax Relief & Regulatory Streamlining Act",
    oneLiner:
      "Raises Section 179 expensing limits, exempts small employers from certain federal regulatory triggers, and modernizes SBA lending.",
    status: "In Committee",
    introduced: "2026-02-15",
    sponsorId: "daniel-reeves",
    cosponsors: 34,
    issues: ["small-business", "taxation", "entrepreneurship"],
    summaryPlain:
      "Permanently raises Section 179 expensing to $2M, indexes thresholds to inflation, exempts businesses under 50 employees from select federal reporting triggers, and modernizes the SBA 7(a) loan program.",
    problem:
      "Small businesses face disproportionate regulatory and tax-compliance costs relative to revenue, with measurable effects on new firm formation and survival.",
    intended: [
      "Lower compliance and tax friction for small employers",
      "Increase new firm formation",
      "Modernize SBA lending infrastructure",
      "Improve capital access for under-banked geographies",
    ],
    unintended: [
      "Threshold-gaming via corporate restructuring",
      "Reduced visibility into small employer practices",
      "Federal revenue loss not fully offset",
      "Disparate benefit by sector and region",
    ],
    economicImpact:
      "JCT scoring estimates $94B in foregone revenue over 10 years; SBA modeling projects 1.1–1.6% lift in new firm formation in years 3–6.",
    communityImpact:
      "Most affected: firms with 5–49 employees; sole proprietors with capital expenditures; community development financial institutions; SBA-eligible borrowers.",
    timeline: [
      { date: "Feb 15, 2026", event: "Introduced in Senate" },
      { date: "Mar 04, 2026", event: "Referred to Finance Committee" },
      { date: "Apr 22, 2026", event: "Hearing scheduled" },
    ],
    lobbying: [
      { entity: "National Federation of Independent Business", amount: "$1.9M", position: "For" },
      { entity: "U.S. Chamber of Commerce", amount: "$2.6M", position: "For" },
      { entity: "Economic Policy Institute", amount: "$340K", position: "Against" },
    ],
    support: ["NFIB", "Main Street Alliance (with amendments)", "ICBA"],
    opposition: ["Economic Policy Institute", "Center on Budget and Policy Priorities"],
    related: [],
    sentiment: { for: 47, against: 33, unsure: 20 },
  },
];

export function getBill(id: string) {
  return BILLS.find((b) => b.id === id);
}
