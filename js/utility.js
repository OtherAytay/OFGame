/* Interface Management */
function gameView() {
    for (const radio of document.getElementsByName("tabs")) {
        if (radio.checked) {
            document.getElementById(radio.value).hidden = false;
        } else {
            document.getElementById(radio.value).hidden = true;
        }
    }
}

/* Helpers */

/**
* Parameters: numeric min, numeric max, boolean integer
* Return: random numeric between min and max inclusive. Reduced to int if (integer == true)
**/
function randRange(min, max, integer) {
    if (integer) {
        return Math.floor(Math.random() * ((max - min) + 1) + min);
    } else {
        return Math.random() * ((max - min) + 1) + min;
    }
}

/**
 * Rerolls the specified category, protecting it from rerolling into its previous value.
 * @param {*} cat 
 */
function protectedReroll(cat) {
    prevRoll = currentRolls[contractTypes.indexOf(cat)];
    while (prevRoll == currentRolls[contractTypes.indexOf(cat)]) {
        currentRolls[contractTypes.indexOf(cat)] = randRange(minRoll, 10, true);
    }
    localStorage["OFGame-currentRolls"] = JSON.stringify(currentRolls);
    localStorage["OFGame-userCities"] = JSON.stringify(userCities)
    generateContractPanel();
}

/**
 * Sums over the short-term follower rolling cycle into one array
 * @returns sum of followers of each type in the ST cycle
 */
function getSTFollowers() {
    stFollowers = [0, 0, 0, 0, 0]
    for (var post = 0; post < stFollowersRolling.length; post++) {
        for (var cat = 0; cat < stFollowersRolling[0].length; cat++) {
            stFollowers[cat] += stFollowersRolling[post][cat]
        }
    }
    return stFollowers;
}

/**
 * Sums over the long-term follower rolling cycle into one array
 * @returns sum of followers of each type in the LT cycle
 */
function getLTFollowers() {
    ltFollowers = [0, 0, 0, 0, 0]
    for (var post = 0; post < ltFollowersRolling.length; post++) {
        for (var cat = 0; cat < ltFollowersRolling[0].length; cat++) {
            ltFollowers[cat] += ltFollowersRolling[post][cat]
        }
    }
    return ltFollowers;
}

function getTotalFollowers() {
    followers = [0, 0, 0, 0, 0]
    stFollowers = getSTFollowers();
    ltFollowers = getLTFollowers();

    for (var i = 0; i < followers.length; i++) {
        followers[i] += stFollowers[i] + ltFollowers[i]
    }
    return followers;
}

function getSaturationFactor() {
    var totalFollowers = getTotalFollowers().reduce((a, b) => a + b);
    return (totalFollowers / saturationCap) ** (1.5);
}

/* Local Save Management */


const initData = {
    "OFGame-version": 1.0,
    "OFGame-localSave": true,
    "OFGame-userCities": null,
    "OFGame-currentCity": "",
    "OFGame-currentRolls": [],
    "OFGame-travelCosts": [],
    "OFGame-stFollowersRolling": [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]],
    "OFGame-ltFollowersRolling": [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]],
    "OFGame-money": 0,
    "OFGame-homeMarket": "",
    "OFGame-activeAug": null,
    "OFGame-marketTax": 100,
    "OFGame-ltRatio": 0.5,
    "OFGame-luck": 0.5,
    "OFGame-saturationCap": 1000,
    "OFGame-contractDurationMult": 1,
    "OFGame-moneyYieldMult": 1,
    "OFGame-partnerChanceMult": 1,
    "OFGame-partnerDurationMult": 1,
    "OFGame-fopSelected": [],
    "OFGame-upgrades": initUpgrades,
    "OFGame-upgradeLimits": initUpgradeLimits,
    "OFGame-userItems": initUserItems,
    "OFGame-eventRemaining": 0,
    "OFGame-activeEvent": "",
    "OFGame-eventChance": 0,
    "OFGame-minRoll": 1,
    "OFGame-playerStats": null,
    "OFGame-earnedMS": [],
    "OFGame-eventsUnlocked": false,
    "OFGame-marketsUnlocked": false,
    "OFGame-upgradesUnlocked": false,
    "OFGame-itemsUnlocked": false,
    "OFGame-playerName": "",
    "OFGame-activeTitle": "",
    "OFGame-earnedTitles": [],
    "OFGame-currentMoneyShots": [0, 0]
}

