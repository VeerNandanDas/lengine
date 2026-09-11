import { BUYERS_DATA, CompanyBuyer } from "@/lib/buyers-data";
import { getMaskedContacts, getAllUnmaskedContacts, UnlockedDecisionMaker } from "@/lib/contacts-data";

export interface DynamicVariable {
  tag: string;
  label: string;
  description: string;
  sampleValue: string;
  category: "company" | "contact" | "customs";
}

export const DYNAMIC_VARIABLES: DynamicVariable[] = [
  {
    tag: "{{buyer_company}}",
    label: "Company Name",
    description: "Legal consignee name on customs filings",
    sampleValue: "Target Brands, Inc.",
    category: "company",
  },
  {
    tag: "{{decision_maker_name}}",
    label: "Contact Full Name",
    description: "Verified executive recipient name",
    sampleValue: "Gretchen McCarthy",
    category: "contact",
  },
  {
    tag: "{{decision_maker_role}}",
    label: "Executive Title",
    description: "Official corporate title & seniority",
    sampleValue: "Chief Supply Chain & Logistics Officer",
    category: "contact",
  },
  {
    tag: "{{recent_port}}",
    label: "Discharge Port",
    description: "Primary port of customs unlading",
    sampleValue: "Port of Long Beach",
    category: "customs",
  },
  {
    tag: "{{import_volume}}",
    label: "Annual Volume",
    description: "Derived 12-month TEU import capacity",
    sampleValue: "142,500 TEUs",
    category: "customs",
  },
  {
    tag: "{{primary_commodity}}",
    label: "Primary Cargo",
    description: "Declared manifest commodity description",
    sampleValue: "Home Furnishings, Sateen Bed Linens & Bath Textiles",
    category: "customs",
  },
  {
    tag: "{{top_hs_code}}",
    label: "Declared HS Code",
    description: "Harmonized customs classification",
    sampleValue: "6302.31.00",
    category: "customs",
  },
  {
    tag: "{{carrier_vessel}}",
    label: "Recent Carrier Vessel",
    description: "Vessel name from latest Bill of Lading",
    sampleValue: "MSC GÜLSÜN",
    category: "customs",
  },
  {
    tag: "{{latest_bol_date}}",
    label: "Latest Filing Date",
    description: "Date of most recent customs clearance",
    sampleValue: "August 28, 2026",
    category: "customs",
  },
];

export interface Campaign {
  id: string;
  name: string;
  targetAudience: string;
  buyersCount: number;
  contactsCount: number;
  status: "Active" | "Completed" | "Draft";
  createdAt: string;
  channels: ("Email" | "WhatsApp")[];
  stats: {
    sent: number;
    delivered: number;
    opened: number;
    replied: number;
    meetings: number;
    openRate: number; // e.g. 68.4
    replyRate: number; // e.g. 24.1
    meetingRate: number; // e.g. 11.8
  };
}

export const INITIAL_CAMPAIGNS: Campaign[] = [];

/**
 * Replace dynamic tokens in text with buyer & contact data.
 */
export function substituteVariables(
  text: string,
  buyer?: CompanyBuyer | null,
  contact?: UnlockedDecisionMaker | null
): string {
  if (!text) return "";

  const b = buyer || BUYERS_DATA[0];
  const c = contact || {
    id: "contact-primary",
    buyerId: b.id,
    name: "Gretchen McCarthy",
    role: "Chief Supply Chain & Logistics Officer",
    department: "Global Supply Chain & Logistics",
    email: "g.mccarthy@target.com",
    phone: "+1-612-304-6073",
    linkedinUrl: "https://linkedin.com/in/gretchen-mccarthy-target",
    isLocked: false,
  };

  const latestShipment = b.shipments && b.shipments[0];

  return text
    .replace(/{{buyer_company}}/g, b.name)
    .replace(/{{decision_maker_name}}/g, c.name)
    .replace(/{{decision_maker_role}}/g, c.role)
    .replace(/{{recent_port}}/g, b.portOfUnlading)
    .replace(/{{import_volume}}/g, b.annualTeus)
    .replace(/{{primary_commodity}}/g, b.primaryCommodity)
    .replace(/{{top_hs_code}}/g, latestShipment?.hsCode || b.hsCodes[0] || "6302.31")
    .replace(/{{carrier_vessel}}/g, latestShipment?.vessel || "MSC GÜLSÜN")
    .replace(/{{latest_bol_date}}/g, b.lastShipmentDate);
}
