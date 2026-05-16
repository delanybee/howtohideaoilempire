/**
 * Fossil Fuel Infrastructure Scrollytelling
 * Maps.js - D3.js and SVG Maps for Infrastructure Visualization
 */

// ============================================
// MAP CONFIGURATION
// ============================================
const MAP_COLORS = {
    stateFill: '#252540',
    stateStroke: '#1a1a2e',
    stateHover: '#2d2d4a',
    stateHighlight: '#27ae60',
    pipeline: '#e67e22',
    pipelineLight: '#f39c12',
    noConnection: '#e74c3c',
    hub: '#f39c12',
    storage: '#5dade2',
    refinery: '#27ae60',
    platform: '#2980b9',
    oilfield: '#58d68d',
    text: '#b8b8c8',
    annotation: '#f1948a'
};

// ============================================
// GEO DATA - Simplified US State Boundaries (coordinates for key states)
// For production, load from TopoJSON/GeoJSON
// ============================================

// Major pipeline corridors (simplified line coordinates)
const PIPELINE_CORRIDORS = {
    permianToGulf: {
        name: 'Permian to Gulf Coast',
        pipelines: ['Cactus', 'EPIC', 'Gray Oak'],
        capacity: '2.17M bpd',
        path: [[260, 340], [280, 360], [300, 380], [330, 400], [360, 410]],
        active: false
    },
    cushingToGulf: {
        name: 'Cushing to Gulf Coast',
        pipelines: ['Various operators'],
        capacity: 'Multiple lines',
        path: [[300, 280], [310, 300], [325, 330], [340, 360], [360, 400]],
        active: false
    },
    canadaToCushing: {
        name: 'Canada/Bakken to Cushing',
        pipelines: ['Enbridge', 'Plains'],
        operators: 'Enbridge (12,974 mi), Plains (14,919 mi)',
        path: [[280, 80], [290, 120], [295, 160], [300, 200], [300, 280]],
        active: false
    },
    colonial: {
        name: 'Colonial Pipeline',
        description: 'Gulf Coast to East Coast (2.5M bpd)',
        path: [[360, 400], [400, 380], [450, 350], [500, 320], [550, 290], [600, 260], [650, 220]],
        active: false
    },
    californiaGap: {
        name: 'No Pipeline Connection',
        description: 'California has no pipeline to other refining regions',
        path: [[100, 280], [150, 300]],
        noConnection: true,
        active: false
    }
};

// Major storage/hub locations
const STORAGE_HUBS = {
    cushing: {
        name: 'Cushing, OK',
        description: 'Pipeline Crossroads of the World',
        capacity: '90M barrels',
        coords: [300, 280],
        active: false
    },
    nederland: {
        name: 'Nederland, TX',
        description: 'Largest single-owned crude terminal',
        capacity: '33M barrels',
        coords: [350, 410],
        active: false
    },
    loop: {
        name: 'LOOP/Clovelly, LA',
        description: 'Primary import gateway, salt cavern storage',
        capacity: '40M barrels',
        coords: [390, 420],
        active: false
    },
    houston: {
        name: 'Houston Ship Channel',
        description: 'Houston Fuel Oil Terminal',
        capacity: '16M+ barrels',
        coords: [330, 400],
        active: false
    },
    ingleside: {
        name: 'Enbridge Ingleside, TX',
        description: 'Largest crude export terminal',
        capacity: '17.6M barrels',
        exports: '25% of Gulf Coast exports',
        coords: [320, 420],
        active: false
    }
};

// SPR Sites
const SPR_SITES = [
    { name: 'Bryan Mound', state: 'TX', coords: [340, 410] },
    { name: 'Big Hill', state: 'TX', coords: [355, 405] },
    { name: 'West Hackberry', state: 'LA', coords: [375, 415] },
    { name: 'Bayou Choctaw', state: 'LA', coords: [385, 400] }
];

