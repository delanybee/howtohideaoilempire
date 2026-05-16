# The Infrastructure We Don't See

An interactive, educational scrollytelling site exploring U.S. fossil fuel infrastructure.

## Overview

This project visualizes the scale and distribution of American oil and gas infrastructure, including:

- **2.8+ million miles of pipeline** crisscrossing the nation
- **132 refineries** processing crude into fuel
- **Offshore drilling** spanning two oceans
- **Major storage hubs** holding hundreds of millions of barrels
- **California's unique "fuel island"** situation

## Live Demo

This site is designed to be deployed to GitHub Pages. Simply push to your repository and enable GitHub Pages in Settings.

## Tech Stack

This project uses **no build tools** and can be deployed directly to static hosting:

- **Scrollama.js** (scroll-triggered storytelling)
- **D3.js** (maps and data visualization)
- **Chart.js** (interactive charts)
- **Vanilla HTML/CSS/JS** (no frameworks)
- **Intersection Observer API** (native browser support)

All libraries are loaded from CDN:
- Scrollama: https://unpkg.com/scrollama
- D3.js: https://d3js.org/d3.v7.min.js
- Chart.js: https://cdn.jsdelivr.net/npm/chart.js

## Project Structure

```
/
├── index.html                        # Main scrollytelling page
├── california-infrastructure-map.html # Interactive Leaflet map
├── css/
│   └── style.css                     # Dark editorial theme
├── js/
│   ├── main.js                       # Scrollama setup and core logic
│   ├── charts.js                     # Chart.js visualizations
│   ├── maps.js                       # D3.js/SVG maps
│   ├── california-map.js             # Leaflet map logic
│   └── california-map-data.js        # California infrastructure data
├── data/
│   ├── pipeline-incidents.json       # PHMSA incident data
│   ├── storage-facilities.json       # Major storage hub data
│   ├── california-infrastructure.json
│   └── offshore-platforms.json       # Offshore platform data
└── README.md
```

## Sections

### 1. Title / Hook
Full-bleed hero with key infrastructure statistics and animated counters.

### 2. The Pipeline Network
Interactive map showing major crude oil pipeline corridors:
- Permian Basin to Gulf Coast
- Canadian oil sands / Bakken to Cushing, OK
- Cushing hub to Gulf Coast refineries
- Colonial Pipeline (Gulf Coast to East Coast)
- California's lack of pipeline connection

### 3. Pipeline Safety
Charts visualizing PHMSA pipeline incident data:
- Annual incidents 2010-2024 (9,329 total)
- Texas vs. national incident rate comparison
- Property damage and injury statistics

### 4. Tank Farms and Storage
Infographic showing major U.S. oil storage hubs:
- Cushing, OK (90M barrels)
- Nederland Terminal, TX (33M barrels)
- LOOP/Clovelly, LA (40M barrels)
- Strategic Petroleum Reserve (714M barrel capacity)

### 5. California Deep Dive
Interactive map with layer toggles:
- 27 offshore platforms
- Kern County oil fields (80-90% of CA drilling)
- 9 active refineries
- Marine terminals

### 6. Conclusion
Key takeaways about infrastructure lock-in, safety costs, and transition realities.

## California Interactive Map

A separate, full-page interactive map using **Leaflet.js** provides detailed exploration of California's oil infrastructure:

### Features
- **Multiple base maps**: Topographic, satellite, and dark mode
- **Toggle-able layers**: Offshore platforms, oil fields, refineries, terminals, pipelines, and geological basins
- **Rich info panels**: Click any feature for detailed data including operator, production, capacity, and history
- **Search**: Find features by name, company, or location
- **Responsive**: Works on mobile devices

### Infrastructure Covered
- **27 offshore platforms** (Santa Barbara Channel, Long Beach)
- **4 THUMS artificial islands** (Long Beach Harbor)
- **14 major oil fields** (Wilmington, Midway-Sunset, Kern River, etc.)
- **9 active refineries** (Chevron, Marathon, Phillips 66, etc.)
- **7 marine terminals** (Long Beach, El Segundo, Richmond, etc.)
- **10 major pipeline routes** (crude and refined products)
- **5 geological basins** (San Joaquin, Los Angeles, Ventura, Santa Maria, Salinas)

### Additional Libraries
- **Leaflet.js**: https://unpkg.com/leaflet@1.9.4/dist/leaflet.js
- **Leaflet MarkerCluster**: https://unpkg.com/leaflet.markercluster@1.4.1/dist/leaflet.markercluster.js

## Data Sources

All data is sourced from official government agencies and research organizations:

| Source | URL |
|--------|-----|
| PHMSA Pipeline Incident Trends | https://www.phmsa.dot.gov/data-and-statistics/pipeline/pipeline-incident-20-year-trends |
| PHMSA National Pipeline Performance | https://www.phmsa.dot.gov/data-and-statistics/pipeline/national-pipeline-performance-measures |
| FracTracker Pipeline Analysis | https://www.fractracker.org/2025/04/pipeline-incidents-are-a-daily-occurrence/ |
| EIA Crude Oil Pipelines | https://atlas.eia.gov/maps/eia::crude-oil-pipelines/explore |
| Bureau of Transportation Statistics | https://www.bts.gov/geography/geospatial-portal/us-petroleum-and-natural-gas-pipelines-2019 |
| BSEE Pacific OCS Platforms | https://www.bsee.gov/stats-facts/ocs-regions/pacific/pacific-ocs-platforms |
| CA State Lands Commission | https://www.slc.ca.gov/oil-gas/ |
| CalGEM Oil & Gas Maps | https://maps.conservation.ca.gov/oilgas/ |
| CA Energy Commission | https://www.energy.ca.gov/data-reports/energy-almanac/californias-petroleum-market |
| CARB California Refineries | https://ww2.arb.ca.gov/resources/documents/california-refineries |
| Global Energy Monitor | https://globalenergymonitor.org/projects/global-oil-infrastructure-tracker/ |

## Local Development

1. Clone this repository
2. Open the folder in VS Code
3. Install the "Live Server" extension
4. Right-click on `index.html` and select "Open with Live Server"

No npm install, no build step, no configuration needed.

## Deployment

### GitHub Pages

1. Push to your GitHub repository
2. Go to Settings > Pages
3. Select "Deploy from a branch"
4. Choose `main` branch, `/ (root)` folder
5. Save and wait for deployment

### Other Static Hosts

This site works with any static hosting:
- Netlify (drag and drop)
- Vercel
- Cloudflare Pages
- AWS S3 + CloudFront

## Accessibility

This project includes:
- Semantic HTML structure
- ARIA labels on charts
- Color-blind friendly palettes
- Keyboard navigation (Alt+Arrow keys)
- Reduced motion support
- Skip link for screen readers

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## License

This project is for educational purposes. Data is sourced from publicly available government and research sources.

## Credits

Built with:
- [Scrollama](https://github.com/russellsamora/scrollama) by Russell Samora
- [D3.js](https://d3js.org/) by Mike Bostock
- [Chart.js](https://www.chartjs.org/)
- [Inter typeface](https://rsms.me/inter/) by Rasmus Andersson
