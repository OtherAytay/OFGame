/* Data Structures */
var cities = new Map();
var cityGraph = new Map(); // Adjacency List representation
var items = new Map()

/* User Data */
var userCities = {};
var userItems = {}
var userDataFlag = true;
// Short-term followers for the last 4 posts - General, Oral, Anal, Sissy, Bondage
var stFollowersRolling = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
// Long-term followers on a 4 week cycle, followers pay monthly.
var ltFollowersRolling = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]
var money = 0;
var playerName = "";
var activeTitle = "";
var currentCity = "Paris";
var currentRolls = [0, 0, 0, 0]; // Oral, Anal, Sissy, Bondage rolls
var currentMoneyShots = [0, 0];
var travelCosts = [];
var activeItems = [];
var activeAug = null // 2: Sissy, 3: Bondage - corresponds to currentRolls idx
var activeMoneyShot = false;
var augRemaining = 0; // for multi-post contracts
var activeEvent = "";
var eventChance = 0; // raises by 0.1 every post that does not trigger an event. Resets to 0.1 after every event.
var eventRemaining = 0;

/* Progression variables */
const initUpgrades = { 'Interactive Media': 0, 'Community Management': 0, 'Professional Marketing': 0, 'Premium Content': 0, 'Contract Negotiation': 0, 'High-Value Contractors': 0, 'Artisanal Retailers': 0 };
const initUpgradeLimits = { 'Interactive Media': 10, 'Community Management': 10, 'Professional Marketing': 10, 'Premium Content': 10, 'Contract Negotiation': 3, 'High-Value Contractors': 3, 'Artisanal Retailers': 5  };
var upgrades = initUpgrades;
var upgradeLimits = initUpgradeLimits;
var earnedMS = [];
var earnedTitles = [];
var ltRatio = 0.5;
var luck = 0.5; // on scale from 0 to 1.
var saturationCap = 1000;
var minRoll = 1;
var eventsUnlocked = false;
var marketsUnlocked = true; // default to true, can make FoP that makes thems start disabled
var upgradesUnlocked = false;
var itemsUnlocked = false; 

/* Constants */
//const version = 1.0;
const contractTypes = ["Oral", "Anal", "Sissy", "Bondage"]
const C_prem = 35; // large dotted line cost
const C_std = 20; // small dotted line cost
const citySpecBonus = 0.25; // 25% yield increase
const citySpecPenalty = 0.25; // 25% yield decrease
const initUserItems = {"Large Plug": false, "Large Dildo": false, "Dildo Gag": false, "Nipple Clamps": false, "Hand Cuffs": false, "Dress": false, "Wig": false, "Ring Gag": false, "Vibrating Plug": false, "Fantasy Dildo": false, "Tunnel Plug": false, "Nose Hook": false, "Ankle Cuffs": false, "High Heels": false, "Lingerie Set": false, "Squirting Dildo": false, "Anal Hook": false, "Tail Plug": false, "Face Harness": false, "Corset": false, "Chastity": false}
const initUserCity = { posts: 0, fusionAvailable: false, rerollOral: 1 + upgrades['Contract Negotiation'], rerollAnal: 1 + upgrades['Contract Negotiation'], rerollSissy: 1 + upgrades['Contract Negotiation'], rerollBondage: 1 + upgrades['Contract Negotiation']};


/* Mode-variable Constants */
var marketTax = 100; // Tax paid to transfer regional markets
var homeMarket = "";
var contractDurationMult = 1;
var moneyYieldMult = 1;
var partnerChanceMult = 1;
var partnerDurationMult = 1;
var fopSelected = [];

/* Player Stats */
var playerStats = {
    milestonePoints: 0,
    contracts: [0, 0, 0, 0, 0, 0],
    posts: 0,
    // augmentedPosts: (sissy + bondage);
    // unAugmentedPosts: (oral + anal) - (sissy + bondage);    
    visited: 0,
    rollSum: 0,

    //followers
    lifetimeFollowers: [0, 0, 0, 0, 0, 0],
    maxFollowers: [0, 0, 0, 0, 0, 0],
    maxYieldModifier: 0,
    maxAtomicFollowerGain: 0, // most amount of followers gained in a single post
    eventFollowerGain: 0,
    eventFollowerLoss: 0,
    // netEventfollowers: eventFollowerGain - eventFollowerLoss;

    // money
    lifetimeMoney: 0,
    maxMoney: 0,
    maxAtomicMoneyGain: 0, // most amount of money gained in a single post
    eventMoneyGain: 0,
    eventMoneyLoss: 0,
    spentOnUpgrades: 0,
    spentOnItems: 0,
    spentOnTravel: 0
    //netEventMoney: eventMoneyGain - eventMoneyLoss
};

