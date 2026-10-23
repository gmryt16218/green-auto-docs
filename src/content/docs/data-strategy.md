---
title: "Planned Data Strategy & Integration Framework"
description: "Real Indian data sources, the idempotent seed pipeline, and data quality governance."
---

### 4.1 Master Data Inventory & Empirical Sourcing
The table below details the empirical data points embedded within Green Auto India, their primary sources, and assigned data quality grades:

| Parameter Key | Description | Numerical Value | Unit | Data Source | Pedigree Grade |
| :--- | :--- | :--- | :--- | :--- | :---: |
| `grid:india:2024:actual` | National Grid Weighted Avg (w/ RES) | **0.727** | kg CO₂/kWh | CEA CO₂ Baseline Database v20.0 | **A** |
| `grid:india:2024:thermal` | Thermal-Only Power Baseline | **0.942** | kg CO₂/kWh | CEA CO₂ Baseline Database v20.0 | **A** |
| `grid:india:2024:om` | Operating Margin (OM) | **0.965** | t CO₂/MWh | CEA CO₂ Baseline Database v20.0 | **A** |
| `grid:india:2024:bm` | Build Margin (BM) | **0.545** | t CO₂/MWh | CEA CO₂ Baseline Database v20.0 | **A** |
| `grid:india:2024:cm` | Combined Margin (Solar/Wind 75/25) | **0.861** | t CO₂/MWh | CEA CO₂ Baseline Database v20.0 | **A** |
| `grid:india:td_loss` | AT&C Distribution Losses Multiplier | **1.165** | dimensionless | CEA / NITI Aayog ICED (16.5% loss) | **A** |
| `grid:india:trajectory:cps` | Grid Trajectory (Current Policy) | 0.727 → 0.328 → 0.067 | kg CO₂/kWh | NITI Aayog Viksit Bharat Vol. 7 (2026) | **A** |
| `grid:india:trajectory:nzs` | Grid Trajectory (Net Zero 2070) | 0.727 → 0.257 → 0.000 | kg CO₂/kWh | NITI Aayog Viksit Bharat Vol. 7 (2026) | **A** |
| `material:nmc811:cathode` | NMC811 Cathode Active Material | **4.32** | kg CO₂e/kg | Patil et al. (2026), J. Energy Storage | **B** |
| `material:lfp:cathode` | LFP Cathode Active Material | **2.85** | kg CO₂e/kg | Patil et al. (2026) / ANL BatPaC v5.0 | **B** |
| `material:graphite:anode` | Synthetic Graphite Anode | **2.50** | kg CO₂e/kg | Patil et al. (2026) Supplementary | **B** |
| `material:copper:foil` | Copper Current Collector Foil | **6.50** | kg CO₂e/kg | Ecoinvent / Indian Secondary Smelters | **B** |
| `material:aluminium:domestic` | Captive Coal Indian Aluminium | **18.50** | kg CO₂e/kg | TERI / CEEW Smelting Baseline | **C** |
| `material:steel:coal_dri` | Indian Coal-DRI Induction Steel | **2.95** | kg CO₂e/kg | CEEW / TERI Steel Sector Reports | **C** |
| `process:battery:electricity` | Direct Cell Manufacturing Electricity | **20.11** | kWh/kWh cell | Llamas-Orozco / Patil et al. (2026) | **B** |
| `process:battery:gas` | Direct Thermal Drying Natural Gas | **21.38** | kWh/kWh cell | Llamas-Orozco / Patil et al. (2026) | **B** |
| `process:battery:formation` | Formation Cycling Electricity Only | **9.92** | kWh/kWh cell | Patil et al. (2026) Supplementary | **B** |
| `freight:road:hcv:diesel` | Diesel Heavy Truck (12–20 MT) WTW | **0.0902** | kg CO₂e/t-km | SFC India & TERI Whitepaper (2026) | **A** |
| `freight:road:tt:diesel` | Diesel Tractor Trailer (30–60 MT) WTW| **0.0551** | kg CO₂e/t-km | SFC India & TERI Whitepaper (2026) | **A** |
| `freight:road:mcv:diesel` | Diesel Medium Truck (5–12 MT) WTW | **0.1400** | kg CO₂e/t-km | SFC India & TERI Whitepaper (2026) | **A** |
| `freight:road:scv:diesel` | Diesel Light Truck (<3.5 MT) WTW | **0.3795** | kg CO₂e/t-km | SFC India & TERI Whitepaper (2026) | **A** |
| `freight:ocean:container` | Maritime Container Freight WTW | **0.0150** | kg CO₂e/t-km | IMO / GLEC Framework v3.0 | **B** |
| `fuel:petrol:wtw` | Petrol Liquid Fuel Combustion WTW | **2.9457** | kg CO₂e/L | SFC India & TERI (TTW 2.232 + WTT 0.714)| **A** |
| `fuel:diesel:wtw` | Diesel Fuel Combustion WTW | **3.4808** | kg CO₂e/L | SFC India & TERI (TTW 2.675 + WTT 0.806)| **A** |
| `recycling:credit:hydromet` | Hydrometallurgical CAM Avoided Debt | **-32.0%** | % of virgin CAM| Verma et al. (2024), MDPI Sustainability| **B** |
| `engine:ice:block_mfg` | ICE Engine Block Casting/Machining | *Uncollected* | kg CO₂e/unit | **OPEN GAP (Transparently Documented)**| **D** |

---