function assimilateSave() {
    // prune unused keys
    initKeys = Object.keys(initData);
    for (const [key, value] of Object.entries(localStorage)) {
        if (key.startsWith("OFGame-")) {
            if (!initKeys.includes(key)) {
                localStorage.removeItem(key);
            }
        }
    }

    // initialize new keys
    localKeys = Object.keys(localStorage)
    for (const key of initKeys) {
        if (!localKeys.includes(key)) {
            localStorage[key] = initData[key];
        }
    }

    // Initialize new upgrade properties
    upgrades = { ...initUpgrades, ...upgrades };
    localStorage["OFGame-upgrades"] = JSON.stringify(upgrades)

    upgradeLimits = { ...initUpgradeLimits, ...upgradeLimits };
    localStorage["OFGame-upgradeLimits"] = JSON.stringify(upgradeLimits);


    // Verify userCities
    for (const [city, properties] of Object.entries(userCities)) {
        var breakProps = false;
        var breakNumeric = false;

        // Initialize new user city properties
        if (Object.keys(userCities[city]).length != Object.keys(initUserCity)) {
            userCities[city] = { ...initUserCity, ...userCities[city] };
        } else {
            breakProps = true;
        }

        // Convert reroll tracker from boolean to numeric
        if (typeof userCities[city]["rerollOral"] == "boolean") {
            userCities[city]["rerollOral"] = 1 + upgrades["Contract Negotiation"];
            userCities[city]["rerollAnal"] = 1 + upgrades["Contract Negotiation"];
            userCities[city]["rerollSissy"] = 1 + upgrades["Contract Negotiation"];
            userCities[city]["rerollBondage"] = 1 + upgrades["Contract Negotiation"];
        } else {
            breakNumeric = true;
        }

        // terminate loop for efficiency
        if (breakProps && breakNumeric) {
            break;
        }
    }
    localStorage["OFGame-userCities"] = JSON.stringify(userCities);
}

function saveLocal() {
    //localStorage["OFGame-version"] = version;
    localStorage["OFGame-localSave"] = true;
    localStorage["OFGame-userCities"] = JSON.stringify(userCities);
    localStorage["OFGame-currentCity"] = currentCity;
    localStorage["OFGame-currentRolls"] = JSON.stringify(currentRolls);
    localStorage["OFGame-travelCosts"] = JSON.stringify(travelCosts);
    localStorage["OFGame-stFollowersRolling"] = JSON.stringify(stFollowersRolling);
    localStorage["OFGame-ltFollowersRolling"] = JSON.stringify(ltFollowersRolling);
    localStorage["OFGame-money"] = money;
    localStorage["OFGame-homeMarket"] = homeMarket;
    localStorage["OFGame-activeAug"] = activeAug;
    localStorage["OFGame-marketTax"] = marketTax;
    localStorage["OFGame-ltRatio"] = ltRatio;
    localStorage["OFGame-luck"] = luck;
    localStorage["OFGame-saturationCap"] = saturationCap;
    localStorage["OFGame-contractDurationMult"] = contractDurationMult;
    localStorage["OFGame-moneyYieldMult"] = moneyYieldMult;
    localStorage["OFGame-partnerChanceMult"] = partnerChanceMult;
    localStorage["OFGame-partnerDurationMult"] = partnerDurationMult;
    localStorage["OFGame-fopSelected"] = JSON.stringify(fopSelected);
    localStorage["OFGame-upgrades"] = JSON.stringify(upgrades);
    localStorage["OFGame-userItems"] = JSON.stringify(userItems);
    localStorage["OFGame-eventRemaining"] = eventRemaining;
    localStorage["OFGame-activeEvent"] = activeEvent;
    localStorage["OFGame-eventChance"] = eventChance;
    localStorage["OFGame-minRoll"] = minRoll;
    localStorage["OFGame-playerStats"] = JSON.stringify(playerStats);
    localStorage["OFGame-earnedMS"] = JSON.stringify(earnedMS);
    localStorage["OFGame-eventsUnlocked"] = eventsUnlocked;
    localStorage["OFGame-marketsUnlocked"] = marketsUnlocked;
    localStorage["OFGame-upgradesUnlocked"] = upgradesUnlocked;
    localStorage["OFGame-itemsUnlocked"] = itemsUnlocked;
    localStorage["OFGame-playerName"] = playerName;
    localStorage["OFGame-activeTitle"] = activeTitle;
    localStorage["OFGame-earnedTitles"] = JSON.stringify(earnedTitles);
    localStorage["OFGame-currentMoneyShots"] = JSON.stringify(currentMoneyShots)
}

