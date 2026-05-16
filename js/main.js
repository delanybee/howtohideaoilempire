/**
 * Fossil Fuel Infrastructure Scrollytelling
 * Main JavaScript - Scrollama Setup and Core Functionality
 */

// ============================================
// CONFIGURATION
// ============================================
const CONFIG = {
    scrollama: {
        offset: 0.5,
        progress: true,
        threshold: 4
    },
    animation: {
        duration: 800,
        easing: 'ease-out'
    }
};

// ============================================
// DOM ELEMENTS
// ============================================
const DOM = {
    progressBar: document.getElementById('progressBar'),
    sections: document.querySelectorAll('.section'),
    steps: document.querySelectorAll('.step'),
    fadeElements: document.querySelectorAll('.fade-in'),
    heroStats: document.querySelectorAll('.stat__number[data-target]')
};

// ============================================
// SCROLLAMA INSTANCES
// ============================================
let scrollerPipelines;
let scrollerOffshore;
let scrollerSafety;
let scrollerStorage;
let scrollerCalifornia;
let heroObserver;

// ============================================
// PROGRESS BAR
// ============================================
function updateProgressBar() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    DOM.progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
}

// ============================================
// FADE-IN ANIMATIONS
// ============================================
function setupFadeInObserver() {
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, options);
    
    DOM.fadeElements.forEach(el => observer.observe(el));
}

// ============================================
// ANIMATED COUNTERS
// ============================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (target - start) * easeOut);
        
        // Format number with commas
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target.toLocaleString();
        }
    }
    
    requestAnimationFrame(update);
}

function setupHeroCounters() {
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target, 10);
                if (target && !entry.target.classList.contains('counted')) {
                    entry.target.classList.add('counted');
                    animateCounter(entry.target, target);
                }
            }
        });
    }, options);
    
    DOM.heroStats.forEach(stat => heroObserver.observe(stat));
}

// ============================================
// SCROLLAMA STEP HANDLERS
// ============================================

// Pipeline Section Handler
function handlePipelineStep(response) {
    const { element, index, direction } = response;
    const stepId = element.dataset.step;
    
    // Remove active class from all steps in this section
    document.querySelectorAll('#section-pipelines .step').forEach(step => {
        step.classList.remove('is-active');
    });
    
    // Add active class to current step
    element.classList.add('is-active');
    
    // Trigger map updates
    if (typeof updatePipelineMap === 'function') {
        updatePipelineMap(stepId, direction);
    }
}

// Safety Section Handler
function handleSafetyStep(response) {
    const { element, index, direction } = response;
    const stepId = element.dataset.step;
    
    // Remove active class from all steps
    document.querySelectorAll('#section-safety .step').forEach(step => {
        step.classList.remove('is-active');
    });
    
    element.classList.add('is-active');
    
    // Trigger chart updates
    if (typeof updateSafetyCharts === 'function') {
        updateSafetyCharts(stepId, direction);
    }
    
    // Animate counter when it comes into view
    if (stepId === 'safety-stats') {
        const counter = document.getElementById('counter-incidents');
        if (counter && !counter.classList.contains('counted')) {
            counter.classList.add('counted');
            animateCounter(counter, 9329, 2500);
        }
    }
}

// Storage Section Handler
function handleStorageStep(response) {
    const { element, index, direction } = response;
    const stepId = element.dataset.step;
    
    document.querySelectorAll('#section-storage .step').forEach(step => {
        step.classList.remove('is-active');
    });
    
    element.classList.add('is-active');
    
    if (typeof updateStorageInfographic === 'function') {
        updateStorageInfographic(stepId, direction);
    }
}

// California Section Handler
function handleCaliforniaStep(response) {
    const { element, index, direction } = response;
    const stepId = element.dataset.step;
    
    document.querySelectorAll('#section-california .step').forEach(step => {
        step.classList.remove('is-active');
    });
    
    element.classList.add('is-active');
    
    if (typeof updateCaliforniaMap === 'function') {
        updateCaliforniaMap(stepId, direction);
    }
}

// Offshore Section Handler
function handleOffshoreStep(response) {
    const { element, index, direction } = response;
    const stepId = element.dataset.step;
    
    document.querySelectorAll('#section-offshore .step').forEach(step => {
        step.classList.remove('is-active');
    });
    
    element.classList.add('is-active');
    
    if (typeof updateOffshoreInfographic === 'function') {
        updateOffshoreInfographic(stepId, direction);
    }
}

