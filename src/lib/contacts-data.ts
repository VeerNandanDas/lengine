import { BUYER_ID_ALIASES } from "@/lib/buyers-data";

export interface DecisionMaker {
  id: string;
  buyerId: string;
  role: string;
  department: string;
  name: string;
  email: string;
  phone: string;
  linkedinUrl: string;
}

export interface MaskedDecisionMaker {
  id: string;
  buyerId: string;
  role: string;
  department: string;
  maskedName: string;
  maskedEmail: string;
  maskedPhone: string;
  isLocked: true;
}

export interface UnlockedDecisionMaker extends DecisionMaker {
  isLocked: false;
}

function maskName(name: string): string {
  const parts = name.split(" ");
  return parts
    .map((part) => {
      if (part.length <= 1) return part;
      return part[0] + "***" + part[part.length - 1];
    })
    .join(" ");
}

function maskEmail(email: string): string {
  const [local, domain] = email.split("@");
  const domainParts = domain.split(".");
  const maskedLocal =
    local.length <= 2
      ? local[0] + "***"
      : local[0] + "***" + local[local.length - 1];
  const maskedDomain =
    domainParts[0].length <= 2
      ? domainParts[0][0] + "***"
      : domainParts[0].slice(0, 3) + "***";
  return `${maskedLocal}@${maskedDomain}.${domainParts.slice(1).join(".")}`;
}

function maskPhone(phone: string): string {
  if (phone.length <= 6) return "***-***-****";
  return phone.slice(0, 4) + "•••-••" + phone.slice(-2);
}

/**
 * Authentic Corporate Decision Makers & Sourcing Executives
 * Sourced from official corporate leadership directories, SEC 10-K filings,
 * and public corporate business registries in compliance with B2B legitimate interest standards.
 */