// California infrastructure data
const CALIFORNIA_DATA = {
    offshore: {
        platforms: [
            { name: 'Harmony', operator: 'Sable Offshore', status: 'active', coords: [55, 270] },
            { name: 'Heritage', operator: 'Sable Offshore', status: 'active', coords: [52, 275] },
            { name: 'Hondo', operator: 'Sable Offshore', status: 'active', coords: [50, 280] },
            { name: 'Harvest', operator: 'Freeport McMoRan', status: 'active', coords: [48, 285] },
            { name: 'Hermosa', operator: 'Freeport McMoRan', status: 'active', coords: [55, 290] },
            { name: 'Hidalgo', operator: 'Freeport McMoRan', status: 'active', coords: [58, 295] },
            { name: 'Irene', operator: 'Freeport McMoRan', status: 'active', coords: [62, 300] },
            { name: 'Platform A', operator: 'DCOR', status: 'active', coords: [65, 310] },
            { name: 'Platform B', operator: 'DCOR', status: 'active', coords: [68, 315] },
            { name: 'Platform C', operator: 'DCOR', status: 'active', coords: [70, 320] }
        ],
        totalActive: 19,
        totalInactive: 8,
        federalWaters: 23,
        stateWaters: 4
    },
    oilfields: [
        { name: 'Midway-Sunset', cumulative: '4B barrels', inPlace: '27B barrels', coords: [90, 290] },
        { name: 'South Belridge', cumulative: '2B+ barrels', wells: 6253, coords: [95, 285] },
        { name: 'Kern River', cumulative: '2B barrels', wells: 9183, operator: 'Chevron', coords: [100, 275] },
        { name: 'Elk Hills', cumulative: '2B+ BOE', size: '75 sq mi', coords: [92, 280] }
    ],
    refineries: {
        bayArea: [
            { name: 'Chevron Richmond', capacity: '245K bpd', status: 'active', coords: [60, 130] },
            { name: 'PBF Martinez', capacity: '157K bpd', status: 'active', coords: [70, 135] },
            { name: 'Valero Benicia', capacity: '145K bpd', status: 'closing Apr 2026', coords: [75, 138] }
        ],
        losAngeles: [
            { name: 'Marathon Carson', capacity: '363K bpd', status: 'active', coords: [85, 340] },
            { name: 'Chevron El Segundo', capacity: '269K bpd', status: 'active', coords: [78, 345] },
            { name: 'PBF Torrance', capacity: '155K bpd', status: 'active', coords: [82, 350] },
            { name: 'Phillips 66 Wilmington', capacity: '139K bpd', status: 'closing 2025', coords: [88, 355] }
        ]
    },
    terminals: [
        { name: 'Zenith Long Beach', coords: [85, 360] },
        { name: 'Zenith Dominguez Hills', capacity: '4M barrels', coords: [82, 358] },
        { name: 'Richmond Long Wharf', coords: [58, 128] }
    ]
};

// ============================================
// MAP INSTANCES
// ============================================
let pipelineMapSvg = null;
let californiaMapSvg = null;
let storageMapSvg = null;

// ============================================
// US PIPELINE MAP
// ============================================
function createPipelineMap() {
    const container = document.getElementById('pipeline-map');
    if (!container) return;
    
    // Clear placeholder
    container.querySelector('.map-placeholder')?.remove();
    
    // Get container dimensions
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    // Create SVG
    pipelineMapSvg = d3.select(container)
        .append('svg')
        .attr('class', 'us-map')
        .attr('viewBox', '0 0 800 500')
        .attr('preserveAspectRatio', 'xMidYMid meet');
    
    // Add defs for gradients and patterns
    const defs = pipelineMapSvg.append('defs');
    
    // Pipeline gradient
    const pipelineGradient = defs.append('linearGradient')
        .attr('id', 'pipeline-gradient')
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '100%')
        .attr('y2', '0%');
    
    pipelineGradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', MAP_COLORS.pipeline);
    
    pipelineGradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', MAP_COLORS.pipelineLight);
    
    // Glow filter
    const filter = defs.append('filter')
        .attr('id', 'glow')
        .attr('x', '-50%')
        .attr('y', '-50%')
        .attr('width', '200%')
        .attr('height', '200%');
    
    filter.append('feGaussianBlur')
        .attr('stdDeviation', '3')
        .attr('result', 'coloredBlur');
    
    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');
    
    // Background
    pipelineMapSvg.append('rect')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('fill', MAP_COLORS.stateStroke);
    
    // Simplified US outline (continental)
    const usOutline = pipelineMapSvg.append('g').attr('class', 'us-outline');
    
    // Draw simplified US shape
    usOutline.append('path')
        .attr('d', generateSimplifiedUSPath())
        .attr('fill', MAP_COLORS.stateFill)
        .attr('stroke', MAP_COLORS.stateStroke)
        .attr('stroke-width', 1);
    
    // State boundaries (simplified for key oil states)
    drawKeyStates(usOutline);
    
    // Create groups for different layers
    const pipelinesGroup = pipelineMapSvg.append('g').attr('class', 'pipelines');
    const hubsGroup = pipelineMapSvg.append('g').attr('class', 'hubs');
    const labelsGroup = pipelineMapSvg.append('g').attr('class', 'labels');
    
    // Draw pipelines
    Object.entries(PIPELINE_CORRIDORS).forEach(([key, corridor]) => {
        const lineGenerator = d3.line()
            .x(d => d[0])
            .y(d => d[1])
            .curve(d3.curveBasis);
        
        const pathClass = corridor.noConnection ? 'pipeline-line no-connection' : 'pipeline-line';
        
        pipelinesGroup.append('path')
            .attr('class', pathClass)
            .attr('id', `pipeline-${key}`)
            .attr('d', lineGenerator(corridor.path))
            .attr('stroke-width', corridor.noConnection ? 2 : 3)
            .attr('filter', 'url(#glow)');
    });
    
    // Draw storage hubs
    Object.entries(STORAGE_HUBS).forEach(([key, hub]) => {
        const group = hubsGroup.append('g')
            .attr('class', 'hub-group')
            .attr('id', `hub-${key}`)
            .style('opacity', 0);
        
        group.append('circle')
            .attr('class', 'pipeline-hub')
            .attr('cx', hub.coords[0])
            .attr('cy', hub.coords[1])
            .attr('r', 8);
        
        // Hub label
        labelsGroup.append('text')
            .attr('class', 'map-label')
            .attr('id', `label-${key}`)
            .attr('x', hub.coords[0] + 12)
            .attr('y', hub.coords[1] + 4)
            .text(hub.name)
            .style('opacity', 0);
    });
    
    // Add legend
    addMapLegend(pipelineMapSvg, [
        { color: MAP_COLORS.pipeline, label: 'Major Pipeline Corridor', type: 'line' },
        { color: MAP_COLORS.noConnection, label: 'No Pipeline Connection', type: 'dashed' },
        { color: MAP_COLORS.hub, label: 'Major Hub/Terminal', type: 'circle' }
    ]);
    
    // Add title
    pipelineMapSvg.append('text')
        .attr('x', 400)
        .attr('y', 30)
        .attr('text-anchor', 'middle')
        .attr('fill', MAP_COLORS.text)
        .attr('font-size', '14px')
        .attr('font-weight', '600')
        .text('U.S. Crude Oil Pipeline Network');
    
    // Add stats text
    pipelineMapSvg.append('text')
        .attr('x', 400)
        .attr('y', 480)
        .attr('text-anchor', 'middle')
        .attr('fill', MAP_COLORS.text)
        .attr('font-size', '11px')
        .text('85,000 miles of crude oil lines | 200,000+ miles total pipeline infrastructure');
}