function initializeGame() {
    loadLocal();

    // System data
    if (cities.size == 0) {
        generateCities();
        generateConnections();
    }
    if (items.size == 0) {
        generateItems();
    }
    if (itemsUnlocked) {
        document.querySelector('[for="tab3"]').hidden = false;
    }

    // User Data
    if (!userDataFlag) {
        newSave();
    } else {
        // Render UI
        generateMapNodes();
        generateCityPanel();
        generateContractPanel();
        generateStorePanel();
    }
}

function newSave() {
    const saveModal = new bootstrap.Modal("#newSave");
    saveModal.show()
    fileUpload();


    const popoverTriggerList = document.querySelectorAll('#origin-story [data-bs-toggle="popover"]');
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl, {
        container: '#origin-story',
        trigger: "hover click"
    }));
}

function startNewSave() {
    // Name choice
    var nameBlock = true;
    playerName = document.getElementById("name").value;
    if (playerName != "") {
        nameBlock = false;
    }

    // City choice
    var cityBlock = true; // Block submission until all required values are filled
    var cityChoices = document.getElementsByName("city-select")
    for (const radio of cityChoices.values()) {
        if (radio.checked) {
            var cityChoice = radio.value;
            cityBlock = false;
            break;
        }
    }
    currentCity = cityChoice;
    homeMarket = cities.get(cityChoice).market;

    // Upbringing
    var luckBlock = true;
    var luckChoices = document.getElementsByName("luck-radio");
    for (const radio of luckChoices.values()) {
        if (radio.checked) {
            var luckChoice = radio.value;
            luckBlock = false;
            break;
        }
    }

    switch (luckChoice) {
        case "Unfortunate": luck = 0; break;
        case "Unlucky": luck = 0.25; break;
        case "Normal": luck = 0.5; break;
        case "Lucky": luck = 0.75; break;
        case "Fortunate": luck = 1; break;
    }

    var wealthBlock = true;
    var wealthChoices = document.getElementsByName("wealth-radio");
    for (const radio of wealthChoices.values()) {
        if (radio.checked) {
            var wealthChoice = radio.value;
            wealthBlock = false;
            break;
        }
    }
    money = JSON.parse(wealthChoice);

    // Forces at Play
    var fopChoices = document.getElementsByName("fop-select")
    for (const check of fopChoices.values()) {
        if (check.checked) {
            fopSelected.push(check.value)
        }
    }

    fopSelected.includes("Due Diligence") ? contractDurationMult = 2 : null;
    fopSelected.includes("Economic Recession") ? moneyYieldMult = 0.5 : null;
    fopSelected.includes("Market Homogeneity") ? marketsUnlocked = false : null;
    fopSelected.includes("Intermarket Tariffs") ? marketTax = 300 : null;
    fopSelected.includes("Attention Deficit") ? ltRatio = 0.25 : null;
    fopSelected.includes("Extensive Competition") ? partnerChanceMult = 0.5 : null;
    fopSelected.includes("Strong Relations") ? partnerDurationMult = 2 : null;

    // If all required options are selected, dismiss modal and start game.
    if (!(nameBlock || cityBlock || luckBlock || wealthBlock)) {
        bootstrap.Modal.getInstance(document.getElementById("newSave")).hide()

        // Initialize game state
        newCity();

        // Render UI
        generateMapNodes();
        generateCityPanel();
        generateContractPanel();
        generateStorePanel();

        saveLocal();
    }
}

function newCity() {
    playerStats["visited"]++;
    currentRolls = [
        randRange(minRoll, 10, true),
        randRange(minRoll, 10, true),
        randRange(minRoll, 10, true),
        randRange(minRoll, 10, true)
    ];

    currentMoneyShots = [
        randRange(1, 4, true),
        randRange(1, 3, true)
    ];

    travelCosts = [];
    var connections = cityGraph.get(currentCity);
    for (var i = 0; i < connections.length; i++) {
        travelCosts.push({ dest: connections[i].destCity, cost: Math.floor(travelCost(currentCity, connections[i].destCity)) });
    }

    localStorage["OFGame-currentRolls"] = JSON.stringify(currentRolls);
    localStorage["OFGame-travelCosts"] = JSON.stringify(travelCosts);
    localStorage["OFGame-playerStats"] = JSON.stringify(playerStats);
}

function showEvent({ pos, severity, eventNum }) {
    ReactDOM.render(eventModal({ pos: pos, severity: severity, eventNum: eventNum }), document.getElementById("event"));
    const myModal = new bootstrap.Modal("#event");
    myModal.show()
}