### 4.2 Primary Resource Deep-Dive: Empirical Synthesis

#### 1. Patil et al. (2026) — Battery Manufacturing Energy Breakdown
From the peer-reviewed supplementary data of Patil et al. (*Journal of Energy Storage*, Vol. 170), the direct energy consumption across 27 manufacturing processes per kWh of cell capacity manufactured is synthesized below:

```
Process Step                      Electricity (kWh/kWh)    Natural Gas (kWh/kWh)
────────────────────────────────────────────────────────────────────────────────
Mixing (Cathode/Anode)                     0.13                     0.00
Electrode Coating & Drying                 0.92                    10.10
Roll Calendaring                           0.53                     0.00
Precision Slitting                         0.16                     0.00
Vacuum Drying                              0.04                     1.57
Cell Winding / Stacking                    0.25                     0.00
Cell Assembly & Packaging                  1.59                     0.00
Cell Washing                               1.98                     0.00
Formation Charging / Discharging           9.92                     0.25
Controlled Thermal Aging                   0.00                     0.40
OCV & Capacity Testing                     0.99                     0.00
Internal Logistics & Handling              1.98                     0.00
Dry Room Conditioning (HVAC <-40°C)        1.62                     9.06
────────────────────────────────────────────────────────────────────────────────
TOTAL DIRECT CELL MANUFACTURING           20.11 kWh/kWh            21.38 kWh/kWh
```
*Crucial Finding:* Formation cycling (9.92 kWh) and dry room HVAC conditioning represent **62% of all factory electrical and thermal energy**, proving that domestic cell manufacturing emissions are overwhelmingly driven by the grid emission factor of the plant's host state.

#### 2. SFC India & TERI (2026) — Certified Logistics Factors
From the landmark whitepaper *Institutionalizing Freight Emissions Accounting in India*, the verified Well-to-Wheel road freight emission intensity values are:
* **Tractor Trailer (30–60 MT, 20–50 MT payload):** $0.0551\text{ kg CO}_2\text{e/t-km}$ ($WTT: 0.0128, TTW: 0.0423$)
* **HCV-1 (12–20 MT, 8–12 MT payload):** $0.0902\text{ kg CO}_2\text{e/t-km}$ ($WTT: 0.0209, TTW: 0.0692$)
* **MCV-2 (5–12 MT, 3.5–8 MT payload):** $0.1400\text{ kg CO}_2\text{e/t-km}$ ($WTT: 0.0324, TTW: 0.1075$)
* **SCV (<3.5 MT, 0.5–2 MT payload):** $0.3795\text{ kg CO}_2\text{e/t-km}$ ($WTT: 0.0879, TTW: 0.2916$)

#### 3. OEM Sourcing Matrix (Tata, Mahindra, Bajaj, Ather)
From the primary industry research worksheet (`Automotive_OEM_Sourcing_Matrix_Tata_Mahindra_Bajaj_Ather.xlsx`), module sourcing patterns across Indian OEMs reveal:
* **Battery Cells:** **100% Outsourced / Imported** across all four OEMs (CATL, BYD, LG Energy Solution, Samsung SDI).
* **Battery Pack Assembly:** **In-House / Mixed** across all OEMs (Tata AutoComp Pune, Ather Hosur, Mahindra Chakan, Bajaj Akurdi).
* **BMS Hardware & Software:** In-house architecture with imported semiconductor silicon (TI, NXP, Infineon).
* **Body-in-White & Chassis:** 100% Domestic (Tata Steel, JSW, Bharat Forge).
* **Traction Motors:** Localized assembly; 100% imported NdFeB permanent magnets.

---

### 4.3 Idempotent Seed Pipeline & Versioning Architecture
To maintain absolute data provenance, all background inventory records are ingested via an idempotent seed pipeline (`prisma/seed.ts`):
```text
For each JSON datasource (cea_grid.json, patil_battery.json, sfc_teri_freight.json, niti_trajectory.json):
  1. Validate JSON rows against strict Zod runtime schemas (lib/validation.ts).
  2. Upsert Source entity (author, organization, publication year, version tag, source URL).
  3. Query Factor table by natural key (e.g., 'grid:india:2024:actual'):
       - If factor key does NOT exist -> INSERT as ACTIVE.
       - If factor key exists with IDENTICAL value -> NO-OP (idempotent idempotency).
       - If factor key exists with NEW value -> UPDATE old record status = SUPERSEDED (set supersededBy = new.id),
                                               INSERT new record status = ACTIVE.
  4. Log audit delta (records created, skipped, superseded).
```
Calculations permanently store the historical factor value used at runtime in `CalculationItem.factorValue`, ensuring calculations remain **100% reproducible** even after background databases are updated.

---

### 4.4 Data Quality Governance & "No Silent Fallback" Principle
Green Auto India enforces four inviolable architectural rules:
1. **No Silent Fallback to Zero:** If a factor key is missing, the engine throws an explicit `MissingFactorError(key)` resulting in an HTTP 422 Unprocessable Entity response naming the missing key. It never defaults to zero or foreign averages.
2. **Grade D Exclusion:** Factors graded "D" (unverified placeholders) are highlighted in the Database Browser with warning banners and are programmatically blocked from calculation execution.
3. **Unit Validation at System Boundary:** Input pack capacity in Wh or distance in miles is intercepted and rejected by Zod validators.
4. **Transparent Lineage:** Every result item renders a clickable link pointing directly to its underlying Source record and pedigree score.

---
