---
title: "Problem Understanding & Relevance"
description: "Why foreign LCA databases distort Indian vehicle carbon accounting by 2x to 5x."
---

### 1.1 The Indigenous LCA Data Void in India
India's mobility sector stands at the nexus of rapid urban economic growth and deep industrial decarbonization. Under national commitments made at COP26 (Net Zero by 2070, 500 GW non-fossil capacity by 2030) and accelerated demand-side programs including **FAME-II** and **PM E-DRIVE**, the domestic automotive industry is rapidly electrifying. 

However, evidence-based policy formulation, corporate carbon accounting (SEBI Business Responsibility and Sustainability Reporting - BRSR Core), and automotive homologation are critically impaired by an **indigenous Life Cycle Assessment (LCA) data void**. Indian testing agencies (ICAT, ARAI), academic researchers, and automotive OEMs are forced to assess Indian vehicles using foreign Life Cycle Inventory (LCI) databases—primarily **ecoinvent** (Switzerland), **GaBi / Sphera** (Germany), and **ANL GREET** (United States). 

These foreign datasets embed structural, geographical, and technological assumptions from industrialized Western nations that do not represent Indian realities. India’s CAFE (Corporate Average Fuel Economy) Phase III targets fleet emissions of **78.9 g CO₂/km by FY 2031–32**. Technical working groups under the Bureau of Energy Efficiency (BEE), Ministry of Road Transport and Highways (MoRTH), and Ministry of Heavy Industries (MHI) are actively evaluating the transition of post-2032 **CAFE Phase IV** regulations from Tank-to-Wheel (TTW) exhaust metrics to **Well-to-Wheel (WTW)** and **Cradle-to-Grave Life Cycle Assessment**. Furthermore, India is an active participant in the **UNECE WP.29 GRPE Informal Working Group on Automotive Life Cycle Assessment (IWG on A-LCA)**. Without an audited, indigenous, India-calibrated LCA database, Indian regulators cannot establish credible vehicle benchmarks, and domestic manufacturers risk severe carbon border penalties (such as the EU Carbon Border Adjustment Mechanism and EU Battery Regulation 2023/1542) based on inaccurate default emission factors.

---

### 1.2 Quantitative Anatomy of Foreign Database Failure
The table below illustrates why using unadjusted foreign background databases produces systematic errors of **2× to 5×** across every lifecycle phase of an Indian vehicle:

