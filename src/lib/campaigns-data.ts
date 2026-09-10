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
    sampleValue: "Pacific Textiles LLC",
    category: "company",
  },
  {
    tag: "{{decision_maker_name}}",
    label: "Contact Full Name",
    description: "Verified executive recipient name",
    sampleValue: "James Whitfield",
    category: "contact",
  },
  {
    tag: "{{decision_maker_role}}",
    label: "Executive Title",
    description: "Official corporate title & seniority",
    sampleValue: "VP of Procurement",
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
    sampleValue: "4,850 TEUs",
    category: "customs",
  },
  {
    tag: "{{primary_commodity}}",
    label: "Primary Cargo",
    description: "Declared manifest commodity description",
    sampleValue: "Home Furnishings & Bed Linens",
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

export const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: "camp-001",
    name: "US West Coast Consignee Direct Outreach",
    targetAudience: "Home Textiles & Bedding Importers (US Ports)",
    buyersCount: 4,
    contactsCount: 9,
    status: "Active",
    createdAt: "2026-09-02",
    channels: ["Email", "WhatsApp"],
    stats: {
      sent: 9,
      delivered: 9,
      opened: 6,
      replied: 2,
      meetings: 1,
      openRate: 66.7,
      replyRate: 22.2,
      meetingRate: 11.1,
    },
  },
  {
    id: "camp-002",
    name: "European Hospitality & SCM Procurement Q3",
    targetAudience: "German & Nordic Departmental Sourcing Directors",
    buyersCount: 3,
    contactsCount: 7,
    status: "Active",
    createdAt: "2026-08-25",
    channels: ["Email", "WhatsApp"],
    stats: {
      sent: 14,
      delivered: 14,
      opened: 10,
      replied: 4,
      meetings: 2,
      openRate: 71.4,
      replyRate: 28.6,
      meetingRate: 14.3,
    },
  },
];

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
    id: "demo",
    buyerId: b.id,
    name: "James Whitfield",
    role: "VP of Procurement",
    department: "Supply Chain",
    email: "j.whitfield@pacifictextiles.com",
    phone: "+1-310-889-4201",
    linkedinUrl: "https://linkedin.com",
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