function loadLocal() {
    if (localStorage["OFGame-localSave"] == "true") {
        try {
            userCities = JSON.parse(localStorage["OFGame-userCities"]);
            currentCity = localStorage["OFGame-currentCity"];
            currentRolls = JSON.parse(localStorage["OFGame-currentRolls"]);
            travelCosts = JSON.parse(localStorage["OFGame-travelCosts"]);
            stFollowersRolling = JSON.parse(localStorage["OFGame-stFollowersRolling"]);
            ltFollowersRolling = JSON.parse(localStorage["OFGame-ltFollowersRolling"]);
            money = JSON.parse(localStorage["OFGame-money"]);
            homeMarket = localStorage["OFGame-homeMarket"];
            activeAug = JSON.parse(localStorage["OFGame-activeAug"]);
            marketTax = JSON.parse(localStorage["OFGame-marketTax"]);
            ltRatio = JSON.parse(localStorage["OFGame-ltRatio"]);
            luck = JSON.parse(localStorage["OFGame-luck"]);
            saturationCap = JSON.parse(localStorage["OFGame-saturationCap"]);
            contractDurationMult = JSON.parse(localStorage["OFGame-contractDurationMult"]);
            moneyYieldMult = JSON.parse(localStorage["OFGame-moneyYieldMult"]);
            partnerChanceMult = JSON.parse(localStorage["OFGame-partnerChanceMult"]);
            partnerDurationMult = JSON.parse(localStorage["OFGame-partnerDurationMult"]);
            fopSelected = JSON.parse(localStorage["OFGame-fopSelected"]);
            upgrades = JSON.parse(localStorage["OFGame-upgrades"]);
            userItems = JSON.parse(localStorage["OFGame-userItems"]);
            eventRemaining = JSON.parse(localStorage["OFGame-eventRemaining"]);
            activeEvent = localStorage["OFGame-activeEvent"];
            eventChance = JSON.parse(localStorage["OFGame-eventChance"]);
            minRoll = JSON.parse(localStorage["OFGame-minRoll"]);
            playerStats = JSON.parse(localStorage["OFGame-playerStats"]);
            earnedMS = JSON.parse(localStorage["OFGame-earnedMS"]);
            eventsUnlocked = JSON.parse(localStorage["OFGame-eventsUnlocked"]);
            marketsUnlocked = JSON.parse(localStorage["OFGame-marketsUnlocked"]);
            upgradesUnlocked = JSON.parse(localStorage["OFGame-upgradesUnlocked"]);
            itemsUnlocked = JSON.parse(localStorage["OFGame-itemsUnlocked"]);
            playerName = localStorage["OFGame-playerName"]
            activeTitle = localStorage["OFGame-activeTitle"]
            earnedTitles = JSON.parse(localStorage["OFGame-earnedTitles"])
            currentMoneyShots = JSON.parse(localStorage["OFGame-currentMoneyShots"])

        } catch (error) {console.log(error.message)}
    } else {
        userDataFlag = false;
    }
}

function clearSave() {
    for (const key of Object.keys(initData)) {
        localStorage.removeItem(key);
    }

    // Reset variables
    stFollowersRolling = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
    ltFollowersRolling = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
    money = 0;
    currentCity = "";
    currentRolls = [0, 0, 0, 0];
    travelCosts = [];
    activeItems = [];
    activeAug = null;
    augRemaining = 0;
    activeEvent = "";
    eventChance = 0;
    eventRemaining = 0;
    upgrades = initUpgrades;
    upgradeLimits = initUpgradeLimits;
    saturationCap = 1000;
    ltRatio = 0.5;
    minRoll = 1;
}


/* Save import / export */

function fileUpload() {
    const inputElement = document.getElementById("import-save");
    inputElement.addEventListener("change", importSave, false);
}

function importSave() {
    const save = this.files[0];
    fr = new FileReader()
    fr.readAsText(save);
    fr.onload = function () {
        saveData = JSON.parse(fr.result);
        for (const [key, value] of Object.entries(saveData)) {
            if (key.startsWith("OFGame")) {
                localStorage[key] = value;
            }
        }
        loadLocal();
        assimilateSave();
        if (document.getElementById("newSave")) {
            bootstrap.Modal.getInstance(document.getElementById("newSave")).hide();
            generateMapNodes();
            generateCityPanel();
            generateContractPanel();
            generateStorePanel();
        }

    }
}

function exportSave() {
    var saveDate = new Date()
    saveDate = saveDate.toISOString().slice(0, 10) + " " + saveDate.toTimeString().slice(0, 8).replaceAll(":", "-");

    let saveName = 'OFGame - ' + saveDate;

    let saveData = new Blob([JSON.stringify(localStorage)], {
        type: 'application/json',
        name: saveName
    });

    saveAs(saveData, saveName);
}

function saveAs(content, fileName) {
    const a = document.createElement("a");
    const isBlob = content.toString().indexOf("Blob") > -1;
    let url = content;
    if (isBlob) {
        url = window.URL.createObjectURL(content);
    }
    a.href = url;
    a.download = fileName;
    a.click();
    if (isBlob) {
        window.URL.revokeObjectURL(url);
    }
}