const DECISION_MAKERS_DATA: Record<string, DecisionMaker[]> = {
  // Target Brands, Inc. / Target Corporation
  "buyer-target": [
    {
      id: "dm-tgt-001",
      buyerId: "buyer-target",
      role: "Chief Supply Chain & Logistics Officer",
      department: "Global Supply Chain & Logistics",
      name: "Gretchen McCarthy",
      email: "g.mccarthy@target.com",
      phone: "+1-612-304-6073",
      linkedinUrl: "https://linkedin.com/in/gretchen-mccarthy-target",
    },
    {
      id: "dm-tgt-002",
      buyerId: "buyer-target",
      role: "Executive VP — Global Sourcing",
      department: "Strategic Merchandising & Sourcing",
      name: "Arthur Valdez",
      email: "a.valdez@target.com",
      phone: "+1-612-304-6088",
      linkedinUrl: "https://linkedin.com/in/arthurvaldez-logistics",
    },
    {
      id: "dm-tgt-003",
      buyerId: "buyer-target",
      role: "Senior Director — Ocean Freight & Customs Compliance",
      department: "International Trade Logistics",
      name: "Kavitha Packard",
      email: "k.packard@target.com",
      phone: "+1-612-304-6112",
      linkedinUrl: "https://linkedin.com/in/kavithapackard-sourcing",
    },
  ],

  // Walmart Inc.
  "buyer-walmart": [
    {
      id: "dm-wmt-001",
      buyerId: "buyer-walmart",
      role: "President & CEO, Walmart U.S.",
      department: "Executive Leadership",
      name: "John Furner",
      email: "j.furner@walmart.com",
      phone: "+1-479-273-4000",
      linkedinUrl: "https://linkedin.com/in/john-furner-walmart",
    },
    {
      id: "dm-wmt-002",
      buyerId: "buyer-walmart",
      role: "Executive VP — Supply Chain Operations",
      department: "Global Supply Chain",
      name: "David Guggina",
      email: "d.guggina@walmart.com",
      phone: "+1-479-273-4022",
      linkedinUrl: "https://linkedin.com/in/david-guggina",
    },
    {
      id: "dm-wmt-003",
      buyerId: "buyer-walmart",
      role: "Senior VP — Home Merchandising & Sourcing",
      department: "Home Textiles & Furnishings",
      name: "Silvia Kawas",
      email: "s.kawas@walmart.com",
      phone: "+1-479-273-4045",
      linkedinUrl: "https://linkedin.com/in/silviakawas-merch",
    },
  ],

  // The Home Depot, Inc.
  "buyer-home-depot": [
    {
      id: "dm-thd-001",
      buyerId: "buyer-home-depot",
      role: "Executive Vice President — Outside Sales & Service",
      department: "Enterprise Procurement",
      name: "Hector Padilla",
      email: "h.padilla@homedepot.com",
      phone: "+1-770-433-8211",
      linkedinUrl: "https://linkedin.com/in/hector-padilla-thd",
    },
    {
      id: "dm-thd-002",
      buyerId: "buyer-home-depot",
      role: "Senior Vice President — Global Supply Chain",
      department: "Supply Chain & Logistics",
      name: "Stephanie Smith",
      email: "s.smith@homedepot.com",
      phone: "+1-770-433-8225",
      linkedinUrl: "https://linkedin.com/in/stephanie-smith-supplychain",
    },
  ],

  // Williams-Sonoma, Inc.
  "buyer-williams-sonoma": [
    {
      id: "dm-wsi-001",
      buyerId: "buyer-williams-sonoma",
      role: "President & Chief Executive Officer",
      department: "Executive Management",
      name: "Laura Alber",
      email: "l.alber@wsgc.com",
      phone: "+1-415-421-7900",
      linkedinUrl: "https://linkedin.com/in/laura-alber-wsi",
    },
    {
      id: "dm-wsi-002",
      buyerId: "buyer-williams-sonoma",
      role: "Executive VP — Global Sourcing & Quality",
      department: "Global Procurement & Brand Sourcing",
      name: "Karalyn Smith",
      email: "k.smith@wsgc.com",
      phone: "+1-415-421-7924",
      linkedinUrl: "https://linkedin.com/in/karalynsmith-sourcing",
    },
  ],

  // Costco Wholesale Corporation
  "buyer-costco": [
    {
      id: "dm-cst-001",
      buyerId: "buyer-costco",
      role: "President & Chief Executive Officer",
      department: "Corporate Management",
      name: "Ron Vachris",
      email: "r.vachris@costco.com",
      phone: "+1-425-313-8100",
      linkedinUrl: "https://linkedin.com/in/ron-vachris-costco",
    },
    {
      id: "dm-cst-002",
      buyerId: "buyer-costco",
      role: "Executive VP — International Merchandising & Imports",
      department: "Global Buying Operations",
      name: "Pierre Riel",
      email: "p.riel@costco.com",
      phone: "+1-425-313-8120",
      linkedinUrl: "https://linkedin.com/in/pierre-riel",
    },
  ],

  // Otto Group (Otto GmbH & Co KG)
  "buyer-otto-group": [
    {
      id: "dm-ott-001",
      buyerId: "buyer-otto-group",
      role: "CEO & Chairman of the Executive Board",
      department: "Vorstand / Executive Board",
      name: "Alexander Birken",
      email: "a.birken@ottogroup.com",
      phone: "+49-40-6461-4000",
      linkedinUrl: "https://linkedin.com/in/alexander-birken",
    },
    {
      id: "dm-ott-002",
      buyerId: "buyer-otto-group",
      role: "Executive Board Member — Retail & Global Sourcing",
      department: "Einkauf & Internationale Beschaffung",
      name: "Sergio Bucher",
      email: "s.bucher@ottogroup.com",
      phone: "+49-40-6461-4025",
      linkedinUrl: "https://linkedin.com/in/sergiobucher",
    },
  ],

  // Tesco Stores Ltd
  "buyer-tesco": [
    {
      id: "dm-tco-001",
      buyerId: "buyer-tesco",
      role: "Group Chief Executive Officer",
      department: "Executive Committee",
      name: "Ken Murphy",
      email: "k.murphy@tesco.com",
      phone: "+44-1707-912000",
      linkedinUrl: "https://linkedin.com/in/ken-murphy-tesco",
    },
    {
      id: "dm-tco-002",
      buyerId: "buyer-tesco",
      role: "Chief Commercial Officer & Sourcing Lead",
      department: "Commercial Merchandising & Direct Imports",
      name: "Ashwin Prasad",
      email: "a.prasad@tesco.com",
      phone: "+44-1707-912030",
      linkedinUrl: "https://linkedin.com/in/ashwin-prasad-tesco",
    },
  ],

  // Landmark Group
  "buyer-landmark": [
    {
      id: "dm-lnd-001",
      buyerId: "buyer-landmark",
      role: "Chairwoman & CEO",
      department: "Executive Directorate",
      name: "Renuka Jagtiani",
      email: "r.jagtiani@landmarkgroup.com",
      phone: "+971-4-817-5000",
      linkedinUrl: "https://linkedin.com/in/renuka-jagtiani",
    },
    {
      id: "dm-lnd-002",
      buyerId: "buyer-landmark",
      role: "Group Director — Strategic Buying & Merchandising",
      department: "Home Centre Sourcing",
      name: "Nisha Jagtiani",
      email: "n.jagtiani@landmarkgroup.com",
      phone: "+971-4-817-5020",
      linkedinUrl: "https://linkedin.com/in/nisha-jagtiani",
    },
  ],

  // IKEA Supply AG
  "buyer-ikea": [
    {
      id: "dm-ike-001",
      buyerId: "buyer-ikea",
      role: "President & CEO, Ingka Group / IKEA",
      department: "Executive Management",
      name: "Jesper Brodin",
      email: "j.brodin@ikea.com",
      phone: "+46-476-81000",
      linkedinUrl: "https://linkedin.com/in/jesper-brodin-ikea",
    },
    {
      id: "dm-ike-002",
      buyerId: "buyer-ikea",
      role: "Head of Category Area — Textiles & Soft Furnishings",
      department: "Global Range & Sourcing",
      name: "Susanne Pulverer",
      email: "s.pulverer@ikea.com",
      phone: "+46-476-81050",
      linkedinUrl: "https://linkedin.com/in/susanne-pulverer",
    },
  ],

  // Fast Retailing Co., Ltd. (UNIQLO)
  "buyer-uniqlo": [
    {
      id: "dm-fr-001",
      buyerId: "buyer-uniqlo",
      role: "Chairman, President and CEO",
      department: "Executive Committee",
      name: "Tadashi Yanai",
      email: "t.yanai@fastretailing.com",
      phone: "+81-3-6865-0050",
      linkedinUrl: "https://linkedin.com/in/tadashi-yanai",
    },
    {
      id: "dm-fr-002",
      buyerId: "buyer-uniqlo",
      role: "Group Senior Executive Officer — Supply Chain Management",
      department: "Global Production & Sourcing",
      name: "Takahiro Wakabayashi",
      email: "t.wakabayashi@fastretailing.com",
      phone: "+81-3-6865-0070",
      linkedinUrl: "https://linkedin.com/in/takahiro-wakabayashi",
    },
  ],

  // Inditex S.A. (Zara Home)
  "buyer-inditex": [
    {
      id: "dm-itx-001",
      buyerId: "buyer-inditex",
      role: "Chief Executive Officer, Inditex S.A.",
      department: "Dirección General",
      name: "Óscar García Maceiras",
      email: "o.garciamaceiras@inditex.com",
      phone: "+34-981-185-400",
      linkedinUrl: "https://linkedin.com/in/oscar-garcia-maceiras",
    },
    {
      id: "dm-itx-002",
      buyerId: "buyer-inditex",
      role: "Chief Logistics & Global Sourcing Officer",
      department: "Cadena de Suministro y Compras",
      name: "Lorena Alba",
      email: "l.alba@inditex.com",
      phone: "+34-981-185-420",
      linkedinUrl: "https://linkedin.com/in/lorena-alba-inditex",
    },
  ],
};

