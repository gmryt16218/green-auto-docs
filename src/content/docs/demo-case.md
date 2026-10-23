---
title: "Worked Demonstration Case Study: 40 kWh BEV Pack"
description: "Step-by-step cradle-to-grave calculation for a 40 kWh NMC811 pack over 150,000 km."
---

### 5.1 Case Specification & Bill of Materials (BOM)
The demonstration case evaluates an Indian C-segment passenger car (M1 category) equipped with a **40 kWh NMC811 Battery Pack** operating over an audited lifetime of **150,000 km** on the Indian national grid:
* **Traction Battery Chemistry:** NMC811 / Synthetic Graphite
* **Pack Specific Energy:** $175\text{ Wh/kg}$ (Total Pack Mass: **228.0 kg**; Cell Mass: **183.2 kg**)
* **Vehicle On-Road Consumption:** $0.160\text{ kWh/km}$ (MIDC certified $0.130\text{ kWh/km}$ with $1.23$ real-world Indian auxiliary AC uplift)
* **Charging Efficiency ($\eta_{\text{charge}}$):** $88.0\%$ (12.0% cumulative AC-DC and internal battery thermal loss)
* **Baseline Grid Factor:** $0.675\text{ kg CO}_2/\text{kWh}$ (CEA v22.0 national weighted avg)
* **ICE Comparator Vehicle:** 1.2L Turbo-Petrol Passenger Car ($6.50\text{ L/100 km}$ real-world fuel consumption over 150,000 km)

---

### 5.2 Step-by-Step Computational Walkthrough

#### Stage 1: Cradle-to-Gate Raw Materials (Module A1)
Utilizing the empirical material loadings and intensities:
* **NMC811 Cathode Active Material:**
  $$
  40\text{ kWh} \times 1.20\text{ kg/kWh} = 48.0\text{ kg CAM} \times 4.32\text{ kg CO}_2\text{e/kg} = \mathbf{207.36\text{ kg CO}}_2\text{e}
  $$
* **Synthetic Graphite Anode:**
  $$
  40\text{ kWh} \times 1.05\text{ kg/kWh} = 42.0\text{ kg Anode} \times 2.50\text{ kg CO}_2\text{e/kg} = \mathbf{105.00\text{ kg CO}}_2\text{e}
  $$
* **Copper Current Collector Foil & Busbars:**
  $$
  40\text{ kWh} \times (0.55 + 0.08)\text{ kg/kWh} = 25.2\text{ kg Cu} \times 6.50\text{ kg CO}_2\text{e/kg} = \mathbf{163.80\text{ kg CO}}_2\text{e}
  $$
* **Aluminium Foil, Cell Cans & Pack Enclosure:**
  $$
  40\text{ kWh} \times (0.32 + 0.45 + 0.42 + 0.32)\text{ kg/kWh} = 60.4\text{ kg Al} \times 18.50\text{ kg CO}_2\text{e/kg} (\text{Indian captive coal}) = \mathbf{1,117.40\text{ kg CO}}_2\text{e}
  $$
* **Electrolyte Solution ($\text{LiPF}_6$ in EC/DMC):**
  $$
  40\text{ kWh} \times 0.82\text{ kg/kWh} = 32.8\text{ kg} \times 9.00\text{ kg CO}_2\text{e/kg} = \mathbf{295.20\text{ kg CO}}_2\text{e}
  $$
* **Thermal Management, BMS, Casing, Wiring & Sealants:**
  $$
  \text{Auxiliary Mass } (17.6\text{ kg}) \times 5.50\text{ kg CO}_2\text{e/kg} = \mathbf{96.80\text{ kg CO}}_2\text{e}
  $$
* **Total Module A1 Materials Burden:**
  $$
  E_{A1} = 207.36 + 105.00 + 163.80 + 1,117.40 + 295.20 + 96.80 = \mathbf{1,985.56\text{ kg CO}}_2\text{e} \quad (\mathbf{\approx 1.99\text{ t CO}}_2\text{e})
  $$

#### Stage 2: Cell & Pack Manufacturing Processes (Module A3)
From Patil et al. (2026), direct cell energy inputs per kWh cell:
* **Direct Electricity Consumption:**
  $$
  20.11\text{ kWh/kWh} \times 40\text{ kWh} = 804.4\text{ kWh} \times 0.675\text{ kg CO}_2/\text{kWh} = \mathbf{542.97\text{ kg CO}}_2\text{e}
  $$
  *(Formation cycling alone represents $9.92 \times 40 = 396.8\text{ kWh} \times 0.675 = 267.84\text{ kg CO}_2\text{e}$)*
