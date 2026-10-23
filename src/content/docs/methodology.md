---
title: "Technical Methodology & Calculation Engine"
description: "ISO-compliant formulas, dynamic grid trajectories, allocation, and uncertainty propagation."
---

### 3.1 ISO & AIS Compliance Framework
The Green Auto India calculation engine strictly adheres to the procedural guidelines of international and Indian standards:
* **ISO 14040/14044:** Governs the four-phase LCA protocol, inventory compilation, and mandatory sensitivity analysis.
* **ISO 14067:** Dictates product carbon footprint quantification, separating biogenic carbon and forbidding unbundled carbon offset subtractions.
* **ISO 14083:** Standardizes multimodal freight transport carbon accounting (WTT + TTW logistics).
* **AIS-129:** Establishes Indian homologation standards for Reusability, Recyclability, and Recoverability (RRR: 85% recyclability, 95% recoverability).
* **MoEFCC BWMR 2022:** Mandates statutory battery material recovery targets (70% by 2025 scaling to 90% by 2027).

---

### 3.2 Phase-by-Phase Algorithmic Formulations (A1 to D)

#### Module A1: Raw Material Extraction & Upstream Processing
$$E_{A1} = \sum_{i=1}^{N_{\text{parts}}} \sum_{m=1}^{M_{\text{mats}}} m_{i,m} \cdot \left(\frac{1}{1 - L_{\text{scrap},i,m}}\right) \cdot \Big[ (1 - R_{1,m}) \cdot EF_{\text{virgin},m} + R_{1,m} \cdot EF_{\text{recycled},m} \Big]$$
Where $m_{i,m}$ is the net mass of material $m$ in component $i$; $L_{\text{scrap}}$ is the manufacturing yield loss factor; $R_1$ is the incoming recycled content fraction; $EF_{\text{virgin}}$ and $EF_{\text{recycled}}$ are cradle-to-gate material emission factors ($\text{kg CO}_2\text{e/kg}$).

#### Module A2: Inbound Multimodal Freight Logistics
$$E_{A2} = \sum_{p=1}^{N_{\text{parts}}} \left( \frac{m_p}{1 - L_{\text{scrap},p}} \right) \cdot \sum_{k \in \text{modes}} d_{p,k} \cdot EF_{\text{freight},k}^{\text{WTW}}$$
Where $d_{p,k}$ is the transport distance (km) along transport leg $k$; $EF_{\text{freight},k}^{\text{WTW}}$ is the Well-to-Wheel logistics emission intensity ($\text{kg CO}_2\text{e / t-km}$) calibrated to Indian fleet loading (SFC-TERI 2026).

#### Module A3: Component Manufacturing & Assembly
$$E_{A3} = \sum_{s \in \text{steps}} \Big( EC_{\text{elec},s} \cdot EF_{\text{grid}} + EC_{\text{gas},s} \cdot EF_{\text{gas}} \Big) \cdot C_{\text{pack}} + \sum_{w} m_{\text{waste},w} \cdot EF_{\text{waste},w}$$
Where $EC_{\text{elec},s}$ and $EC_{\text{gas},s}$ are specific electricity and thermal energy inputs per kWh of cell capacity (Patil et al. 2026); $C_{\text{pack}}$ is total pack capacity (kWh).

#### Module B6: Operational Use Phase (Dynamic Well-to-Wheel)
For Battery Electric Vehicles (BEVs):
$$E_{B6}^{\text{BEV}} = \sum_{y=1}^{T_{\text{life}}} \left( D_{\text{annual},y} \cdot \left[ \frac{EC_{\text{driving}} \cdot k_{\text{real}}}{1 - \eta_{\text{charge}}} \right] \cdot EF_{\text{grid}}(y) \right)$$
Where $EC_{\text{driving}}$ is certified energy consumption ($\text{kWh/km}$); $k_{\text{real}}$ is the Indian climate/traffic lab-to-road discrepancy factor ($1.15 - 1.30$); $\eta_{\text{charge}}$ is the AC-DC round-trip charging efficiency ($0.85 - 0.88$); and $EF_{\text{grid}}(y)$ is the dynamically interpolated grid emission factor for operational year $y$.

For Internal Combustion Engine Vehicles (ICEVs):
$$E_{B6}^{\text{ICE}} = D_{\text{life}} \cdot \Big( FC_{\text{real}} \cdot \rho_{\text{fuel}} \Big) \cdot \Big[ EF_{\text{fuel}}^{\text{WTT}} + EF_{\text{fuel}}^{\text{TTW}} \Big]$$
Where $FC_{\text{real}}$ is real-world fuel consumption ($\text{L/km}$); $EF_{\text{fuel}}^{\text{WTT}}$ and $EF_{\text{fuel}}^{\text{TTW}}$ are fuel cycle emissions ($\text{kg CO}_2\text{e / L}$) per SFC-TERI (2026).

#### Module C: End-of-Life Vehicle Management
$$E_C = E_{C1} (\text{dismantling}) + E_{C2} (\text{transport}) + E_{C3} (\text{hydrometallurgical processing}) + E_{C4} (\text{disposal})$$
$$E_{C3} = M_{\text{cells}} \cdot EF_{\text{hydromet}}$$

