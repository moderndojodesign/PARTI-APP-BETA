import type { Issue } from "../types";

export const ISSUES: Issue[] = [
  {
    slug: "housing",
    name: "Housing",
    short: "Affordability, zoning, and the geography of home.",
    description:
      "Housing intersects with cost of living, labor mobility, municipal finance, and generational wealth. PARTI tracks zoning reform, tenant protections, supply incentives, and federal lending policy.",
    pulse: "Heating",
  },
  {
    slug: "cost-of-living",
    name: "Cost of Living",
    short: "Inflation, wages, and the price of an ordinary life.",
    description:
      "Track the policy decisions that shape grocery prices, energy bills, rent, healthcare premiums, and household debt — across all levels of government.",
    pulse: "Critical",
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    short: "Access, cost, and the architecture of American care.",
    description:
      "From Medicaid expansion and PBM reform to rural hospitals and pharmaceutical pricing, PARTI surfaces the legislative moves that determine who gets care and at what cost.",
    pulse: "Steady",
  },
  {
    slug: "ai",
    name: "AI & Technology",
    short: "Algorithmic power, governance, and consequence.",
    description:
      "Frontier model regulation, automation policy, data sovereignty, deepfakes, and the institutional response to a generational technological shift.",
    pulse: "Heating",
  },
  {
    slug: "climate",
    name: "Climate & Energy",
    short: "Grid, emissions, resilience, and the long horizon.",
    description:
      "Track renewable deployment, fossil fuel policy, climate adaptation infrastructure, and the geopolitical shifts that accompany an energy transition.",
    pulse: "Heating",
  },
  {
    slug: "education",
    name: "Education",
    short: "Schools, scholarship, and civic literacy.",
    description:
      "From early childhood and K–12 funding formulas to higher education debt and workforce credentialing, PARTI maps the policies that shape how a nation learns.",
    pulse: "Steady",
  },
  {
    slug: "childcare",
    name: "Childcare & Family",
    short: "The economics of raising the next generation.",
    description:
      "Paid leave, dependent credits, childcare subsidies, and the labor market consequences of family policy.",
    pulse: "Heating",
  },
  {
    slug: "small-business",
    name: "Small Business",
    short: "The Main Street layer of American capitalism.",
    description:
      "SBA lending, taxation, regulatory burden, and the policy environment that determines whether new businesses are founded and survive.",
    pulse: "Steady",
  },
  {
    slug: "voting-rights",
    name: "Voting Rights",
    short: "Access, integrity, and the franchise.",
    description:
      "Ballot access, redistricting, election administration, and the underlying machinery of representative democracy.",
    pulse: "Critical",
  },
  {
    slug: "foreign-policy",
    name: "Foreign Policy",
    short: "Alliances, deterrence, trade, and the world beyond.",
    description:
      "PARTI tracks treaties, defense authorizations, sanctions regimes, and the geopolitical decisions that ripple back to local economies.",
    pulse: "Heating",
  },
  {
    slug: "privacy",
    name: "Privacy & Data",
    short: "Surveillance, consent, and informational power.",
    description:
      "Federal privacy frameworks, biometric regulation, data brokers, and the rules that govern who knows what about you.",
    pulse: "Steady",
  },
  {
    slug: "manufacturing",
    name: "Manufacturing & Trade",
    short: "Industrial policy in a multipolar world.",
    description:
      "CHIPS-style investments, tariffs, supply chain resilience, and the return of strategic industrial planning.",
    pulse: "Heating",
  },
];

export function getIssue(slug: string) {
  return ISSUES.find((i) => i.slug === slug);
}