| Lifecycle Parameter | Foreign LCI Assumption (ecoinvent / GREET / GaBi) | Empirical Indian Baseline & Source | Distortion / Error in Indian LCA |
| :--- | :--- | :--- | :--- |
| **Grid Electricity (Busbar)** | EU avg: 0.25–0.35 kg CO₂/kWh; US eGRID: 0.38–0.42 kg CO₂/kWh. | **0.727 kg CO₂/kWh** (CEA CO₂ Baseline v20.0, national weighted avg incl. RES; thermal-only: **0.942 kg CO₂/kWh**). | **200% to 300% underestimation** of EV charging and industrial electricity carbon. |
| **Grid Electricity (Delivered / Wall Plug)** | Transmission & Distribution (T&D) losses modeled at 4.0% – 6.0%. | Aggregate Technical & Commercial (AT&C) losses of **15.0% – 18.0%** (CEA / NITI Aayog ICED). Delivered factor: **0.90 – 1.05 kg CO₂e/kWh**. | Omitting Indian grid losses underestimates real-world use-phase EV emissions by **12% to 15%**. |
| **Structural Steel (Body-in-White)** | European Blast Furnace-Basic Oxygen Furnace (BF-BOF: 1.8–2.0 t CO₂/t) or Scrap Gas-DRI EAF (0.7–1.1 t CO₂/t). | **>40% of Indian crude steel** is produced via **coal-based rotary kiln DRI + Induction Furnace: 2.7 – 3.2 t CO₂e/t steel** (CEEW / TERI). | Underestimates vehicle Body-in-White (BIW) manufacturing footprint by **50% to 80%** (1.2–1.8 t CO₂ per car). |
| **Primary Aluminium (Lightweighting)** | Nordic/Canadian hydro-powered smelters (2.0–4.0 t CO₂/t) or global average (10.0–12.0 t CO₂/t). | Indian aluminium majors (Vedanta, Hindalco, NALCO) utilize **dedicated captive coal power plants: 18.0 – 24.0 t CO₂e/t primary Al**. | **2× to 5× underestimation** of structural aluminium casting and extrusion emissions. |
| **Freight Transport Logistics** | Euro-VI diesel tractor-trailers on grade-separated motorways at 80–90 km/h: **0.060–0.080 kg CO₂e/t-km**. | Rigid BS-IV/VI trucks under congestion, chronic overloading, idling at 25–35 km/h: **0.140–0.412 kg CO₂e/t-km (SCV/MCV)** and **0.055–0.090 kg CO₂e/t-km (HCV)** (SFC-TERI 2026). | **Up to 2× underestimation** of inbound components and inter-plant freight carbon. |
| **End-of-Life Vehicle (ELV) Recycling** | High mechanization under EU ELV Directive: depollution stations, hammermill shredders, closed-loop metal recovery (>95%). | **>90% informal scrapyards** (Mayapuri, Meerut, Kurla); open venting of R-134a refrigerants; manual cutting; downcycling of wrought Al into low-grade castings. | Foreign models award **inflated avoided-burden circularity credits** that are physically unachieved in India. |
| **Climate & Real-World Use Phase** | Laboratory WLTP at 20–23°C; auxiliary air conditioning turned OFF; average speed 46.5 km/h. | Ambient temperatures of **35–45°C** across 6–8 months; continuous AC draw (1.5–3.5 kW) increases consumption by **25% to 35%**; MIDC urban speed: **18–20 km/h**. | Real-world EV consumption reaches **180–260 Wh/km** vs. certified 120–140 Wh/km; ICE fuel burn spikes due to idle. |

---

The same pattern at a glance — every parameter is understated, none is overstated:

<svg viewBox="0 0 720 380" width="100%" role="img" aria-label="Bar chart of how many times larger Indian lifecycle values are than foreign database assumptions, by parameter" style="font-family: inherit;">
  <title>Indian reality as a multiple of the foreign assumption, by lifecycle parameter</title>
  <g stroke="currentColor" stroke-opacity="0.12">
    <line x1="215" y1="18" x2="215" y2="330" />
    <line x1="303" y1="18" x2="303" y2="330" />
    <line x1="391" y1="18" x2="391" y2="330" />
    <line x1="479" y1="18" x2="479" y2="330" />
    <line x1="567" y1="18" x2="567" y2="330" />
    <line x1="655" y1="18" x2="655" y2="330" />
  </g>
  <line x1="303" y1="18" x2="303" y2="330" stroke="currentColor" stroke-opacity="0.45" stroke-dasharray="4 4" />
  <text x="309" y="16" font-size="12" fill="currentColor" opacity="0.7">1.0× = foreign assumption</text>
  <g font-size="14" fill="currentColor">
    <text x="200" y="45" text-anchor="end">Primary aluminium</text>
    <text x="200" y="97" text-anchor="end">Grid electricity (busbar)</text>
    <text x="200" y="149" text-anchor="end">Real-world use phase</text>
    <text x="200" y="201" text-anchor="end">Freight logistics</text>
    <text x="200" y="253" text-anchor="end">Structural steel</text>
    <text x="200" y="305" text-anchor="end">Grid T&amp;D losses</text>
  </g>
  <g style="fill: var(--sl-color-accent);">
    <rect x="391" y="30" width="264" height="20" rx="5" />
    <rect x="391" y="82" width="88" height="20" rx="5" />
    <rect x="329" y="134" width="80" height="20" rx="5" />
    <rect x="303" y="186" width="88" height="20" rx="5" />
    <rect x="347" y="238" width="26" height="20" rx="5" />
    <rect x="313" y="290" width="4" height="20" rx="2" />
  </g>
  <g font-size="13" font-weight="600" fill="currentColor">
    <text x="663" y="45">2.0–5.0×</text>
    <text x="487" y="97">2.0–3.0×</text>
    <text x="417" y="149">1.3–2.2×</text>
    <text x="399" y="201">up to 2.0×</text>
    <text x="381" y="253">1.5–1.8×</text>
    <text x="325" y="305">1.12–1.15×</text>
  </g>
  <line x1="215" y1="330" x2="655" y2="330" stroke="currentColor" stroke-opacity="0.3" />
  <g font-size="12" fill="currentColor" opacity="0.7" text-anchor="middle">
    <text x="215" y="352">0×</text>
    <text x="303" y="352">1×</text>
    <text x="391" y="352">2×</text>
    <text x="479" y="352">3×</text>
    <text x="567" y="352">4×</text>
    <text x="655" y="352">5×</text>
  </g>
