# Lengine — Complete Project Overview & Terminology Reference


## Table of Contents

1. [What Is Lengine?](#1-what-is-lengine)
2. [The Problem It Solves](#2-the-problem-it-solves)
3. [Who Is It For?](#3-who-is-it-for)
4. [Complete Glossary of Import/Export & Trade Terminology](#4-complete-glossary-of-importexport--trade-terminology)
   - 4.1 [Shipping & Logistics Terms](#41-shipping--logistics-terms)
   - 4.2 [Customs & Regulatory Terms](#42-customs--regulatory-terms)
   - 4.3 [Trade Finance & Pricing Terms](#43-trade-finance--pricing-terms)
   - 4.4 [Data & Analytics Terms](#44-data--analytics-terms)
   - 4.5 [Compliance & Certification Terms](#45-compliance--certification-terms)
5. [Application Flow — Page-by-Page Walkthrough](#5-application-flow--page-by-page-walkthrough)
   - 5.1 [Landing Page (Public)](#51-landing-page-public)
   - 5.2 [Authentication & Demo Mode](#52-authentication--demo-mode)
   - 5.3 [Dashboard (Overview)](#53-dashboard-overview)
   - 5.4 [Trade Flows Module](#54-trade-flows-module)
   - 5.5 [Buyer Directory Module](#55-buyer-directory-module)
   - 5.6 [Contact Enrichment (Decision Makers)](#56-contact-enrichment-decision-makers)
   - 5.7 [Campaigns Module](#57-campaigns-module)
6. [How It All Connects — The User Journey](#6-how-it-all-connects--the-user-journey)
7. [Business Model & Pricing](#7-business-model--pricing)
8. [Technical Architecture Summary](#8-technical-architecture-summary)

---

## 1. What Is Lengine?

**Lengine** is a cross-border **trade intelligence platform** that transforms raw, public maritime customs data (Bills of Lading, port filings, carrier manifests) into actionable business intelligence for exporters, importers, freight forwarders, and trading companies.

Think of it as a "Bloomberg Terminal for international trade" — but built specifically for companies that ship physical goods across borders by sea.

**In one sentence:** Lengine helps exporters find the right international buyers, understand how much they import, and reach out to their decision-makers with personalized cold outreach — all backed by verified government customs data.

---

## 2. The Problem It Solves

### The Pain Point

When an Indian textile manufacturer wants to export bed linens to the United States, they face several critical challenges:

1. **"Who is actually buying my product internationally?"**  
   There's no easy directory of foreign companies importing specific goods. Traditional methods involve trade fairs, brokers, and guesswork.

2. **"How much do they buy, and how often?"**  
   Even if you find a buyer, you don't know their purchase volume, seasonal patterns, or preferred shipping terms.

3. **"Who do I contact at that company?"**  
   Foreign buyer companies don't advertise their procurement directors. Finding the right person's email and phone number is extremely hard.

4. **"What tariffs and duties will apply?"**  
   Every country has different import duty rates for every product category. Knowing whether a Free Trade Agreement (FTA) reduces your tariff from 12% to 0% can make or break a deal.

5. **"How do I approach them professionally?"**  
   Cold emails to foreign buyers fail because they're generic. The buyer has no reason to trust a random supplier.

### How Lengine Solves This

| Problem | Lengine Solution |
|---------|-----------------|
| Finding buyers | **Buyer Directory** — Surfaces companies that are *already importing* your product, verified from real customs filings |
| Understanding demand | **Trade Flows Engine** — Shows exactly how many containers (TEUs) of your product category move through each trade lane, with 3-year trends |
| Getting contacts | **Contact Enrichment** — Unlocks the verified name, email, phone, and LinkedIn of procurement executives at buyer companies |
| Tariff intelligence | **Trade Corridor Table** — Displays bilateral tariff rates (MFN, FTA, GSP) for every origin-destination pair |
| Professional outreach | **Campaigns Module** — Sends context-injected cold emails and WhatsApp messages using real customs data points the buyer will recognize |

---

## 3. Who Is It For?

| User Type | What They Use Lengine For |
|-----------|--------------------------|
| **Exporters & Manufacturers** | Find foreign buyers for their products; understand demand volume; reach procurement teams |
| **Import-Export Trading Companies** | Discover new trade corridors; benchmark competitive pricing; identify arbitrage opportunities |
| **Freight Forwarders & 3PLs** | Identify high-volume trade lanes; prospect shippers and consignees for logistics services |
| **Commodity Trading Desks** | Monitor macro volume trends by commodity; track seasonal patterns; spot emerging markets |
| **Sourcing Agencies & Trade Consultants** | Research markets on behalf of clients; provide data-backed sourcing recommendations |
| **Government Trade Promotion Bodies** | Analyze national export performance; identify target markets for trade missions |

---

## 4. Complete Glossary of Import/Export & Trade Terminology

Every technical term used anywhere in the Lengine application is defined below, organized by category.

### 4.1 Shipping & Logistics Terms

| Term | Definition | Where It Appears in Lengine |
|------|------------|----------------------------|
| **TEU (Twenty-foot Equivalent Unit)** | The standard unit for measuring container shipping volume. One 20-foot container = 1 TEU. A standard 40-foot container = 2 TEUs. When we say "4,850 TEUs," it means ~2,425 standard 40-foot containers worth of cargo. | Trade Flows charts, Buyer Directory cards, Dashboard metrics |
| **Bill of Lading (BoL / B/L)** | The single most important document in ocean shipping. It is a legal contract between the shipper (exporter) and the carrier (shipping line) that details what is being shipped, from where, to where, on which vessel, and to whom. Think of it as a "receipt + contract + title deed" for sea cargo. | Buyer Detail Modal → Manifests tab |
| **Manifest** | A collective document listing all cargo onboard a vessel or in a specific container. Derived from individual Bills of Lading. Customs authorities require manifests for every ship entering their ports. | Hero section, System Overview, throughout the platform |
| **Consignee** | The party to whom goods are shipped — essentially, the buyer/importer who receives the cargo at the destination port. In Lengine, this is the "buyer" we're helping you find. | Buyer Directory, Hero terminal mockup |
| **Shipper** | The party who sends/exports the goods — the seller/manufacturer/exporter who loads cargo at the origin port. In the context of Lengine's users, this is typically *you* (the user). | Bill of Lading records |
| **Carrier** | The shipping line (e.g., Maersk, MSC, CMA CGM) that physically transports containers by sea. | BoL records, Hero section data source strip |
| **Vessel** | The actual ship that carries the containers. Each voyage is identified by a vessel name + voyage number (e.g., "MSC GULSUN / Voyage 24W-038"). | Bill of Lading records |
| **Voyage** | A specific trip made by a vessel. Each voyage has a unique ID and covers a defined route from origin port(s) to destination port(s). | BoL records |
| **Container ID** | A unique alphanumeric code stamped on every shipping container (e.g., "MSCU-7392841"). Used to physically track individual boxes. | BoL records |
| **Container Type** | The size/specification of a shipping container. Common types: **20GP** (20-foot general purpose), **40HC** (40-foot high cube, most common), **45HC** (45-foot high cube). | BoL records |
| **Port of Loading (POL)** | The port where cargo is loaded onto the vessel in the exporting country (e.g., Nhava Sheva in India). | Trade Corridors table, BoL records |
| **Port of Unlading / Discharge (POD)** | The port where cargo is unloaded from the vessel in the importing country (e.g., Port of Long Beach in the USA). "Unlading" is the official customs term. | Buyer Directory cards, BoL records |
| **Port Code (UN/LOCODE)** | A standardized 5-character code for every port in the world (e.g., **USLGB** = United States, Long Beach; **INNSA** = India, Nhava Sheva/JNPT; **DEHAM** = Germany, Hamburg). | Buyer cards, Trade Corridors table |
| **Transit Days** | The average number of days for a container to travel from origin port to destination port. Affects pricing and delivery timelines. | Trade Corridors table |
| **Trade Lane / Trade Corridor** | A specific origin-to-destination route for cargo (e.g., "Nhava Sheva -> Long Beach"). Lengine tracks volume, growth, and tariff data for each corridor. | Trade Flows module, Corridors table |
| **AIS (Automatic Identification System)** | Satellite-based vessel tracking system. Ships broadcast their GPS position in real-time. Lengine references AIS data for live vessel positioning. | System Overview section |
| **Gross Weight (kg)** | The total weight of cargo including packaging, declared on the Bill of Lading. Used for freight cost calculation and customs assessment. | BoL records |

### 4.2 Customs & Regulatory Terms

| Term | Definition | Where It Appears in Lengine |
|------|------------|----------------------------|
| **HS Code (Harmonized System Code)** | A universal 6-to-10 digit product classification code used by customs worldwide. Every physical product has an HS Code. Example: **6302** = "Bed, table, toilet and kitchen linens." The first 2 digits are the "Chapter" (63 = Other textile articles), the next 2 digits narrow to "Heading" (6302 = linens), and further digits specify subheadings (6302.31 = cotton bed linens). | Trade Flows search bar, Buyer cards, BoL records, Campaign dynamic variables |
| **HS Chapter** | The broadest product category in the HS system (Chapters 01-99). Example: Chapter 63 covers "Other made-up textile articles." | Trade data definitions |
| **Customs Clearance** | The process of getting government approval to bring imported goods into a country. Involves submitting documentation, paying duties, and passing inspections. | BoL records (status: "Cleared," "In Transit," "Inspected") |
| **Customs Status** | The current state of a shipment in the customs process: **Cleared** (approved and released), **In Transit** (still moving, not yet at customs), **Inspected** (pulled for physical examination). | BoL manifest records |
| **Tariff / Duty** | A tax imposed by a government on imported goods. Expressed as a percentage of the goods' declared value (e.g., "6.0% MFN" means a 6% import tax). | Trade Corridors table, Hero terminal mockup |
| **MFN (Most Favored Nation)** | The standard tariff rate that a country applies to imports from any WTO member nation. It's the "default" rate — neither preferential nor punitive. | Trade Corridors tariff type badges |
| **FTA (Free Trade Agreement)** | A bilateral/multilateral agreement between countries that reduces or eliminates tariffs on certain goods. Example: If India and UAE have an FTA for textiles, the tariff might drop from 12% to 0%. | Trade Corridors tariff type badges |
| **GSP (Generalized System of Preferences)** | A program where developed countries grant preferential (reduced) tariff rates to developing countries to support their exports. | Trade Corridors tariff type badges |
| **Preferential Tariff** | Any tariff rate lower than the standard MFN rate, granted through FTAs, GSP, or special trade agreements. | Trade Corridors tariff type badges |
| **Tariff Schedule** | The complete list of import duties for every HS code in a country. Lengine tracks bilateral tariff schedules between origin and destination countries. | Trade Flows feature description |
| **Commodity Description** | The human-readable text description of goods on a Bill of Lading (e.g., "100% Organic Cotton Sateen Bed Sheets, Queen Size, 400TC"). | BoL records, Buyer data |

### 4.3 Trade Finance & Pricing Terms

| Term | Definition | Where It Appears in Lengine |
|------|------------|----------------------------|
| **Incoterms (International Commercial Terms)** | Standardized 3-letter codes published by the International Chamber of Commerce (ICC) that define who pays for what in an international shipment. They split responsibilities between buyer and seller for costs, risks, and logistics. | Buyer Directory filter, Buyer cards |
| **FOB (Free On Board)** | The seller delivers goods onto the ship at the origin port. After that, the buyer pays for ocean freight, insurance, and destination costs. **This is the most common term for exports.** When an Indian manufacturer quotes "FOB Nhava Sheva," it means their price covers everything up to loading the container onto the ship. | Buyer cards, Hero terminal mockup, Campaign emails |
| **CIF (Cost, Insurance, and Freight)** | The seller pays for everything up to and including ocean freight and insurance to the destination port. The buyer only handles customs clearance and local delivery at their end. **Common for buyers who want "landed cost" quotes.** | Buyer cards, Hero terminal mockup |
| **DDP (Delivered Duty Paid)** | The seller handles *everything* — from factory to the buyer's warehouse door, including customs duties and taxes. Maximum responsibility on the seller, maximum convenience for the buyer. | Buyer cards |
| **EXW (Ex Works)** | The buyer picks up goods directly from the seller's factory/warehouse. The seller does nothing beyond making goods available. Minimum seller responsibility. | Buyer cards |
| **FCA (Free Carrier)** | The seller delivers goods to a named carrier or freight forwarder at a specified location. Similar to FOB but more flexible about the handoff point. | Buyer data definitions |
| **MOQ (Minimum Order Quantity)** | The smallest quantity of goods a buyer will purchase in a single order. In Lengine, MOQs are **derived** (calculated empirically from real customs data, not self-reported). Example: If Pacific Textiles LLC has been importing containers averaging 1,200 TEUs per order, their derived MOQ is 1,200 TEUs. | Buyer Directory cards, Filters, Campaign variables |
| **YoY (Year-over-Year)** | A comparison metric showing the percentage change from the same period in the previous year. Example: "YoY Growth: +11.4%" means trade volume grew 11.4% compared to the same quarter last year. | Trade Flows charts, Dashboard |
| **Market Share** | The percentage of total trade volume in a corridor controlled by a specific country or route. Example: "India holds 34.2% market share in US bed linen imports." | Trade Corridors table |

### 4.4 Data & Analytics Terms

| Term | Definition | Where It Appears in Lengine |
|------|------------|----------------------------|
| **Trade Intelligence** | The practice of collecting, analyzing, and acting on international trade data (customs filings, shipping records, tariff schedules) to gain commercial advantage. Lengine's entire purpose. | Throughout the platform |
| **Maritime Manifest Ingestion** | The automated process of collecting and parsing Bills of Lading and customs filings from global port authorities into Lengine's database. | System Overview section, Hero announcement pill |
| **Entity Resolution** | The AI/ML process of recognizing that "Pacific Textiles LLC," "PACIFIC TEXTILES L.L.C.," and "Pac Textiles Corp" are all the same company, even though carriers spell them differently on different manifests. | System Overview, Layer 02 |
| **Consignee Directory** | A searchable database of foreign buying companies, built from resolved customs data. Each entry represents a verified importer with derived MOQs, trade volumes, and certifications. | Buyer Directory module |
| **Trade Telemetry** | Real-time or near-real-time quantitative data streams about global cargo movements — volumes, values, growth rates, seasonal patterns. | Hero section, System Overview, Trade Flows |
| **Corridor Intelligence** | Analytical insights specific to a trade lane (e.g., "The Nhava Sheva to Hamburg corridor moved 780K TEUs last year, +8.4% YoY, at a 4.2% FTA tariff rate"). | Trade Flows, Corridors table |
| **Sparkline** | A small, inline line chart showing a trend at a glance (e.g., 12-month import volume trend on a Buyer card). No axes, just the shape of the trend. | Buyer Directory cards |
| **Consistency Score** | A Lengine-derived metric (0-100%) measuring how regular and predictable a buyer's import pattern is. A 94% score means the company imports very consistently, making them a reliable potential customer. | Buyer Detail modal |
| **Dynamic Variables** | Placeholder tags like `{{buyer_company}}` or `{{recent_port}}` used in campaign email templates. Lengine auto-fills these with real customs data for each recipient, making every cold email feel personalized and data-backed. | Campaigns, Email Composer |
| **Contact Enrichment** | The process of obtaining verified personal contact details (name, email, phone, LinkedIn) for decision-makers at buyer companies. In production, this would integrate with services like Apollo.io or ZoomInfo. | Decision Makers section in Buyer modal |

### 4.5 Compliance & Certification Terms

| Term | Definition | Where It Appears in Lengine |
|------|------------|----------------------------|
| **OEKO-TEX** | An international certification system for textiles, confirming that products have been tested for harmful substances and are safe for human use. Important for textile exporters targeting EU/US markets. | Buyer cards certification badges |
| **GOTS (Global Organic Textile Standard)** | The world's leading certification for organic textiles. Covers ecological and social criteria along the entire supply chain. Required by many Western retailers. | Buyer cards certification badges |
| **ISO 9001** | An international quality management system standard. Demonstrates that a company follows standardized quality processes. Widely required by institutional buyers. | Buyer cards certification badges |
| **C-TPAT (Customs-Trade Partnership Against Terrorism)** | A US Customs and Border Protection program where importers commit to supply chain security best practices in exchange for faster customs clearance and fewer inspections. | Feature grid, compliance references |
| **Compliance Badge** | A visual indicator on buyer profiles showing which international quality/safety/environmental standards they hold or require from suppliers. | Buyer Directory cards |

---

## 5. Application Flow — Page-by-Page Walkthrough

### 5.1 Landing Page (Public)

**Route:** `/` (homepage)

The landing page is the public-facing marketing website. It communicates what Lengine does and why a trade professional should subscribe. Here's every section, top to bottom:

#### A) Navigation Bar
- Sticky top nav with the "Lengine" logo
- Links: Product, Solutions, Pricing, Sign In
- "Enter Terminal" CTA button that takes the user to the dashboard

#### B) Hero Section
- **Announcement Pill:** "Lengine 2.4 Live - 4.8M+ Maritime Manifests & Derived MOQs" — signals that the platform is actively ingesting real data
- **Headline:** "Trade intelligence that *actually unlocks* global markets"
- **Subtitle:** Mentions "direct maritime manifest ingestion," "derived consignee MOQs," and "bilateral tariff optimization"
- **CTA Buttons:**
  - "Enter Live Terminal" leads to the Dashboard
  - "Explore Trade Corridors" leads to the Trade Flows page
- **Data Sources Strip:** Names of global carriers (Maersk, MSC, CMA CGM, Hapag-Lloyd, ONE Network, UN Comtrade) — establishes credibility by showing where the data comes from
- **Terminal Mockup:** A dark-mode macOS-style terminal showing a simulated query:
  - HS Code 6302.31 (Bed & Bath Linens, Organic Sateen)
  - Trade corridor: Nhava Sheva (IN) to Long Beach (US)
  - Live stats: Global TEUs (4.82M), YoY Growth (+11.4%), Tariff Rate (6.0% MFN)
  - Three sample consignee cards (Pacific Textiles US, Meridian Nordic DE, Al-Mansoor Gulf AE)

#### C) System Overview Section
An interactive, layered explainer of Lengine's 5-layer data architecture:
1. **Layer 01 — Data Ingestion:** Global maritime & customs feeds (2.4B+ indexed manifests, 140+ countries, less than 24h latency)
2. **Layer 02 — Entity Resolution:** AI disambiguation of company names and HS codes (99.98% precision, 12.8M+ buyer entities)
3. **Layer 03 — Macro Telemetry:** Trade corridor intelligence (18,500+ corridors, YoY analytics)
4. **Layer 04 — Terminal Interface:** The dashboard users interact with
5. **Layer 05 — Trade Compliance:** Sanctions screening and regulatory monitoring

#### D) Integrations Section
Showcases the data pipelines feeding into Lengine:
- Customs authorities (US CBP, India DGFT, EU TARIC, etc.)
- Carrier EDI feeds (Maersk, MSC, etc.)
- Port authority data
- Classification databases (UN Comtrade, WTO)

#### E) Two Engines Section
Explains Lengine's two core product modules side-by-side:
- **Engine 01: Macro Trade Flows** — Benchmark 3-year export volumes, destination market concentration, tariff schedules
- **Engine 02: Maritime Buyer Directory** — Browse verified consignees, inspect raw Bills of Lading, see derived MOQs

Includes a radar chart data visualization demo.

#### F) Dark Feature Grid
Six feature cards on a dark background highlighting:
1. Automated HS Code Telemetry
2. Raw Bill of Lading Ingestion
3. Derived Consignee MOQs
4. Bilateral Tariff Verification
5. Corridor Transit Telemetry
6. Verified Consignee Registry

#### G) Testimonials Section
Social proof with executive quotes from trade professionals.

#### H) Pricing Section
Three tiers with Monthly/Annual toggle:

| Plan | Monthly | Annual | Target User |
|------|---------|--------|-------------|
| **Analyst** | $149/mo | $119/mo | Independent researchers, boutique agencies |
| **Trade Desk** | $499/mo | $399/mo | Export houses, freight forwarders, commodity desks |
| **Enterprise & Sovereign** | $1,299/mo | $999/mo | Multinationals, banks, government trade agencies |

Key feature differentiators:
- Analyst: 1,000 HS lookups/mo, basic MOQ extraction, 1 seat
- Trade Desk: Unlimited lookups, full BoL inspection, 5 seats, priority support
- Enterprise: Everything unlimited + API access + dedicated account manager

#### I) CTA Banner
Final conversion prompt: "Start your 14-day free trial."

#### J) Footer
Company information, legal links, compliance badges.

---

### 5.2 Authentication & Demo Mode

**Route:** `/login`

- **Supabase Auth Integration:** Email/password authentication via Supabase
- **Demo Mode:** A special "demo_session" cookie allows potential clients to explore the full dashboard without creating an account — perfect for sales demos
- **Route Protection:** The dashboard layout checks for either a valid Supabase session or a demo cookie before rendering; otherwise redirects to `/login`

---

### 5.3 Dashboard (Overview)

**Route:** `/dashboard`

The main command center after login. Contains:

#### Sidebar Navigation
Persistent left sidebar with links to:
- Dashboard (Overview)
- Trade Flows
- Buyer Directory
- Campaigns
- Settings

Also displays the user's email and a sign-out option.

#### Top Navigation
Breadcrumbs, search, notifications, and user avatar.

#### Metrics Cards (4 KPI tiles)

| Metric | Sample Value | Description |
|--------|-------------|-------------|
| Total Global Searches | 12,847 (+14.2%) | How many HS code/corridor searches performed |
| Unlocked Contacts | 3,291 (+8.1%) | Decision maker contacts revealed via credits |
| Active Campaigns | 24 (+3 this week) | Outreach campaigns currently running |
| API Status | Operational (99.9%) | Platform uptime indicator |

#### Quick Navigation Buttons
- "Open Trade Flows" links to the Trade Flows module
- "Buyer Directory" links to the Buyer Directory module

#### Analytics Charts
- **Search Volume Chart:** Trend of user search activity over time
- **Top Markets Chart:** Bar chart of most-searched destination countries

#### Quick Actions Panel
Cards linking to frequently used workflows.

---

### 5.4 Trade Flows Module

**Route:** `/dashboard/trade-flows`

The macro intelligence engine. Think of it as "Google Trends, but for physical cargo moving across oceans."

#### HS Code Search Bar
- Text search with autocomplete across all HS codes
- Preset pills for common product categories (e.g., "6302 — Bed & Bath Linens," "6110 — Knitted Sweaters," "0901 — Coffee & Tea")
- Selecting an HS code loads all associated data

#### Trade Volume Chart
- 3-year quarterly line/area chart showing TEU volumes and USD values
- Hover tooltip reveals exact figures and YoY delta for each quarter
- Visual trend of whether demand for this product is growing or declining globally

#### Destination Bar Chart
- Horizontal bar chart ranking top importing countries by TEU volume
- Shows each country's market share percentage and growth rate
- Answers: "Which countries buy the most of this product?"

#### Trade Corridors Table
The most data-dense component. A full data table with columns:

| Column | What It Shows |
|--------|--------------|
| Origin to Destination | Specific port-to-port route (e.g., "Nhava Sheva IN to Long Beach US") |
| Annual Volume (TEUs) | How many containers travel this route per year |
| YoY Growth | Whether this route is growing or declining |
| Tariff Rate | The import duty percentage |
| Tariff Type | MFN, FTA, GSP, or Preferential (color-coded badges) |
| Market Share | This route's share of total global trade for this HS code |
| Status | Operational status: Optimal, Congested, High Demand, Scrutiny |
| Avg. Transit Days | Shipping time in days |

#### Action Buttons
- **Sync Telemetry:** Refresh data from upstream sources
- **Share Brief:** Generate a shareable trade intelligence report
- **Export CSV:** Download the corridors table as a spreadsheet

---

### 5.5 Buyer Directory Module

**Route:** `/dashboard/buyers`

The counterparty discovery engine. Surfaces real companies that are importing your product.

#### Filter Bar
Users can filter buyers by:
- **Text Search:** Company name, city, port, commodity
- **Country:** US, Germany, UK, UAE, Australia, etc.
- **MOQ Range:** Low (less than 1,000 TEUs), Mid (1,000-2,500), High (more than 2,500)
- **Incoterm:** FOB, CIF, DDP, EXW, FCA
- **Certification:** OEKO-TEX, GOTS, ISO 9001

#### Buyer Cards Grid
Each buyer is displayed as an information-rich card showing:
- **Company Name & Legal Entity** (e.g., "Pacific Textiles LLC" / "Pacific Textiles Import Corporation")
- **Country Flag & City** (US flag Los Angeles, CA)
- **Port of Unlading** (Port of Long Beach / USLGB)
- **Derived MOQ** (1,200 TEUs) — calculated from real customs data
- **Usual Incoterms** (FOB / CIF) — how they typically negotiate
- **Annual TEU Volume** (4,850 TEUs) — total yearly import capacity
- **Annual Shipments** (142 shipments/year)
- **Consistency Score** (94%) — how regular their buying pattern is
- **Certification Badges** (OEKO-TEX, GOTS, ISO 9001)
- **12-Month Sparkline** — visual trend of monthly import volumes
- **Primary Commodity** — what they mainly buy
- **HS Codes** — specific product classifications they import

#### Buyer Detail Modal
Clicking a buyer card opens a full-screen centered modal with deep intelligence:

**Tab 1 — Manifests (Bill of Lading Records)**
A complete table of every shipment this buyer has received:
- BoL Number, Date, Container ID, Container Type
- Vessel Name & Voyage Number
- Origin Port to Destination Port
- Shipper name and origin country
- Commodity description and HS Code
- Gross weight, TEU count
- Customs clearance status

**Tab 2 — Contacts (Decision Makers)**
See Section 5.6 below.

---

### 5.6 Contact Enrichment (Decision Makers)

**Accessed from:** Buyer Detail Modal, then the "Contacts" tab

This is the monetized intelligence layer — the feature users pay credits for.

#### How It Works

1. **Locked State:** When a user first views a buyer's contacts, they see a table of roles:
   - VP of Procurement
   - Director of Supply Chain
   - Senior Procurement Manager
   - Import Operations Manager
   
   The names, emails, and phone numbers are **blurred/masked** (e.g., "J\*\*\*s W\*\*\*\*\*d" instead of "James Whitfield").

2. **Unlock Action:** A prominent "Unlock All Contacts (5 Credits)" button sits at the top. Clicking it:
   - Checks the user's credit balance (stored in Supabase or localStorage for demo)
   - If sufficient credits exist, deducts 5 credits via a Supabase RPC (Remote Procedure Call) for transaction safety
   - Returns the unmasked data — simulating what would be an Apollo.io API call in production

3. **Unlocked State:** After payment, the modal smoothly transitions to show:
   - **Full Name** (e.g., "James Whitfield")
   - **Email** (e.g., "j.whitfield@pacifictextiles.com")
   - **Direct Phone** (e.g., "+1-310-889-4201")
   - **LinkedIn Profile** (clickable icon)
   - **Department & Role** (e.g., "Supply Chain & Procurement — VP of Procurement")

4. **Persistence:** Unlocked buyers remain accessible across sessions. Credits are consumed once per buyer company.

#### Credit System
- Credits are the platform's microtransaction currency
- 5 credits unlock ALL contacts for one buyer company (not individual contacts)
- Credit balance is displayed in the top navigation bar
- Credits are included in subscription plans or purchased separately

---

### 5.7 Campaigns Module

**Route:** `/dashboard/campaigns`

The outreach engine. Once you've found buyers and unlocked contacts, you use Campaigns to reach out to them.

#### Campaign List View
Shows all existing campaigns with:
- Campaign name
- Status (Draft, Active, Completed, Paused)
- Number of recipients
- Open rate, reply rate statistics
- Creation date

#### New Campaign Wizard (3-Step Stepper)

**Step 1 — Select Audience**
- Data table of all unlocked buyer contacts
- Checkboxes to select which buyers to include in this campaign
- Shows buyer name, country, contact count, last shipment date
- "Select All" / "Deselect All" controls

**Step 2 — Email Composer**
- **Subject Line Editor** with dynamic variable support
- **Rich Text Body Editor** with real-time preview
- **Dynamic Variables Sidebar:** A categorized panel of insertable data tokens:

  | Category | Variables |
  |----------|-----------|
  | **Company** | `{{buyer_company}}` — Consignee name from customs |
  | **Contact** | `{{decision_maker_name}}`, `{{decision_maker_role}}` |
  | **Customs** | `{{recent_port}}`, `{{import_volume}}`, `{{primary_commodity}}`, `{{top_hs_code}}`, `{{carrier_vessel}}`, `{{latest_bol_date}}` |

- Users click a variable tag to insert it at the cursor position
- **Live Preview Panel:** Shows how the email will look with sample data filled in
- Example output:
  > *"I noticed Pacific Textiles LLC's recurring import shipments entering through Port of Long Beach (most recently on August 28, 2026 aboard MSC GULSUN)..."*

**Step 3 — Sequence Builder**
A visual vertical timeline with connected nodes:
- **Node 1 — Day 1:** "Send Cold Email" (the email from Step 2)
- **Node 2 — Day 3:** "If Email Opened, Send WhatsApp Template"
  - Includes a WhatsApp Preview component that renders a realistic chat bubble (green background, mobile phone frame) showing the personalized WhatsApp message with a mock PDF catalog attachment

#### Campaign Analytics Dashboard
After launch, each campaign shows performance metrics:
- **Recipients Reached** — count and progress bar
- **Open Rate** — percentage with visual indicator
- **Reply Rate** — response engagement
- **WhatsApp Delivered** — second-channel performance
- Timeline of campaign events

---

## 6. How It All Connects — The User Journey

Here is the complete workflow a typical user follows, from first visit to closed deal:

```
 _______________________________________________________________
|                    THE LENGINE FLYWHEEL                        |
|                                                                |
|   1. DISCOVER                                                  |
|      Trade Flows: Search HS code -> See which countries        |
|      are buying your product -> Identify high-growth           |
|      corridors with favorable tariffs                          |
|                                                                |
|   2. IDENTIFY                                                  |
|      Buyer Directory: Browse verified importers on your        |
|      target route -> Filter by MOQ, Incoterms,                 |
|      certifications -> Inspect their actual Bill of            |
|      Lading shipment records                                   |
|                                                                |
|   3. CONNECT                                                   |
|      Contact Enrichment: Spend 5 credits to unlock the         |
|      buyer's VP of Procurement -> Get verified email,          |
|      phone, LinkedIn                                           |
|                                                                |
|   4. ENGAGE                                                    |
|      Campaigns: Create a personalized cold email that          |
|      references their actual import data -> Set up             |
|      automated follow-up via WhatsApp -> Track opens           |
|      and replies                                               |
|                                                                |
|   5. CLOSE                                                     |
|      Negotiate with data-backed confidence: You know           |
|      their volume, preferred Incoterms, port of entry,         |
|      and seasonal buying patterns                              |
|                                                                |
|                  Repeat for more corridors                      |
|________________________________________________________________|
```

### Why This Works

The key insight is that **the outreach references real, verifiable customs data**. When a procurement director at Pacific Textiles receives an email saying:

> *"I noticed your recurring container arrivals at Long Beach, most recently on August 28 aboard MSC GULSUN, classified under HS 6302.31..."*

...they know this isn't spam. This is someone who has done their homework. The response rate for data-backed cold outreach is **5-10x higher** than generic emails.

---

## 7. Business Model & Pricing

### Revenue Streams

1. **Subscription Plans** (Recurring MRR)
   - Analyst ($119-149/mo), Trade Desk ($399-499/mo), Enterprise ($999-1,299/mo)
   - Each plan includes a monthly credit allowance

2. **Credit Packs** (Transactional Revenue)
   - 5 credits per buyer unlock
   - Additional credit packs available for purchase beyond plan limits

3. **Enterprise API Access**
   - Custom integrations with client data warehouses (Snowflake, BigQuery, S3)
   - White-label options for trade promotion agencies

### Key Metrics

| Metric | Description |
|--------|-------------|
| **MRR** (Monthly Recurring Revenue) | Total subscription revenue per month |
| **Credit Consumption Rate** | Average credits used per user per month (indicates engagement) |
| **Unlocks per Session** | How many buyer contacts a user reveals per login |
| **Campaign Conversion** | Open rate to Reply rate to Deal conversion from outreach |

---

## 8. Technical Architecture Summary

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js (App Router), React 19, TypeScript, Tailwind CSS |
| **UI Components** | shadcn/ui (Radix primitives), Recharts for data visualization |
| **Authentication** | Supabase Auth + Demo session cookies |
| **Database** | Supabase Postgres (with RPC functions for credit transactions) |
| **State Management** | React hooks + localStorage (demo mode) |
| **Data Sources** | Mock data for prototype; production would integrate with customs APIs, Apollo.io for contacts |
| **Deployment** | Vercel (Next.js optimized hosting) |

### Key Technical Files

| File | Purpose |
|------|---------|
| `src/lib/trade-data.ts` | HS code products, volume timelines, destination rankings, corridor data |
| `src/lib/buyers-data.ts` | Company buyer profiles, BoL shipment records, sparkline data |
| `src/lib/contacts-data.ts` | Decision maker contacts, masking/unmasking logic |
| `src/lib/campaigns-data.ts` | Dynamic variable definitions, campaign templates, email substitution |
| `src/lib/supabase/server.ts` | Server-side Supabase client for auth verification |
| `src/lib/supabase/client.ts` | Client-side Supabase client for auth actions |

---

> **This document is a living reference.** Update it as new features are added. Last updated: September 2026.