#### Module D: Net Avoided Burden Recycling Credit (Bounded)
$$E_D = - \min \Bigg( \sum_{m} M_{\text{recovered},m} \cdot \left[ EF_{\text{virgin},m}^* \cdot \left(\frac{QS_{\text{out}}}{Q_P}\right) - EF_{\text{recycling},m} \right], \; Cap_{\text{regulatory}} \Bigg)$$
Where $Cap_{\text{regulatory}} = 20.0\text{ kg CO}_2\text{e/kWh} \times C_{\text{pack}}$ (enforcing conservative accounting and eliminating exaggerated circularity claims).

---

### 3.3 Dynamic Grid Trajectory & Break-Even Modeling
Applying a static grid emission factor across a 15-year vehicle lifespan introduces a **30% to 45% calculation error** by ignoring ongoing grid decarbonization. Green Auto India implements dynamic annual step integration using official NITI Aayog (2026) power sector trajectories:

```
GRID DECARBONIZATION TRAJECTORIES (2024–2070)
==============================================
0.80 ──┐ 0.727 (2024 Baseline)
0.70 ──┤   \
0.60 ──┤    \─────── 0.520 (CPS 2030)
0.50 ──┤     \── 0.430 (NZS 2030 / NEP)
0.40 ──┤      \───────────── 0.420 (CPS 2040)
0.30 ──┤       \── 0.310 (NZS 2040)
0.20 ──┤            \───────────── 0.328 (CPS 2050)
0.10 ──┤             \── 0.257 (NZS 2050)
0.00 ──┴───────────────────────────────────────── 0.067 (CPS 2070)
      2024   2030    2040    2050          2070   0.000 (NZS 2070)
```

| Modeling Horizon / Year | Current Policy Scenario (CPS) | Net Zero Scenario (NZS) | Official Benchmark Document |
| :---: | :---: | :---: | :--- |
| **2024–25 Baseline** | **0.727 kg CO₂/kWh** | **0.727 kg CO₂/kWh** | CEA CO₂ Baseline Database v20.0 |
| **2030–32** | **0.520 kg CO₂/kWh** | **0.430 kg CO₂/kWh** | CEA National Electricity Plan (NEP) Vol. 1 |
| **2040** | **0.420 kg CO₂/kWh** | **0.310 kg CO₂/kWh** | NITI Aayog IESS 2047 / Viksit Bharat Vol. 7 |
| **2050** | **0.328 kg CO₂/kWh** | **0.257 kg CO₂/kWh** | NITI Aayog "Scenarios Towards Viksit Bharat" |
| **2070** | **0.067 kg CO₂/kWh** | **0.000 kg CO₂/kWh** | India Glasgow COP26 Net Zero Target |

The dynamic break-even crossover distance ($D_{\text{break-even}}$) where a BEV offsets its initial manufacturing carbon debt relative to an ICE vehicle is computed as:
$$D_{\text{break-even}} = \frac{E_{\text{manufacturing}}^{\text{BEV}} - E_{\text{manufacturing}}^{\text{ICE}}}{e_{\text{use}}^{\text{ICE}} - e_{\text{use}}^{\text{BEV}}(t)}$$
Under the 2024 baseline grid ($0.727\text{ kg CO}_2/\text{kWh}$), an Indian 40 kWh BEV reaches parity at **~46,000 km**. As the grid progresses along the NZS pathway to **0.430 kg CO₂/kWh by 2030**, the break-even distance compresses to **<21,000 km**.

---

### 3.4 Allocation Logic, Circularity & Bounded Recycling Credits
To prevent greenwashing, Green Auto India enforces strict allocation protocols per **ISO 14044 Clause 4.3.4**:
1. **Recycling Credit Allocation:** Implements the conservative **Cut-Off (100:0) Approach** as the primary default. Incoming secondary scrap enters the product system burden-free; scrap leaving at EoL receives credit only for displacing primary virgin refining after subtracting energy consumed in hydrometallurgical processing.
2. **Quality Ratio Downscaling ($QS_{\text{out}}/Q_P$):** Downcycles aluminium credits by an empirical quality ratio of $0.70$ to account for alloy contamination during informal vehicle scrapping.
3. **Capping Constraint:** Total avoided-burden credit is bounded at $20\text{ kg CO}_2\text{e per kWh}$ of battery capacity, directly preventing exaggerated circularity deductions.

---

### 3.5 Pedigree Quality Matrix & Lognormal Uncertainty Propagation
To transform subjective data quality into defensible statistical confidence intervals, each inventory factor is scored across the five dimensions of the **ecoinvent Pedigree Matrix**:
1. Reliability ($U_1$)
2. Completeness ($U_2$)
3. Temporal Correlation ($U_3$)
4. Geographical Correlation ($U_4$)
5. Technological Correlation ($U_5$)

The combined geometric standard deviation ($\text{SD}_{g95}$) for each parameter is computed as:
$$\text{SD}_{g95} = \exp\left( \sqrt{ [\ln(U_b)]^2 + \sum_{j=1}^{5} [\ln(U_j)]^2 } \right)$$
Where $U_b$ is the basic uncertainty factor ($1.05$ for grid electricity, $1.10$ for combustion fuel, $1.20$ for complex chemical synthesis).

The calculation engine computes dual uncertainty limits alongside the central deterministic value:
$$\text{Low Bound} = \frac{\mu}{\text{SD}_{g95}}, \qquad \text{High Bound} = \mu \cdot \text{SD}_{g95}$$
This yields rigorous, transparent uncertainty bands across all aggregate results (e.g., **20.2 t CO₂e, band: 16.1 – 26.8 t CO₂e**).

---