function processEvent({ pos, severity, eventNum }) {
    // player stat tracking variables
    const moneyBefore = money;
    const followersBefore = getTotalFollowers().reduce((a,b) => (a + b));

    if (pos) {
        switch (severity) {
            case "Minor":
                switch (eventNum) {
                    case 0:
                        eventRemaining = 1;
                        activeEvent = "Great Worksmanship";
                        break;
                    case 1:
                        eventRemaining = 1;
                        activeEvent = "Paid in Exposure";
                        break;
                    case 2: money += 100; break;
                } break;
            case "Moderate":
                switch (eventNum) {
                    case 0: 
                        eventRemaining = 2;
                        activeEvent = "OnlyFans Craze"; 
                        break;
                    case 1: money += 10 * getTotalFollowers()[3]; break;
                    case 2: money += 10 * getTotalFollowers()[4]; break;
                } break;
            case "Major":
                switch (eventNum) {
                    case 0: stFollowersRolling = stFollowersRolling.map((p) => p.map((c) => Math.floor(c * 2))); break;
                    case 1: money += Math.max(money * .25, 1000); break;
                    case 2: ltFollowersRolling = ltFollowersRolling.map((p) => p.map((c) => Math.floor(c * 1.5))); break;
                } break;
        }
    } else {
        switch (severity) {
            case "Minor":
                switch (eventNum) {
                    case 0:
                        eventRemaining = 1;
                        activeEvent = "Poor Worksmanship";
                        break;
                    case 1:
                        stFollowersRolling = stFollowersRolling.map((p) => p.map((c) => Math.floor(c * 0.9)));
                        ltFollowersRolling = ltFollowersRolling.map((p) => p.map((c) => Math.floor(c * 0.9)));
                        break;
                    case 2: money = Math.max(0, money - 100); break;
                } break;
            case "Moderate":
                switch (eventNum) {
                    case 0:
                        eventRemaining = 3;
                        activeEvent = "Economic Downturn";
                        break;
                    case 1: break;
                    case 2:
                        eventRemaining = 1;
                        activeEvent = "Followed Home";
                        break;
                } break;
            case "Major":
                switch (eventNum) {
                    case 0: stFollowersRolling = stFollowersRolling.map((p) => p.map((c) => 0)); break;
                    case 1: money = Math.max(0, money - Math.max(money * .5, 1000)); break;
                    case 2: ltFollowersRolling = ltFollowersRolling.map((p) => p.map((c) => Math.floor(c * 0.5))); break;
                } break;
        }
    }

    // Calculate player stats
    if (moneyBefore < money) {
        playerStats['eventMoneyGain'] += money - moneyBefore; 
    } else if (moneyBefore > money) {
        playerStats['eventMoneyLoss'] += moneyBefore - money; 
    } else {}

    const followersAfter = getTotalFollowers().reduce((a,b) => (a + b));
    if (followersBefore < followersAfter) {
        playerStats['eventFollowerGain'] += followersAfter - followersBefore;
    } else if (followersBefore > followersAfter) {
        playerStats['eventFollowerLoss'] += followersBefore - followersAfter;
    } else {}
    localStorage["OFGame-playerStats"] = JSON.stringify(playerStats);

    // Shift luck depending on event
    var luckDiff = 0
    switch (severity) {
        case "Minor": luckDiff = 0.05; break;
        case "Moderate": luckDiff = 0.1; break;
        case "Major": luckDiff = 0.15; break;
    }
    if (pos) {
        luckDiff *= -1;
    }
    luck = JSON.parse(Math.min(1, Math.max(0, luck + luckDiff)).toFixed(2));
    eventChance = 0.1;

    bootstrap.Modal.getInstance(document.getElementById("event")).hide()

    generateCityPanel();
    generateContractPanel();
    generateStorePanel();
    saveLocal();
}

function travel(destCity) {
    cost = travelCosts.find(c => c.dest == destCity).cost
    if (money > cost) {
        money -= cost;
        playerStats['spentOnTravel'] += cost;
        currentCity = destCity;
        newCity();

        localStorage["OFGame-money"] = money;
        localStorage["OFGame-currentCity"] = currentCity;
        localStorage["OFGame-playerStats"] = JSON.stringify(playerStats);
        generateCityPanel();
        generateContractPanel();
        generateStorePanel();
        generateMapNodes();
    }
}

function travelCost(source, dest) {
    c1 = cities.get(source);
    c2 = cities.get(dest);
    d = dist(c1.x, 0.665 * c1.y, c2.x, 0.665 * c2.y);
    if (cityGraph.get(source).find(con => con.destCity == dest).type == "Standard") {
        var c = C_std;
    } else {
        var c = C_prem;
    }

    tax = 0
    if (cities.get(source).market != cities.get(dest).market) {
        tax = marketTax;
    }

    // 90% distance-based rate + 0-20% random percentage of distance-based rate + flat tax
    return 0.9 * c * d + 0.2 * c * d * Math.random() + tax;
}

