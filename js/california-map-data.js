/**
 * California Oil Infrastructure Data
 * 
 * Sources:
 * - CalGEM (California Geologic Energy Management Division)
 * - BSEE (Bureau of Safety and Environmental Enforcement)
 * - EIA (Energy Information Administration)
 * - Company filings and public records
 * 
 * Note: Coordinates are approximate representations for educational purposes.
 * For precise locations, consult official CalGEM and BSEE databases.
 */

const CALIFORNIA_DATA = {
    
    // ================================================================
    // OFFSHORE PLATFORMS
    // Santa Barbara Channel and surrounding OCS areas
    // ================================================================
    platforms: [
        // Santa Barbara Channel - Federal OCS
        {
            id: "platform-heritage",
            name: "Platform Heritage",
            operator: "DCOR LLC (formerly ExxonMobil)",
            type: "offshore-platform",
            lat: 34.3358,
            lng: -119.5192,
            waterDepth: 1075,
            installed: 1989,
            status: "Producing",
            production: {
                oil: 7500,      // barrels per day (approx)
                gas: 12000      // mcf per day (approx)
            },
            wells: 53,
            description: "One of the largest platforms in the Santa Barbara Channel, Platform Heritage produces from the Point Arguello field. Connected to shore via pipeline to Gaviota Processing Facility.",
            source: "BSEE, CalGEM"
        },
        {
            id: "platform-harmony",
            name: "Platform Harmony",
            operator: "DCOR LLC (formerly ExxonMobil)",
            type: "offshore-platform",
            lat: 34.3542,
            lng: -119.5417,
            waterDepth: 1198,
            installed: 1989,
            status: "Producing",
            production: {
                oil: 5200,
                gas: 8500
            },
            wells: 48,
            description: "Platform Harmony and its sister platform Hondo produce from the Harmony-Hondo field. The platform features extended reach drilling technology.",
            source: "BSEE, CalGEM"
        },
        {
            id: "platform-hondo",
            name: "Platform Hondo",
            operator: "DCOR LLC (formerly ExxonMobil)",
            type: "offshore-platform",
            lat: 34.3833,
            lng: -119.6667,
            waterDepth: 842,
            installed: 1976,
            status: "Producing",
            production: {
                oil: 4100,
                gas: 6200
            },
            wells: 28,
            description: "One of the older platforms in the channel, Hondo was originally operated by Union Oil. It processes oil and gas from the Santa Ynez unit.",
            source: "BSEE, CalGEM"
        },
        {
            id: "platform-gail",
            name: "Platform Gail",
            operator: "Venoco (Shutdown 2015)",
            type: "offshore-platform",
            lat: 34.3917,
            lng: -119.8500,
            waterDepth: 739,
            installed: 1987,
            status: "Shut-in (Pipeline Rupture 2015)",
            production: {
                oil: 0,
                gas: 0
            },
            wells: 30,
            description: "Platform Gail was shut in after the 2015 Refugio oil spill ruptured the pipeline that connected it to shore. The platform produced from the Sockeye field.",
            source: "BSEE, CalGEM"
        },
        {
            id: "platform-grace",
            name: "Platform Grace",
            operator: "Venoco (Shutdown 2015)",
            type: "offshore-platform",
            lat: 34.3583,
            lng: -119.7833,
            waterDepth: 318,
            installed: 1979,
            status: "Shut-in (Pipeline Rupture 2015)",
            production: {
                oil: 0,
                gas: 0
            },
            wells: 24,
            description: "Platform Grace produced from the Santa Clara field before being shut in following the 2015 Refugio pipeline rupture.",
            source: "BSEE, CalGEM"
        },
        {
            id: "platform-a",
            name: "Platform A",
            operator: "DCOR LLC",
            type: "offshore-platform",
            lat: 34.3333,
            lng: -119.6167,
            waterDepth: 188,
            installed: 1968,
            status: "Producing",
            production: {
                oil: 1200,
                gas: 2500
            },
            wells: 57,
            description: "Platform A is historically significant as the site of the 1969 Santa Barbara oil spill, which helped launch the modern environmental movement.",
            source: "BSEE, CalGEM"
        },
        {
            id: "platform-b",
            name: "Platform B",
            operator: "DCOR LLC",
            type: "offshore-platform",
            lat: 34.3283,
            lng: -119.6217,
            waterDepth: 190,
            installed: 1968,
            status: "Producing",
            production: {
                oil: 1000,
                gas: 2100
            },
            wells: 42,
            description: "Platform B produces from the Dos Cuadras field alongside Platform A. Originally operated by Union Oil of California.",
            source: "BSEE, CalGEM"
        },
        {
            id: "platform-c",
            name: "Platform C",
            operator: "DCOR LLC",
            type: "offshore-platform",
            lat: 34.3208,
            lng: -119.6283,
            waterDepth: 192,
            installed: 1977,
            status: "Producing",
            production: {
                oil: 850,
                gas: 1800
            },
            wells: 35,
            description: "Platform C was added to the Dos Cuadras development in the late 1970s to access additional reserves in the field.",
            source: "BSEE, CalGEM"
        },
        {
            id: "platform-hillhouse",
            name: "Platform Hillhouse",
            operator: "DCOR LLC",
            type: "offshore-platform",
            lat: 34.3117,
            lng: -119.6417,
            waterDepth: 190,
            installed: 1969,
            status: "Producing",
            production: {
                oil: 750,
                gas: 1400
            },
            wells: 30,
            description: "Platform Hillhouse produces from the Carpinteria field in state waters.",
            source: "BSEE, CalGEM"
        },
        {
            id: "platform-henry",
            name: "Platform Henry",
            operator: "DCOR LLC",
            type: "offshore-platform",
            lat: 34.2967,
            lng: -119.4750,
            waterDepth: 173,
            installed: 1979,
            status: "Producing",
            production: {
                oil: 620,
                gas: 1100
            },
            wells: 25,
            description: "Platform Henry is located in state waters near Summerland and produces from the Summerland Offshore field.",
            source: "BSEE, CalGEM"
        },
        {
            id: "platform-houchin",
            name: "Platform Houchin",
            operator: "Crimson Resource Management",
            type: "offshore-platform",
            lat: 34.3917,
            lng: -119.5333,
            waterDepth: 163,
            installed: 1968,
            status: "Producing",
            production: {
                oil: 480,
                gas: 850
            },
            wells: 22,
            description: "Platform Houchin is a smaller platform producing from the Hondo field in state waters.",
            source: "BSEE, CalGEM"
        },
        {
            id: "platform-irene",
            name: "Platform Irene",
            operator: "Freeport McMoRan",
            type: "offshore-platform",
            lat: 34.5925,
            lng: -120.6508,
            waterDepth: 242,
            installed: 1985,
            status: "Producing",
            production: {
                oil: 3800,
                gas: 5200
            },
            wells: 36,
            description: "Platform Irene produces from the Point Pedernales field and is connected to shore processing facilities near Lompoc.",
            source: "BSEE, CalGEM"
        },
        // Long Beach / Huntington Beach Area
        {
            id: "platform-eureka",
            name: "Platform Eureka",
            operator: "Beta Operating Company",
            type: "offshore-platform",
            lat: 33.7083,
            lng: -118.1250,
            waterDepth: 700,
            installed: 1984,
            status: "Producing",
            production: {
                oil: 5500,
                gas: 7000
            },
            wells: 45,
            description: "Platform Eureka is the largest of three platforms in the Beta field off Huntington Beach. It processes production from all three platforms.",
            source: "BSEE, CalGEM"
        },
        {
            id: "platform-ellen",
            name: "Platform Ellen",
            operator: "Beta Operating Company",
            type: "offshore-platform",
            lat: 33.7250,
            lng: -118.1167,
            waterDepth: 265,
            installed: 1980,
            status: "Producing",
            production: {
                oil: 2100,
                gas: 3200
            },
            wells: 32,
            description: "Platform Ellen produces from the Beta field and is connected to Platform Eureka for processing.",
            source: "BSEE, CalGEM"
        },
        {
            id: "platform-elly",
            name: "Platform Elly",
            operator: "Beta Operating Company",
            type: "offshore-platform",
            lat: 33.7167,
            lng: -118.1208,
            waterDepth: 260,
            installed: 1980,
            status: "Damaged (2021 Pipeline Rupture)",
            production: {
                oil: 0,
                gas: 0
            },
            wells: 28,
            description: "Platform Elly was the site of the October 2021 oil spill when an anchor damaged the pipeline connecting it to shore, releasing approximately 25,000 gallons of oil.",
            source: "BSEE, CalGEM, USCG"
        },
        {
            id: "platform-edith",
            name: "Platform Edith",
            operator: "DCOR LLC",
            type: "offshore-platform",
            lat: 33.5583,
            lng: -117.9333,
            waterDepth: 161,
            installed: 1983,
            status: "Decommissioned",
            production: {
                oil: 0,
                gas: 0
            },
            wells: 0,
            description: "Platform Edith was decommissioned and removed. It previously produced from waters off San Clemente.",
            source: "BSEE, CalGEM"
        },
        {
            id: "platform-emmy",
            name: "Platform Emmy",
            operator: "DCOR LLC",
            type: "offshore-platform",
            lat: 33.5417,
            lng: -117.9167,
            waterDepth: 175,
            installed: 1983,
            status: "Producing",
            production: {
                oil: 1500,
                gas: 2800
            },
            wells: 24,
            description: "Platform Emmy produces from the San Pedro Bay field, one of the southern California offshore production areas.",
            source: "BSEE, CalGEM"
        },
        // THUMS Islands (Artificial Islands in Long Beach)
        {
            id: "island-grissom",
            name: "Island Grissom (THUMS)",
            operator: "California Resources Corporation",
            type: "artificial-island",
            lat: 33.7533,
            lng: -118.1750,
            waterDepth: 0,
            installed: 1965,
            status: "Producing",
            production: {
                oil: 6500,
                gas: 4000
            },
            wells: 180,
            description: "One of four artificial islands created in Long Beach Harbor to disguise oil production facilities. Named after astronaut Gus Grissom. The islands are landscaped with waterfalls and fake buildings.",
            source: "CalGEM, California Resources Corporation"
        },
        {
            id: "island-white",
            name: "Island White (THUMS)",
            operator: "California Resources Corporation",
            type: "artificial-island",
            lat: 33.7483,
            lng: -118.1833,
            waterDepth: 0,
            installed: 1965,
            status: "Producing",
            production: {
                oil: 5800,
                gas: 3500
            },
            wells: 165,
            description: "Named after astronaut Edward H. White II. The THUMS islands produce from the Wilmington oil field, the third largest in the United States.",
            source: "CalGEM, California Resources Corporation"
        },
        {
            id: "island-chaffee",
            name: "Island Chaffee (THUMS)",
            operator: "California Resources Corporation",
            type: "artificial-island",
            lat: 33.7383,
            lng: -118.1917,
            waterDepth: 0,
            installed: 1965,
            status: "Producing",
            production: {
                oil: 5200,
                gas: 3200
            },
            wells: 150,
            description: "Named after astronaut Roger B. Chaffee. The four THUMS islands together produce over 40,000 barrels of oil daily from the massive Wilmington field.",
            source: "CalGEM, California Resources Corporation"
        },
        {
            id: "island-freeman",
            name: "Island Freeman (THUMS)",
            operator: "California Resources Corporation",
            type: "artificial-island",
            lat: 33.7300,
            lng: -118.2000,
            waterDepth: 0,
            installed: 1965,
            status: "Producing",
            production: {
                oil: 4800,
                gas: 2800
            },
            wells: 140,
            description: "Named after astronaut Theodore Freeman. The Wilmington field has produced over 2.7 billion barrels of oil since discovery in 1932.",
            source: "CalGEM, California Resources Corporation"
        },
        // Ventura County offshore
        {
            id: "platform-gina",
            name: "Platform Gina",
            operator: "DCOR LLC",
            type: "offshore-platform",
            lat: 34.2292,
            lng: -119.2850,
            waterDepth: 95,
            installed: 1980,
            status: "Producing",
            production: {
                oil: 620,
                gas: 950
            },
            wells: 18,
            description: "Platform Gina produces from the Carpinteria Offshore field in state waters near Ventura.",
            source: "CalGEM"
        },
        {
            id: "platform-gilda",
            name: "Platform Gilda",
            operator: "DCOR LLC",
            type: "offshore-platform",
            lat: 34.2058,
            lng: -119.2592,
            waterDepth: 205,
            installed: 1981,
            status: "Producing",
            production: {
                oil: 540,
                gas: 780
            },
            wells: 15,
            description: "Platform Gilda is located in state waters and produces from the Pitas Point field.",
            source: "CalGEM"
        },
        {
            id: "platform-habitat",
            name: "Platform Habitat",
            operator: "Chevron",
            type: "offshore-platform",
            lat: 34.2075,
            lng: -119.2417,
            waterDepth: 290,
            installed: 1981,
            status: "Decommissioned",
            production: {
                oil: 0,
                gas: 0
            },
            wells: 0,
            description: "Platform Habitat was decommissioned and is scheduled for removal. It previously produced from the Sockeye reservoir.",
            source: "BSEE"
        }
    ],
    
    // ================================================================
    // MAJOR OIL FIELDS
    // Top producing fields in California
    // ================================================================
    oilFields: [
        {
            id: "field-wilmington",
            name: "Wilmington Oil Field",
            operator: "California Resources Corporation (primary)",
            type: "oil-field",
            lat: 33.7867,
            lng: -118.2275,
            discoveryYear: 1932,
            cumulativeProduction: 2850, // million barrels
            dailyProduction: 43000,     // barrels/day
            reserves: 450,              // million barrels remaining
            wells: 5500,
            area: 13000,                // acres
            description: "The third-largest oil field in the contiguous United States. Located beneath Long Beach and the Port of Los Angeles. Subsidence from extraction caused the ground to sink up to 29 feet, requiring extensive remediation.",
            source: "CalGEM, DOGGR"
        },
        {
            id: "field-midway-sunset",
            name: "Midway-Sunset Oil Field",
            operator: "Chevron, Aera Energy, Berry Petroleum",
            type: "oil-field",
            lat: 35.1500,
            lng: -119.5500,
            discoveryYear: 1894,
            cumulativeProduction: 2600,
            dailyProduction: 48000,
            reserves: 520,
            wells: 11000,
            area: 30000,
            description: "California's largest oil field by area and reserves. Located in Kern County's San Joaquin Valley. Known for heavy crude oil extraction using steam injection (cyclic steam and steamflood).",
            source: "CalGEM, DOGGR"
        },
        {
            id: "field-kern-river",
            name: "Kern River Oil Field",
            operator: "California Resources Corporation (primary)",
            type: "oil-field",
            lat: 35.4167,
            lng: -118.9667,
            discoveryYear: 1899,
            cumulativeProduction: 2100,
            dailyProduction: 42000,
            reserves: 380,
            wells: 9500,
            area: 15000,
            description: "The fifth-largest oil field in the United States. Produces heavy crude requiring thermal recovery methods. Located northeast of Bakersfield.",
            source: "CalGEM, DOGGR"
        },
        {
            id: "field-south-belridge",
            name: "South Belridge Oil Field",
            operator: "Aera Energy (Shell/ExxonMobil JV)",
            type: "oil-field",
            lat: 35.3667,
            lng: -119.6333,
            discoveryYear: 1911,
            cumulativeProduction: 1650,
            dailyProduction: 35000,
            reserves: 340,
            wells: 7200,
            area: 8800,
            description: "One of the largest oil fields in California, located in western Kern County. Uses extensive waterflood and steamflood operations for enhanced recovery.",
            source: "CalGEM, DOGGR"
        },
        {
            id: "field-elk-hills",
            name: "Elk Hills Oil Field",
            operator: "California Resources Corporation",
            type: "oil-field",
            lat: 35.2833,
            lng: -119.4667,
            discoveryYear: 1911,
            cumulativeProduction: 1400,
            dailyProduction: 28000,
            reserves: 280,
            wells: 2400,
            area: 47000,
            description: "Former Naval Petroleum Reserve No. 1. Privatized in 1998 when Congress sold it to Occidental Petroleum for $3.65 billion. Contains light, high-quality crude.",
            source: "CalGEM, DOE"
        },
        {
            id: "field-huntington-beach",
            name: "Huntington Beach Oil Field",
            operator: "California Resources Corporation",
            type: "oil-field",
            lat: 33.6600,
            lng: -117.9983,
            discoveryYear: 1920,
            cumulativeProduction: 1150,
            dailyProduction: 4500,
            reserves: 85,
            wells: 1800,
            area: 4100,
            description: "A historic field that sparked one of California's early oil booms. Extends from onshore Huntington Beach into offshore state waters.",
            source: "CalGEM, DOGGR"
        },
        {
            id: "field-ventura",
            name: "Ventura Oil Field",
            operator: "California Resources Corporation, Aera Energy",
            type: "oil-field",
            lat: 34.2967,
            lng: -119.2767,
            discoveryYear: 1919,
            cumulativeProduction: 950,
            dailyProduction: 6200,
            reserves: 120,
            wells: 2100,
            area: 6500,
            description: "Located in the Ventura Basin, this field extends through the city of Ventura and includes multiple productive zones at different depths.",
            source: "CalGEM, DOGGR"
        },
        {
            id: "field-lost-hills",
            name: "Lost Hills Oil Field",
            operator: "Chevron",
            type: "oil-field",
            lat: 35.5833,
            lng: -119.7167,
            discoveryYear: 1910,
            cumulativeProduction: 780,
            dailyProduction: 22000,
            reserves: 200,
            wells: 3500,
            area: 12000,
            description: "A large diatomite field in Kern County producing heavy oil. Chevron uses extensive steamflood operations for extraction.",
            source: "CalGEM, DOGGR"
        },
        {
            id: "field-long-beach",
            name: "Long Beach Oil Field",
            operator: "California Resources Corporation",
            type: "oil-field",
            lat: 33.7800,
            lng: -118.1750,
            discoveryYear: 1921,
            cumulativeProduction: 620,
            dailyProduction: 3200,
            reserves: 45,
            wells: 1150,
            area: 2800,
            description: "An urban oil field located beneath downtown Long Beach and Signal Hill. The 'Porcupine Hill' drilling era of the 1920s created thousands of wells packed tightly together.",
            source: "CalGEM, DOGGR"
        },
        {
            id: "field-cymric",
            name: "Cymric Oil Field",
            operator: "California Resources Corporation, Berry Petroleum",
            type: "oil-field",
            lat: 35.3000,
            lng: -119.6500,
            discoveryYear: 1909,
            cumulativeProduction: 580,
            dailyProduction: 15000,
            reserves: 160,
            wells: 4800,
            area: 15000,
            description: "A large heavy oil field in western Kern County requiring thermal recovery. Adjacent to the McKittrick field.",
            source: "CalGEM, DOGGR"
        },
        {
            id: "field-coalinga",
            name: "Coalinga Oil Field",
            operator: "Aera Energy, Berry Petroleum",
            type: "oil-field",
            lat: 36.2000,
            lng: -120.3667,
            discoveryYear: 1887,
            cumulativeProduction: 820,
            dailyProduction: 8500,
            reserves: 110,
            wells: 2800,
            area: 10500,
            description: "One of California's oldest major fields, discovered near the town of Coalinga in Fresno County. Produces heavy asphaltic crude.",
            source: "CalGEM, DOGGR"
        },
        {
            id: "field-san-ardo",
            name: "San Ardo Oil Field",
            operator: "Chevron",
            type: "oil-field",
            lat: 36.0167,
            lng: -120.9333,
            discoveryYear: 1947,
            cumulativeProduction: 520,
            dailyProduction: 15000,
            reserves: 90,
            wells: 1200,
            area: 5500,
            description: "Located in Monterey County, San Ardo is the largest field in the Salinas Basin. Produces heavy crude using steam injection.",
            source: "CalGEM, DOGGR"
        },
        {
            id: "field-inglewood",
            name: "Inglewood Oil Field",
            operator: "Sentinel Peak Resources",
            type: "oil-field",
            lat: 33.9667,
            lng: -118.3667,
            discoveryYear: 1924,
            cumulativeProduction: 410,
            dailyProduction: 2500,
            reserves: 35,
            wells: 950,
            area: 1000,
            description: "An urban oil field in the Baldwin Hills area of Los Angeles. Operations here have been controversial due to proximity to residential neighborhoods and a 1963 dam failure.",
            source: "CalGEM, DOGGR"
        },
        {
            id: "field-brea-olinda",
            name: "Brea-Olinda Oil Field",
            operator: "Linn Energy (formerly)",
            type: "oil-field",
            lat: 33.9167,
            lng: -117.8667,
            discoveryYear: 1880,
            cumulativeProduction: 380,
            dailyProduction: 850,
            reserves: 15,
            wells: 620,
            area: 2400,
            description: "One of California's first commercial oil fields, discovered in Orange County. The city of Brea (Spanish for 'tar') was named for the field's surface seeps.",
            source: "CalGEM, DOGGR"
        }
    ],
    
    // ================================================================
    // REFINERIES
    // Major California refineries
    // ================================================================
    refineries: [
        {
            id: "refinery-chevron-richmond",
            name: "Chevron Richmond Refinery",
            operator: "Chevron U.S.A. Inc.",
            type: "refinery",
            lat: 37.9239,
            lng: -122.3961,
            capacity: 245000,   // barrels per day
            built: 1902,
            products: ["Gasoline", "Diesel", "Jet Fuel", "Lubricants"],
            employees: 1200,
            description: "The oldest refinery on the West Coast, established in 1902 as Standard Oil. One of the largest refineries in California, processing crude from various sources including Alaska and California.",
            source: "EIA, Chevron"
        },
        {
            id: "refinery-marathon-la",
            name: "Marathon Los Angeles Refinery",
            operator: "Marathon Petroleum",
            type: "refinery",
            lat: 33.8667,
            lng: -118.2667,
            capacity: 363000,
            built: 1919,
            products: ["Gasoline", "Diesel", "Jet Fuel", "Asphalt"],
            employees: 1000,
            description: "The largest refinery in California, located in Carson. Formed by combining the former Tesoro Carson and ARCO refineries. Supplies approximately 20% of Southern California's gasoline.",
            source: "EIA, Marathon Petroleum"
        },
        {
            id: "refinery-chevron-el-segundo",
            name: "Chevron El Segundo Refinery",
            operator: "Chevron U.S.A. Inc.",
            type: "refinery",
            lat: 33.9103,
            lng: -118.4142,
            capacity: 269000,
            built: 1911,
            products: ["Gasoline", "Diesel", "Jet Fuel"],
            employees: 1100,
            description: "Located on 1,000 acres adjacent to LAX airport. One of the primary suppliers of jet fuel to Los Angeles International Airport and a major gasoline producer.",
            source: "EIA, Chevron"
        },
        {
            id: "refinery-pbf-torrance",
            name: "PBF Energy Torrance Refinery",
            operator: "PBF Energy",
            type: "refinery",
            lat: 33.8553,
            lng: -118.3186,
            capacity: 155000,
            built: 1929,
            products: ["Gasoline", "Diesel", "Chemicals"],
            employees: 750,
            description: "Former ExxonMobil refinery, sold to PBF Energy in 2016 after a 2015 explosion. Produces CARBOB gasoline and CARB diesel for California markets.",
            source: "EIA, PBF Energy"
        },
        {
            id: "refinery-valero-wilmington",
            name: "Valero Wilmington Refinery",
            operator: "Valero Energy",
            type: "refinery",
            lat: 33.7797,
            lng: -118.2553,
            capacity: 85000,
            built: 1969,
            products: ["Gasoline", "Diesel", "Asphalt"],
            employees: 400,
            description: "A smaller refinery focused on producing California-specification fuels. Located in the Port of Los Angeles area.",
            source: "EIA, Valero"
        },
        {
            id: "refinery-valero-benicia",
            name: "Valero Benicia Refinery",
            operator: "Valero Energy",
            type: "refinery",
            lat: 38.0464,
            lng: -122.1464,
            capacity: 145000,
            built: 1968,
            products: ["Gasoline", "Diesel", "Jet Fuel"],
            employees: 500,
            description: "Located in the San Francisco Bay Area, the Benicia refinery processes light sweet crude and has a marine terminal for crude oil imports.",
            source: "EIA, Valero"
        },
        {
            id: "refinery-pbf-martinez",
            name: "PBF Energy Martinez Refinery",
            operator: "PBF Energy",
            type: "refinery",
            lat: 38.0133,
            lng: -122.1228,
            capacity: 157000,
            built: 1913,
            products: ["Gasoline", "Diesel", "Jet Fuel"],
            employees: 650,
            description: "Former Shell refinery, acquired by PBF Energy in 2020. One of the largest Bay Area refineries, with access to crude via pipeline and marine terminal.",
            source: "EIA, PBF Energy"
        },
        {
            id: "refinery-phillips66-rodeo",
            name: "Phillips 66 San Francisco Refinery",
            operator: "Phillips 66",
            type: "refinery",
            lat: 38.0339,
            lng: -122.2556,
            capacity: 120000,
            built: 1896,
            products: ["Renewable Diesel", "Jet Fuel (Converting)"],
            employees: 450,
            description: "Currently converting to the world's largest renewable fuels facility. Will process used cooking oil, fats, and vegetable oils instead of crude oil by 2024.",
            source: "EIA, Phillips 66"
        },
        {
            id: "refinery-kern-bakersfield",
            name: "Kern Oil & Refining",
            operator: "Kern Oil & Refining Co.",
            type: "refinery",
            lat: 35.3525,
            lng: -119.0178,
            capacity: 26000,
            built: 1934,
            products: ["Gasoline", "Diesel", "Asphalt"],
            employees: 120,
            description: "A smaller independent refinery in Bakersfield processing local Kern County crude oil. One of California's few remaining independent refineries.",
            source: "EIA"
        }
    ],
    
    // ================================================================
    // MARINE TERMINALS
    // Import/export facilities
    // ================================================================
    terminals: [
        {
            id: "terminal-long-beach",
            name: "Port of Long Beach - Oil Terminal",
            operator: "Multiple operators",
            type: "marine-terminal",
            lat: 33.7450,
            lng: -118.1700,
            throughput: 250000,  // barrels per day capacity
            description: "Major petroleum import terminal serving Southern California refineries. Handles crude oil imports from various international sources.",
            source: "Port of Long Beach"
        },
        {
            id: "terminal-el-segundo",
            name: "El Segundo Marine Terminal",
            operator: "Chevron",
            type: "marine-terminal",
            lat: 33.9050,
            lng: -118.4300,
            throughput: 150000,
            description: "Single point mooring (SPM) buoy located offshore from the El Segundo refinery. Receives crude oil tankers for pipeline delivery to the refinery.",
            source: "Chevron"
        },
        {
            id: "terminal-richmond",
            name: "Richmond Long Wharf",
            operator: "Chevron",
            type: "marine-terminal",
            lat: 37.9100,
            lng: -122.4000,
            throughput: 180000,
            description: "One of the largest marine terminals on San Francisco Bay. Receives crude oil tankers and exports refined products.",
            source: "Chevron"
        },
        {
            id: "terminal-benicia",
            name: "Benicia Marine Terminal",
            operator: "Valero",
            type: "marine-terminal",
            lat: 38.0550,
            lng: -122.1350,
            throughput: 100000,
            description: "Deep water terminal on the Carquinez Strait receiving crude oil for the Valero Benicia refinery.",
            source: "Valero"
        },
        {
            id: "terminal-rodeo",
            name: "Rodeo Terminal",
            operator: "Phillips 66",
            type: "marine-terminal",
            lat: 38.0400,
            lng: -122.2700,
            throughput: 90000,
            description: "Marine terminal serving the Phillips 66 refinery in Rodeo. Will receive renewable feedstocks as the refinery converts to renewable fuels.",
            source: "Phillips 66"
        },
        {
            id: "terminal-martinez",
            name: "Martinez Terminal",
            operator: "PBF Energy",
            type: "marine-terminal",
            lat: 38.0250,
            lng: -122.1150,
            throughput: 120000,
            description: "Deep water terminal on Carquinez Strait serving the Martinez refinery.",
            source: "PBF Energy"
        },
        {
            id: "terminal-gaviota",
            name: "Gaviota Terminal",
            operator: "Plains All American",
            type: "marine-terminal",
            lat: 34.4650,
            lng: -120.2100,
            throughput: 85000,
            description: "Onshore oil and gas processing facility that receives production from offshore Santa Barbara Channel platforms. Connected via pipeline to Las Flores Canyon processing plant.",
            source: "BSEE, CalGEM"
        }
    ],
    
    // ================================================================
    // MAJOR PIPELINES
    // Key crude oil and product pipelines
    // ================================================================
    pipelines: [
        {
            id: "pipeline-line-63",
            name: "Line 63 (San Joaquin Valley)",
            operator: "Plains All American",
            type: "crude-oil",
            coordinates: [
                [35.3500, -119.5000],
                [35.2500, -119.4000],
                [35.1000, -119.2500],
                [34.9500, -119.0500],
                [34.8000, -118.8000],
                [34.4000, -118.5000],
                [34.0500, -118.3500]
            ],
            capacity: 130000,
            length: 140,
            diameter: 16,
            description: "Major crude oil pipeline carrying San Joaquin Valley production to Los Angeles area refineries. Part of the Plains network serving California markets.",
            source: "Plains All American, PHMSA"
        },
        {
            id: "pipeline-line-2000",
            name: "Line 2000",
            operator: "Chevron",
            type: "crude-oil",
            coordinates: [
                [35.1500, -119.5500],
                [35.0000, -119.3000],
                [34.8000, -119.0000],
                [34.5000, -118.6000],
                [34.2000, -118.4500],
                [33.9100, -118.4100]
            ],
            capacity: 100000,
            length: 130,
            diameter: 14,
            description: "Chevron-owned pipeline connecting Kern County production to the El Segundo refinery on the coast.",
            source: "Chevron, PHMSA"
        },
        {
            id: "pipeline-all-american",
            name: "All American Pipeline",
            operator: "Plains All American",
            type: "crude-oil",
            coordinates: [
                [34.4667, -120.2000],
                [34.6000, -120.0000],
                [35.0000, -119.5000],
                [35.3500, -119.5000]
            ],
            capacity: 300000,
            length: 130,
            diameter: 30,
            description: "Originally built to carry Alaskan crude from the Santa Barbara Channel to Kern County. Now carries California OCS production and can be reversed for export.",
            source: "Plains All American"
        },
        {
            id: "pipeline-santa-barbara-channel",
            name: "Santa Barbara Channel Pipeline System",
            operator: "Multiple operators",
            type: "crude-oil",
            coordinates: [
                [34.4700, -119.8500],
                [34.4000, -119.7000],
                [34.3500, -119.5500],
                [34.3200, -119.4000],
                [34.4650, -120.2000]
            ],
            capacity: 100000,
            length: 50,
            diameter: 20,
            description: "Network of pipelines connecting offshore platforms in the Santa Barbara Channel to onshore processing facilities at Gaviota. Includes lines from Platforms Heritage, Harmony, and Hondo.",
            source: "BSEE"
        },
        {
            id: "pipeline-beta-orange-county",
            name: "Beta Unit Pipeline",
            operator: "Beta Operating Company / Amplify Energy",
            type: "crude-oil",
            coordinates: [
                [33.7100, -118.1200],
                [33.6800, -118.0300],
                [33.6600, -117.9983]
            ],
            capacity: 40000,
            length: 18,
            diameter: 16,
            description: "Pipeline connecting the offshore Beta platforms (Eureka, Ellen, Elly) to the shore at Huntington Beach. The section damaged by a ship anchor in October 2021, causing a major oil spill.",
            source: "BSEE, USCG"
        },
        {
            id: "pipeline-sfpp-west",
            name: "SFPP West Line",
            operator: "Kinder Morgan",
            type: "products",
            coordinates: [
                [33.9100, -118.4100],
                [33.9500, -118.3500],
                [34.0000, -118.2500],
                [34.1500, -118.1500],
                [34.4000, -117.9000],
                [34.8000, -117.0000],
                [35.2000, -116.5000],
                [35.5500, -115.5000],
                [36.1700, -115.1400]
            ],
            capacity: 85000,
            length: 310,
            diameter: 14,
            description: "Major refined products pipeline carrying gasoline, diesel, and jet fuel from Los Angeles area refineries to Las Vegas and Arizona markets.",
            source: "Kinder Morgan, PHMSA"
        },
        {
            id: "pipeline-calnev",
            name: "CalNev Pipeline",
            operator: "Kinder Morgan",
            type: "products",
            coordinates: [
                [33.8600, -118.2700],
                [34.1000, -117.9000],
                [34.5500, -117.2000],
                [35.0000, -116.3000],
                [35.5000, -115.6000],
                [36.1700, -115.1400]
            ],
            capacity: 120000,
            length: 248,
            diameter: 16,
            description: "Key pipeline supplying Nevada and Arizona with petroleum products from Southern California refineries. Runs through the Mojave Desert.",
            source: "Kinder Morgan, PHMSA"
        },
        {
            id: "pipeline-bay-area-products",
            name: "SFPP Bay Area System",
            operator: "Kinder Morgan",
            type: "products",
            coordinates: [
                [38.0350, -122.2500],
                [37.9500, -122.3500],
                [37.8000, -122.3000],
                [37.6500, -122.1500],
                [37.4500, -122.0500],
                [37.3500, -121.9000]
            ],
            capacity: 70000,
            length: 60,
            diameter: 10,
            description: "Network of pipelines distributing refined products from Bay Area refineries to terminals throughout the region.",
            source: "Kinder Morgan"
        },
        {
            id: "pipeline-kern-county-gathering",
            name: "Kern County Gathering System",
            operator: "Multiple operators",
            type: "crude-oil",
            coordinates: [
                [35.1500, -119.5500],
                [35.2500, -119.6000],
                [35.3500, -119.5000],
                [35.4000, -119.2000],
                [35.4167, -118.9667]
            ],
            capacity: 200000,
            length: 75,
            diameter: "Various",
            description: "Network of gathering pipelines in the San Joaquin Valley connecting production from major fields like Midway-Sunset, South Belridge, and Kern River to trunk lines.",
            source: "CalGEM"
        }
    ],
    
    // ================================================================
    // GEOLOGICAL BASINS
    // Major oil-producing regions
    // ================================================================
    basins: [
        {
            id: "basin-san-joaquin",
            name: "San Joaquin Basin",
            type: "geological-basin",
            center: [35.5000, -119.5000],
            bounds: [
                [36.5000, -120.5000],
                [36.5000, -118.5000],
                [34.5000, -118.5000],
                [34.5000, -120.5000]
            ],
            area: 15000, // square miles
            oilInPlace: 35000, // million barrels estimated
            production: 75,    // percent of California production
            description: "California's primary oil-producing basin, containing the Midway-Sunset, Kern River, South Belridge, Elk Hills, and Lost Hills fields. Produces approximately 75% of California's oil.",
            source: "USGS, CalGEM"
        },
        {
            id: "basin-los-angeles",
            name: "Los Angeles Basin",
            type: "geological-basin",
            center: [33.9000, -118.1500],
            bounds: [
                [34.2000, -118.6000],
                [34.2000, -117.7000],
                [33.6000, -117.7000],
                [33.6000, -118.6000]
            ],
            area: 1300,
            oilInPlace: 12000,
            production: 15,
            description: "Heavily urbanized basin containing the Wilmington, Long Beach, Huntington Beach, Inglewood, and Brea-Olinda fields. One of the most densely drilled oil regions in the world.",
            source: "USGS, CalGEM"
        },
        {
            id: "basin-ventura",
            name: "Ventura Basin",
            type: "geological-basin",
            center: [34.3000, -119.2000],
            bounds: [
                [34.6000, -119.9000],
                [34.6000, -118.7000],
                [34.0000, -118.7000],
                [34.0000, -119.9000]
            ],
            area: 2100,
            oilInPlace: 5000,
            production: 6,
            description: "Basin extending from Santa Barbara to Ventura counties. Contains the Ventura and Ojai fields onshore and connects to Santa Barbara Channel offshore production.",
            source: "USGS, CalGEM"
        },
        {
            id: "basin-santa-maria",
            name: "Santa Maria Basin",
            type: "geological-basin",
            center: [34.8500, -120.4500],
            bounds: [
                [35.2000, -120.8000],
                [35.2000, -120.1000],
                [34.5000, -120.1000],
                [34.5000, -120.8000]
            ],
            area: 1800,
            oilInPlace: 2500,
            production: 2,
            description: "Coastal basin containing the Santa Maria Valley and Cat Canyon fields. Connected to offshore production from platforms in the Santa Barbara Channel.",
            source: "USGS, CalGEM"
        },
        {
            id: "basin-salinas",
            name: "Salinas Basin",
            type: "geological-basin",
            center: [36.2000, -121.0000],
            bounds: [
                [36.8000, -121.5000],
                [36.8000, -120.6000],
                [35.6000, -120.6000],
                [35.6000, -121.5000]
            ],
            area: 1200,
            oilInPlace: 1500,
            production: 2,
            description: "Basin in Monterey County containing the San Ardo field, California's largest field outside the San Joaquin and Los Angeles basins.",
            source: "USGS, CalGEM"
        }
    ]
};

// Make data available globally
window.CALIFORNIA_DATA = CALIFORNIA_DATA;