* **Direct Thermal Natural Gas (Electrode Drying & HVAC):**
  $$
  21.38\text{ kWh/kWh} \times 40\text{ kWh} = 855.2\text{ kWh thermal} \times 0.202\text{ kg CO}_2/\text{kWh} = \mathbf{172.75\text{ kg CO}}_2\text{e}
  $$
* **Factory Dry Room Conditioning HVAC & Cleanroom Base Load:**
  $$
  35.0\text{ kWh/kWh} \times 40\text{ kWh} = 1,400.0\text{ kWh} \times 0.675\text{ kg CO}_2/\text{kWh} = \mathbf{945.00\text{ kg CO}}_2\text{e}
  $$
* **Pack Module Integration, Laser Welding & End-of-Line Testing:**
  $$
  280.0\text{ kWh} \times 0.675\text{ kg CO}_2/\text{kWh} = \mathbf{189.00\text{ kg CO}}_2\text{e}
  $$
* **Total Module A3 Manufacturing Burden:**
  $$
  E_{A3} = 542.97 + 172.75 + 945.00 + 189.00 = \mathbf{1,849.72\text{ kg CO}}_2\text{e} \quad (\mathbf{\approx 1.85\text{ t CO}}_2\text{e})
  $$
* **Total Cradle-to-Gate Battery Birth Debt ($E_A = E_{A1} + E_{A3}$):**
  $$
  E_A = 1,985.56 + 1,849.72 = \mathbf{3,835.28\text{ kg CO}}_2\text{e} \quad (\mathbf{\approx 3.84\text{ t CO}}_2\text{e} \text{ or } \mathbf{95.88\text{ kg CO}}_2\text{e/kWh})
  $$

#### Stage 3: Inbound & Multimodal Logistics (Module A2 + Distribution)
* **Leg 1 (Ocean Shipping):** $183.2\text{ kg cells}$ from Shanghai to Nhava Sheva ($9,200\text{ km}$ maritime):
  $$
  0.1832\text{ t} \times 9,200\text{ km} \times 0.0150\text{ kg/t-km} = \mathbf{25.28\text{ kg CO}}_2\text{e}
  $$
* **Leg 2 (Domestic Port-to-Plant Road Freight):** Nhava Sheva to Chakan/Pune ($160\text{ km}$ via Diesel HCV):
  $$
  0.1832\text{ t} \times 160\text{ km} \times 0.0902\text{ kg/t-km} = \mathbf{2.64\text{ kg CO}}_2\text{e}
  $$
* **Leg 3 (Finished Pack to Vehicle Assembly):** Pune to Assembly Plant ($250\text{ km}$ via Diesel HCV):
  $$
  0.2280\text{ t} \times 250\text{ km} \times 0.0902\text{ kg/t-km} = \mathbf{5.14\text{ kg CO}}_2\text{e}
  $$
* **Leg 4 (Outbound Distribution to Regional Dealership):** $800\text{ km}$ via Diesel Tractor-Trailer:
  $$
  0.2280\text{ t} \times 800\text{ km} \times 0.0551\text{ kg/t-km} = \mathbf{10.05\text{ kg CO}}_2\text{e}
  $$
* **Total Logistics Burden ($E_{\text{transport}}$):**
  $$
  E_{\text{transport}} = 25.28 + 2.64 + 5.14 + 10.05 = \mathbf{43.11\text{ kg CO}}_2\text{e} \quad (\mathbf{\approx 0.04\text{ t CO}}_2\text{e})
  $$

#### Stage 4: Operational Use Phase over 150,000 km (Module B6)
* **Cumulative Grid Electricity Consumed:**
  $$
  E_{\text{grid,lifetime}} = \frac{150,000\text{ km} \times 0.160\text{ kWh/km}}{0.880} = \mathbf{27,272.73\text{ kWh}}
  $$
* **Scenario A (Static 2024 Baseline Grid @ 0.675 kg CO₂/kWh):**
  $$
  E_{B6}^{\text{static}} = 27,272.73\text{ kWh} \times 0.675\text{ kg CO}_2/\text{kWh} = \mathbf{18,409.09\text{ kg CO}}_2\text{e} \quad (\mathbf{\approx 18.41\text{ t CO}}_2\text{e})
  $$