function upgradeCost(upgradeType) {
    switch (upgradeType) {
        case "Interactive Media":
        case "Community Management":
        case "Professional Marketing":
        case "Premium Content":
            switch (upgrades[upgradeType]) {
                case 0: return 250;
                case 1: return 500;
                case 2: return 1000;
                case 3: return 2000;
                case 4: return 3000;
                case 5: return 5000;
                case 6: return 6000;
                case 7: return 7000;
                case 8: return 8000;
                case 9: return 10000;
            }
        case "Contract Negotiation":
        case "High-Value Contractors":
            switch (upgrades[upgradeType]) {
                case 0: return 1000;
                case 1: return 5000;
                case 2: return 10000;
            }
        case "Artisanal Retailers":
            switch (upgrades[upgradeType]) {
                case 0: return 500;
                case 1: return 1000;
                case 2: return 2500;
                case 3: return 5000;
                case 4: return 10000;
            }
    }
}

function itemCost(item) {
    switch (items.get(item).tier) {
        case 1: return 1000;
        case 2: return 2000;
        case 3: return 3000;
        case 4: return 5000;
    }
}

function getYieldMods(city) {
    var yieldMods = [1, 1, 1, 1];

    // Home Market Boon
    if (homeMarket == "Anglo") {
        yieldMods[0] += 0.1
    } else if (homeMarket == "Germanic") {
        yieldMods[1] += 0.1
    } else if (homeMarket == "French") {
        yieldMods[0] += 0.05;
        yieldMods[1] += 0.05;
    } else if (homeMarket == "Iberian") {
        yieldMods[2] += 0.1;
    } else if (homeMarket == "Greco-Roman") {
        yieldMods[3] += 0.1;
    } else {
        yieldMods[2] += 0.05;
        yieldMods[3] += 0.05;
    }

    // City Specialization
    if (city.special.includes("Oral")) {
        city.market != "Northern" ? yieldMods[0] += 0.25 : null;
    } else {
        yieldMods[0] -= 0.25;
    }

    if (city.special.includes("Anal")) {
        city.market != "Northern" ? yieldMods[1] += 0.25 : null;
    } else {
        yieldMods[1] -= 0.25;
    }

    if (city.special.includes("Sissy")) {
        city.market != "Northern" ? yieldMods[2] += 0.25 : null;
    } else {
        yieldMods[2] -= 0.25;
    }

    if (city.special.includes("Bondage")) {
        city.market != "Northern" ? yieldMods[3] += 0.25 : null;
    } else {
        yieldMods[3] -= 0.25;
    }

    // Regional Market Characteristics
    if (marketsUnlocked) {
        yieldMods[0] += getRegionalMarketModifier(city.market, "Oral", activeAug != null);
        yieldMods[1] += getRegionalMarketModifier(city.market, "Anal", activeAug != null);
        yieldMods[2] += getRegionalMarketModifier(city.market, "Sissy", true);
        yieldMods[3] += getRegionalMarketModifier(city.market, "Bondage", true);
    }

    // Item Perks
    if (itemsUnlocked) {
        for (const item of activeItems) {
            var mod = getItemYieldMod(item)
            for (const cat of items.get(item).categories) {
                yieldMods[contractTypes.indexOf(cat)] += mod
            }
        }
    }

    return yieldMods;
}

function calculateDiminishedYieldMod(city, cat, roll) {
    // calculate base yield
    var baseYield = (10 + 2 * roll)
    var yield = baseYield * getDiminishingReturnModifier(userCities[city].posts);

    // apply yield modifiers
    var yieldMods = getYieldMods(cities.get(city));
    if (cat == "Oral") {
        yield *= yieldMods[0];
    } else if (cat == "Anal") {
        yield *= yieldMods[1];
    } else if (cat == "Sissy") {
        yield *= yieldMods[2];
    } else {
        yield *= yieldMods[3];
    }

    // apply event modifiers
    switch (activeEvent) {
        case "Great Worksmanship":
            yield *= 2;
            break;
        case "Paid in Exposure":
            yield *= 3;
            break;
        case "Poor Worksmanship":
            yield *= 0.5;
            break;
        case "Followed Home":
            yield *= 0;
    }

    // apply yield decay
    decay = (30 - 5.6) * Math.max(0, (1 - getSaturationFactor())) + 5.6;
    yield = (Math.max(0, Math.min(yield, decay * Math.log10(yield))));

    // return the ratio of the final yield over the base yield. Will be 1 if no diminishment is enacted.
    return (yield / baseYield);
}

