/* Data Structures */
var cities = new Map();
var cityGraph = new Map(); // Adjacency List representation

/* User Data */
var userCities = {};
var userDataFlag = true;

// Short-term followers for the last 4 posts - General, Oral, Anal, Sissy, Bondage
var stFollowersRolling = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
// Long-term followers on a 4 week cycle, followers pay monthly.
var ltFollowersRolling = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]

var money = 0;
var currentCity = "Paris";
var currentRolls = [0, 0, 0, 0]; // Oral, Anal, Sissy, Bondage rolls
var perfView = 0 // 0: Oral, 1: Anal - corresponds to currentRolls idx
var augView = 2 // 2: Sissy, 3: Bondage - corresponds to currentRolls idx
var activeAug = null // 2: Sissy, 3: Bondage - corresponds to currentRolls idx
var fusionView = false;

/* Constants */
const contractTypes = ["Oral", "Anal", "Sissy", "Bondage"]
const C_prem = 35; // large dotted line cost
const C_std = 20; // small dotted line cost
const marketTax = 100; // Tax paid to transfer regional markets
const citySpecBonus = 0.25; // 25% yield increase
const citySpecPenalty = 0.25; // 25% yield decrease

function initializeGame() {
    loadLocal();
    generateCities();
    generateConnections();
    generateMapNodes();

    if (!userDataFlag) {
        newCity();
    }

    generateCityPanel();
    generateContractPanel();
}

function newCity() {
    currentRolls = [
        randRange(1, 10, true),
        randRange(1, 10, true),
        randRange(1, 10, true),
        randRange(1, 10, true)
    ]
    localStorage["OFGame-currentRolls"] = JSON.stringify(currentRolls);
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

function getYieldMods(city) {
    var yieldMods = [1, 1, 1, 1];

    if (city.special.includes("Oral") && city.market != "Northern") {
        yieldMods[0] += 0.25;
    } else {
        yieldMods[0] -= 0.25;
    }

    if (city.special.includes("Anal") && city.market != "Northern") {
        yieldMods[1] += 0.25;
    } else {
        yieldMods[1] -= 0.25;
    }

    if (city.special.includes("Sissy") && city.market != "Northern") {
        yieldMods[2] += 0.25;
    } else {
        yieldMods[2] -= 0.25;
    }

    if (city.special.includes("Bondage") && city.market != "Northern") {
        yieldMods[3] += 0.25;
    } else {
        yieldMods[3] -= 0.25;
    }

    yieldMods[0] += getRegionalMarketModifier(city.market, "Oral", activeAug != null);
    yieldMods[1] += getRegionalMarketModifier(city.market, "Anal", activeAug != null);
    yieldMods[2] += getRegionalMarketModifier(city.market, "Sissy", true);
    yieldMods[3] += getRegionalMarketModifier(city.market, "Bondage", true);

    return yieldMods;
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
    yield = Math.floor(Math.max(0, Math.min(yield, decay * Math.log(yield))));

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
    var augYields = [0, 0, 0, 0, 0]
    if (activeAug != null) {
        var augCat = contractTypes[activeAug];
        var augRoll = currentRolls[activeAug];
        augYields = calculateStandardFollowerYield(currentCity, augCat, augRoll);
    }

    var stFollowers = [0, 0, 0, 0, 0];
    var ltFollowers = [0, 0, 0, 0, 0];
    for (var i = 0; i < ltFollowers.length; i++) {
        catYield = perfYields[i] + augYields[i];
        stFollowers[i] += Math.floor(catYield / 2);
        ltFollowers[i] += Math.ceil(catYield / 2);
    }

    // Money Yield
    stCycle(stFollowers, perfCat);
    ltCycle(ltFollowers, augCat);

    currentRolls[contractTypes.indexOf(perfCat)] = randRange(1, 10, true);
    currentRolls[contractTypes.indexOf(augCat)] = randRange(1, 10, true);
    toggleAug(contractTypes[activeAug]);
    userCities[currentCity]["posts"] += 1;

    localStorage["OFGame-userCities"] = JSON.stringify(userCities);
    localStorage["OFGame-stFollowersRolling"] = JSON.stringify(stFollowersRolling);
    localStorage["OFGame-ltFollowersRolling"] = JSON.stringify(ltFollowersRolling);
    localStorage["OFGame-money"] = money;
    localStorage["OFGame-currentRolls"] = JSON.stringify(currentRolls);
    localStorage["OFGame-activeAug"] = activeAug;

    generateCityPanel();
    generateContractPanel();
}

function stCycle(newSTFollowers, perfCat, augCat) {
    // Cash out category-specific followers
    stFollowers = getSTFollowers();
    money += stFollowers[contractTypes.indexOf(perfCat) + 1];
    if (augCat != null) {
        money += stFollowers[contractTypes.indexOf(augCat) + 1];
    }

    // Cash out this week's paying followers
    payingFollowers = stFollowersRolling.pop()
    money += 5 * payingFollowers[0];

    // Replace paying followers with new followers
    stFollowersRolling.unshift(newSTFollowers);
}

function ltCycle(newFollowers, perfCat, augCat) {
    // Cash out category-specific followers
    ltFollowers = getLTFollowers();
    money += ltFollowers[contractTypes.indexOf(perfCat) + 1];
    if (augCat != null) {
        money += ltFollowers[contractTypes.indexOf(augCat) + 1];
    }

    // Cash out this week's paying followers
    payingFollowers = ltFollowersRolling.pop()
    money += 5 * payingFollowers[0];

    // Long term follower decay
    ltFollowers = ltFollowers.map(f => Math.floor((1 - (0.1 * Math.random())) * f));

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
    switch (city) {
        case "London":
            followerYield[1] = 50;
            followerYield[3] = 50;
            break;
        case "Madrid":
            followerYield[2] = 50;
            followerYield[3] = 50;
            break;
        case "Paris":
            followerYield[1] = 50;
            followerYield[2] = 50;
            break;
        case "Berlin":
            followerYield[2] = 50;
            followerYield[4] = 50;
            break;
        case "Rome":
            followerYield[1] = 50;
            followerYield[4] = 50;
            break;
        case "Budapest":
            followerYield[3] = 50;
            followerYield[4] = 50;
            break;
    }

    for (var i = 0; i < ltFollowers.length; i++) {
        ltFollowers[i] += followerYield[i];
    }

    userCities[currentCity]["posts"] += 1;
    userCities[currentCity]["fusionAvailable"] = false;
    fusionView = false;

    localStorage["OFGame-userCities"] = JSON.stringify(userCities);
    localStorage["OFGame-followers"] = JSON.stringify(ltFollowers);
    localStorage["OFGame-fusionView"] = fusionView
    generateCityPanel();
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
                return 2;
            } break;
        case "Iberian":
            if (category == "Sissy") {
                return 2;
            } break;
        case "French":
            if (category == "Oral" || category == "Anal") {
                return 0.5;
            } break;
        case "Germanic":
            if (category == "Anal") {
                return 2;
            } break;
        case "Greco-Roman":
            if (category == "Bondage") {
                return 2;
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

