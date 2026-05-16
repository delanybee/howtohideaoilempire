/**
 * California Oil Infrastructure Interactive Map
 * 
 * Leaflet.js-based interactive map showing platforms, refineries,
 * oil fields, pipelines, terminals, and geological basins.
 */

(function() {
    'use strict';
    
    // ================================================================
    // MAP INITIALIZATION
    // ================================================================
    
    // Initialize map centered on California
    const map = L.map('map', {
        center: [36.5, -119.5],
        zoom: 6,
        minZoom: 5,
        maxZoom: 18,
        zoomControl: true
    });
    
    // Move zoom control to bottom right
    map.zoomControl.setPosition('bottomright');
    
    // ================================================================
    // BASE LAYERS
    // ================================================================
    
    const baseLayers = {
        topo: L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data: &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a>',
            maxZoom: 17
        }),
        satellite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community'
        }),
        dark: L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            maxZoom: 19
        })
    };
    
    // Set default base layer — dark background lets infrastructure pop
    baseLayers.dark.addTo(map);
    let currentBaseLayer = baseLayers.dark;
    
    // ================================================================
    // CUSTOM ICONS
    // ================================================================
    
    // shape: 'circle' | 'diamond' | 'square'
    function createIcon(color, shape = 'circle', size = 16) {
        let svgShape;
        const s = size, h = size / 2, p = 1.5;
        if (shape === 'diamond') {
            svgShape = `<polygon points="${h},${p} ${s-p},${h} ${h},${s-p} ${p},${h}" fill="${color}" stroke="white" stroke-width="1.5"/>`;
        } else if (shape === 'square') {
            svgShape = `<rect x="${p}" y="${p}" width="${s - p*2}" height="${s - p*2}" rx="2" fill="${color}" stroke="white" stroke-width="1.5"/>`;
        } else if (shape === 'triangle') {
            svgShape = `<polygon points="${h},${p} ${s-p},${s-p} ${p},${s-p}" fill="${color}" stroke="white" stroke-width="1.5"/>`;
        } else {
            svgShape = `<circle cx="${h}" cy="${h}" r="${h - p}" fill="${color}" stroke="white" stroke-width="1.5"/>`;
        }
        return L.divIcon({
            className: '',
            html: `<svg width="${s}" height="${s}" viewBox="0 0 ${s} ${s}" xmlns="http://www.w3.org/2000/svg" style="display:block;filter:drop-shadow(0 2px 5px rgba(0,0,0,0.6))">${svgShape}</svg>`,
            iconSize: [s, s],
            iconAnchor: [h, h]
        });
    }
    
    const ICONS = {
        platform:           createIcon('#3498db', 'circle',   16),
        'artificial-island': createIcon('#1abc9c', 'circle',  20),
        'oil-field':        createIcon('#27ae60', 'triangle', 16),
        refinery:           createIcon('#9b59b6', 'diamond',  20),
        'marine-terminal':  createIcon('#fdcb6e', 'square',   16)
    };
    
    // Larger icons for hover/selected state
    function createLargeIcon(color, shape = 'circle', size = 22) {
        let svgShape;
        const s = size, h = size / 2, p = 2;
        if (shape === 'diamond') {
            svgShape = `<polygon points="${h},${p} ${s-p},${h} ${h},${s-p} ${p},${h}" fill="${color}" stroke="white" stroke-width="2"/>`;
        } else if (shape === 'square') {
            svgShape = `<rect x="${p}" y="${p}" width="${s - p*2}" height="${s - p*2}" rx="2" fill="${color}" stroke="white" stroke-width="2"/>`;
        } else if (shape === 'triangle') {
            svgShape = `<polygon points="${h},${p} ${s-p},${s-p} ${p},${s-p}" fill="${color}" stroke="white" stroke-width="2"/>`;
        } else {
            svgShape = `<circle cx="${h}" cy="${h}" r="${h - p}" fill="${color}" stroke="white" stroke-width="2"/>`;
        }
        return L.divIcon({
            className: '',
            html: `<svg width="${s}" height="${s}" viewBox="0 0 ${s} ${s}" xmlns="http://www.w3.org/2000/svg" style="display:block;filter:drop-shadow(0 3px 10px rgba(0,0,0,0.7))">${svgShape}</svg>`,
            iconSize: [s, s],
            iconAnchor: [h, h]
        });
    }
    
    // ================================================================
    // LAYER GROUPS
    // ================================================================
    
    const layers = {
        platforms: L.layerGroup(),
        offshorePipelines: L.layerGroup(),
        oilfields: L.layerGroup(),
        basins: L.layerGroup(),
        refineries: L.layerGroup(),
        terminals: L.layerGroup(),
        pipelines: L.layerGroup()
    };
    
    // Add default layers to map
    layers.platforms.addTo(map);
    layers.offshorePipelines.addTo(map);
    layers.oilfields.addTo(map);
    layers.refineries.addTo(map);
    layers.terminals.addTo(map);
    layers.pipelines.addTo(map);
    
    // ================================================================
    // POPULATE LAYERS
    // ================================================================
    
    const allFeatures = []; // For search functionality
    let selectedMarker = null;
    
    // ── Status → color encoding ──────────────────────────────────────
    function getPlatformColor(status) {
        if (!status || status === 'Producing') return '#3498db';
        if (status.startsWith('Shut-in'))      return '#f39c12';
        if (status.startsWith('Damaged'))      return '#e74c3c';
        if (status === 'Decommissioned')       return '#5d6d7e';
        return '#3498db';
    }
    
    // ── Production volume → icon size ────────────────────────────────
    function getPlatformSize(oilBpd) {
        if (oilBpd > 5000) return 22;
        if (oilBpd > 2000) return 18;
        if (oilBpd > 800)  return 14;
        return 11;
    }

    // Add platforms
    CALIFORNIA_DATA.platforms.forEach(platform => {
        const pColor = getPlatformColor(platform.status);
        const pSize  = getPlatformSize(platform.production?.oil || 0);
        const pIcon  = createIcon(pColor, platform.type === 'artificial-island' ? 'circle' : 'circle', pSize);
        
        const marker = L.marker([platform.lat, platform.lng], { icon: pIcon });
        
        marker.feature = platform;
        marker.featureType = 'Platform';
        
        marker.on('click', () => showInfoPanel(platform, 'Offshore Platform'));
        marker.on('mouseover', () => {
            marker.setIcon(createLargeIcon(pColor, 'circle', pSize + 7));
        });
        marker.on('mouseout', () => {
            if (selectedMarker !== marker) {
                marker.setIcon(pIcon);
            }
        });
        
        // THUMS Islands get a special tooltip badge
        const isTHUMS = platform.type === 'artificial-island';
        const tooltipContent = isTHUMS
            ? `<b>${platform.name}</b><br><span style="color:#f39c12;font-size:0.75em">⚠ Disguised as luxury real estate</span>`
            : platform.name;
        marker.bindTooltip(tooltipContent, {
            permanent: false,
            direction: 'top',
            offset: [0, -10]
        });
        
        layers.platforms.addLayer(marker);
        allFeatures.push({ marker, data: platform, type: 'Platform' });
        
        // Incident pulse ring for spill sites
        const hasIncident = platform.status.startsWith('Shut-in') ||
            platform.status.startsWith('Damaged') ||
            (platform.description && platform.description.toLowerCase().includes('spill'));
        
        if (hasIncident) {
            const pulse = L.divIcon({
                className: '',
                html: `<div class="incident-pulse" title="${platform.name} — incident site"></div>`,
                iconSize: [44, 44],
                iconAnchor: [22, 22]
            });
            const pulseMarker = L.marker([platform.lat, platform.lng], {
                icon: pulse, interactive: false, zIndexOffset: -100
            });
            layers.platforms.addLayer(pulseMarker);
        }
    });
    
    // Add oil fields
    CALIFORNIA_DATA.oilFields.forEach(field => {
        const marker = L.marker([field.lat, field.lng], {
            icon: ICONS['oil-field']
        });
        
        marker.feature = field;
        marker.featureType = 'Oil Field';
        
        marker.on('click', () => showInfoPanel(field, 'Oil Field'));
        marker.on('mouseover', () => {
            marker.setIcon(createLargeIcon('#27ae60', 'triangle'));
        });
        marker.on('mouseout', () => {
            if (selectedMarker !== marker) {
                marker.setIcon(ICONS['oil-field']);
            }
        });
        
        marker.bindTooltip(field.name, {
            permanent: false,
            direction: 'top',
            offset: [0, -10]
        });
        
        layers.oilfields.addLayer(marker);
        allFeatures.push({ marker, data: field, type: 'Oil Field' });
    });
    
    // Add refineries
    CALIFORNIA_DATA.refineries.forEach(refinery => {
        const marker = L.marker([refinery.lat, refinery.lng], {
            icon: ICONS.refinery
        });
        
        marker.feature = refinery;
        marker.featureType = 'Refinery';
        
        marker.on('click', () => showInfoPanel(refinery, 'Refinery'));
        marker.on('mouseover', () => {
            marker.setIcon(createLargeIcon('#9b59b6', 'diamond', 26));
        });
        marker.on('mouseout', () => {
            if (selectedMarker !== marker) {
                marker.setIcon(ICONS.refinery);
            }
        });
        
        marker.bindTooltip(refinery.name, {
            permanent: false,
            direction: 'top',
            offset: [0, -10]
        });
        
        layers.refineries.addLayer(marker);
        allFeatures.push({ marker, data: refinery, type: 'Refinery' });
    });
    
    // Add terminals
    CALIFORNIA_DATA.terminals.forEach(terminal => {
        const marker = L.marker([terminal.lat, terminal.lng], {
            icon: ICONS['marine-terminal']
        });
        
        marker.feature = terminal;
        marker.featureType = 'Terminal';
        
        marker.on('click', () => showInfoPanel(terminal, 'Marine Terminal'));
        marker.on('mouseover', () => {
            marker.setIcon(createLargeIcon('#fdcb6e', 'square'));
        });
        marker.on('mouseout', () => {
            if (selectedMarker !== marker) {
                marker.setIcon(ICONS['marine-terminal']);
            }
        });
        
        marker.bindTooltip(terminal.name, {
            permanent: false,
            direction: 'top',
            offset: [0, -10]
        });
        
        layers.terminals.addLayer(marker);
        allFeatures.push({ marker, data: terminal, type: 'Terminal' });
    });
    
    // Add pipelines
    CALIFORNIA_DATA.pipelines.forEach(pipeline => {
        const isOffshore = pipeline.id.includes('channel') || pipeline.id.includes('beta');
        const color = pipeline.type === 'products' ? '#f39c12' : '#e67e22';
        
        const polyline = L.polyline(pipeline.coordinates, {
            color: color,
            weight: pipeline.type === 'products' ? 3 : 4,
            opacity: 0.85,
            lineCap: 'round',
            lineJoin: 'round',
            className: `pipeline-flow ${pipeline.type === 'products' ? 'pipeline-products' : 'pipeline-crude'}`
        });
        
        polyline.feature = pipeline;
        
        polyline.on('click', () => showInfoPanel(pipeline, 'Pipeline'));
        polyline.on('mouseover', () => {
            polyline.setStyle({ weight: 6, opacity: 1 });
        });
        polyline.on('mouseout', () => {
            polyline.setStyle({ weight: 4, opacity: 0.8 });
        });
        
        polyline.bindTooltip(pipeline.name, {
            permanent: false,
            sticky: true
        });
        
        if (isOffshore) {
            layers.offshorePipelines.addLayer(polyline);
        } else {
            layers.pipelines.addLayer(polyline);
        }
        
        allFeatures.push({ marker: polyline, data: pipeline, type: 'Pipeline' });
    });
    
    // Add geological basins (polygons)
    CALIFORNIA_DATA.basins.forEach(basin => {
        const polygon = L.polygon(basin.bounds, {
            color: '#f39c12',
            weight: 2,
            fillColor: '#f39c12',
            fillOpacity: 0.15,
            dashArray: '5, 5'
        });
        
        polygon.feature = basin;
        
        polygon.on('click', () => showInfoPanel(basin, 'Geological Basin'));
        polygon.on('mouseover', () => {
            polygon.setStyle({ fillOpacity: 0.25 });
        });
        polygon.on('mouseout', () => {
            polygon.setStyle({ fillOpacity: 0.15 });
        });
        
        polygon.bindTooltip(basin.name, {
            permanent: false,
            sticky: true
        });
        
        layers.basins.addLayer(polygon);
        allFeatures.push({ marker: polygon, data: basin, type: 'Basin' });
    });
    
    // ================================================================
    // INFO PANEL
    // ================================================================
    
    const infoPanel = document.getElementById('info-panel');
    const infoTitle = document.getElementById('info-title');
    const infoType = document.getElementById('info-type');
    const infoDescription = document.getElementById('info-description');
    const infoData = document.getElementById('info-data');
    const infoSource = document.getElementById('info-source');
    const infoClose = document.getElementById('info-close');
    
    function showInfoPanel(feature, type) {
        infoTitle.textContent = feature.name;
        infoType.textContent = type;
        infoDescription.textContent = feature.description || 'No description available.';
        
        // Build data items based on feature type
        let dataHtml = '';
        
        if (type === 'Offshore Platform') {
            dataHtml = `
                <div class="info-panel__datum">
                    <div class="info-panel__datum-value">${feature.operator}</div>
                    <div class="info-panel__datum-label">Operator</div>
                </div>
                <div class="info-panel__datum">
                    <div class="info-panel__datum-value">${feature.waterDepth.toLocaleString()} ft</div>
                    <div class="info-panel__datum-label">Water Depth</div>
                </div>
                <div class="info-panel__datum">
                    <div class="info-panel__datum-value">${feature.installed}</div>
                    <div class="info-panel__datum-label">Year Installed</div>
                </div>
                <div class="info-panel__datum">
                    <div class="info-panel__datum-value">${feature.status}</div>
                    <div class="info-panel__datum-label">Status</div>
                </div>
                <div class="info-panel__datum">
                    <div class="info-panel__datum-value">${feature.wells}</div>
                    <div class="info-panel__datum-label">Wells</div>
                </div>
                <div class="info-panel__datum">
                    <div class="info-panel__datum-value">${feature.production.oil.toLocaleString()} bbl/d</div>
                    <div class="info-panel__datum-label">Oil Production</div>
                </div>
            `;
        } else if (type === 'Oil Field') {
            dataHtml = `
                <div class="info-panel__datum">
                    <div class="info-panel__datum-value">${feature.operator}</div>
                    <div class="info-panel__datum-label">Primary Operator</div>
                </div>
                <div class="info-panel__datum">
                    <div class="info-panel__datum-value">${feature.discoveryYear}</div>
                    <div class="info-panel__datum-label">Discovered</div>
                </div>
                <div class="info-panel__datum">
                    <div class="info-panel__datum-value">${feature.dailyProduction.toLocaleString()} bbl/d</div>
                    <div class="info-panel__datum-label">Daily Production</div>
                </div>
                <div class="info-panel__datum">
                    <div class="info-panel__datum-value">${feature.cumulativeProduction.toLocaleString()} MMbbl</div>
                    <div class="info-panel__datum-label">Cumulative Production</div>
                </div>
                <div class="info-panel__datum">
                    <div class="info-panel__datum-value">${feature.wells.toLocaleString()}</div>
                    <div class="info-panel__datum-label">Total Wells</div>
                </div>
                <div class="info-panel__datum">
                    <div class="info-panel__datum-value">${feature.area.toLocaleString()} acres</div>
                    <div class="info-panel__datum-label">Field Area</div>
                </div>
            `;
        } else if (type === 'Refinery') {
            dataHtml = `
                <div class="info-panel__datum">
                    <div class="info-panel__datum-value">${feature.operator}</div>
                    <div class="info-panel__datum-label">Operator</div>
                </div>
                <div class="info-panel__datum">
                    <div class="info-panel__datum-value">${feature.capacity.toLocaleString()} bbl/d</div>
                    <div class="info-panel__datum-label">Processing Capacity</div>
                </div>
                <div class="info-panel__datum">
                    <div class="info-panel__datum-value">${feature.built}</div>
                    <div class="info-panel__datum-label">Year Built</div>
                </div>
                <div class="info-panel__datum">
                    <div class="info-panel__datum-value">${feature.employees.toLocaleString()}</div>
                    <div class="info-panel__datum-label">Employees</div>
                </div>
                <div class="info-panel__datum" style="grid-column: span 2;">
                    <div class="info-panel__datum-value">${feature.products.join(', ')}</div>
                    <div class="info-panel__datum-label">Primary Products</div>
                </div>
            `;
        } else if (type === 'Marine Terminal') {
            dataHtml = `
                <div class="info-panel__datum">
                    <div class="info-panel__datum-value">${feature.operator}</div>
                    <div class="info-panel__datum-label">Operator</div>
                </div>
                <div class="info-panel__datum">
                    <div class="info-panel__datum-value">${feature.throughput.toLocaleString()} bbl/d</div>
                    <div class="info-panel__datum-label">Throughput Capacity</div>
                </div>
            `;
        } else if (type === 'Pipeline') {
            dataHtml = `
                <div class="info-panel__datum">
                    <div class="info-panel__datum-value">${feature.operator}</div>
                    <div class="info-panel__datum-label">Operator</div>
                </div>
                <div class="info-panel__datum">
                    <div class="info-panel__datum-value">${feature.type === 'products' ? 'Refined Products' : 'Crude Oil'}</div>
                    <div class="info-panel__datum-label">Contents</div>
                </div>
                <div class="info-panel__datum">
                    <div class="info-panel__datum-value">${feature.capacity.toLocaleString()} bbl/d</div>
                    <div class="info-panel__datum-label">Capacity</div>
                </div>
                <div class="info-panel__datum">
                    <div class="info-panel__datum-value">${feature.length} miles</div>
                    <div class="info-panel__datum-label">Length</div>
                </div>
            `;
        } else if (type === 'Geological Basin') {
            dataHtml = `
                <div class="info-panel__datum">
                    <div class="info-panel__datum-value">${feature.area.toLocaleString()} sq mi</div>
                    <div class="info-panel__datum-label">Basin Area</div>
                </div>
                <div class="info-panel__datum">
                    <div class="info-panel__datum-value">${feature.production}%</div>
                    <div class="info-panel__datum-label">% of CA Production</div>
                </div>
                <div class="info-panel__datum">
                    <div class="info-panel__datum-value">${feature.oilInPlace.toLocaleString()} MMbbl</div>
                    <div class="info-panel__datum-label">Est. Oil in Place</div>
                </div>
            `;
        }
        
        infoData.innerHTML = dataHtml;
        
        // Source link
        if (feature.source) {
            infoSource.innerHTML = `Source: ${feature.source}`;
            infoSource.style.display = 'block';
        } else {
            infoSource.style.display = 'none';
        }
        
        infoPanel.classList.add('active');
    }
    
    infoClose.addEventListener('click', () => {
        infoPanel.classList.remove('active');
    });
    
    // Close panel when clicking on map
    map.on('click', (e) => {
        // Only close if not clicking on a feature
        if (!e.originalEvent.target.closest('.custom-marker') && 
            !e.originalEvent.target.closest('.leaflet-interactive')) {
            infoPanel.classList.remove('active');
        }
    });
    
    // ================================================================
    // LAYER TOGGLE CONTROLS
    // ================================================================
    
    const layerToggles = {
        'layer-platforms': layers.platforms,
        'layer-offshore-pipelines': layers.offshorePipelines,
        'layer-oilfields': layers.oilfields,
        'layer-basins': layers.basins,
        'layer-refineries': layers.refineries,
        'layer-terminals': layers.terminals,
        'layer-pipelines': layers.pipelines
    };
    
    Object.keys(layerToggles).forEach(toggleId => {
        const checkbox = document.getElementById(toggleId);
        if (checkbox) {
            checkbox.addEventListener('change', (e) => {
                if (e.target.checked) {
                    map.addLayer(layerToggles[toggleId]);
                } else {
                    map.removeLayer(layerToggles[toggleId]);
                }
            });
        }
    });
    
    // ================================================================
    // BASE MAP TOGGLE
    // ================================================================
    
    document.getElementById('basemap-topo').addEventListener('change', () => {
        map.removeLayer(currentBaseLayer);
        baseLayers.topo.addTo(map);
        currentBaseLayer = baseLayers.topo;
    });
    
    document.getElementById('basemap-satellite').addEventListener('change', () => {
        map.removeLayer(currentBaseLayer);
        baseLayers.satellite.addTo(map);
        currentBaseLayer = baseLayers.satellite;
    });
    
    document.getElementById('basemap-dark').addEventListener('change', () => {
        map.removeLayer(currentBaseLayer);
        baseLayers.dark.addTo(map);
        currentBaseLayer = baseLayers.dark;
    });
    
    // ================================================================
    // SEARCH FUNCTIONALITY
    // ================================================================
    
    const searchInput = document.getElementById('search-input');
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        if (query.length < 2) {
            // Reset all markers to visible
            allFeatures.forEach(f => {
                if (f.marker.setOpacity) {
                    f.marker.setOpacity(1);
                } else if (f.marker.setStyle) {
                    f.marker.setStyle({ opacity: 0.8, fillOpacity: 0.15 });
                }
            });
            return;
        }
        
        // Search through features
        const matches = [];
        
        allFeatures.forEach(f => {
            const data = f.data;
            const searchText = [
                data.name,
                data.operator,
                data.description,
                f.type
            ].filter(Boolean).join(' ').toLowerCase();
            
            const isMatch = searchText.includes(query);
            
            if (isMatch) {
                matches.push(f);
                if (f.marker.setOpacity) {
                    f.marker.setOpacity(1);
                } else if (f.marker.setStyle) {
                    f.marker.setStyle({ opacity: 1, fillOpacity: 0.25 });
                }
            } else {
                if (f.marker.setOpacity) {
                    f.marker.setOpacity(0.2);
                } else if (f.marker.setStyle) {
                    f.marker.setStyle({ opacity: 0.3, fillOpacity: 0.05 });
                }
            }
        });
        
        // If only one match, zoom to it
        if (matches.length === 1) {
            const match = matches[0];
            if (match.marker.getLatLng) {
                map.setView(match.marker.getLatLng(), 10);
            } else if (match.marker.getBounds) {
                map.fitBounds(match.marker.getBounds(), { padding: [50, 50] });
            }
        }
    });
    
    // Clear search on Escape
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchInput.value = '';
            searchInput.dispatchEvent(new Event('input'));
            searchInput.blur();
        }
    });
    
    // ================================================================
    // KEYBOARD SHORTCUTS
    // ================================================================
    
    document.addEventListener('keydown', (e) => {
        // Close info panel on Escape
        if (e.key === 'Escape' && infoPanel.classList.contains('active')) {
            infoPanel.classList.remove('active');
        }
        
        // Focus search on Ctrl+F or /
        if ((e.ctrlKey && e.key === 'f') || (e.key === '/' && document.activeElement !== searchInput)) {
            e.preventDefault();
            searchInput.focus();
        }
    });
    
    // ================================================================
    // FIT MAP TO CALIFORNIA
    // ================================================================
    
    // Fit to California bounds on load
    const californiaBounds = L.latLngBounds(
        [32.5, -124.5],  // Southwest corner
        [42.0, -114.0]   // Northeast corner
    );
    
    map.fitBounds(californiaBounds, { padding: [20, 20] });
    
    // ================================================================
    // STATS BAR
    // ================================================================
    (function populateStats() {
        const platforms = CALIFORNIA_DATA.platforms;
        const active    = platforms.filter(p => p.status === 'Producing').length;
        const incidents = platforms.filter(p =>
            p.status.startsWith('Shut-in') ||
            p.status.startsWith('Damaged') ||
            (p.description && p.description.toLowerCase().includes('spill'))
        ).length;
        const totalOil  = platforms
            .filter(p => p.status === 'Producing')
            .reduce((s, p) => s + (p.production?.oil || 0), 0);
        const decommissioned = platforms.filter(p => p.status === 'Decommissioned').length;

        const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
        set('stats-active',       active);
        set('stats-production',   totalOil.toLocaleString() + ' bbl/d');
        set('stats-incidents',    incidents);
        set('stats-decommissioned', decommissioned);
    })();

    // ================================================================
    // EXPORT FOR DEBUGGING
    // ================================================================
    
    window.californiaMap = {
        map,
        layers,
        baseLayers,
        allFeatures,
        showInfoPanel,
        filterPlatformsByStatus(status) {
            allFeatures.filter(f => f.type === 'Platform').forEach(f => {
                const s = f.data.status || '';
                let show = true;
                if (status === 'producing')  show = s === 'Producing';
                if (status === 'shutin')     show = s.startsWith('Shut-in');
                if (status === 'incident')   show = s.startsWith('Damaged') ||
                    (f.data.description && f.data.description.toLowerCase().includes('spill'));
                if (status === 'decommissioned') show = s === 'Decommissioned';
                f.marker.setOpacity(show ? 1 : 0.08);
            });
        }
    };
    
    console.log('California Infrastructure Map initialized');
    console.log(`Loaded: ${CALIFORNIA_DATA.platforms.length} platforms, ${CALIFORNIA_DATA.oilFields.length} oil fields, ${CALIFORNIA_DATA.refineries.length} refineries, ${CALIFORNIA_DATA.terminals.length} terminals, ${CALIFORNIA_DATA.pipelines.length} pipelines, ${CALIFORNIA_DATA.basins.length} basins`);
    
})();