/**
 * Generate simplified US continental outline
 */
function generateSimplifiedUSPath() {
    // Simplified path for continental US
    return `M 80 150 
            Q 100 120, 150 100 
            L 300 80 
            Q 400 70, 500 90 
            L 650 120 
            Q 700 140, 720 180 
            L 700 250 
            Q 680 300, 650 320 
            L 550 340 
            Q 500 360, 450 380 
            L 380 420 
            Q 350 440, 280 430 
            L 200 400 
            Q 120 380, 80 340 
            L 60 280 
            Q 50 220, 80 150 Z`;
}

/**
 * Draw key oil-producing states
 */
function drawKeyStates(container) {
    // Texas highlight area
    container.append('path')
        .attr('class', 'state state-texas')
        .attr('d', 'M 200 350 L 280 320 L 360 340 L 380 420 L 320 440 L 240 420 Z')
        .attr('fill', MAP_COLORS.stateFill)
        .attr('stroke', MAP_COLORS.pipelineLight)
        .attr('stroke-width', 0.5)
        .attr('stroke-opacity', 0.5);
    
    // Oklahoma area
    container.append('path')
        .attr('class', 'state state-oklahoma')
        .attr('d', 'M 260 260 L 340 260 L 350 300 L 280 320 L 260 280 Z')
        .attr('fill', MAP_COLORS.stateFill)
        .attr('stroke', MAP_COLORS.pipelineLight)
        .attr('stroke-width', 0.5)
        .attr('stroke-opacity', 0.5);
    
    // California silhouette
    container.append('path')
        .attr('class', 'state state-california')
        .attr('d', 'M 60 180 Q 80 200, 85 250 L 95 320 Q 100 350, 90 380 L 70 350 Q 55 300, 50 250 L 60 180 Z')
        .attr('fill', MAP_COLORS.stateFill)
        .attr('stroke', MAP_COLORS.pipelineLight)
        .attr('stroke-width', 0.5)
        .attr('stroke-opacity', 0.5);
}

/**
 * Add legend to map
 */
function addMapLegend(svg, items) {
    const legend = svg.append('g')
        .attr('class', 'map-legend-group')
        .attr('transform', 'translate(20, 420)');
    
    legend.append('rect')
        .attr('x', -10)
        .attr('y', -10)
        .attr('width', 180)
        .attr('height', items.length * 22 + 15)
        .attr('fill', 'rgba(15, 15, 26, 0.9)')
        .attr('rx', 4);
    
    items.forEach((item, i) => {
        const itemGroup = legend.append('g')
            .attr('transform', `translate(0, ${i * 22})`);
        
        if (item.type === 'line') {
            itemGroup.append('line')
                .attr('x1', 0)
                .attr('y1', 8)
                .attr('x2', 20)
                .attr('y2', 8)
                .attr('stroke', item.color)
                .attr('stroke-width', 3);
        } else if (item.type === 'dashed') {
            itemGroup.append('line')
                .attr('x1', 0)
                .attr('y1', 8)
                .attr('x2', 20)
                .attr('y2', 8)
                .attr('stroke', item.color)
                .attr('stroke-width', 2)
                .attr('stroke-dasharray', '4,2');
        } else if (item.type === 'circle') {
            itemGroup.append('circle')
                .attr('cx', 10)
                .attr('cy', 8)
                .attr('r', 6)
                .attr('fill', item.color);
        }
        
        itemGroup.append('text')
            .attr('x', 28)
            .attr('y', 12)
            .attr('fill', MAP_COLORS.text)
            .attr('font-size', '10px')
            .text(item.label);
    });
}