function calculateStandardFollowerYield(city, cat, roll) {
    var followerYields = [0, 0, 0, 0, 0]; // General, Oral, Anal, Sissy, Bondage

    // calculate base yield
    var yield = (10 + 2 * roll) * getDiminishingReturnModifier(userCities[city].posts);

    // apply yield modifiers
    var yieldMods = getYieldMods(cities.get(city));
    if (cat == "Oral") {
        yield *= yieldMods[0];
    } else if (cat == "Anal") {
        yield *= yieldMods[1];
    } else if (cat == "Sissy") {
        yield *= yieldMods[2];
    } else {
        yield *= yieldMods[3];
    }

    // apply yield decay
    decay = (30 - 5.6) * Math.max(0, (1 - getSaturationFactor())) + 5.6;
    yield = Math.floor(Math.max(0, Math.min(yield, decay * Math.log10(yield))));

    // distribute yields
    followerYields[0] = Math.floor(yield / 2);
    if (cat == "Oral") {
        followerYields[1] = Math.ceil(yield / 2);
    } else if (cat == "Anal") {
        followerYields[2] = Math.ceil(yield / 2);
    } else if (cat == "Sissy") {
        followerYields[3] = Math.ceil(yield / 2);
    } else {
        followerYields[4] = Math.ceil(yield / 2);
    }

    return followerYields;
}


function completeStandardPost(perfCat, perfRoll) {
    // Follower Yield & Decay
    var perfYields = calculateStandardFollowerYield(currentCity, perfCat, perfRoll);
    playerStats["rollSum"] += perfRoll;
    var augYields = [0, 0, 0, 0, 0]
    if (activeAug != null) {
        var augCat = contractTypes[activeAug];
        var augRoll = currentRolls[activeAug];
        playerStats["rollSum"] += augRoll;
        augYields = calculateStandardFollowerYield(currentCity, augCat, augRoll);
    } 
    
    switch (activeEvent) {
        case "Great Worksmanship":
            perfYields = perfYields.map((c) => c * 2);
            augYields = augYields.map((c) => c * 2);
            break;
        case "Paid in Exposure":
            perfYields = perfYields.map((c) => c * 3);
            augYields = augYields.map((c) => c * 3);
            break;
        case "Poor Worksmanship":
            perfYields = perfYields.map((c) => c * 0.5);
            augYields = augYields.map((c) => c * 0.5);
            break;
        case "Followed Home":
            perfYields = perfYields.map((c) => c * 0);
            augYields = augYields.map((c) => c * 0);
    }
    
    // track follower gains
    const atomicFollowerGain = perfYields.reduce((a, b) => a + b) + augYields.reduce((a, b) => (a + b));
    if (atomicFollowerGain > playerStats['maxAtomicFollowerGain']) {
        playerStats['maxAtomicFollowerGain'] = Math.ceil(atomicFollowerGain);
    }
    const yieldMods = getYieldMods(cities.get(currentCity));
    if (yieldMods[contractTypes.indexOf(perfCat)] > playerStats["maxYieldModifier"]) {
        playerStats["maxYieldModifier"] = yieldMods[contractTypes.indexOf(perfCat)];
    }
    if (activeAug != null && yieldMods[contractTypes.indexOf(augCat)] > playerStats["maxYieldModifier"]) {
        playerStats["maxYieldModifier"] = yieldMods[contractTypes.indexOf(augCat)];
    }

    const followersBefore = getTotalFollowers();
    for (var i = 0; i < perfYields.length; i++) {
        catYield = perfYields[i] + augYields[i];
        playerStats['lifetimeFollowers'][i] += perfYields[i] + augYields[i]; // category
        playerStats['lifetimeFollowers'][5] += perfYields[i] + augYields[i]; // total
        if (catYield + followersBefore[i] > playerStats['maxFollowers'][i]) {
            playerStats['maxFollowers'][i] = catYield + followersBefore[i];
        }
    }
    const followersAfter = getTotalFollowers();
    if (followersAfter.reduce((a, b) => a + b) > playerStats["maxFollowers"][5]) {
        playerStats["maxFollowers"][5] = followersAfter.reduce((a, b) => a + b);
    }
    
    // Split ST and LT
    var stFollowers = [0, 0, 0, 0, 0];
    var ltFollowers = [0, 0, 0, 0, 0];
    for (var i = 0; i < ltFollowers.length; i++) {
        catYield = perfYields[i] + augYields[i];
        stFollowers[i] += Math.floor(catYield * (1 - ltRatio));
        ltFollowers[i] += Math.ceil(catYield * ltRatio);
    }

    // Money Yield
    const moneyBefore = money;
    stCycle(stFollowers, [perfCat, augCat]);
    ltCycle(ltFollowers, [perfCat, augCat]);
    if (activeMoneyShot) {
        console.log("Cumshot Money: $" + 0.5 * moneyYieldMult * (perfYields.reduce((a, b) => a + b) + augYields.reduce((a,b) => a + b)))
        money += 0.5 * moneyYieldMult * (perfYields.reduce((a, b) => a + b) + augYields.reduce((a,b) => a + b));
    }
    const moneyAfter = money;
    playerStats["lifetimeMoney"] += moneyAfter - moneyBefore;



    if (moneyAfter > playerStats["maxMoney"]) {
        playerStats["maxMoney"] = moneyAfter;
    }
    if (moneyAfter - moneyBefore > playerStats["maxAtomicMoneyGain"]) {
        playerStats["maxAtomicMoneyGain"] = moneyAfter - moneyBefore;
    }

    // Update Event Status
    if (eventsUnlocked) {
        if (activeEvent != "") {
            if (--eventRemaining == 0) {
                activeEvent = "";
                eventChance = 0;
            }
        } else {
            if (Math.random() < eventChance) {
                var newEvent = rollEvent();
            } else {
                eventChance += 0.1;
            }
        }
    }
    

    // Detect multi-post contract
    if (augRemaining == 0) {
        if (augCat == "Sissy" && cities.get(currentCity).market == "Iberian") {
            augRemaining = 2 * contractDurationMult;
        } else if (augCat == "Bondage" && cities.get(currentCity).market == "Greco-Roman") {
            augRemaining = 2 * contractDurationMult;
        } else { // no multi-post contract, reroll
            protectedReroll(augCat);
        }
    }
    augRemaining--;


    userCities[currentCity]["posts"] += 1;
    playerStats["posts"]++;
    playerStats["contracts"][contractTypes.indexOf(perfCat)]++;
    playerStats["contracts"][4]++;
    if (activeAug != null) {
        playerStats["contracts"][activeAug]++;
        playerStats["contracts"][4]++;
    }

    protectedReroll(perfCat);
    if (activeMoneyShot) {
        if (perfCat == "Oral") {
            currentMoneyShots[0] = randRange(1, 4, true)
        } else {
            currentMoneyShots[1] = randRange(1, 3, true)
        }
    }
    toggleAug(contractTypes[activeAug]);
    earnMilestones();

    localStorage["OFGame-userCities"] = JSON.stringify(userCities);
    localStorage["OFGame-stFollowersRolling"] = JSON.stringify(stFollowersRolling);
    localStorage["OFGame-ltFollowersRolling"] = JSON.stringify(ltFollowersRolling);
    localStorage["OFGame-money"] = money;
    localStorage["OFGame-currentRolls"] = JSON.stringify(currentRolls);
    localStorage["OFGame-activeAug"] = activeAug;
    localStorage["OFGame-eventRemaining"] = eventRemaining;
    localStorage["OFGame-activeEvent"] = activeEvent;
    localStorage["OFGame-eventChance"] = eventChance;
    localStorage["OFGame-playerStats"] = JSON.stringify(playerStats);
    localStorage["OFGame-currentMoneyShots"] = JSON.stringify(currentMoneyShots);

    generateCityPanel();
    generateContractPanel();
    generateStorePanel();
    generateMapNodes();

    if (newEvent != null) {
        showEvent(newEvent);
    }
}

