---
title: "Scope Definition & System Boundaries"
description: "CMVR vehicle taxonomy, battery chemistries, lifecycle phases A1 to D, and functional units."
---

### 2.1 Indian EV Regulatory Taxonomy (CMVR / AIS-053)
To ensure long-term architectural scalability, Green Auto India adopts the official vehicle classification framework codified under the **Central Motor Vehicles Rules (CMVR), 1989** and Automotive Industry Standard **AIS-053**, harmonized with UNECE categories:

```
INDIAN AUTOMOTIVE REGULATORY TAXONOMY (CMVR / AIS-053)
======================================================
├── L-CATEGORY: Micro-Mobility, Two-Wheelers & Three-Wheelers
│   ├── Exempt: Micro-Mobility (<0.25 kW, <25 km/h — e-bicycles)
│   ├── L1: Light Two-Wheeler (Speed ≤ 45 km/h, Motor ≤ 0.5 kW)
│   ├── L2: Commuter Two-Wheeler (Speed > 45 km/h, Motor > 0.5 kW)
│   ├── L3: High-Speed Motorcycle / Scooter (Speed > 50 km/h) — [Ather 450X, Ola S1 Pro, TVS iQube, Bajaj Chetak]
│   ├── Special CMVR Rule 2(ca)/2(cb): E-Rickshaw / E-Cart (≤4 kW, ≤25 km/h, GVW ≤ 700 kg)
│   ├── L5-M: High-Speed 3-Wheeler Passenger (GVW ≤ 1,500 kg, Speed > 25 km/h) — [Mahindra Treo, Bajaj RE E-Tec]
│   ├── L5-N: High-Speed 3-Wheeler Cargo (GVW ≤ 1,500 kg, Goods Body) — [Euler HiLoad, Mahindra Treo Zor]
│   └── L7-M / L7-N: Quadricycle (Unladen ≤ 450/550 kg, Motor ≤ 15 kW) — [Bajaj Qute EV]
│
├── M-CATEGORY: Power-Driven Passenger Vehicles (≥ 4 Wheels)
│   ├── M1: Passenger Cars & SUVs (≤ 9 seats including driver) — [Tata Nexon EV, Tata Curvv EV, Mahindra BE 6e]
│   ├── M2: Minibuses / Feeder Transit (> 9 seats, GVW ≤ 5.0 tonnes) — [Force Traveller EV]
│   └── M3: Heavy Commercial Passenger Transit Buses (> 9 seats, GVW > 5.0 tonnes)
│       ├── Mini / Feeder Bus: Length ≤ 7m (GVW 6–8 tonnes)
│       ├── Midi Transit Bus: Length 9m (GVW 9–12 tonnes) — [Tata Starbus EV 9m, JBM Ecolife]
│       ├── Standard Transit Bus: Length 12m (GVW 16–19.5 tonnes) — [Switch EiV 12, Olectra K9]
│       └── Double-Decker / Articulated: (GVW up to 22 tonnes) — [Switch EiV 22]
│
└── N-CATEGORY: Power-Driven Commercial Goods Vehicles (≥ 4 Wheels)
    ├── N1: Light Commercial Vehicles (GVW ≤ 3.5 tonnes) — [Tata Ace EV, Switch IeV3]
    ├── N2: Medium Commercial Trucks (3.5 tonnes < GVW ≤ 12.0 tonnes) — [Tata Ultra EV, Eicher Pro 2055 EV]
    └── N3: Heavy Commercial Trucks & Multi-Axle Haulers (GVW > 12.0 tonnes) — [Tata Prima E.28K / 5530.S EV]
```

---

### 2.2 Segment-Wise Battery Chemistries & Mass Breakdowns
Indian climatic extremes (ambient temperatures $>45^\circ\text{C}$) and vehicle duty cycles create a unique chemical divergence:

```
+--------------------------------------------------------------------------------------------------+
|                               INDIAN BATTERY CHEMISTRY DISTRIBUTION                              |
+---------------------+----------------------------+-----------------------------------------------+
| Vehicle Segment     | Dominant Chemistry & Share | Primary Operational / Technical Rationale     |
+---------------------+----------------------------+-----------------------------------------------+
| E2W (Two-Wheelers)  | NMC 811/622 (~75%)         | High volumetric density to fit compact frames.|
|                     | LFP (~25%, expanding)      | Thermal safety, longer life (Ather Rizta).    |
+---------------------+----------------------------+-----------------------------------------------+
| E3W (Auto / Cargo)  | LFP (>90%)                 | Extreme thermal stability, 3,000+ cycle life. |
+---------------------+----------------------------+-----------------------------------------------+
| E4W (Passenger)     | LFP (~80% of market)       | Lower cost, fire safety, daily 100% charging  |
|                     |                            | (Tata Nexon/Punch/Curvv, MG Windsor, BYD).    |
|                     | NMC 532/811 (~20%)         | Premium long-range platforms (XUV400, Ioniq 5)|
+---------------------+----------------------------+-----------------------------------------------+
| E-Buses & E-Trucks  | LFP (>85%)                 | Total Cost of Ownership (TCO), safety margin. |
+---------------------+----------------------------+-----------------------------------------------+
```