// ============================================
// PIPELINE MAP UPDATES
// ============================================
function updatePipelineMap(stepId, direction) {
    if (!pipelineMapSvg) return;
    
    switch (stepId) {
        case 'pipelines-intro':
            // Show base map, fade in all pipelines slightly
            showAllPipelines(0.3);
            hideAllHubs();
            break;
            
        case 'pipelines-permian':
            // Highlight Permian to Gulf
            highlightPipeline('permianToGulf');
            break;
            
        case 'pipelines-cushing':
            // Highlight Cushing routes and hub
            highlightPipeline('canadaToCushing');
            highlightPipeline('cushingToGulf');
            showHub('cushing');
            break;
            
        case 'pipelines-colonial':
            // Highlight Colonial Pipeline
            highlightPipeline('colonial');
            break;
            
        case 'pipelines-california':
            // Show California with no-connection indicator
            highlightPipeline('californiaGap');
            addCaliforniaAnnotation();
            break;
            
        case 'pipelines-offshore':
            // Show Gulf area for offshore pipelines
            showAllPipelines(0.5);
            highlightGulfRegion();
            break;
            
        default:
            showAllPipelines(0.3);
    }
}

function highlightGulfRegion() {
    if (!pipelineMapSvg) return;
    
    // Remove existing highlight
    pipelineMapSvg.selectAll('.gulf-highlight').remove();
    
    // Add Gulf of Mexico highlight
    const gulfHighlight = pipelineMapSvg.append('g')
        .attr('class', 'gulf-highlight')
        .style('opacity', 0);
    
    gulfHighlight.append('ellipse')
        .attr('cx', 400)
        .attr('cy', 450)
        .attr('rx', 120)
        .attr('ry', 60)
        .attr('fill', 'rgba(93, 173, 226, 0.3)')
        .attr('stroke', MAP_COLORS.storage)
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '4,2');
    
    gulfHighlight.append('text')
        .attr('x', 400)
        .attr('y', 450)
        .attr('text-anchor', 'middle')
        .attr('fill', MAP_COLORS.text)
        .attr('font-size', '10px')
        .text('Gulf of Mexico');
    
    gulfHighlight.append('text')
        .attr('x', 400)
        .attr('y', 465)
        .attr('text-anchor', 'middle')
        .attr('fill', MAP_COLORS.storage)
        .attr('font-size', '9px')
        .text('8,600+ mi offshore pipeline');
    
    gulfHighlight.transition()
        .duration(500)
        .style('opacity', 1);
}

function showAllPipelines(opacity = 1) {
    if (!pipelineMapSvg) return;
    
    pipelineMapSvg.selectAll('.pipeline-line')
        .transition()
        .duration(500)
        .style('opacity', opacity);
}

function highlightPipeline(pipelineId) {
    if (!pipelineMapSvg) return;
    
    // Dim all pipelines
    pipelineMapSvg.selectAll('.pipeline-line')
        .transition()
        .duration(300)
        .style('opacity', 0.2);
    
    // Highlight specific pipeline
    pipelineMapSvg.select(`#pipeline-${pipelineId}`)
        .transition()
        .duration(500)
        .style('opacity', 1);
}

function showHub(hubId) {
    if (!pipelineMapSvg) return;
    
    pipelineMapSvg.select(`#hub-${hubId}`)
        .transition()
        .duration(500)
        .style('opacity', 1);
    
    pipelineMapSvg.select(`#label-${hubId}`)
        .transition()
        .duration(500)
        .style('opacity', 1);
}

function hideAllHubs() {
    if (!pipelineMapSvg) return;
    
    pipelineMapSvg.selectAll('.hub-group')
        .transition()
        .duration(300)
        .style('opacity', 0);
    
    pipelineMapSvg.selectAll('.map-label')
        .transition()
        .duration(300)
        .style('opacity', 0);
}

function addCaliforniaAnnotation() {
    if (!pipelineMapSvg) return;
    
    // Remove existing annotation
    pipelineMapSvg.selectAll('.california-annotation').remove();
    
    // Add annotation
    const annotation = pipelineMapSvg.append('g')
        .attr('class', 'california-annotation')
        .style('opacity', 0);
    
    annotation.append('text')
        .attr('class', 'map-annotation')
        .attr('x', 100)
        .attr('y', 320)
        .attr('fill', MAP_COLORS.annotation)
        .attr('font-size', '11px')
        .text('No pipeline');
    
    annotation.append('text')
        .attr('class', 'map-annotation')
        .attr('x', 100)
        .attr('y', 335)
        .attr('fill', MAP_COLORS.annotation)
        .attr('font-size', '11px')
        .text('connection');
    
    annotation.transition()
        .duration(500)
        .style('opacity', 1);
}