</svg>

*Each bar shows the table's stated distortion range — how many times larger the Indian value is than the foreign assumption. The use-phase bar is derived from the table's own figures (180–260 vs 120–140 Wh/km). Freight's bar shows the maximum stated error; HCV legs overlap foreign values. End-of-life recycling is not plotted: it has no single multiplier, since foreign models award circularity credits that informal Indian recycling does not achieve.*

### 1.3 Institutional Stakeholder Mapping & Policy Alignment
Green Auto India is architected to deliver immediate, operational utility to four primary national stakeholder groups:

```
                                  ┌──────────────────────────────────────────────────┐
                                  │           GREEN AUTO INDIA PLATFORM              │
                                  └─────────────────────────┬────────────────────────┘
                                                            │
         ┌───────────────────────────┬──────────────────────┴───────┬───────────────────────────┐
         ▼                           ▼                              ▼                           ▼
┌─────────────────┐         ┌─────────────────┐            ┌─────────────────┐         ┌─────────────────┐
│   ICAT / ARAI   │         │    MHI / BEE    │            │   NITI Aayog    │         │ Automotive OEMs │
├─────────────────┤         ├─────────────────┤            ├─────────────────┤         ├─────────────────┤
│• Type approval  │         │• FAME & PM      │            │• Dynamic Net    │         │• Scope 3 supply │
│  baseline for   │         │  E-DRIVE subsidy│            │  Zero modeling  │         │  chain carbon   │
│  vehicle carbon │         │  calibration    │            │• Grid parity    │         │  accounting     │
│• UNECE A-LCA GTR│         │• CAFE Phase IV  │            │  crossover      │         │• SEBI BRSR Core │
│  country inputs │         │  LCA rulemaking │            │  pathway studies│         │  compliance     │
└─────────────────┘         └─────────────────┘            └─────────────────┘         └─────────────────┘
```

1. **Test Agencies (ICAT & ARAI):** Provides the standardized, audited Indian Life Cycle Inventory needed to establish type-approval carbon footprint certification under upcoming Indian standards and positions India with defensible data within the UNECE WP.29 A-LCA framework.
2. **Ministry of Heavy Industries (MHI) & Bureau of Energy Efficiency (BEE):** Supplies transparent, empirically verified emission baselines to evaluate whether public subsidies (e.g., PM E-DRIVE demand incentives, PLI for Advanced Chemistry Cells) achieve genuine net lifecycle abatement. Informs the regulatory shift of CAFE Phase IV toward Well-to-Wheel metrics.
3. **NITI Aayog:** Serves as an analytical sand-table to project how future power sector decarbonization scenarios (Viksit Bharat 2047 and Net Zero 2070) alter the carbon parity break-even distance of electric vehicles across distinct regional grids.
4. **Automotive OEMs & Tier-1 Suppliers:** Provides an accessible, verified database to calculate Scope 3 upstream supply chain emissions for mandatory SEBI BRSR Core filings, design low-carbon vehicle architectures, and audit supplier localization.

---
