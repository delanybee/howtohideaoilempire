/**
 * Fossil Fuel Infrastructure Scrollytelling
 * Charts.js - Chart.js Visualizations for Pipeline Safety Data
 */

// ============================================
// CHART CONFIGURATION
// ============================================
const CHART_COLORS = {
    pipeline: '#e67e22',
    pipelineLight: '#f39c12',
    danger: '#e74c3c',
    dangerLight: '#f1948a',
    water: '#5dade2',
    waterDark: '#2980b9',
    oilfield: '#27ae60',
    textPrimary: '#e8e8e8',
    textSecondary: '#b8b8c8',
    textMuted: '#888898',
    bgCard: '#252540',
    bgDark: '#1a1a2e',
    gridLines: 'rgba(136, 136, 152, 0.2)'
};

// Chart.js global defaults
Chart.defaults.color = CHART_COLORS.textSecondary;
Chart.defaults.font.family = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";
Chart.defaults.font.size = 12;

// ============================================
// PIPELINE INCIDENT DATA (PHMSA 2010-2024)
// ============================================
const INCIDENT_DATA = {
    years: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
    incidents: [618, 592, 576, 621, 707, 714, 638, 605, 622, 614, 548, 593, 648, 703, 530],
    // Cumulative total through 2024: 9,329
};

// Texas vs National comparison data
const TEXAS_COMPARISON_DATA = {
    labels: ['Texas', 'Rest of U.S.'],
    incidents: [2881, 6448], // Texas: 2,881, Rest: 6,448 (total 9,329)
    pipelineMiles: [11.3, 88.7], // Percentage of total pipeline miles
    incidentRate: [2.66, 0.91] // Incidents per 1000 miles (normalized)
};

// Significant incident categories
const INCIDENT_CATEGORIES = {
    labels: ['Fatalities/Injuries', 'Major Releases (5+ bbl)', 'Property Damage ($50k+)', 'Other Significant'],
    values: [127, 3842, 4215, 1145]
};

// ============================================
// CHART INSTANCES
// ============================================
let incidentsChart = null;
let texasComparisonChart = null;
let currentChartView = 'incidents';

// ============================================
// CHART CREATION FUNCTIONS
// ============================================

/**
 * Create the main incidents trend chart
 */