Benchmarking from **Argonne National Laboratory’s BatPaC v5.0** alongside Indian teardown literature defines the empirical mass distribution between chemistries:

| Subsystem Component / Material Layer | NMC811 Pack Mass (kg/kWh) | NMC811 Mass Share (%) | LFP Pack Mass (kg/kWh) | LFP Mass Share (%) | Functional Role in Indian Context |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Cathode Active Material (CAM)** | **1.20** | 21.1% | **2.05** | 26.1% | LFP requires ~70% higher mass due to lower nominal cell voltage (3.2V vs 3.65V). |
| **Anode Material (Synthetic Graphite)** | **1.05** | 18.4% | **1.15** | 14.6% | Synthetic graphite intercalation matrix. |
| **Copper Current Collector Foil** | **0.55** | 9.6% | **0.75** | 9.5% | Negative electrode foil (6–8 µm). Higher surface area in LFP elevates copper mass. |
| **Aluminium Collector Foil** | **0.32** | 5.6% | **0.52** | 6.6% | Positive electrode foil (12–15 µm). |
| **Electrolyte (LiPF₆ + EC/DMC)** | **0.82** | 14.4% | **1.08** | 13.7% | Ion transport medium. Higher porosity in LFP requires higher electrolyte fill. |
| **Separator Membrane (Ceramic PE/PP)** | **0.11** | 1.9% | **0.16** | 2.0% | Microporous membrane with Al₂O₃ coating for thermal shutdown protection. |
| **Cell Casing & Terminals** | **0.45** | 7.9% | **0.82** | 10.4% | Deep-drawn aluminium can (prismatic format standard in Indian LFP). |
| **SUBTOTAL: CELL LEVEL** | **4.58 kg/kWh** | **80.3%** | **6.65 kg/kWh** | **84.7%** | **Cell Specific Energy: ~218 Wh/kg (NMC) vs. ~150 Wh/kg (LFP)** |
| **Module Frames & Side Straps** | **0.32** | 5.6% | **0.38** | 4.8% | Extruded structural Al-6000 series compression plates. |
| **Pack Enclosure Tray & Crash Cover** | **0.42** | 7.4% | **0.48** | 6.1% | Reinforced bottom skid plate designed for Indian unpaved road ground strikes. |
| **Thermal Management System (TMS)** | **0.22** | 3.9% | **0.20** | 2.5% | Micro-channel cooling plates + 50:50 glycol-water loop for 45°C ambient heat. |
| **HV Busbars & Internal Wiring** | **0.08** | 1.4% | **0.10** | 1.3% | Laser-welded nickel-coated copper busbars. |
| **BMS Hardware, Contactors & Relays** | **0.08** | 1.4% | **0.05** | 0.6% | Master controller, isolated gate drivers, pyro-fuse, manual service disconnect. |
| **TOTAL PACK LEVEL MASS** | **5.70 kg/kWh** | **100.0%** | **7.86 kg/kWh** | **100.0%** | **Pack Energy Density: ~175 Wh/kg (NMC) vs. ~127 Wh/kg (LFP)** |

---

### 2.3 Modular Life Cycle Phases (A1–D System Boundaries)
Adhering to **ISO 14040/14044** and **EN 15804/ISO 21930** modularity, the life cycle of the automotive system is divided into four distinct phases:

```
[ A1: Raw Material Extraction ] ──┐
  Ores, synthetic graphite, CAM    │
                                   ├──→ [ A2: Inbound Logistics ] ──→ [ A3: Manufacturing ]
[ Upstream Precursors ] ──────────┘      Multimodal transport            Cell assembly, dry room,
  CoSO4, NiSO4, Li2CO3, Al, Cu           (Ocean shipping + HCV)          curing, formation cycling
                                                                                    │
                                                                                    ▼
[ B1-B4: Maintenance & Wear ] ◄─────────────────────────────────────── [ B6: Operational Use Phase ]
  Tires, fluids, BMS servicing                                          Well-to-Wheel (WTW) energy,
                                                                        dynamic annual grid decay
                                                                                    │
                                                                                    ▼
[ D: Avoided Burden Credits ] ◄── [ C3-C4: Recycling & EoL ] ◄──────── [ C1-C2: Collection & Freight ]
  Hydromet recovery displacement   Black mass hydrometallurgy,           ELV depollution, transit to
  (capped at 20 kg CO2e/kWh)        ASR disposal, sorting                registered scrapping facility
```

