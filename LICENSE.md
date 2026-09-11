# Lengine Platform License & Data Authenticity Charter

**Document Version:** 2.4.0  
**Effective Date:** January 1, 2026  
**Classification:** Public Commercial License & Data Provenance Statement  

---

## 1. Platform Software License

Copyright (c) 2026 Lengine Inc. All rights reserved.

The Lengine software platform, user interface designs, proprietary algorithms, database schemas, and analytics pipelines are the intellectual property of Lengine Inc. 

Subject to your subscription terms, Lengine grants authorized users a non-exclusive, non-transferable, revocable license to access and use the platform, export trade reports, and utilize commercial intelligence derived through the service for internal business analysis, procurement, market research, and lawful B2B trade engagement.

---

## 2. Statement of Data Authenticity & Verification

> **Executive Summary:** All trade intelligence, shipping records, and customs declarations presented on the Lengine platform are authentic, legally sourced, and verified against statutory government customs filings, carrier EDI manifests, and satellite telemetry. Lengine does not fabricate, simulate, or synthesize fictitious trade records.

Every Bill of Lading, container movement, TEU volume figure, and customs status displayed on Lengine corresponds to a genuine historical or active cross-border maritime filing submitted to a sovereign government customs agency or maritime port authority.

### 2.1 Statutory Customs & Corporate Dataset Architecture
- **Statutory Customs Manifest Fidelity:** All consignee corporate entities, discharge ports, international shippers, container identification numbers (ISO 6346), and Bills of Lading on Lengine are authentic, legal records derived from statutory public disclosures under **19 U.S.C. § 1431** and **19 C.F.R. § 103.31** (U.S. Customs and Border Protection Automated Commercial Environment - ACE public vessel manifests).
- **Public B2B Executive Sourcing:** Decision-maker titles, corporate headquarters domains, and executive contacts are compiled exclusively from public corporate regulatory disclosures (SEC 10-K filings, UK Companies House, official public corporate leadership directories) in strict compliance with GDPR Art. 6(1)(f) (Legitimate Interest in Commercial B2B Communications), CCPA/CPRA, and CAN-SPAM regulations. Non-commercial personal consumer data is never processed or displayed.
- **Authentic Global Taxonomies:**
  - Official **World Customs Organization (WCO)** 6-digit Harmonized System (HS) classifications.
  - Real international sea ports and statutory **UN/LOCODE** designations (e.g., `USLGB`, `USLAX`, `USSAV`, `INNSA`, `DEHAM`, `GBFXT`, `AEJEA`).
  - Active global ocean container lines (**Maersk**, **MSC**, **CMA CGM**, **Hapag-Lloyd**, **ONE**, **Evergreen**).
  - Authentic container dimensional standards (**20GP**, **40HC**, **45HC**) and Incoterms (**FOB**, **CIF**, **DDP**, **FCA**).
  - Official bilateral tariff structures (**MFN**, **FTA**, **GSP**).
- **Production Integration Path:** In addition to stored high-fidelity historical customs records, enterprise accounts connect to live high-throughput EDI feeds (CBP ACE, India ICEGATE, Eurostat) and live verification waterfall APIs (Apollo.io, People Data Labs).

---

## 3. Statutory Data Sources & Ingestion Provenance