function stCycle(newSTFollowers, cats) {
    var eventEffect = 1
    switch (activeEvent) {
        case "OnlyFans Craze":
        case "Great Worksmanship":
            eventEffect = 2;
            break;
        case "Followed Home":
        case "Paid in Exposure":
            eventEffect = 0;
            break;
        case "Economic Downturn":
        case "Poor Worksmanship":
            eventEffect = 0.5;
            break;
    }

    // Cash out category-specific followers
    var stFollowers = getSTFollowers();
    
    for (const cat of cats) {
        money += (2.5 + 0.25 * upgrades["Interactive Media"]) * eventEffect * moneyYieldMult * stFollowers[contractTypes.indexOf(cat) + 1];
    }

    // Cash out this week's paying general followers
    payingFollowers = stFollowersRolling.pop()
    money += (5 + 0.5 * upgrades["Premium Content"]) * eventEffect * moneyYieldMult * payingFollowers[0];

    // Replace paying followers with new followers
    stFollowersRolling.unshift(newSTFollowers);
}

function ltCycle(newFollowers, cats) {
    var eventEffect = 1
    switch (activeEvent) {
        case "OnlyFans Craze":
        case "Great Worksmanship":
            eventEffect = 2;
            break;
        case "Followed Home":
        case "Paid in Exposure":
            eventEffect = 0;
            break;
        case "Economic Downturn":
        case "Poor Worksmanship":
            eventEffect = 0.5;
            break;
    }

    // Cash out category-specific followers
    var ltFollowers = getLTFollowers();
    for (const cat of cats) {
        money += (2.5 + 0.25 * upgrades["Interactive Media"]) * eventEffect * moneyYieldMult * ltFollowers[contractTypes.indexOf(cat) + 1];
    }

    // Cash out this week's paying general followers
    payingFollowers = ltFollowersRolling.pop()
    money += (5 + 0.5 * upgrades["Premium Content"]) * eventEffect * moneyYieldMult * payingFollowers[0];

    // Long term follower decay (0-10%)
    //ltFollowers = ltFollowers.map(f => Math.floor((1 - (0.1 * Math.random())) * f));

    // Check if there are 4 posts and which categories are featured
    var has4Posts = true;
    var featured = [false, false, false, false];
    for (var post = 0; post < stFollowersRolling.length; post++) {
        var isPost = true;
        for (var cat = 1; cat < stFollowersRolling[0].length; cat++) {
            if (post[cat] > 0) {
                featured[cat - 1] = true;
                isPost = true;
            }
        }
        has4Posts = isPost;
    }

    // Category-specific decay (category not featured in last 4 posts)
    if (has4Posts) {
        for (var post = 0; post < ltFollowersRolling.length; post++) {
            for (var cat = 0; cat < featured.length; cat++) {
                if (featured[cat]) {
                    ltFollowers[post][cat + 1] = Math.floor(ltFollowers[post][cat + 1] * 0.75)
                }
            }
        }
    }

    // Roll new followers into the cycle
    for (var i = 0; i < newFollowers.length; i++) {
        payingFollowers[i] += newFollowers[i];
    }
    ltFollowersRolling.unshift(payingFollowers);
}

