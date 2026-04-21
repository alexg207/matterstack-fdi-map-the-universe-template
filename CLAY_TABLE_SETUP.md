# Clay Table Setup — FDI Map the Universe

Step-by-step instructions for building the Clay table that serves as the backend data source for an FDI intelligence map.

## Overview

You'll create two tables:
1. **Companies Table** — one row per target company, enriched with financials, competitive data, and scoring
2. **Contacts Table** — key people at each company, enriched with LinkedIn and work history

The output is two CSV exports that Claude Code reads to generate `data.js` for the map.

---

## Table 1: Companies

### Step 1 — Create the table and seed it

1. In Clay, create a new table called `[Client Name] - FDI Companies`
2. Add your seed companies. You need two columns to start:
   - **Company Name** (text) — e.g., "Toshiba"
   - **Domain** (text) — e.g., "toshiba.com"
3. Paste in your 20-30 target companies. These typically come from your initial research or the client brief.

### Step 2 — Add segment and classification columns (manual)

Add these columns and fill them manually. This is the structural backbone of the map — it determines how companies are grouped and prioritized.

| Column Name | Type | Values | Purpose |
|-------------|------|--------|---------|
| Segment | Single Select | Create one option per group (e.g., "Storage Media", "Photonics / Optical", "Power Semi") | Groups companies into map sections |
| Segment ID | Text | URL-safe slug (e.g., "storage", "photonics", "power") | Used by the template for routing |
| Tier | Single Select | high / med / low | Priority ranking within segment |
| Rank | Number | 1, 2, 3... | Order within segment (1 = top) |
| Rank Total | Number | Total companies in that segment | Used for "1 of 3" display |

### Step 3 — Add auto-enriched columns

These use Clay's built-in enrichments. For each one, add a column and set the enrichment source.

| Column Name | Clay Enrichment | Notes |
|-------------|----------------|-------|
| LinkedIn URL | Company enrichment → LinkedIn | Auto-matched from domain |
| HQ Location | Company enrichment → HQ | City, State, Country |
| Employee Count | Company enrichment → Headcount | Current headcount |
| Industry | Company enrichment → Industry | Clay's industry classification |
| Annual Revenue | Enrichment: Annual Revenue | Revenue figure or range |
| Latest Funding | Enrichment: Latest Funding | Last round details |
| Headcount Growth | Enrichment: Headcount Growth | 6mo/12mo growth % |
| Recent News | Enrichment: Recent News | Last 3-6 months of headlines |
| Company Competitors | Enrichment: Company Competitors | Top 3-5 competitors |
| Tech Stack | Enrichment: Tech Stack | Known technologies |
| Open Jobs | Enrichment: Open Jobs | Current job postings |

### Step 4 — Add Claygent research columns