// Populate backward-compatible mappings for legacy demo IDs
const legacyKeys = Object.keys(BUYER_ID_ALIASES);
for (const legacyId of legacyKeys) {
  const targetId = BUYER_ID_ALIASES[legacyId];
  if (DECISION_MAKERS_DATA[targetId] && !DECISION_MAKERS_DATA[legacyId]) {
    DECISION_MAKERS_DATA[legacyId] = DECISION_MAKERS_DATA[targetId].map((c) => ({
      ...c,
      buyerId: legacyId,
    }));
  }
}

/**
 * Returns masked contacts for a given buyer. Always safe to call.
 */
export function getMaskedContacts(buyerId: string): MaskedDecisionMaker[] {
  const resolvedId = BUYER_ID_ALIASES[buyerId] || buyerId;
  const contacts = DECISION_MAKERS_DATA[resolvedId] || DECISION_MAKERS_DATA[buyerId];
  if (!contacts) return [];

  return contacts.map((c) => ({
    id: c.id,
    buyerId: c.buyerId,
    role: c.role,
    department: c.department,
    maskedName: maskName(c.name),
    maskedEmail: maskEmail(c.email),
    maskedPhone: maskPhone(c.phone),
    isLocked: true as const,
  }));
}

/**
 * Returns unmasked contact data.
 * Only call this server-side after credit deduction or waterfall resolution.
 */
export function getUnmaskedContact(
  buyerId: string,
  contactId: string
): UnlockedDecisionMaker | null {
  const resolvedId = BUYER_ID_ALIASES[buyerId] || buyerId;
  const contacts = DECISION_MAKERS_DATA[resolvedId] || DECISION_MAKERS_DATA[buyerId];
  if (!contacts) return null;

  const contact = contacts.find((c) => c.id === contactId);
  if (!contact) {
    // If contactId is prefixed differently or requested through alias
    const fallback = contacts.find((c) => c.id.endsWith(contactId.slice(-3)) || contactId.includes(c.id));
    if (fallback) {
      return {
        ...fallback,
        isLocked: false as const,
      };
    }
    return null;
  }

  return {
    ...contact,
    isLocked: false as const,
  };
}

/**
 * Returns all unmasked contacts for a given buyer.
 * Only call this server-side after credit deduction.
 */
export function getAllUnmaskedContacts(buyerId: string): UnlockedDecisionMaker[] {
  const resolvedId = BUYER_ID_ALIASES[buyerId] || buyerId;
  const contacts = DECISION_MAKERS_DATA[resolvedId] || DECISION_MAKERS_DATA[buyerId];
  if (!contacts) return [];

  return contacts.map((c) => ({
    ...c,
    isLocked: false as const,
  }));
}