function completeFusionPost(city) {
    var followerYield = [0, 0, 0, 0, 0];
    var cats = [];
    switch (city) {
        case "London":
            followerYield[1] = 50;
            cats.push(contractTypes[1]);
            followerYield[3] = 50;
            cats.push(contractTypes[3]);
            break;
        case "Madrid":
            followerYield[2] = 50;
            cats.push(contractTypes[2]);
            followerYield[3] = 50;
            cats.push(contractTypes[3]);
            break;
        case "Paris":
            followerYield[1] = 50;
            cats.push(contractTypes[1]);
            followerYield[2] = 50;
            cats.push(contractTypes[2]);
            break;
        case "Berlin":
            followerYield[2] = 50;
            cats.push(contractTypes[2]);
            followerYield[4] = 50;
            cats.push(contractTypes[4]);
            break;
        case "Rome":
            followerYield[1] = 50;
            cats.push(contractTypes[1]);
            followerYield[4] = 50;
            cats.push(contractTypes[4]);
            break;
        case "Budapest":
            followerYield[3] = 50;
            cats.push(contractTypes[3]);
            followerYield[4] = 50;
            cats.push(contractTypes[4]);
            break;
    }

    var stFollowers = [0, 0, 0, 0, 0];
    var ltFollowers = [0, 0, 0, 0, 0];
    for (var i = 0; i < ltFollowers.length; i++) {
        catYield = followerYield[i];
        stFollowers[i] += Math.floor(catYield * (1 - ltRatio));
        ltFollowers[i] += Math.ceil(catYield * ltRatio);
    }
    
    // track follower gains
    const atomicFollowerGain = followerYield.reduce((a, b) => a + b);
    if (atomicFollowerGain > playerStats['maxAtomicFollowerGain']) {
        playerStats['maxAtomicFollowerGain'] = Math.ceil(atomicFollowerGain);
    }

    const followersBefore = getTotalFollowers();
    for (var i = 0; i < followerYield.length; i++) {
        playerStats['lifetimeFollowers'][i] += followerYield[i]; // category
        playerStats['lifetimeFollowers'][5] += followerYield[i]; // total
        if (followerYield[i] + followersBefore[i] > playerStats['maxFollowers'][i]) {
            playerStats['maxFollowers'][i] = followerYield[i] + followersBefore[i];
        }
    }
    const followersAfter = getTotalFollowers();
    if (followersAfter.reduce((a, b) => a + b) > playerStats["maxFollowers"][5]) {
        playerStats["maxFollowers"][5] = followersAfter.reduce((a, b) => a + b);
    }
    
    // Money Yield
    const moneyBefore = money;
    stCycle(stFollowers, cats);
    ltCycle(ltFollowers, cats);
    const moneyAfter = money;
    playerStats["lifetimeMoney"] += moneyAfter - moneyBefore;

    if (moneyAfter > playerStats["maxMoney"]) {
        playerStats["maxMoney"] = moneyAfter;
    }
    if (moneyAfter - moneyBefore > playerStats["maxAtomicMoneyGain"]) {
        playerStats["maxAtomicMoneyGain"] = moneyAfter - moneyBefore;
    }

    userCities[currentCity]["posts"] += 1;
    userCities[currentCity]["fusionAvailable"] = false;

    localStorage["OFGame-userCities"] = JSON.stringify(userCities);
    localStorage["OFGame-followers"] = JSON.stringify(ltFollowers);
    earnMilestones();
    generateCityPanel();
    generateContractPanel();
    generateStorePanel();
}

function getDiminishingReturnModifier(posts) {
    switch (posts) {
        case 0: return 1;
        case 1: return 0.9;
        case 2: return 0.5;
        case 3: return 0.25;
        default: return 0.1;
    }
}