function createIncidentsChart() {
    const ctx = document.getElementById('incidents-chart');
    if (!ctx) return null;
    
    // Clear existing chart if any
    if (incidentsChart) {
        incidentsChart.destroy();
    }
    
    incidentsChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: INCIDENT_DATA.years,
            datasets: [{
                label: 'Pipeline Incidents',
                data: INCIDENT_DATA.incidents,
                backgroundColor: CHART_COLORS.pipeline,
                borderColor: CHART_COLORS.pipelineLight,
                borderWidth: 1,
                borderRadius: 4,
                hoverBackgroundColor: CHART_COLORS.pipelineLight
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            animation: {
                duration: 1000,
                easing: 'easeOutQuart'
            },
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'U.S. Pipeline Incidents by Year (2010-2024)',
                    color: CHART_COLORS.textPrimary,
                    font: {
                        size: 16,
                        weight: '600'
                    },
                    padding: {
                        bottom: 20
                    }
                },
                tooltip: {
                    backgroundColor: CHART_COLORS.bgCard,
                    titleColor: CHART_COLORS.textPrimary,
                    bodyColor: CHART_COLORS.textSecondary,
                    borderColor: CHART_COLORS.pipeline,
                    borderWidth: 1,
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return `${context.parsed.y.toLocaleString()} incidents`;
                        },
                        afterLabel: function(context) {
                            const avg = 628;
                            const diff = context.parsed.y - avg;
                            const sign = diff >= 0 ? '+' : '';
                            return `${sign}${diff} from average (628/year)`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: CHART_COLORS.textMuted
                    }
                },
                y: {
                    beginAtZero: true,
                    max: 800,
                    grid: {
                        color: CHART_COLORS.gridLines,
                        drawBorder: false
                    },
                    ticks: {
                        color: CHART_COLORS.textMuted,
                        callback: function(value) {
                            return value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
    
    // Add average line annotation
    addAverageLine(incidentsChart, 628, 'Annual Average');
    
    return incidentsChart;
}

/**
 * Create Texas vs National comparison chart
 */
function createTexasComparisonChart() {
    const ctx = document.getElementById('incidents-chart');
    if (!ctx) return null;
    
    // Clear existing chart
    if (incidentsChart) {
        incidentsChart.destroy();
    }
    
    texasComparisonChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Incidents (% of total)', 'Pipeline Miles (% of total)', 'Incident Rate (per 1000 mi)'],
            datasets: [
                {
                    label: 'Texas',
                    data: [30.9, 11.3, 2.66],
                    backgroundColor: CHART_COLORS.danger,
                    borderColor: CHART_COLORS.dangerLight,
                    borderWidth: 1,
                    borderRadius: 4
                },
                {
                    label: 'National Average',
                    data: [100, 100, 1.0],
                    backgroundColor: CHART_COLORS.water,
                    borderColor: CHART_COLORS.waterDark,
                    borderWidth: 1,
                    borderRadius: 4,
                    hidden: true
                },
                {
                    label: 'Rest of U.S.',
                    data: [69.1, 88.7, 0.91],
                    backgroundColor: CHART_COLORS.bgCard,
                    borderColor: CHART_COLORS.textMuted,
                    borderWidth: 1,
                    borderRadius: 4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            animation: {
                duration: 800,
                easing: 'easeOutQuart'
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        color: CHART_COLORS.textSecondary,
                        padding: 20,
                        usePointStyle: true,
                        pointStyle: 'rectRounded'
                    }
                },
                title: {
                    display: true,
                    text: 'Texas vs. Rest of U.S.: Pipeline Incident Comparison',
                    color: CHART_COLORS.textPrimary,
                    font: {
                        size: 16,
                        weight: '600'
                    },
                    padding: {
                        bottom: 20
                    }
                },
                tooltip: {
                    backgroundColor: CHART_COLORS.bgCard,
                    titleColor: CHART_COLORS.textPrimary,
                    bodyColor: CHART_COLORS.textSecondary,
                    borderColor: CHART_COLORS.danger,
                    borderWidth: 1,
                    padding: 12
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: CHART_COLORS.textMuted,
                        font: {
                            size: 11
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: CHART_COLORS.gridLines,
                        drawBorder: false
                    },
                    ticks: {
                        color: CHART_COLORS.textMuted
                    }
                }
            }
        }
    });
    
    incidentsChart = texasComparisonChart;
    return texasComparisonChart;
}

/**
 * Create incident categories doughnut chart
 */
function createCategoriesChart() {
    const ctx = document.getElementById('incidents-chart');
    if (!ctx) return null;
    
    if (incidentsChart) {
        incidentsChart.destroy();
    }
    
    incidentsChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: INCIDENT_CATEGORIES.labels,
            datasets: [{
                data: INCIDENT_CATEGORIES.values,
                backgroundColor: [
                    CHART_COLORS.danger,
                    CHART_COLORS.pipeline,
                    CHART_COLORS.pipelineLight,
                    CHART_COLORS.water
                ],
                borderColor: CHART_COLORS.bgDark,
                borderWidth: 2,
                hoverOffset: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            animation: {
                duration: 800,
                easing: 'easeOutQuart'
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        color: CHART_COLORS.textSecondary,
                        padding: 15,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                title: {
                    display: true,
                    text: 'Significant Incident Categories (2010-2024)',
                    color: CHART_COLORS.textPrimary,
                    font: {
                        size: 16,
                        weight: '600'
                    },
                    padding: {
                        bottom: 20
                    }
                },
                tooltip: {
                    backgroundColor: CHART_COLORS.bgCard,
                    titleColor: CHART_COLORS.textPrimary,
                    bodyColor: CHART_COLORS.textSecondary,
                    borderColor: CHART_COLORS.pipeline,
                    borderWidth: 1,
                    padding: 12,
                    callbacks: {
                        label: function(context) {
                            const total = INCIDENT_CATEGORIES.values.reduce((a, b) => a + b, 0);
                            const percentage = ((context.parsed / total) * 100).toFixed(1);
                            return `${context.parsed.toLocaleString()} incidents (${percentage}%)`;
                        }
                    }
                }
            },
            cutout: '55%'
        }
    });
    
    return incidentsChart;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Add a horizontal average line to a chart
 */