// ============================================
// STORAGE INFOGRAPHIC
// ============================================
function createStorageInfographic() {
    const container = document.getElementById('storage-map');
    if (!container) return;
    
    // Clear existing content
    container.innerHTML = '';
    
    const width = container.clientWidth || 500;
    const height = 400;
    
    storageMapSvg = d3.select(container)
        .append('svg')
        .attr('viewBox', '0 0 500 400')
        .attr('preserveAspectRatio', 'xMidYMid meet');
    
    // Background
    storageMapSvg.append('rect')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('fill', MAP_COLORS.stateStroke);
    
    // Simplified Gulf Coast region
    storageMapSvg.append('path')
        .attr('d', 'M 50 200 Q 100 180, 200 190 L 350 200 Q 400 210, 450 250 L 480 350 L 20 350 Z')
        .attr('fill', MAP_COLORS.stateFill)
        .attr('stroke', MAP_COLORS.stateStroke);
    
    // Water (Gulf of Mexico)
    storageMapSvg.append('path')
        .attr('d', 'M 20 350 L 480 350 L 480 400 L 20 400 Z')
        .attr('fill', 'rgba(93, 173, 226, 0.2)');
    
    // Storage hub markers
    const hubs = [
        { id: 'cushing', x: 200, y: 150, capacity: '90M bbl', label: 'Cushing, OK' },
        { id: 'nederland', x: 280, y: 280, capacity: '33M bbl', label: 'Nederland, TX' },
        { id: 'loop', x: 360, y: 290, capacity: '40M bbl', label: 'LOOP, LA' },
        { id: 'houston', x: 220, y: 280, capacity: '16M+ bbl', label: 'Houston, TX' },
        { id: 'ingleside', x: 180, y: 310, capacity: '17.6M bbl', label: 'Ingleside, TX' }
    ];
    
    // Create hub groups
    hubs.forEach(hub => {
        const group = storageMapSvg.append('g')
            .attr('class', 'storage-hub-group')
            .attr('id', `storage-${hub.id}`)
            .attr('transform', `translate(${hub.x}, ${hub.y})`)
            .style('opacity', 0);
        
        // Tank icon (simplified)
        group.append('rect')
            .attr('x', -15)
            .attr('y', -20)
            .attr('width', 30)
            .attr('height', 25)
            .attr('rx', 3)
            .attr('fill', MAP_COLORS.storage)
            .attr('stroke', MAP_COLORS.stateFill)
            .attr('stroke-width', 2);
        
        // Top of tank
        group.append('ellipse')
            .attr('cx', 0)
            .attr('cy', -20)
            .attr('rx', 15)
            .attr('ry', 5)
            .attr('fill', MAP_COLORS.storage);
        
        // Label
        group.append('text')
            .attr('y', 20)
            .attr('text-anchor', 'middle')
            .attr('fill', MAP_COLORS.text)
            .attr('font-size', '10px')
            .attr('font-weight', '600')
            .text(hub.label);
        
        // Capacity
        group.append('text')
            .attr('y', 32)
            .attr('text-anchor', 'middle')
            .attr('fill', MAP_COLORS.pipelineLight)
            .attr('font-size', '9px')
            .text(hub.capacity);
    });
    
    // SPR indicator
    const sprGroup = storageMapSvg.append('g')
        .attr('class', 'spr-group')
        .attr('id', 'storage-spr')
        .attr('transform', 'translate(320, 320)')
        .style('opacity', 0);
    
    sprGroup.append('rect')
        .attr('x', -40)
        .attr('y', -15)
        .attr('width', 80)
        .attr('height', 30)
        .attr('rx', 4)
        .attr('fill', 'rgba(231, 76, 60, 0.3)')
        .attr('stroke', MAP_COLORS.noConnection)
        .attr('stroke-width', 1);
    
    sprGroup.append('text')
        .attr('text-anchor', 'middle')
        .attr('fill', MAP_COLORS.text)
        .attr('font-size', '9px')
        .attr('font-weight', '600')
        .text('SPR: 714M bbl');
    
    sprGroup.append('text')
        .attr('y', 12)
        .attr('text-anchor', 'middle')
        .attr('fill', MAP_COLORS.text)
        .attr('font-size', '8px')
        .text('(4 salt cavern sites)');
}

function updateStorageInfographic(stepId, direction) {
    if (!storageMapSvg) return;
    
    const hubMap = {
        'storage-intro': [],
        'storage-cushing': ['cushing'],
        'storage-nederland': ['cushing', 'nederland'],
        'storage-loop': ['cushing', 'nederland', 'loop'],
        'storage-houston': ['cushing', 'nederland', 'loop', 'houston'],
        'storage-ingleside': ['cushing', 'nederland', 'loop', 'houston', 'ingleside'],
        'storage-spr': ['cushing', 'nederland', 'loop', 'houston', 'ingleside', 'spr']
    };
    
    const hubsToShow = hubMap[stepId] || [];
    
    // Hide all first
    storageMapSvg.selectAll('.storage-hub-group, .spr-group')
        .transition()
        .duration(300)
        .style('opacity', 0);
    
    // Show relevant hubs
    hubsToShow.forEach((hubId, index) => {
        storageMapSvg.select(`#storage-${hubId}`)
            .transition()
            .delay(index * 150)
            .duration(400)
            .style('opacity', 1);
    });
}