* **Module A1 (Raw Material Extraction & Refining):** Cradle-to-gate extraction of mineral ores, chemical synthesis of Cathode Active Materials (CAM), synthetic graphitization, copper/aluminium foil rolling, and polymer processing.
* **Module A2 (Inbound Logistics & Freight):** Multimodal freight forwarding from overseas precursor refiners (China, South Korea) via ocean container shipping to Indian ports (Nhava Sheva, Chennai), followed by domestic road haulage to OEM gigafactories.
* **Module A3 (Component Manufacturing & Vehicle Assembly):** Slurry mixing, high-precision electrode coating, roll calendaring, continuous vacuum drying, cell assembly, formation cycling, aging, and pack integration.
* **Module B (Operational Use Phase):**
  * **B6 (Operational Energy - Well-to-Wheel):** Upstream electricity generation, transmission losses, charging station losses, and vehicle battery discharge.
  * **B1–B4 (Direct In-Use & Servicing):** Non-exhaust particulate matter from brake wear and tire abrasion, refrigerant leakage, and periodic replacement of fluids and tire sets.
* **Module C (End-of-Life - EoL):** Registered Vehicle Scrapping Facility (RVSF) de-pollution (C1), transport to recyclers (C2), hydrometallurgical black mass processing (C3), and Automotive Shredder Residue (ASR) landfill disposal (C4).
* **Module D (Benefits Beyond System Boundaries):** Bounded net avoided burdens awarded for substituting primary virgin battery metals through secondary recovered salts.

---

### 2.4 Functional Unit Harmonization
To ensure mathematical validity across different vehicle classes, three distinct functional units (FUs) are embedded:
1. **Primary Whole-Vehicle FU:** *"The provision of 1 kilometer of passenger transport by a designated vehicle category over a standardized lifetime operational distance ($D_{\text{life}}$) under certified Indian driving conditions (MIDC/AIS-039)."*
   * Baseline Lifetime Distances: **150,000 km** for M1 passenger cars; **100,000 km** for L3 electric two-wheelers; **300,000 km** for N1 light commercial vehicles; **500,000–1,000,000 km** for M3 transit buses.
2. **Component Benchmark FU:** *"1 kWh of nominal energy storage capacity manufactured and assembled into an automotive traction battery pack."*
3. **Regulatory Battery FU (EU 2023/1542 Harmonized):** *"1 kWh of total cumulative energy delivered by the battery system over its full operational service life,"* defined as:
   $$E_{\text{delivered}} = C_{\text{nom}} \times DoD \times N_{\text{cycles}} \times \eta_{\text{roundtrip}}$$

---

### 2.5 Demo Scope vs. National Platform Horizon
To satisfy competition feasibility while maintaining architectural rigor, we strictly demarcate the Round 1 / Grand Finale scope from the long-term national platform horizon:

| Architectural Dimension | Grand Finale Demonstration Slice (Dec 2026) | Full National Platform Horizon (Post-Finale) |
| :--- | :--- | :--- |
| **System Boundary Scope** | 40 kWh Traction Battery Pack + ICE Powertrain Benchmark | Full Vehicle Cradle-to-Grave (Body, Chassis, Interiors, Electronics) |
| **Vehicle Categories** | M1 Passenger Car (worked demo) + L3 2W (Ather/Ola parameters) | All CMVR Categories: L1, L2, L3, L5, M1, M2, M3, N1, N2, N3 |
| **Environmental Indicator** | Global Warming Potential ($\text{GWP}_{100}$ in $\text{kg CO}_2\text{e}$) | Full ReCiPe / EF 3.1 Suite (Acidification, PM₂.₅, Abiotic Mineral Depletion, Water) |
| **Geographic Scope** | National Unified Grid Average + Regional High-Coal Sensitivity | State-Level Marginal Grids + Real-Time DISCOM Feeder Carbon Accounting |
| **Data Ingestion** | Curated Seed Pipeline (CEA, Patil et al., SFC-TERI, NITI, OEM Matrix) | Automated API Integration with ULIP, VAHAN, and OEM PLM Enterprise Portals |

---