// ============================================
// SCROLLAMA INITIALIZATION
// ============================================
function initScrollama() {
    // Pipeline section scroller
    scrollerPipelines = scrollama();
    scrollerPipelines
        .setup({
            step: '#section-pipelines .step',
            offset: CONFIG.scrollama.offset,
            progress: false
        })
        .onStepEnter(handlePipelineStep);
    
    // Offshore section scroller
    scrollerOffshore = scrollama();
    scrollerOffshore
        .setup({
            step: '#section-offshore .step',
            offset: CONFIG.scrollama.offset,
            progress: false
        })
        .onStepEnter(handleOffshoreStep);
    
    // Safety section scroller
    scrollerSafety = scrollama();
    scrollerSafety
        .setup({
            step: '#section-safety .step',
            offset: CONFIG.scrollama.offset,
            progress: false
        })
        .onStepEnter(handleSafetyStep);
    
    // Storage section scroller
    scrollerStorage = scrollama();
    scrollerStorage
        .setup({
            step: '#section-storage .step',
            offset: CONFIG.scrollama.offset,
            progress: false
        })
        .onStepEnter(handleStorageStep);
    
    // California section scroller
    scrollerCalifornia = scrollama();
    scrollerCalifornia
        .setup({
            step: '#section-california .step',
            offset: CONFIG.scrollama.offset,
            progress: false
        })
        .onStepEnter(handleCaliforniaStep);
}

// ============================================
// RESIZE HANDLER
// ============================================
function handleResize() {
    // Resize Scrollama instances
    if (scrollerPipelines) scrollerPipelines.resize();
    if (scrollerOffshore) scrollerOffshore.resize();
    if (scrollerSafety) scrollerSafety.resize();
    if (scrollerStorage) scrollerStorage.resize();
    if (scrollerCalifornia) scrollerCalifornia.resize();
    
    // Resize charts if function exists
    if (typeof resizeCharts === 'function') {
        resizeCharts();
    }
    
    // Resize maps if function exists
    if (typeof resizeMaps === 'function') {
        resizeMaps();
    }
}

// ============================================
// MAP CONTROL BUTTONS
// ============================================
function setupMapControls() {
    const controls = document.querySelectorAll('.map-control');
    
    controls.forEach(control => {
        control.addEventListener('click', (e) => {
            const layer = e.target.dataset.layer;
            const container = e.target.closest('.map-container');
            
            // Update active state
            container.querySelectorAll('.map-control').forEach(btn => {
                btn.classList.remove('active');
            });
            e.target.classList.add('active');
            
            // Toggle map layer
            if (typeof toggleMapLayer === 'function') {
                toggleMapLayer(container.id, layer);
            }
        });
    });
}

// ============================================
// KEYBOARD NAVIGATION
// ============================================
function setupKeyboardNav() {
    document.addEventListener('keydown', (e) => {
        // Arrow down or spacebar to scroll to next section
        if (e.key === 'ArrowDown' && e.altKey) {
            e.preventDefault();
            scrollToNextSection();
        }
        // Arrow up to scroll to previous section
        if (e.key === 'ArrowUp' && e.altKey) {
            e.preventDefault();
            scrollToPrevSection();
        }
    });
}

function scrollToNextSection() {
    const sections = Array.from(DOM.sections);
    const scrollTop = window.pageYOffset;
    
    for (let i = 0; i < sections.length; i++) {
        const sectionTop = sections[i].offsetTop;
        if (sectionTop > scrollTop + 100) {
            sections[i].scrollIntoView({ behavior: 'smooth' });
            break;
        }
    }
}

function scrollToPrevSection() {
    const sections = Array.from(DOM.sections);
    const scrollTop = window.pageYOffset;
    
    for (let i = sections.length - 1; i >= 0; i--) {
        const sectionTop = sections[i].offsetTop;
        if (sectionTop < scrollTop - 100) {
            sections[i].scrollIntoView({ behavior: 'smooth' });
            break;
        }
    }
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ============================================
// PRELOADER / INITIALIZATION STATE
// ============================================
function showContent() {
    document.body.classList.add('loaded');
}

// ============================================
// DEBOUNCE UTILITY
// ============================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// ERROR HANDLING
// ============================================
function handleError(error, context) {
    console.error(`Error in ${context}:`, error);
}

// ============================================
// INITIALIZATION
// ============================================
function init() {
    try {
        // Setup progress bar
        window.addEventListener('scroll', debounce(updateProgressBar, 10));
        updateProgressBar();
        
        // Setup fade-in animations
        setupFadeInObserver();
        
        // Setup hero counters
        setupHeroCounters();
        
        // Initialize Scrollama
        initScrollama();
        
        // Setup map controls
        setupMapControls();
        
        // Setup keyboard navigation
        setupKeyboardNav();
        
        // Setup smooth scroll
        setupSmoothScroll();
        
        // Handle resize
        window.addEventListener('resize', debounce(handleResize, 250));
        
        // Initialize charts (from charts.js)
        if (typeof initCharts === 'function') {
            initCharts();
        }
        
        // Initialize maps (from maps.js)
        if (typeof initMaps === 'function') {
            initMaps();
        }
        
        // Show content
        showContent();
        
        console.log('Scrollytelling initialized successfully');
        
    } catch (error) {
        handleError(error, 'initialization');
    }
}

// ============================================
// DOM READY
// ============================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ============================================
// EXPORT FOR OTHER MODULES
// ============================================
window.ScrollyApp = {
    animateCounter,
    debounce,
    CONFIG
};
