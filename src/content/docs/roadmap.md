---
title: "Implementation Roadmap to Grand Finale"
description: "Phased build plan from 7 Nov to the finale on 16-18 Dec 2026, plus the national horizon."
---

### 8.1 Phased Execution Timeline (7 Nov – 18 Dec 2026)
Following Round 1 shortlisting announcements on **7 November 2026**, the engineering team will execute a four-phase sprint leading into the Grand Finale at IIT Bombay:

```
IMPLEMENTATION ROADMAP (7 NOV – 18 DEC 2026)
===========================================
Phase A: Foundation (7–16 Nov)   --> Schema, Neon DB, Seed Pipeline, Data Ingestion
Phase B: Engine (17–30 Nov)      --> Pure TS Math Engine, Vitest Suite, Analytical APIs
Phase C: Frontend (1–12 Dec)     --> 5 Next.js Views, Dynamic Charts, UX Polish
Phase D: Hardening (13–15 Dec)   --> E2E Smoke Tests, Vercel Production Deploy, Dry Runs
GRAND FINALE (16–18 DEC 2026)    --> Live Jury Defense & Demonstration at IIT Bombay
```

| Phase | Duration | Core Deliverables | Verification & Success Criteria |
| :--- | :--- | :--- | :--- |
| **Phase A: Foundation** | 7–16 Nov | • Project scaffolding (Next.js 16, TypeScript, Tailwind v4).<br>• Prisma relational schema definition & migration.<br>• Ingestion of verified seed data (CEA, Patil et al., SFC-TERI, NITI, OEM matrix). | `pnpm prisma db seed` runs idempotently with zero errors; `/database` view renders all active factors. |
| **Phase B: Engine** | 17–30 Nov | • Mathematical modules (`lib/calc/*`).<br>• Dynamic grid trajectory interpolation algorithm.<br>• Pedigree matrix uncertainty band calculator.<br>• Analytical API route handlers (`/api/calculate`, `/api/demo`). | Vitest test suite achieves **100% pass rate** reproducing the 20.24 t demo benchmark within $\pm 0.1\%$; missing factors throw HTTP 422. |
| **Phase C: Frontend** | 1–12 Dec | • Overview page (`/`) with headline problem metrics.<br>• Interactive Calculator (`/calculator`) with real-time Recharts updates.<br>• Filterable Database Browser (`/database`) with pedigree badges.<br>• Worked Demonstration Narrative (`/demo`).<br>• Methodology & Gaps Transparency page (`/methodology`). | A non-technical jury member can configure a vehicle, trigger a calculation, and interpret uncertainty bands in <4 clicks. |
| **Phase D: Hardening** | 13–15 Dec | • Playwright end-to-end smoke testing.<br>• Vercel production deployment & Neon database pooling.<br>• Live jury presentation deck & interactive demonstration rehearsals. | Sub-2-second page loads; zero layout shifts; live production URL and GitHub repository ready for presentation. |

---

### 8.2 National Scalability Horizon (Phases 1 through 4)
The platform is designed to scale into a national digital public good for automotive sustainability:

```
┌────────────────────────┐      ┌────────────────────────┐      ┌────────────────────────┐      ┌────────────────────────┐
│    PHASE 1: DEMO       │      │ PHASE 2: FULL VEHICLE  │      │ PHASE 3: MULTI-SEGMENT │      │ PHASE 4: NATL PLATFORM │
│ • 40 kWh Battery Pack  │ ───► │ • Complete M1 Car      │ ───► │ • All CMVR Categories  │ ───► │ • ICAT Certification   │
│ • ICE Powertrain Comp  │      │ • BIW, Chassis, Glider │      │   (L1/L3, L5, M3, N3)  │      │ • MHI Subsidy Sandbox  │
│ • GWP (CO2e) Indicator │      │ • Full A1-D Life Cycle │      │ • Segment BOM Models   │      │ • Enterprise OEM APIs  │
└────────────────────────┘      └────────────────────────┘      └────────────────────────┘      └────────────────────────┘
```

* **Phase 1 (Competition Demo Slice - Dec 2026):** Focused on the 40 kWh traction battery pack vs. ICE powertrain comparator, establishing core engine validity and database pedigree.
* **Phase 2 (Full Vehicle Architecture - Q1 2027):** Ingests Body-in-White (BIW) steel stamping, aluminium closures, automotive glazing, interior polymers, and OEM paint shop utilities to assess complete vehicles.
* **Phase 3 (Multi-Segment CMVR Scale - Q2 2027):** Integrates tailored Bill of Materials for electric two-wheelers (L3 - Ather/Ola), commercial three-wheelers (L5 - Mahindra/Euler), light commercial vehicles (N1 - Tata Ace EV), and electric transit buses (M3 - Switch/Olectra).
* **Phase 4 (National Institutional Platform - 2027–2028):** Deploys multi-tenant cloud infrastructure for ICAT homologation carbon auditing, MHI subsidy eligibility verification under PM E-DRIVE, and enterprise REST APIs for automated OEM PLM software integration.

---