These use Claygent (Clay's AI agent) to do deeper research. Add each as a Claygent column with the prompt described below.

| Column Name | Claygent Prompt | Purpose |
|-------------|----------------|---------|
| R&D Spend | "Find the annual R&D expenditure for {Company Name} from their most recent 10-K, annual report, or earnings release. Return the dollar amount and the fiscal year." | Financial data for detail sections |
| Gross Margin | "Find the most recent gross margin percentage for {Company Name} from their latest earnings release or 10-K filing." | Financial data |
| Market Share | "What is {Company Name}'s market share in their primary product segment? Cite the source and timeframe." | Competitive positioning |
| R&D Trend 3yr | "Compare {Company Name}'s R&D spending over the last 3 fiscal years. Is it increasing, decreasing, or flat? Provide the numbers." | Trend analysis for signals |
| Key Products | "What are the 3-5 most important current products or product lines for {Company Name}? Focus on their core revenue drivers." | Background for overview |
| Recent Strategic Moves | "List any M&A activity, major partnerships, restructuring, or strategic pivots by {Company Name} in the last 12 months." | Input for signals and GTM thesis |
| CHIPS Act / Govt Funding | "Has {Company Name} received any CHIPS Act funding, government grants, or public subsidies? If yes, how much and for what purpose?" | Relevant for semiconductor companies |
| Competitive Position Summary | "In 2-3 sentences, describe {Company Name}'s competitive position relative to their top 3 competitors in their primary market. Who is ahead, who is behind, and why?" | Input for distress scoring |
| Key Risk Factors | "What are the top 2-3 risk factors facing {Company Name} based on their most recent 10-K or annual report risk disclosures?" | Input for distress signals |

### Step 5 — Add scoring and analysis columns (manual or LLM-assisted)

These require judgment. You can either fill them manually or use a Claygent column that synthesizes the enriched data. If using Claygent, review and edit every output.

| Column Name | Type | Description |
|-------------|------|-------------|
| Subtitle | Text | One-line thesis on why this company matters to the engagement. 10-15 words max. |
| Intelligence Summary | Long Text | 2-3 sentence overview of the company's position and why they're relevant. |
| GTM Thesis | Long Text | How to position in a conversation with this company. What's the angle? |
| Opportunity Score | Number (1-5) | Based on traditional buying signals: new leadership, budget increases, hiring, positive news. 5 = strongest opportunity. |
| Opportunity Reason | Text | One sentence explaining the opportunity score. |
| Opp Signal 1 | Text | First opportunity signal tag (keep under 35 chars). e.g., "New CTO hire Q3 2025" |
| Opp Signal 1 Type | Single Select | positive / negative / neutral |
| Opp Signal 2 | Text | Second opportunity signal tag |
| Opp Signal 2 Type | Single Select | positive / negative / neutral |
| Opp Signal 3 | Text | Third opportunity signal tag |
| Opp Signal 3 Type | Single Select | positive / negative / neutral |
| Opp Signal 4 | Text | Fourth opportunity signal tag |
| Opp Signal 4 Type | Single Select | positive / negative / neutral |
| Competitive Distress | Number (1-5) | How far behind competitors is this company? 5 = most distressed. |
| Distress Reason | Text | One sentence explaining the distress score. |
| Distress Signal 1 | Text | First distress signal tag (under 35 chars). e.g., "83% capacity gap to leader" |
| Distress Signal 1 Type | Single Select | positive / negative / neutral |
| Distress Signal 2 | Text | Second distress signal tag |
| Distress Signal 2 Type | Single Select | positive / negative / neutral |
| Distress Signal 3 | Text | Third distress signal tag |
| Distress Signal 3 Type | Single Select | positive / negative / neutral |
| Distress Signal 4 | Text | Fourth distress signal tag |
| Distress Signal 4 Type | Single Select | positive / negative / neutral |

### Step 6 — Add tags columns

Tags appear as colored pills on each company card. Up to 6 per company.

| Column Name | Type | Description |
|-------------|------|-------------|
| Tag 1 | Text | Tag label, e.g., "FC-MAMR" or "24TB Max" |
| Tag 1 Style | Single Select | stack (blue) / hiring (green) / oss (teal) / negative (red) / neutral (gray) |
| Tag 1 Tooltip | Text | Hover text explaining the tag |
| Tag 2 | Text | |
| Tag 2 Style | Single Select | |
| Tag 2 Tooltip | Text | |
| Tag 3 | Text | |
| Tag 3 Style | Single Select | |
| Tag 3 Tooltip | Text | |
| Tag 4 | Text | |
| Tag 4 Style | Single Select | |
| Tag 4 Tooltip | Text | |

### Step 7 — Add detail section columns

These populate the expandable data sections on each card (e.g., "Financial Profile", "Competitive Position"). Each company gets up to 2 sections with up to 5 rows each.

| Column Name | Type | Description |
|-------------|------|-------------|
| Section 1 Title | Text | e.g., "Financial Profile" |
| S1 Row 1 Label | Text | e.g., "Revenue" |
| S1 Row 1 Value | Text | e.g., "$3.2B (FY25)" |
| S1 Row 1 Source | Text | e.g., "Company FY25 10-K" |
| S1 Row 2 Label | Text | |
| S1 Row 2 Value | Text | |
| S1 Row 2 Source | Text | |
| S1 Row 3 Label | Text | |
| S1 Row 3 Value | Text | |
| S1 Row 3 Source | Text | |
| S1 Row 4 Label | Text | |
| S1 Row 4 Value | Text | |
| S1 Row 4 Source | Text | |
| Section 2 Title | Text | e.g., "Competitive Position" |
| S2 Row 1 Label | Text | |
| S2 Row 1 Value | Text | |
| S2 Row 1 Source | Text | |
| S2 Row 2 Label | Text | |
| S2 Row 2 Value | Text | |
| S2 Row 2 Source | Text | |
| S2 Row 3 Label | Text | |
| S2 Row 3 Value | Text | |
| S2 Row 3 Source | Text | |
| S2 Row 4 Label | Text | |
| S2 Row 4 Value | Text | |
| S2 Row 4 Source | Text | |

### Step 8 — Add source columns

Up to 6 reference links per company, shown at the bottom of the detail view.

| Column Name | Type |
|-------------|------|
| Source 1 Name | Text |
| Source 1 URL | URL |
| Source 2 Name | Text |
| Source 2 URL | URL |
| Source 3 Name | Text |
| Source 3 URL | URL |
| Source 4 Name | Text |
| Source 4 URL | URL |
| Source 5 Name | Text |
| Source 5 URL | URL |
| Source 6 Name | Text |
| Source 6 URL | URL |

---

## Table 2: Contacts

### Step 1 — Create the table

Create a new table called `[Client Name] - FDI Contacts`.

### Step 2 — Find contacts

For each company, use Clay's people search to find 2-5 relevant contacts. Filter by:
- **Title keywords:** VP, SVP, EVP, Director, Head of, Chief Technology, Chief Product
- **Department focus:** R&D, Engineering, Technology, Product, Manufacturing, Operations
- **Exclude:** CEO, Chief Executive Officer, Sales, Marketing, HR, Legal

### Step 3 — Define columns

| Column Name | Type | Source | Description |
|-------------|------|--------|-------------|
| Full Name | Text | Clay enrichment | Contact's full name |
| Company Name | Text | Linked / manual | Must match the Companies table exactly |
| Job Title | Text | Clay enrichment | Current title |
| Contact Type | Single Select | Manual | "technical" or "business" |
| LinkedIn URL | URL | Clay enrichment | Profile link |
| Location | Text | Clay enrichment | City, Country |
| Work History Summary | Text | Enrichment: Summarize Work History | Career background |
| Primary Connection | Text | Manual | Team member who can intro (e.g., "Alex Giles") |
| Connection Strength | Single Select | Manual | "warm" or "possible" |
| Secondary Connection | Text | Manual | Optional second intro path |
| Connection 2 Strength | Single Select | Manual | "warm" or "possible" |

---

## Export Process

### From Clay
1. In the Companies table, click Export → CSV. Save as `companies.csv`
2. In the Contacts table, click Export → CSV. Save as `contacts.csv`

### In Claude Code
Run the following:
```
Feed these CSVs into the FDI map template:
- companies.csv → generate the SEGMENTS and ROW_SOURCES data
- contacts.csv → generate the CONTACT_MAP data
Write the output to data.js following the structure in data.example.js
```

Claude Code will:
1. Read both CSVs
2. Group companies by Segment
3. Assemble the nested JSON (tags arrays, sections arrays, signals arrays)
4. Map contacts to their companies
5. Generate source citations from the S1/S2 Row Source columns
6. Write `data.js`
7. Open the map in browser for review

---

## Recommended Workflow Order

| Phase | Time | What |
|-------|------|------|
| 1. Seed | 10 min | Paste company names + domains into Clay |
| 2. Auto-enrich | 5 min | Run Clay enrichments (revenue, news, headcount, competitors) |
| 3. Deep research | 15 min | Run Claygent columns (R&D, margins, market share, risks) |
| 4. Segment & score | 30 min | Manually assign segments, tiers, and scores. Use Claygent drafts as starting point. |
| 5. Write copy | 45 min | Edit subtitles, summaries, GTM theses, and signal tags. LLM drafts first, human edit second. |
| 6. Find contacts | 20 min | Use Clay people search per company, assign connection paths |
| 7. Export & build | 5 min | Export CSVs, run Claude Code, review in browser |
| **Total** | **~2 hours** | From company list to live intelligence map |

---

## Tips

- **Start with the demo sections.** If you're presenting 2-3 segments, polish those first. The rest can be thinner.
- **Signals should be short.** Under 35 characters or they'll get cut off in the UI.
- **Distress vs. opportunity is the key distinction.** Distress = how they compare to competitors. Opportunity = traditional buying signals. Don't mix them.
- **Sources matter.** Every data point in the detail sections should have a citation. "10-K", "earnings call", and analyst report names are sufficient.
- **Connection mapping is the last step.** Don't spend time on it until the company data is solid.
