// Matterstack FDI Intelligence Map — Example Data
// Duplicate this file as data.js and populate with engagement-specific data.

// === Source citations for detail rows ===
// Keys follow the pattern: "Company|Section Title|Row Label"
const ROW_SOURCES = {
  "Acme Corp|Financial Profile|Revenue": "Acme FY25 10-K",
  "Acme Corp|Financial Profile|R&D Spend": "Acme FY25 10-K — R&D disclosure",
  "Acme Corp|Competitive Position|Market Share": "Industry analyst report Q4 2025"
};

// === Segment and company data ===
const SEGMENTS = [
  {
    "id": "segment-1",
    "title": "Example Segment",
    "label": "Example Segment",
    "companies": [
      {
        "name": "Acme Corp",
        "domain": "acme.com",
        "subtitle": "Brief one-line thesis on why this company matters",
        "tier": "high",
        "category": "Example Segment",
        "tags": [
          {"t": "Tag Label", "c": "stack", "tip": "Tooltip explanation"}
        ],
        "overview": "2-3 sentence intelligence summary of the company's position and relevance.",
        "sections": [
          {
            "title": "Financial Profile",
            "rows": [
              ["Revenue", "$1.2B (FY25)"],
              ["R&D Spend", "$180M — 15% of revenue"],
              ["Gross Margin", "42%"]
            ]
          },
          {
            "title": "Competitive Position",
            "rows": [
              ["Market Share", "18% — #3 in segment"],
              ["Key Strength", "Proprietary process technology"],
              ["Key Risk", "Customer concentration >40%"]
            ]
          }
        ],
        "contacts": [],
        "signal_score": 3,
        "opp_reason": "New CTO hire signals R&D pivot",
        "signals": ["New exec leadership", "R&D budget increase"],
        "signal_types": ["positive", "positive"],
        "competitive_distress": 4,
        "distress_reason": "Losing share to lower-cost competitors",
        "distress_signals": ["Share declining 3 quarters", "Margin compression"],
        "distress_signal_types": ["negative", "negative"],
        "sources": [
          {"name": "Acme Corp FY25 10-K", "url": "https://example.com/acme-10k"},
          {"name": "Industry Analyst Report Q4 2025", "url": "https://example.com/report"}
        ],
        "gtm_thesis": "Acme is under competitive pressure and actively investing in next-gen processes. Their new CTO is evaluating material suppliers — position as a technology partner for their R&D roadmap.",
        "rank": 1,
        "rank_total": 3
      }
    ]
  }
];

// === Contact map (merged with any CSV-imported contacts) ===
// Contacts here override/supplement any contacts in SEGMENTS data
const CONTACT_MAP = {
  'Acme Corp': [
    {name:'Jane Smith', title:'VP Process Engineering', type:'technical', connections:[{person:'Your Name', strength:'warm'}]},
    {name:'Bob Johnson', title:'Director R&D', type:'technical', connections:[{person:'Team Member', strength:'possible'}]}
  ]
};

// === Primary team members for connection mapping ===
// Used to auto-assign connections to contacts that don't have any
const PRIMARY_TEAM = ['Your Name', 'Team Member 1', 'Team Member 2'];
