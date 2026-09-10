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
  // Show first 4 chars and last 2, mask the rest
  if (phone.length <= 6) return "***-***-****";
  return phone.slice(0, 4) + "•••-••" + phone.slice(-2);
}

/**
 * Mock decision maker contacts for each buyer.
 * In production, this would come from an Apollo.io-style API.
 */
const DECISION_MAKERS_DATA: Record<string, DecisionMaker[]> = {
  "buyer-pac-tex": [
    {
      id: "dm-pt-001",
      buyerId: "buyer-pac-tex",
      role: "VP of Procurement",
      department: "Supply Chain & Procurement",
      name: "James Whitfield",
      email: "j.whitfield@pacifictextiles.com",
      phone: "+1-310-889-4201",
      linkedinUrl: "https://linkedin.com/in/jameswhitfield",
    },
    {
      id: "dm-pt-002",
      buyerId: "buyer-pac-tex",
      role: "Director of Supply Chain",
      department: "Operations",
      name: "Linda Matsumoto",
      email: "l.matsumoto@pacifictextiles.com",
      phone: "+1-310-889-4215",
      linkedinUrl: "https://linkedin.com/in/lindamatsumoto",
    },
    {
      id: "dm-pt-003",
      buyerId: "buyer-pac-tex",
      role: "Senior Buyer — Textiles",
      department: "Merchandising",
      name: "Raj Patel",
      email: "r.patel@pacifictextiles.com",
      phone: "+1-310-889-4230",
      linkedinUrl: "https://linkedin.com/in/rajpatel-procurement",
    },
  ],
  "buyer-meridian-nordic": [
    {
      id: "dm-mn-001",
      buyerId: "buyer-meridian-nordic",
      role: "Head of Procurement",
      department: "Einkauf & Beschaffung",
      name: "Markus Schreiber",
      email: "m.schreiber@meridian-nordic.de",
      phone: "+49-40-2891-5502",
      linkedinUrl: "https://linkedin.com/in/markusschreiber",
    },
    {
      id: "dm-mn-002",
      buyerId: "buyer-meridian-nordic",
      role: "Logistics Director",
      department: "Supply Chain & Logistics",
      name: "Astrid Lindgren",
      email: "a.lindgren@meridian-nordic.de",
      phone: "+49-40-2891-5518",
      linkedinUrl: "https://linkedin.com/in/astridlindgren-scm",
    },
  ],
  "buyer-al-mansoor": [
    {
      id: "dm-am-001",
      buyerId: "buyer-al-mansoor",
      role: "Chief Procurement Officer",
      department: "Strategic Sourcing",
      name: "Khalid Al-Rashidi",
      email: "k.alrashidi@almansoor-gulf.ae",
      phone: "+971-4-881-3901",
      linkedinUrl: "https://linkedin.com/in/khalidalrashidi",
    },
    {
      id: "dm-am-002",
      buyerId: "buyer-al-mansoor",
      role: "Supply Chain Manager",
      department: "Operations & Distribution",
      name: "Priya Nair",
      email: "p.nair@almansoor-gulf.ae",
      phone: "+971-4-881-3915",
      linkedinUrl: "https://linkedin.com/in/priyanair-scm",
    },
    {
      id: "dm-am-003",
      buyerId: "buyer-al-mansoor",
      role: "Head of Commodity Trading",
      department: "Trading & Commercial",
      name: "Omar Farouk",
      email: "o.farouk@almansoor-gulf.ae",
      phone: "+971-4-881-3928",
      linkedinUrl: "https://linkedin.com/in/omarfarouk-trade",
    },
  ],
  "buyer-britannia": [
    {
      id: "dm-bh-001",
      buyerId: "buyer-britannia",
      role: "Procurement Director",
      department: "Buying & Sourcing",
      name: "Eleanor Whitmore",
      email: "e.whitmore@britanniahome.co.uk",
      phone: "+44-20-7946-0831",
      linkedinUrl: "https://linkedin.com/in/eleanorwhitmore",
    },
    {
      id: "dm-bh-002",
      buyerId: "buyer-britannia",
      role: "Sustainability & Sourcing Lead",
      department: "Ethical Trade",
      name: "David Chen",
      email: "d.chen@britanniahome.co.uk",
      phone: "+44-20-7946-0845",
      linkedinUrl: "https://linkedin.com/in/davidchen-sustainability",
    },
  ],
  "buyer-yamato": [
    {
      id: "dm-yg-001",
      buyerId: "buyer-yamato",
      role: "General Manager — Imports",
      department: "International Procurement",
      name: "Takeshi Nakamura",
      email: "t.nakamura@yamato-global.co.jp",
      phone: "+81-3-5421-8801",
      linkedinUrl: "https://linkedin.com/in/takeshinakamura",
    },
    {
      id: "dm-yg-002",
      buyerId: "buyer-yamato",
      role: "Senior Sourcing Specialist",
      department: "Textile Division",
      name: "Yuki Tanaka",
      email: "y.tanaka@yamato-global.co.jp",
      phone: "+81-3-5421-8819",
      linkedinUrl: "https://linkedin.com/in/yukitanaka-sourcing",
    },
  ],
  "buyer-chesapeake": [
    {
      id: "dm-cr-001",
      buyerId: "buyer-chesapeake",
      role: "SVP of Merchandising",
      department: "Product & Merchandising",
      name: "Sarah Mitchell",
      email: "s.mitchell@chesapeakeretail.com",
      phone: "+1-973-201-4410",
      linkedinUrl: "https://linkedin.com/in/sarahmitchell-merch",
    },
    {
      id: "dm-cr-002",
      buyerId: "buyer-chesapeake",
      role: "Director of Global Sourcing",
      department: "Supply Chain",
      name: "Michael O'Brien",
      email: "m.obrien@chesapeakeretail.com",
      phone: "+1-973-201-4425",
      linkedinUrl: "https://linkedin.com/in/michaelobrien-sourcing",
    },
    {
      id: "dm-cr-003",
      buyerId: "buyer-chesapeake",
      role: "Import Compliance Manager",
      department: "Trade Compliance",
      name: "Angela Reyes",
      email: "a.reyes@chesapeakeretail.com",
      phone: "+1-973-201-4438",
      linkedinUrl: "https://linkedin.com/in/angelareyes-compliance",
    },
  ],
  "buyer-eurotex": [
    {
      id: "dm-ef-001",
      buyerId: "buyer-eurotex",
      role: "Direttore Acquisti",
      department: "Ufficio Acquisti",
      name: "Marco Bianchi",
      email: "m.bianchi@eurotex-fashion.it",
      phone: "+39-02-8901-2201",
      linkedinUrl: "https://linkedin.com/in/marcobianchi-buying",
    },
    {
      id: "dm-ef-002",
      buyerId: "buyer-eurotex",
      role: "Product Development Manager",
      department: "R&D & Design",
      name: "Giulia Ferrero",
      email: "g.ferrero@eurotex-fashion.it",
      phone: "+39-02-8901-2218",
      linkedinUrl: "https://linkedin.com/in/giuliaferrero-pd",
    },
  ],
  "buyer-transpacific": [
    {
      id: "dm-tp-001",
      buyerId: "buyer-transpacific",
      role: "VP of Supply Chain",
      department: "Operations",
      name: "Thomas Nguyen",
      email: "t.nguyen@transpacificbrands.com",
      phone: "+1-404-555-7701",
      linkedinUrl: "https://linkedin.com/in/thomasnguyen-scm",
    },
    {
      id: "dm-tp-002",
      buyerId: "buyer-transpacific",
      role: "Director of Institutional Sales",
      department: "Healthcare & Hospitality",
      name: "Karen Sullivan",
      email: "k.sullivan@transpacificbrands.com",
      phone: "+1-404-555-7718",
      linkedinUrl: "https://linkedin.com/in/karensullivan-inst",
    },
  ],
};

/**
 * Returns masked contacts for a given buyer. Always safe to call.
 */
export function getMaskedContacts(buyerId: string): MaskedDecisionMaker[] {
  const contacts = DECISION_MAKERS_DATA[buyerId];
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
 * Returns unmasked contact data. In production, this would call Apollo.io API.
 * Only call this server-side after credit deduction.
 */
export function getUnmaskedContact(
  buyerId: string,
  contactId: string
): UnlockedDecisionMaker | null {
  const contacts = DECISION_MAKERS_DATA[buyerId];
  if (!contacts) return null;

  const contact = contacts.find((c) => c.id === contactId);
  if (!contact) return null;

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
  const contacts = DECISION_MAKERS_DATA[buyerId];
  if (!contacts) return [];

  return contacts.map((c) => ({
    ...c,
    isLocked: false as const,
  }));
}