* **Scenario B (Dynamic NITI Aayog Net Zero Scenario 2026–2041):**
  Evaluating annual grid decay over 15 operational years ($EF_{\text{grid}}$ averages $0.442\text{ kg CO}_2/\text{kWh}$ across the vehicle service life):
  $$
  E_{B6}^{\text{dynamic,NZS}} = 27,272.73\text{ kWh} \times 0.442\text{ kg CO}_2/\text{kWh} = \mathbf{12,054.55\text{ kg CO}}_2\text{e} \quad (\mathbf{\approx 12.05\text{ t CO}}_2\text{e})
  $$

#### Stage 5: End-of-Life Hydrometallurgical Recycling Credit (Module D)
* **Recovered Precursor Displacement:** Closed-loop hydrometallurgical recycling recovers 90% of secondary lithium, cobalt, and nickel salts (Verma et al. 2024), yielding a gross avoided burden of $-32\%$ on virgin CAM synthesis:
  $$
  \text{Gross Credit} = - (0.32 \times 1,985.56\text{ kg}) = -635.38\text{ kg CO}_2\text{e}
  $$
* **Regulatory Upper Bound Check:**
  $$
  Cap = 20.0\text{ kg/kWh} \times 40\text{ kWh} = 800.00\text{ kg CO}_2\text{e}
  $$
  Since $|-635.38| \le 800.00$, the full credit of **$-635.38\text{ kg CO}_2\text{e}$** ($-0.64\text{ t CO}_2\text{e}$) is awarded.

---

### 5.3 Comparative Parity Analysis: BEV vs. ICE Powertrain

```
LIFECYCLE CARBON BREAKDOWN: 40 kWh BEV vs. PETROL ICE (150,000 km)
===================================================================
BEV (Static Grid):   [Birth: 3.84t] [Log: 0.04t] [Use: 18.41t] [-Credit: 0.64t] = 21.65 t CO2e
BEV (Dynamic NZS):   [Birth: 3.84t] [Log: 0.04t] [Use: 12.05t] [-Credit: 0.64t] = 15.29 t CO2e
ICE Comparator (WTW):[Powertrain Mfg: UNCOLLECTED] [Use Phase WTW: 28.72t]       = 28.72 t CO2e*
*Warning: ICE manufacturing emissions are uncollected; comparator reflects use-phase fuel WTW only.
```

| Lifecycle Stage | BEV Central Result (Static 2024 Grid) | BEV Central Result (Dynamic NITI NZS) | BEV Uncertainty Band (95% CI) | Petrol ICE Comparator (1.2L Turbo) | Data Provenance & Pedigree |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **A1: Raw Materials** | 1.99 t CO₂e | 1.99 t CO₂e | 1.55 – 2.58 t | *Not Collected* (Open Gap) | Patil et al. / BatPaC (Grade B) |
| **A3: Manufacturing** | 1.85 t CO₂e | 1.85 t CO₂e | 1.48 – 2.31 t | *Not Collected* (Open Gap) | Llamas-Orozco / CEA (Grade B) |
| **A2: Multimodal Freight**| 0.04 t CO₂e | 0.04 t CO₂e | 0.03 – 0.06 t | 0.02 t CO₂e | SFC-TERI 2026 / IMO (Grade A) |
| **B6: Use Phase (WTW)** | **18.41 t CO₂e** | **12.05 t CO₂e** | 15.20 – 22.10 t | **28.72 t CO₂e (WTW)** | CEA v20.0 / NITI Aayog (Grade A) |
| **D: Recycling Credit** | -0.64 t CO₂e | -0.64 t CO₂e | -0.45 – -0.80 t | -0.15 t CO₂e (Steel Scrap) | Verma et al. / Capped (Grade B) |
| **TOTAL LIFECYCLE** | **21.65 t CO₂e** | **15.29 t CO₂e** | **16.10 – 26.80 t** | **>28.72 t CO₂e\*** | **ISO 14044 Deterministic Engine** |
| **Emissions Intensity**| **144.3 g CO₂e/km** | **101.9 g CO₂e/km** | **107.3 – 178.7 g/km**| **>191.5 g CO₂e/km\*** | **Functional Unit: 1 vehicle-km** |

*Critical Insight:* Even under the current coal-intensive Indian electricity mix, a 40 kWh BEV provides an immediate **24.6% lifecycle reduction** compared to fuel-cycle petrol emissions. When dynamic grid decarbonization under NITI Aayog's Net Zero Scenario is incorporated, the BEV achieves a **46.8% lifecycle carbon reduction**, disproving the notion that coal-based grids eliminate electric vehicle benefits in India.

---
