---
title: "Software Architecture & Engineering Design"
description: "Four-layer architecture, Prisma schema, API contracts, and stack justification."
---

### 6.1 Clean Decoupled 4-Layer Architecture
To guarantee modularity, testability, and long-term reusability, the platform enforces strict architectural boundaries:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        1. PRESENTATION LAYER                           │
│  Next.js 16 App Router (React 19, Tailwind CSS v4, Recharts, Lucide)   │
│  Pages: / (Overview), /calculator, /database, /demo, /methodology      │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ (Typed Props & Server Actions)
┌───────────────────────────────────▼────────────────────────────────────┐
│                        2. API CONTRACT LAYER                           │
│  RESTful Route Handlers: /api/factors, /api/calculate, /api/demo       │
│  Runtime Input/Output Validation via Zod Schemas (lib/validation.ts)   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ (Validated Analytical Payloads)
┌───────────────────────────────────▼────────────────────────────────────┐
│                        3. CORE CALCULATION ENGINE                      │
│  Pure TypeScript Functions (lib/calc/*): materials.ts, processes.ts,   │
│  usePhase.ts, transport.ts, recycling.ts, bands.ts, trajectory.ts      │
│  ZERO dependencies on React or Web APIs — 100% Vitest Unit Testable    │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ (Deterministic Factor Lookups)
┌───────────────────────────────────▼────────────────────────────────────┐
│                   4. DATA ACCESS & STORAGE LAYER                       │
│  Prisma ORM Client Singleton (lib/db.ts) -> PostgreSQL (Neon / Local)  │
│  Idempotent Seed Runner (prisma/seed.ts) ingesting verified JSON data   │
└────────────────────────────────────────────────────────────────────────┘
```

---

### 6.2 Relational Data Model (Prisma / PostgreSQL Schema)
The relational schema mirrors the data principles: every number carries an explicit Source, Grade, and Version status:

```prisma
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Grade {
  A // Official, current, audited India-specific baseline (e.g. CEA v20.0, SFC-TERI 2026)
  B // Peer-reviewed academic Indian study or foreign baseline adapted to Indian conditions
  C // Industry report, directional estimate, or unverified commercial worksheet
  D // Placeholder — rendered in UI with warning banners, programmatically blocked from calculation
}

enum FactorStatus {
  ACTIVE
  SUPERSEDED
}

enum Sourcing {
  MAKE
  BUY
  IMPORTED
}

model Source {
  id               String            @id @default(cuid())
  name             String            // e.g. "CEA CO2 Baseline Database v20.0"
  publisher        String            // e.g. "Central Electricity Authority, Ministry of Power"
  year             Int               // 2024
  version          String?           // "v20.0"
  url              String?           // Direct PDF / portal hyperlink
  materials        Material[]
  processes        ProcessStep[]
  gridFactors      GridFactor[]
  transportFactors TransportFactor[]
  vehicleSystems   VehicleSystem[]
}

model Material {
  id           String       @id @default(cuid())
  key          String       @unique // e.g. "material:nmc811:cathode"
  name         String       // "NMC811 Cathode Active Material"
  category     String       // "cathode" | "anode" | "metal" | "electrolyte"
  unit         String       @default("kg")
  co2ePerUnit  Float        // kg CO2e per unit (headline central value)
  low          Float?       // 95% CI lower bound
  high         Float?       // 95% CI upper bound
  grade        Grade
  status       FactorStatus @default(ACTIVE)
  sourceId     String
  source       Source       @relation(fields: [sourceId], references: [id])
  supersededBy String?
  createdAt    DateTime     @default(now())

  @@index([key, status])
}

model ProcessStep {
  id               String       @id @default(cuid())
  key              String       @unique // e.g. "process:formation"
  name             String       // "Formation Charging/Discharging"
  stage            String       // "cell" | "module" | "pack"
  energyPerKwhCell Float       // Energy consumed per kWh cell capacity manufactured
  energyType       String       // "electricity" (kWh) | "gas" (kWh thermal)
  grade            Grade
  status           FactorStatus @default(ACTIVE)
  sourceId         String
  source           Source       @relation(fields: [sourceId], references: [id])

  @@index([key, status])
}

model GridFactor {
  id              String       @id @default(cuid())
  key             String       @unique // e.g. "grid:india:2024:actual"
  region          String       @default("National")
  year            Int
  scenario        String       @default("actual") // "actual" | "CPS" | "NZS"
  weightedAvg     Float        // kg CO2/kWh headline quote
  operatingMargin Float?
  buildMargin     Float?
  combinedMargin  Float?
  grade           Grade
  status          FactorStatus @default(ACTIVE)
  sourceId        String
  source          Source       @relation(fields: [sourceId], references: [id])

  @@index([year, scenario, status])
}

model TransportFactor {
  id           String       @id @default(cuid())
  key          String       @unique // e.g. "freight:road:hcv:diesel"
  mode         String       // "road" | "rail" | "sea" | "air"
  vehicleClass String       // "HCV" | "MCV" | "SCV" | "Tractor-Trailer"
  powertrain   String       // "diesel" | "ev" | "cng"
  wtwPerTkm    Float        // kg CO2e per tonne-km (Well-to-Wheel)
  low          Float?
  high         Float?
  grade        Grade
  status       FactorStatus @default(ACTIVE)
  sourceId     String
  source       Source       @relation(fields: [sourceId], references: [id])

  @@index([mode, vehicleClass, powertrain, status])
}

model VehicleSystem {
  id         String       @id @default(cuid())
  key        String       @unique // e.g. "oem:tata:cells"
  oem        String       // "Tata Motors" | "Mahindra" | "Bajaj" | "Ather"
  segment    String       // "car" | "2W" | "3W" | "bus"
  powertrain String       // "ICE" | "BEV"
  module     String       // "cells" | "pack" | "motor" | "chassis"
  sourcing   Sourcing     // MAKE | BUY | IMPORTED
  notes      String?
  grade      Grade
  status     FactorStatus @default(ACTIVE)
  sourceId   String
  source     Source       @relation(fields: [sourceId], references: [id])
}

model Calculation {
  id             String            @id @default(cuid())
  name           String
  functionalUnit String            // e.g. "1 x 40 kWh pack, 150,000 km"
  inputs         Json              // Structured input payload
  totalCo2e     Float             // Central estimate (kg CO2e)
  lowCo2e        Float?            // Uncertainty 95% CI lower bound
  highCo2e       Float?            // Uncertainty 95% CI upper bound
  createdAt      DateTime          @default(now())
  items          CalculationItem[]
}

model CalculationItem {
  id            String      @id @default(cuid())
  calculationId String
  calculation   Calculation @relation(fields: [calculationId], references: [id], onDelete: Cascade)
  stage         String      // "birth-materials" | "birth-processes" | "use" | "transport" | "recycling"
  label         String      // "NMC811 Cathode Active Material"
  activity      Float       // Consumed quantity
  unit          String      // "kg", "kWh", "tkm"
  factorValue   Float       // Factor frozen at calculation timestamp
  factorKey     String?     // Traceability key
  result        Float       // activity * factorValue (kg CO2e)
}
```

---

### 6.3 RESTful Route Handlers & Analytical API Contracts
All analytical endpoints operate as serverless Next.js Route Handlers (`app/api/*`):
* `GET /api/factors?type=&search=&grade=&status=ACTIVE`: Returns paginated factor records with source metadata and pedigree badges.
* `POST /api/calculate`: Ingests calculation parameters, executes the pure TypeScript calculation engine, logs calculation items, and returns line-item totals with uncertainty bounds.
  * *Request Body Schema:*
    ```json
    {
      "packKwh": 40.0,
      "chemistry": "NMC811",
      "distanceKm": 150000,
      "consumptionKwhPerKm": 0.160,
      "gridScenario": "NZS",
      "startYear": 2026,
      "legs": [
        { "mode": "sea", "tonnes": 0.1832, "distanceKm": 9200 },
        { "mode": "road", "vehicleClass": "HCV", "tonnes": 0.228, "distanceKm": 1210 }
      ]
    }
    ```
* `GET /api/demo`: Returns the pre-calculated, hand-verified 40 kWh NMC811 worked case for instant audit by competition judges.
* `GET /api/factors/:key`: Returns the complete historical lineage of a factor key across all superseded versions.

---

### 6.4 Technology Stack Justification
* **Next.js 16 (App Router) & React 19:** Combines server-side rendering, fast API route handling, and zero-bundle server logic in a unified deployment.
* **TypeScript (Strict Mode):** Automotive LCA calculations involve complex dimensional units ($\text{kg CO}_2\text{e/kg}, \text{t-km}, \text{kWh/kWh cell}, \text{BTU}$). Strict static typing eliminates unit conversion bugs at build time.
* **Prisma ORM & PostgreSQL:** Relational schema enforcement, transactional migrations, and foreign-key integrity ensure that orphan data cannot enter the database.
* **Tailwind CSS v4 & Recharts:** High-performance responsive styling and composable SVG data visualization for stacked lifecycle bars and trajectory lines.
* **Vitest & Playwright:** Vitest executes isolated mathematical unit tests against known empirical benchmarks in milliseconds; Playwright ensures end-to-end user flow stability.

---