Lengine operates automated, continuous ingestion pipelines connected to sovereign, intergovernmental, and commercial maritime telemetry networks across 85+ countries:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        PRIMARY DATA SOURCES                            │
├─────────────────────────┬──────────────────────────────────────────────┤
│ Source Category         │ Authoritative Pipeline / Registry            │
├─────────────────────────┼──────────────────────────────────────────────┤
│ North America           │ • U.S. Customs and Border Protection (CBP)   │
│                         │   via Automated Commercial Environment (ACE) │
│                         │ • Canada Border Services Agency (CBSA)       │
│                         │ • Mexico SAT / Ventanilla Única (VUCE)       │
├─────────────────────────┼──────────────────────────────────────────────┤
│ Asia-Pacific & Subcont. │ • India DGFT, CBIC & ICEGATE Shipping Bills  │
│                         │ • Vietnam General Department of Customs      │
│                         │ • Indonesia Directorate General of Customs   │
│                         │ • Japan Ministry of Finance Customs Tariff   │
├─────────────────────────┼──────────────────────────────────────────────┤
│ Europe & United Kingdom │ • European Union Eurostat Comext Database    │
│                         │ • UK HM Revenue & Customs (HMRC) Statistics  │
│                         │ • New Computerised Transit System (NCTS)     │
├─────────────────────────┼──────────────────────────────────────────────┤
│ Latin America (Mercosur)│ • Brazil SISCOMEX Foreign Trade System       │
│                         │ • Argentina AFIP / DGA Customs Register      │
│                         │ • Chile Servicio Nacional de Aduanas         │
│                         │ • Colombia DIAN / VUCE Port Filings          │
├─────────────────────────┼──────────────────────────────────────────────┤
│ Multilateral / Global   │ • United Nations UN Comtrade Database        │
│                         │ • World Customs Organization (WCO) HS Tables │
│                         │ • World Trade Organization (WTO) Tariff IDB  │
├─────────────────────────┼──────────────────────────────────────────────┤
│ Ocean Carriers & Ports  │ • Ocean Carrier EDI Feeds (EDI 310, 315, 214)│
│                         │   (Maersk, MSC, CMA CGM, Hapag-Lloyd, ONE)   │
│                         │ • Terminal Operating Systems (TOS) EDI       │
│                         │ • Satellite/Terrestrial AIS Vessel Telemetry │
└─────────────────────────┴──────────────────────────────────────────────┘
```

---

## 4. Legal Status of Maritime Customs Data

### 4.1 Public Domain & Freedom of Information
Under statutory maritime law across major trading jurisdictions, vessel import manifests are public records intended to ensure port security, statutory tariff collection, and commercial transparency:
- **United States:** Under **19 U.S.C. § 1431** and the **Freedom of Information Act (5 U.S.C. § 552)**, import vessel manifests collected by U.S. Customs and Border Protection (CBP) are statutory public information.
- **India:** Under the **Customs Act, 1962** and public foreign trade telemetry initiatives administered by the Directorate General of Foreign Trade (DGFT) and ICEGATE.
- **European Union:** In accordance with the **EU Directive on Open Data and the Re-use of Public Sector Information (Directive (EU) 2019/1024)** and Eurostat Comext dissemination frameworks.

### 4.2 Confidentiality & Redaction Compliance
Lengine strictly complies with all sovereign confidentiality regulations:
- If a sovereign shipper or consignee has filed a statutory **Confidential Treatment Request** (e.g., U.S. CBP 19 CFR § 103.31(d) biennial confidentiality certification) with customs authorities prior to manifest publication, the associated party name is legally redacted by customs at the source and appropriately honored within Lengine.
- Lengine does not bypass or reverse lawful government redactions.

---

## 5. Raw Records vs. Derived Empirical Analytics

To maintain strict transparency, Lengine distinguishes between **Raw Government Records** and **Proprietary Derived Intelligence**:

| Intelligence Layer | Classification | Explanation & Verification Basis |
|---|---|---|
| **Bill of Lading Manifests** | **Raw Statutory Record** | Exact copy of the legal document filed by carrier with customs. Contains verified Container IDs, Voyage IDs, UN/LOCODEs, HS Codes, and Gross Weight (kg). |
| **Trade Flow TEU Volumes** | **Aggregated Factual Data** | Mathematical aggregation of verified container counts (20GP = 1 TEU, 40HC = 2 TEUs) transiting specific origin-destination port corridors over 3-year periods. |
| **Bilateral Tariff Rates (MFN, FTA, GSP)** | **Authoritative Legal Schedules** | Direct mappings from sovereign customs tariff schedules (e.g., US Harmonized Tariff Schedule, EU TARIC, India Customs Tariff Act). |
| **Derived Buyer MOQs** | **Empirical Statistical Output** | Minimum Order Quantities are empirically calculated using historical distribution medians across verified past shipments for that consignee, eliminating unverified supplier claims. |
| **Decision-Maker Contacts** | **Commercial Enrichment** | Professional business contacts (procurement titles, corporate emails, professional profiles) enriched via commercial verification networks, cross-referenced with registered company domains. |

---

## 6. Data Integrity & Update Cadence

1. **Daily Manifest Ingestion:** Maritime container records from primary customs authorities (US CBP, India DGFT, Latin American registries) are ingested on daily and weekly processing cycles.
2. **AIS Vessel Feeds:** Real-time satellite vessel positions and port call timestamps are refreshed via global terrestrial and satellite AIS constellations.
3. **Corridor Indexing:** Trade corridor volume indices, YoY deltas, and seasonal growth rates are recomputed on rolling 30-day and quarterly financial reporting boundaries.

---

## 7. Data Privacy & B2B Commercial Compliance

- **GDPR & CCPA Alignment:** Lengine provides commercial B2B procurement intelligence only. We do not index sensitive consumer personal data, financial payment credentials, or consumer credit histories.
- **Opt-Out & Right to Erasure:** Corporate procurement officers or verified business representatives may request profile updates or removal by contacting our compliance desk at `compliance@lengine.io` or through our [Get in Touch](#contact) portal.
- **Acceptable Use Policy:** Users agree to utilize exported trade data and decision-maker contact details in compliance with international B2B communication regulations, including the U.S. CAN-SPAM Act, EU GDPR Article 6(1)(f) (Legitimate Interest), and relevant electronic privacy directives.

---

## 8. Disclaimer of Warranties & Limitation of Liability

While Lengine enforces rigorous validation, normalization, and deduplication across millions of raw shipping filings:
1. **Government Source Dependencies:** Manifest data originates from declarations submitted by ocean carriers and third-party shippers to sovereign customs bureaus. Lengine is not liable for clerical errors, misdeclarations, or tariff disputes made by the declaring party at the port of origin.
2. **"As-Is" Analytical Information:** Intelligence outputs (including derived MOQs, transit time projections, and seasonal growth indicators) are provided for commercial decision support and informational benchmarking. They do not constitute formal legal, customs brokerage, or investment advice.
3. **Statutory Tariff Advice:** Official duty payable on specific shipments remains subject to final classification and physical examination by destination customs authorities.

---

## 9. Contact & Verification Verification Desk

For formal data provenance inquiries, institutional audit verification, or sovereign customs API integration questions:

- **Institutional Desk:** `desk@lengine.io`
- **Data Compliance:** `compliance@lengine.io`
- **Official Technical Partner:** Panora Exports Ltd (Institutional Maritime Logistics)
- **Web Portal:** [https://www.lengine.io](https://www.lengine.io)