// ============================================
// CALIFORNIA MAP
// ============================================
function createCaliforniaMap() {
    const container = document.getElementById('california-map');
    if (!container) return;
    
    // Clear placeholder
    container.querySelector('.map-placeholder')?.remove();
    
    californiaMapSvg = d3.select(container)
        .append('svg')
        .attr('class', 'california-map-svg')
        .attr('viewBox', '0 0 200 450')
        .attr('preserveAspectRatio', 'xMidYMid meet');
    
    // Background
    californiaMapSvg.append('rect')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('fill', MAP_COLORS.stateStroke);
    
    // California outline (simplified)
    californiaMapSvg.append('path')
        .attr('class', 'california-outline')
        .attr('d', `M 30 20 
                    Q 50 30, 60 60 
                    L 80 100 
                    Q 100 130, 110 180 
                    L 120 250 
                    Q 125 300, 110 350 
                    L 90 400 
                    Q 70 420, 50 400 
                    L 40 350 
                    Q 30 300, 35 250 
                    L 40 180 
                    Q 35 120, 30 80 
                    L 30 20 Z`)
        .attr('fill', MAP_COLORS.stateFill)
        .attr('stroke', MAP_COLORS.pipelineLight)
        .attr('stroke-width', 1);
    
    // Pacific Ocean
    californiaMapSvg.append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', 35)
        .attr('height', 450)
        .attr('fill', 'rgba(93, 173, 226, 0.15)');
    
    // Create layer groups
    const offshoreGroup = californiaMapSvg.append('g').attr('class', 'layer-offshore');
    const oilfieldsGroup = californiaMapSvg.append('g').attr('class', 'layer-oilfields');
    const refineriesGroup = californiaMapSvg.append('g').attr('class', 'layer-refineries');
    const terminalsGroup = californiaMapSvg.append('g').attr('class', 'layer-terminals');
    
    // Draw offshore platforms
    CALIFORNIA_DATA.offshore.platforms.forEach((platform, i) => {
        const y = 180 + (i * 15);
        offshoreGroup.append('circle')
            .attr('class', 'platform-marker')
            .attr('cx', 25)
            .attr('cy', y)
            .attr('r', 4)
            .attr('fill', MAP_COLORS.platform);
    });
    
    // Offshore label
    offshoreGroup.append('text')
        .attr('x', 25)
        .attr('y', 165)
        .attr('text-anchor', 'middle')
        .attr('fill', MAP_COLORS.text)
        .attr('font-size', '8px')
        .text('27 platforms');
    
    // Draw oil fields (Kern County area)
    const kernY = 280;
    oilfieldsGroup.append('ellipse')
        .attr('class', 'oilfield-area')
        .attr('cx', 100)
        .attr('cy', kernY)
        .attr('rx', 35)
        .attr('ry', 25)
        .attr('fill', 'rgba(88, 214, 141, 0.3)')
        .attr('stroke', MAP_COLORS.oilfield)
        .attr('stroke-width', 1);
    
    oilfieldsGroup.append('text')
        .attr('x', 100)
        .attr('y', kernY - 5)
        .attr('text-anchor', 'middle')
        .attr('fill', MAP_COLORS.text)
        .attr('font-size', '9px')
        .attr('font-weight', '600')
        .text('Kern County');
    
    oilfieldsGroup.append('text')
        .attr('x', 100)
        .attr('y', kernY + 8)
        .attr('text-anchor', 'middle')
        .attr('fill', MAP_COLORS.text)
        .attr('font-size', '7px')
        .text('80-90% of CA drilling');
    
    // Draw refineries
    // Bay Area
    refineriesGroup.append('circle')
        .attr('cx', 75)
        .attr('cy', 100)
        .attr('r', 8)
        .attr('fill', MAP_COLORS.refinery);
    
    refineriesGroup.append('text')
        .attr('x', 85)
        .attr('y', 95)
        .attr('fill', MAP_COLORS.text)
        .attr('font-size', '7px')
        .text('Bay Area');
    
    refineriesGroup.append('text')
        .attr('x', 85)
        .attr('y', 105)
        .attr('fill', MAP_COLORS.text)
        .attr('font-size', '7px')
        .text('3 refineries');
    
    // LA Area
    refineriesGroup.append('circle')
        .attr('cx', 95)
        .attr('cy', 365)
        .attr('r', 10)
        .attr('fill', MAP_COLORS.refinery);
    
    refineriesGroup.append('text')
        .attr('x', 110)
        .attr('y', 360)
        .attr('fill', MAP_COLORS.text)
        .attr('font-size', '7px')
        .text('LA/Long Beach');
    
    refineriesGroup.append('text')
        .attr('x', 110)
        .attr('y', 370)
        .attr('fill', MAP_COLORS.text)
        .attr('font-size', '7px')
        .text('4 refineries');
    
    // Draw terminals
    terminalsGroup.append('rect')
        .attr('x', 85)
        .attr('y', 385)
        .attr('width', 15)
        .attr('height', 10)
        .attr('fill', MAP_COLORS.storage)
        .attr('rx', 2);
    
    terminalsGroup.append('text')
        .attr('x', 105)
        .attr('y', 393)
        .attr('fill', MAP_COLORS.text)
        .attr('font-size', '6px')
        .text('Terminals');
    
    // Set initial visibility
    setLayerVisibility('all');
}

function updateCaliforniaMap(stepId, direction) {
    if (!californiaMapSvg) return;
    
    const layerMap = {
        'ca-intro': 'all',
        'ca-offshore': 'offshore',
        'ca-platforms': 'offshore',
        'ca-kern': 'oilfields',
        'ca-fields': 'oilfields',
        'ca-refineries': 'refineries',
        'ca-capacity': 'refineries',
        'ca-terminals': 'terminals'
    };
    
    const layer = layerMap[stepId] || 'all';
    setLayerVisibility(layer);
    
    // Update button state
    document.querySelectorAll('#california-map .map-control').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.layer === layer) {
            btn.classList.add('active');
        }
    });
}