function getRegionalMarketModifier(market, category, hasAug) {
    // Northern market has been omitted as it will be considered when item modifiers are evaluated.
    switch (market) {
        case "Anglo":
            if (category == "Oral") {
                return 1.5;
            } break;
        case "Iberian":
            if (category == "Sissy") {
                return 1.5;
            } break;
        case "French":
            if (category == "Oral" || category == "Anal") {
                return 0.5;
            } break;
        case "Germanic":
            if (category == "Anal") {
                return 1.5;
            } break;
        case "Greco-Roman":
            if (category == "Bondage") {
                return 1.5;
            } break;
        case "Eastern":
            if (hasAug) {
                return 1;
            } else {
                return -0.5;
            } break;
        default:
            return 0;
    }
    return 0;
}

function buyUpgrade(upgradeType) {
    money -= upgradeCost(upgradeType);
    playerStats["spentOnUpgrades"] += upgradeCost(upgradeType);
    upgrades[upgradeType] += 1;
    if (upgradeType == "Community Management") {
        ltRatio += 0.05;
        localStorage["OFGame-ltRatio"] = ltRatio;
    } else if (upgradeType == "Professional Marketing") {
        saturationCap += 250;
        localStorage["OFGame-saturationCap"] = saturationCap;
    } else if (upgradeType == "Contract Negotiation") {
        for (const values of Object.values(userCities)) {
            values["rerollOral"]++;
            values["rerollAnal"]++;
            values["rerollSissy"]++;
            values["rerollBondage"]++;
        }
        localStorage["OFGame-userCities"] = JSON.stringify(userCities);
    } else if (upgradeType == "High-Value Contractors") {
        minRoll++;
        localStorage["OFGame-minRoll"] = minRoll;
    }

    localStorage["OFGame-money"] = money;
    localStorage["OFGame-upgrades"] = JSON.stringify(upgrades);
    localStorage["OFGame-playerStats"] = JSON.stringify(playerStats);
    
    generateCityPanel();
    generateStorePanel();
}

function buyItem(item) {
    money -= itemCost(item);
    playerStats["spentOnItem"] += itemCost(item);
    userItems[item] = true;

    localStorage["OFGame-money"] = money;
    localStorage["OFGame-userItems"] = JSON.stringify(userItems);
    localStorage["OFGame-playerStats"] = JSON.stringify(playerStats);
    generateCityPanel();
    generateStorePanel();
}

function earnMilestones() {
    var unearnedMS = [...contractMS, ...followerMS, ...financeMS].filter((ms) => !earnedMS.map((ems) => ems.name).includes(ms.name))
    var newlyEarnedMS = []
    for (const ms of unearnedMS) {
        var stat = playerStats[ms.stat];

        if (ms.type == "oral") {
            statEntry = 0
        } else if (ms.type == "anal") {
            statEntry = 1
        } else if (ms.type == "sissy") {
            statEntry = 2
        } else if (ms.type == "bondage") {
            statEntry = 3
        } else if (ms.type == "total") {
            statEntry = 4
        }
        
        if (ms.stat.includes("Followers")) {
            stat = stat[++statEntry]    
        } else if (ms.stat.includes("contracts")) {
            stat = stat[statEntry]
        }
        
        if (stat >= ms.amount) {
            earnedMS.push(ms);
            newlyEarnedMS.push(ms);
            playerStats["milestonePoints"] += ms.points;
            if (ms.reward) {
                grantReward(ms.reward);
            }
            
        }
    }
    
    localStorage["OFGame-earnedMS"] = JSON.stringify(earnedMS);
    localStorage["OFGame-playerStats"] = JSON.stringify(playerStats);
    generateContractPanel();
    generateCityPanel();
    return newlyEarnedMS
}

function grantReward(reward) {
    if (reward == "System: Regional Markets") {
        marketsUnlocked = true;
        localStorage["OFGame-marketsUnlocked"] = true;
    } else if (reward == "System: Upgrades") {
        upgradesUnlocked = true;
        localStorage["OFGame-upgradesUnlocked"] = true;
    } else if (reward == "System: Items") {
        itemsUnlocked = true;
        localStorage["OFGame-itemsUnlocked"] = true;
    } else if (reward == "System: Events") {
        eventsUnlocked = true;
        localStorage["OFGame-eventsUnlocked"] = true;
    } else if (reward.startsWith("Title: ")) {
        earnedTitles.push(reward.slice(7))
        localStorage["OFGame-earnedTitles"] = JSON.stringify(earnedTitles);
    }
}

function applyTitle(title = activeTitle) {
    if (title) {
        titleElem = React.createElement('span', {class: "text-fusion-OS"}, title)
        if (title.startsWith("the")) {
            return [playerName + " ", titleElem];
        } else {
            return [titleElem, " " + playerName];
        }
    } else {
        return playerName;
    }
}

function activateTitle(title) {
    
}