function addAverageLine(chart, value, label) {
    if (!chart) return;
    
    // Using Chart.js annotation plugin would be ideal, but we can simulate with a dataset
    const avgData = new Array(chart.data.labels.length).fill(value);
    
    chart.data.datasets.push({
        label: label,
        data: avgData,
        type: 'line',
        borderColor: CHART_COLORS.danger,
        borderWidth: 2,
        borderDash: [5, 5],
        pointRadius: 0,
        fill: false,
        order: 0
    });
    
    chart.update();
}

/**
 * Highlight specific bars in the incidents chart
 */
function highlightYear(chart, year) {
    if (!chart || !chart.data) return;
    
    const index = chart.data.labels.indexOf(year);
    if (index === -1) return;
    
    // Reset all bars
    chart.data.datasets[0].backgroundColor = chart.data.labels.map((_, i) => 
        i === index ? CHART_COLORS.dangerLight : CHART_COLORS.pipeline
    );
    
    chart.update();
}

/**
 * Highlight Texas data
 */
function highlightTexas(chart) {
    if (!chart || !chart.data) return;
    
    // Emphasize Texas dataset
    chart.data.datasets[0].backgroundColor = CHART_COLORS.danger;
    chart.data.datasets[0].borderWidth = 2;
    chart.update();
}

// ============================================
// CHART UPDATE HANDLERS (called from main.js)
// ============================================

/**
 * Update charts based on scroll step
 */
function updateSafetyCharts(stepId, direction) {
    switch (stepId) {
        case 'safety-intro':
            // Show basic incidents chart
            if (currentChartView !== 'incidents') {
                createIncidentsChart();
                currentChartView = 'incidents';
            }
            break;
            
        case 'safety-stats':
            // Keep incidents chart, maybe highlight total
            if (currentChartView !== 'incidents') {
                createIncidentsChart();
                currentChartView = 'incidents';
            }
            break;
            
        case 'safety-2024':
            // Highlight 2024 in the chart
            if (currentChartView !== 'incidents') {
                createIncidentsChart();
                currentChartView = 'incidents';
            }
            setTimeout(() => highlightYear(incidentsChart, '2024'), 300);
            break;
            
        case 'safety-texas':
            // Switch to Texas comparison
            if (currentChartView !== 'texas') {
                createTexasComparisonChart();
                currentChartView = 'texas';
            }
            break;
            
        case 'safety-comparison':
            // Keep Texas comparison, highlight rate
            if (currentChartView !== 'texas') {
                createTexasComparisonChart();
                currentChartView = 'texas';
            }
            setTimeout(() => highlightTexas(incidentsChart), 300);
            break;
            
        default:
            // Default to incidents chart
            if (currentChartView !== 'incidents') {
                createIncidentsChart();
                currentChartView = 'incidents';
            }
    }
}

// ============================================
// RESIZE HANDLER
// ============================================
function resizeCharts() {
    if (incidentsChart) {
        incidentsChart.resize();
    }
}

// ============================================
// INITIALIZATION
// ============================================
function initCharts() {
    // Create initial chart
    createIncidentsChart();
    currentChartView = 'incidents';
    
    console.log('Charts initialized');
}

// ============================================
// EXPORT FOR GLOBAL ACCESS
// ============================================
window.initCharts = initCharts;
window.updateSafetyCharts = updateSafetyCharts;
window.resizeCharts = resizeCharts;
window.INCIDENT_DATA = INCIDENT_DATA;
window.TEXAS_COMPARISON_DATA = TEXAS_COMPARISON_DATA;