function setLayerVisibility(activeLayer) {
    if (!californiaMapSvg) return;
    
    const layers = ['offshore', 'oilfields', 'refineries', 'terminals'];
    
    layers.forEach(layer => {
        const opacity = (activeLayer === 'all' || activeLayer === layer) ? 1 : 0.15;
        californiaMapSvg.select(`.layer-${layer}`)
            .transition()
            .duration(400)
            .style('opacity', opacity);
    });
}

function toggleMapLayer(containerId, layer) {
    if (containerId === 'california-map') {
        setLayerVisibility(layer);
    }
}

// ============================================
// OFFSHORE PLATFORMS INFOGRAPHIC
// ============================================

// Offshore platform data
const OFFSHORE_DATA = {
    gulfOfMexico: {
        activePlatforms: 1862,
        productionBpd: 1800000,
        provenReserves: 4700000000,
        activeLeases: 2700,
        acreage: 14700000,
        pipelineMiles: 8600,
        percentUSOffshore: 97,
        percentUSTotal: 15
    },
    pacific: {
        platforms: 23,
        federalWaters: true
    },
    alaska: {
        beaufortSeaIslands: 2,
        cookInletPlatforms: 15,
        estimatedReserves: 23600000000
    },
    majorPlatforms: [
        { name: 'Thunder Horse', operator: 'BP', capacity: 250000, depth: 6050 },
        { name: 'Atlantis', operator: 'BP', capacity: 200000, depth: 7070 },
        { name: 'Mars/Ursa', operator: 'Shell', capacity: 230000, depth: 3200 },
        { name: 'Perdido', operator: 'Shell', capacity: 130000, depth: 9627 },
        { name: 'Mad Dog', operator: 'BP', capacity: 140000, depth: 4500 },
        { name: 'Anchor', operator: 'Chevron', capacity: 75000, depth: 5200 }
    ]
};

let offshoreInfographicSvg = null;

function createOffshoreInfographic() {
    const container = document.getElementById('offshore-stats');
    if (!container) return;
    
    // Clear existing content
    container.innerHTML = '';
    
    offshoreInfographicSvg = d3.select(container)
        .append('svg')
        .attr('viewBox', '0 0 500 400')
        .attr('preserveAspectRatio', 'xMidYMid meet');
    
    // Ocean gradient background
    const defs = offshoreInfographicSvg.append('defs');
    const oceanGradient = defs.append('linearGradient')
        .attr('id', 'ocean-gradient')
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '0%')
        .attr('y2', '100%');
    
    oceanGradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', 'rgba(93, 173, 226, 0.2)');
    
    oceanGradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', 'rgba(41, 128, 185, 0.5)');
    
    // Background
    offshoreInfographicSvg.append('rect')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('fill', 'url(#ocean-gradient)');
    
    // Water surface line
    offshoreInfographicSvg.append('line')
        .attr('x1', 0)
        .attr('y1', 60)
        .attr('x2', 500)
        .attr('y2', 60)
        .attr('stroke', MAP_COLORS.storage)
        .attr('stroke-width', 2);
    
    offshoreInfographicSvg.append('text')
        .attr('x', 10)
        .attr('y', 55)
        .attr('fill', MAP_COLORS.text)
        .attr('font-size', '10px')
        .text('Sea Level');
    
    // Depth markers
    const depths = [
        { y: 120, label: '1,000 ft - Shallow water limit' },
        { y: 180, label: '3,000 ft' },
        { y: 240, label: '5,000 ft - Deepwater' },
        { y: 300, label: '7,000 ft' },
        { y: 360, label: '10,000 ft - Ultra-deepwater' }
    ];
    
    depths.forEach(d => {
        offshoreInfographicSvg.append('line')
            .attr('class', 'depth-line')
            .attr('x1', 0)
            .attr('y1', d.y)
            .attr('x2', 500)
            .attr('y2', d.y)
            .attr('stroke', 'rgba(255,255,255,0.15)')
            .attr('stroke-dasharray', '4,4')
            .style('opacity', 0);
        
        offshoreInfographicSvg.append('text')
            .attr('class', 'depth-label')
            .attr('x', 10)
            .attr('y', d.y - 5)
            .attr('fill', MAP_COLORS.text)
            .attr('font-size', '9px')
            .text(d.label)
            .style('opacity', 0);
    });
    
    // Platform groups (positioned by depth)
    const platformGroup = offshoreInfographicSvg.append('g').attr('class', 'platforms-group');
    
    OFFSHORE_DATA.majorPlatforms.forEach((platform, i) => {
        const x = 100 + (i * 60);
        const y = 60 + (platform.depth / 10000) * 300; // Scale depth to visual
        
        const pGroup = platformGroup.append('g')
            .attr('class', `platform-marker platform-${platform.name.toLowerCase().replace(/[\s\/]/g, '-')}`)
            .attr('transform', `translate(${x}, ${y})`)
            .style('opacity', 0);
        
        // Platform icon
        pGroup.append('rect')
            .attr('x', -12)
            .attr('y', -8)
            .attr('width', 24)
            .attr('height', 16)
            .attr('fill', MAP_COLORS.pipeline)
            .attr('rx', 2);
        
        // Leg/riser line to surface
        pGroup.append('line')
            .attr('x1', 0)
            .attr('y1', -8)
            .attr('x2', 0)
            .attr('y2', -(y - 60))
            .attr('stroke', MAP_COLORS.pipelineLight)
            .attr('stroke-width', 1)
            .attr('stroke-dasharray', '2,2');
        
        // Label
        pGroup.append('text')
            .attr('y', 25)
            .attr('text-anchor', 'middle')
            .attr('fill', MAP_COLORS.text)
            .attr('font-size', '7px')
            .attr('font-weight', '600')
            .text(platform.name);
        
        pGroup.append('text')
            .attr('y', 35)
            .attr('text-anchor', 'middle')
            .attr('fill', MAP_COLORS.textMuted || '#888898')
            .attr('font-size', '6px')
            .text(`${(platform.capacity/1000).toFixed(0)}K bpd`);
    });
    
    // Gulf stats callout box
    const statsBox = offshoreInfographicSvg.append('g')
        .attr('class', 'gulf-stats-box')
        .attr('transform', 'translate(350, 100)')
        .style('opacity', 0);
    
    statsBox.append('rect')
        .attr('x', -60)
        .attr('y', -30)
        .attr('width', 120)
        .attr('height', 80)
        .attr('fill', 'rgba(0,0,0,0.6)')
        .attr('rx', 4);
    
    statsBox.append('text')
        .attr('text-anchor', 'middle')
        .attr('fill', MAP_COLORS.storage)
        .attr('font-size', '18px')
        .attr('font-weight', '700')
        .text('1,862');
    
    statsBox.append('text')
        .attr('y', 18)
        .attr('text-anchor', 'middle')
        .attr('fill', MAP_COLORS.text)
        .attr('font-size', '9px')
        .text('Active Platforms');
    
    statsBox.append('text')
        .attr('y', 35)
        .attr('text-anchor', 'middle')
        .attr('fill', MAP_COLORS.pipelineLight)
        .attr('font-size', '10px')
        .text('Gulf of Mexico');
}

function updateOffshoreInfographic(stepId, direction) {
    if (!offshoreInfographicSvg) {
        createOffshoreInfographic();
    }
    
    if (!offshoreInfographicSvg) return;
    
    switch (stepId) {
        case 'offshore-intro':
            // Show basic diagram
            offshoreInfographicSvg.selectAll('.depth-line, .depth-label')
                .transition().duration(500).style('opacity', 0.5);
            offshoreInfographicSvg.selectAll('.platform-marker')
                .transition().duration(500).style('opacity', 0);
            offshoreInfographicSvg.select('.gulf-stats-box')
                .transition().duration(500).style('opacity', 0);
            break;
            
        case 'offshore-gulf':
            // Show Gulf stats
            offshoreInfographicSvg.selectAll('.depth-line, .depth-label')
                .transition().duration(500).style('opacity', 0.5);
            offshoreInfographicSvg.select('.gulf-stats-box')
                .transition().duration(500).style('opacity', 1);
            offshoreInfographicSvg.selectAll('.platform-marker')
                .transition().duration(500).style('opacity', 0);
            break;
            
        case 'offshore-deepwater':
            // Show platforms with depth
            offshoreInfographicSvg.selectAll('.depth-line, .depth-label')
                .transition().duration(500).style('opacity', 1);
            offshoreInfographicSvg.selectAll('.platform-marker')
                .transition()
                .delay((d, i) => i * 150)
                .duration(500)
                .style('opacity', 1);
            offshoreInfographicSvg.select('.gulf-stats-box')
                .transition().duration(300).style('opacity', 0.5);
            break;
            
        case 'offshore-majors':
        case 'offshore-infrastructure':
            // Keep all visible
            offshoreInfographicSvg.selectAll('.depth-line, .depth-label')
                .transition().duration(300).style('opacity', 0.7);
            offshoreInfographicSvg.selectAll('.platform-marker')
                .style('opacity', 1);
            break;
            
        case 'offshore-pacific':
        case 'offshore-alaska':
            // Dim the main visual, show comparison
            offshoreInfographicSvg.selectAll('.platform-marker')
                .transition().duration(300).style('opacity', 0.3);
            break;
            
        default:
            // Show basic state
            offshoreInfographicSvg.selectAll('.depth-line, .depth-label')
                .transition().duration(500).style('opacity', 0.5);
    }
}

// ============================================
// RESIZE HANDLER
// ============================================
function resizeMaps() {
    // Maps use viewBox so they resize automatically
    // This function can be used for any manual adjustments if needed
}

// ============================================
// INITIALIZATION
// ============================================
function initMaps() {
    createPipelineMap();
    createOffshoreInfographic();
    createStorageInfographic();
    createCaliforniaMap();
    
    console.log('Maps initialized');
}

// ============================================
// EXPORT FOR GLOBAL ACCESS
// ============================================
window.initMaps = initMaps;
window.updatePipelineMap = updatePipelineMap;
window.updateOffshoreInfographic = updateOffshoreInfographic;
window.updateStorageInfographic = updateStorageInfographic;
window.updateCaliforniaMap = updateCaliforniaMap;
window.toggleMapLayer = toggleMapLayer;
window.resizeMaps = resizeMaps;
