/*--- Information Retrieval ---*/
function specCoding(specText) {
    // Standard
    if (specText == "Oral") {
        return "oral"
    }
    if (specText == "Anal") {
        return "anal"
    }
    if (specText == "Sissy") {
        return "sissy"
    }
    if (specText == "Bondage") {
        return "bondage"
    }

    // Fusion
    if (specText == "Oral / Anal") {
        return "fusion-OA"
    } else if (specText == "Oral / Sissy") {
        return "fusion-OS"
    } else if (specText == "Oral / Bondage") {
        return "fusion-OB"
    } else if (specText == "Anal / Sissy") {
        return "fusion-AS"
    } else if (specText == "Anal / Bondage") {
        return "fusion-AB"
    } else if (specText == "Sissy / Bondage") {
        return "fusion-SB"
    } else {
        return ""
    }
}

function marketCoding(market) {
    return market.toLowerCase();
}


function getOralContract(roll) {
    switch (roll) {
        case 1:
            return "Sitting on your knees. Medium pace, shallow, and sensual.";
        case 2:
            return "Standing on your knees. Slow, up to the throat, and sensual.";
        case 3:
            return "On your stomach, dildo on the ground. Slow, shallow, and sensual.";
        case 4:
            return "Sitting on your knees. Medium pace, shallow, and sensual. Deepthroat every 10 seconds.";
        case 5:
            return "Standing on your knees. Slow, up to the throat, and sensual. Deepthroat every 10 seconds.";
        case 6:
            return "On your stomach, dildo on the ground. Slow, shallow, and sensual. Deepthroat every 10 seconds.";
        case 7:
            return "Back against the wall. Medium pace and deep. Hold deepthroat for 3 seconds every 20 seconds";
        case 8:
            return "Sitting on your knees. Deepthroat 20 times, holding each for 5 seconds.";
        case 9:
            return "Standing on your knees. Deepthroat 10 times, holding each for 10 seconds.";
        case 10:
            return "Back against the wall. Hold balls deep, giving a throat massage for a total of 120 seconds.";
    }
}

function getAnalContract(roll) {
    switch (roll) {
        case 1:
            return "On your side. Slow and shallow.";
        case 2:
            return "On your back, legs up. Medium pace and shallow.";
        case 3:
            return "Face down, ass up. Slow and deep.";
        case 4:
            return "On your side. Fast and shallow.";
        case 5:
            return "Face down, ass up. Using 2 fingers of each hand, gape your asshole for 30 seconds. Do this 6 times.";
        case 6:
            return "On your stomach. Fast in, slow out, and deep.";
        case 7:
            return "Piledriver. Fast and deep.";
        case 8: 
        case 9:
            return "Place your longest dildo on the ground, and sit on your knees over it.";
        case 10:
            return "Doggystyle. Fast and deep.";
    }
}

function getSissyContract(roll) {
    var femmeWear = []
    var makeup = [];

    // Special rolls
    switch (roll) {
        case 3:
            return "Wear a sports / activewear bra and leggings.";
        case 9:
            return "Write degrading words or phrases on your breasts and ass with lipstick.";
    }

    // Cumulative Rolls
    if (roll >= 1) {
        femmeWear.push("bra", "panties");
    }
    if (roll >= 2) {
        makeup.push("lipstick", "lip gloss");
    }
    if (roll >= 4) {
        femmeWear.push("short skirt");
    }
    if (roll >= 5) {
        makeup.push("eyeshadow", "eyeliner", "mascara");
    }
    if (roll >= 7) {
        femmeWear.push("crop top", "high stockings");
    }
    if (roll >= 9) {
        makeup.push("foundation", "concealer", "blush/highlighter");
    }
    if (roll >= 10) {
        femmeWear.push("feminine jewlery");
    }

    contractDetails = "Wear a ";
    for (var i = 0; i < femmeWear.length; i++) {
        if (i == femmeWear.length - 1) {
            contractDetails += "and " + femmeWear[i] + ".";
        } else {
            contractDetails += femmeWear[i];
            if (femmeWear.length > 2) { contractDetails += "," }
            contractDetails += " ";
        }
    }
    if (makeup.length > 0) {
        contractDetails += " Apply ";
    }
    for (var i = 0; i < makeup.length; i++) {
        if (i == makeup.length - 1) {
            contractDetails += "and " + makeup[i] + ".";
        } else {
            contractDetails += makeup[i];
            if (makeup.length > 2) { contractDetails += "," }
            contractDetails += " ";
        }
    }
    return contractDetails;
}

function getBondageContract(roll) {
    switch (roll) {
        case 1:
            return "Wear a collar for the next post.";
        case 2:
            return "Wear a chest harness for your next post.";
        case 3:
            return "Wear a collar and chest harness for your next post.";
        case 4:
            return "Tie hands behind back during your next post (oral). Tie legs behind head (anal) (ignore anal contract position).";   
        case 5:
        case 6:
            return "Spend 5 minutes in a frogtie before your next post.";
        case 7:
            return "Spend 5 minutes in a hogtie before your next post.";
        case 8:
            return "Wear a crotch rope attached to a collar or tight chest harness during your next post if it's oral. Wear a mouth gag during your next post if it's anal.";
        case 9:
            return "Spend 5 minutes in a frogtie with a crotch rope pulling on a collar before your next post.";
        case 10:
            return "Spend 5 minutes in a hogtie with a crotch rope pulling on a collar before your next post.";
    }
}

function getFusionContract(city) {
    switch (city) {
        case "London":
            return "Apply heavy eyeshadow, eyeliner, and mascara. Deepthroat 50 times, holding each for 10 seconds. Your makeup should run down your face.";
        case "Madrid":
            return "Wear a full feminine outfit and makeup. Film a teaser post of you revealing, removing, and inserting a buttplug 50 times under your skirt and panties.";
        case "Paris":
            return "Spitroast yourself for 5 minutes, alternating balls deep on the dildos. Show multiple camera angles.";
        case "Berlin":
            return "Apply full body bondage (tight chest harness and crotch rope) and collar. Spend 15 minutes in a frogtie with an anal hook pulling on a collar. (Use your largest buttplug if you do not have a hook)";
        case "Rome":
            return "Apply full body bondage (chest harness and crotch rope) and collar. Spend 15 minutes in a frogtie with a dildo or buttplug tied into your mouth (or use a dildo gag). Make sure you can breathe and can easily remove it in an emergency.";
        case "Budapest":
            return "Wear a full feminine outfit and makeup. Apply full body bondage (tight chest harness and crotch rope) and collar over the clothing into a frogtie position for 15 minutes.";
    }
}

function getRegionalMarketCharacteristics(market) {
    switch (market) {
        case "Anglo":
            return "Oral contract yield modifier is increased by 150%, but task time is increased by 100%.";
        case "Iberian":
            return "Sissy contract yield modifier is increased by 150%, but last for the next 2 tasks instead of 1.";
        case "French":
            return "Oral / Anal contract yield modifiers increased by 50%, but you must wear a buttplug during oral contracts and a mouth gag during anal contracts.";
        case "Germanic":
            return "Anal contract yield modifier is increased by 150%, but task time is increased by 100%.";
        case "Greco-Roman":
            return "Bondage contract yield modifier is increased by 150%, but last for the next 2 tasks instead of 1.";
        case "Northern":
            return "Item bonuses are increased by 25%, but city specialization positive effects are disabled.";
        case "Eastern":
            return "Posts with augmentations have yields increased by 100%, but posts without augmentations have yields decreased by 50%.";
    }
}

function rollEvent() {
    roll = Math.random();
    if (roll < luck) { // pos event
        var event = randRange(0, 2, true);
        if (roll < Math.max(0, luck - 0.35)) {
            return {pos: true, severity: "Major", eventNum: event};
        } else if (roll < Math.max(0, luck - 0.15)) {
            return {pos: true, severity: "Moderate", eventNum: event};
        } else {
            return {pos: true, severity: "Minor", eventNum: event};
        }
    } else { // neg event
        var event = randRange(0, 2, true);
        if (roll > Math.min(1, luck + 0.35)) {
            return {pos: false, severity: "Major", eventNum: event};
        } else if (roll > Math.min(1, luck + 0.15)) {
            return {pos: false, severity: "Moderate", eventNum: event};
        } else {
            return {pos: false, severity: "Minor", eventNum: event};
        }
    }
}

function getEventDetails({pos, severity, eventNum}) {
    if (pos) {
        switch (severity) {
            case "Minor":
                switch (eventNum) {
                    case 0: return {name: "Great Worksmanship", text: "You're have a wonderful day, and the quality of your content is excellent because of it.", effect: "Your next post gains twice as many followers and money."}
                    case 1: return {name: "Paid in Exposure", text: "The contractor insists the exposure from the post will be more than enough to cover the monetary costs. It turns out they may have been right!", effect: "Your next post gains thrice as many followers but no money."}
                    case 2: return {name: "Generous Tip", text: "A follower was feeling extra generous while watching your content.", effect: "Gain $100."}
                }
            case "Moderate":
                switch (eventNum) {
                    case 0: return {name: "OnlyFans Craze", text: "People have been dropping money on OnlyFans content like crazy!", effect: "All money gains doubled for the next 2 posts."}
                    case 1: return {name: "Bondage Con", text: "Participation in a Bondage kink convention really pleases your bondage followers!", effect: "Wear tight full body rope bondage (chest harness and crotch rope) and collar for 15 minutes. Gain $10 per bondage follower."}
                    case 2: return {name: "Sissy Con", text: "Participation in a Sissy kink convention really pleases your sissy followers!", effect: "Wear a full feminine outfit and makeup for 15 minutes. Gain $10 per sissy follower."}
                }
            case "Major":
                switch (eventNum) {
                    case 0: return {name: "Limelight", text: "Hard work has paid off. OnlyFans features you on their front page!", effect: "Double your short-term followers."}
                    case 1: return {name: "Tax Credit", text: "The government has erroneously miscalculated your tax charges.", effect: "Gain 25% of your money or $1000, whichever is higher."}
                    case 2: return {name: "Samaritan Award", text: "You've been recognized for great actions outside of the studio.", effect: "Gain 25% of long-term followers."}
                }
        }
    } else {
        switch (severity) {
            case "Minor":
                switch (eventNum) {
                    case 0: return {name: "Poor Worksmanship", text: "You're having a bad day, and the quality of your content is suffering because of it.", effect: "Your next post gains half as many followers and money."}
                    case 1: return {name: "Extra Bored", text: "By chance, more followers than usual seem to have gotten bored of your content.", effect: "Lose 10% of all followers."}
                    case 2: return {name: "Speeding Ticket", text: "On your way to the studio, you were pulled over and ticketed for speeding. Too excited to starting film?", effect: "Lose $100."}
                }
            case "Moderate":
                switch (eventNum) {
                    case 0: return {name: "Economic Downturn", text: "Recent movements in the economy have tightened people's budgets, your posts are less profitable.", effect: "All money gains halved for the next 3 posts."}
                    case 1: return {name: "Bondage Bunny", text: "A previous bondage contractor was displeased with your work and has shown up to your workplace demanding a better performance or he would turn the bondage community against you.", effect: "Wear tight full body rope bondage (chest harness and crotch rope), mouth gag, and collar. Insert an anal hook or large buttplug. Connect the hook or crotch rope to your collar tightly. Remain in the frogtie position for 30 minutes."}
                    case 2: return {name: "Followed Home", text: "An overzealous fan followed you home. He demands that you perform sexual acts on him or he would leak your home address.", effect: "Your next post gains no followers or money."}
                }
            case "Major":
                switch (eventNum) {
                    case 0: return {name: "Eclipsed", text: "An OF superstar has risen to fame overnight, grabbing the attention of less loyal followers.", effect: "Lose all short-term followers."}
                    case 1: return {name: "Tax Fraud", text: "The government has sanctioned you for improper tax filings.", effect: "Lose 50% of your money or $1000, whichever is higher. Pay in full or go bankrupt."}
                    case 2: return {name: "Scandalous", text: "You've been accused of scandalous behavior. True or not, the damage is done.", effect: "Lose 50% of long-term followers."}
                }
        }
    }
}

/* City Helper Functions */
function createCity(name, size, special, market, x, y) {
    var fusionAvailable = false;
    if (special.match(/\w* \/ \w*/) != null) {
        fusionAvailable = true;
    }

    cities.set(name, { size: size, special: special, market: market, x: x, y: y });
    if (!userDataFlag) {
        userCities[name] = {...initUserCity, fusionAvailable: fusionAvailable};
    }
}

function createConnection(srcCity, destCity, type) {
    if (cityGraph.has(srcCity)) {
        cityGraph.set(srcCity, cityGraph.get(srcCity).concat([{ destCity: destCity, type: type }]));
    } else {
        cityGraph.set(srcCity, [{ destCity: destCity, type: type }]);
    }
}

function calcAllDistances() {
    cityDists = []
    for (const source of cities.keys()) {
        for (const dest of cityGraph.get(source)) {
            c1 = cities.get(source);
            c2 = cities.get(dest.destCity);
            if (c1.x != c2.x || c1.y != c2.y) {
                cityDists.push({ source: source, dest: dest.destCity, dist: dist(c1.x, c1.y * 0.665, c2.x, c2.y * 0.665) })
            }
        }
    }

    min = Math.min.apply(Math, cityDists.map(c => c.dist))
    max = Math.max.apply(Math, cityDists.map(c => c.dist))
    sum = cityDists.map(c => c.dist).reduce((a, b) => { return a + b })
    mean = sum / cityDists.length;
    varArray = cityDists.map(c => c.dist).map(dist => (dist - mean) ** 2)
    variance = varArray.reduce((a, b) => { return a + b }) / cityDists.length;
    stdev = Math.sqrt(variance);
    cityDistsSorted = cityDists.map(c => c.dist).sort();
    q1 = cityDistsSorted[Math.floor(cityDists.length / 4)]
    med = cityDistsSorted[Math.floor(cityDists.length / 2)]
    q3 = cityDistsSorted[Math.floor(3 * cityDists.length / 4)]
    console.log("Min: " + min);
    console.log("Q1: " + q1);
    console.log("Med: " + med);
    console.log("Q3: " + q3);
    console.log("Max: " + max);
    console.log("Mean: " + mean);
    console.log("Std Dev: " + stdev);
    console.log(cityDistsSorted);
    return cityDistsSorted;
}

function dist(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

/*--- City and Graph Details ---*/

function generateCities() {
    /*--- Anglo Regional Market ---*/
    // United Kingdom
    createCity("London", "Big", "Oral / Sissy", "Anglo", 21, 53);
    createCity("Bristol", "Small", "Sissy", "Anglo", 18, 57);
    createCity("Manchester", "Small", "Oral", "Anglo", 17, 39);
    createCity("Edinburgh", "Small", "Sissy", "Anglo", 13.5, 25.5);

    // Ireland
    createCity("Dublin", "Medium", "Bondage", "Anglo", 6.75, 45);
    createCity("Cork", "Small", "Anal", "Anglo", 3.75, 49);

    /*--- Iberian Regional Market ---*/
    // Spain
    createCity("Madrid", "Big", "Anal / Sissy", "Iberian", 12.75, 117.5);
    createCity("Barcelona", "Medium", "Oral", "Iberian", 27, 112);
    createCity("Santiago de Compostela", "Small", "Oral", "Iberian", 2.25, 107.5);
    createCity("Seville", "Small", "Sissy", "Iberian", 7.5, 131);
    createCity("Malaga", "Small", "Bondage", "Iberian", 10.5, 137);
    createCity("Valencia", "Small", "Anal", "Iberian", 20.75, 124);

    createCity("Lisbon", "Medium", "Anal", "Iberian", 1.75, 126); // Portugal

    /*--- French Regional Market ---*/
    // France
    createCity("Paris", "Big", "Oral / Anal", "French", 28.8, 77);
    createCity("Rennes", "Small", "Anal", "French", 19.75, 74.5);
    createCity("Bordeaux", "Small", "Sissy", "French", 19.5, 95);
    createCity("Lyon", "Small", "Bondage", "French", 32, 89);
    createCity("Montpellier", "Small", "Oral", "French", 30.75, 102);

    createCity("Brussels", "Small", "Oral", "French", 32.5, 61); // Belgium

    /*--- Germanic Regional Market ---*/
    // Germany
    createCity("Berlin", "Big", "Anal / Bondage", "Germanic", 48.75, 58.5);
    createCity("Frankfurt", "Small", "Sissy", "Germanic", 40.75, 60.5);
    createCity("Stuttgart", "Small", "Oral", "Germanic", 43.25, 69.5);

    createCity("Amsterdam", "Medium", "Bondage", "Germanic", 35.5, 50); // Netherlands
    createCity("Zurich", "Small", "Anal", "Germanic", 40.75, 84.5); // Switzerland 
    createCity("Linz", "Medium", "Anal", "Germanic", 54, 77.5); // Austria

    /*--- Greco-Roman Regional Market ---*/
    // Italy & Italian Islands
    createCity("Rome", "Big", "Oral / Bondage", "Greco-Roman", 47.5, 104);
    createCity("Milan", "Small", "Sissy", "Greco-Roman", 44, 92);
    createCity("Naples", "Small", "Bondage", "Greco-Roman", 53.5, 115);
    createCity("Cagliari", "Small", "Oral", "Greco-Roman", 42.25, 121.75); // Sardinia
    createCity("Palermo", "Small", "Anal", "Greco-Roman", 53.5, 133); // Sicily

    // Greece
    createCity("Athens", "Medium", "Sissy", "Greco-Roman", 72.5, 132);
    createCity("Thessaloniki", "Small", "Bondage", "Greco-Roman", 73.75, 117.5);
    createCity("Heraklion", "Small", "Oral", "Greco-Roman", 77.75, 144);

    /*--- Northern European Regional Market ---*/
    createCity("Vejle", "Small", "Anal", "Northern", 42.75, 27.5); // Denmark
    createCity("Gothenburg", "Medium", "Oral", "Northern", 51.25, 16); // Sweden
    createCity("Oslo", "Small", "Bondage", "Northern", 41.75, 3.75); // Norway
    createCity("Tallinn", "Small", "Sissy", "Northern", 78.25, 3); // Estonia
    createCity("Riga", "Medium", "Anal", "Northern", 77.5, 16); // Latvia
    createCity("Kaunas", "Small", "Bondage", "Northern", 74, 33); // Lithuania

    /*--- Eastern European Regional Market ---*/
    // Poland
    createCity("Warsaw", "Medium", "Oral", "Eastern", 65.75, 51);
    createCity("Koszalin", "Small", "Oral", "Eastern", 59.75, 37);

    createCity("Budapest", "Big", "Sissy / Bondage", "Eastern", 67, 83); // Hungary
    createCity("Prague", "Small", "Bondage", "Eastern", 56.25, 67.25); // Czechia

    createCity("Rijeka", "Medium", "Oral", "Eastern", 56.75, 95); // Croatia
    createCity("Sarajevo", "Small", "Anal", "Eastern", 62.25, 99); // Bosnia and Herzegovina
    createCity("Kragujevac", "Small", "Oral", "Eastern", 70, 101); // Serbia
    createCity("Sliven", "Small", "Anal", "Eastern", 82.5, 107); // Bulgaria
    createCity("Brasov", "Medium", "Bondage", "Eastern", 79, 89); // Romania
    createCity("Chisinau", "Small", "Oral", "Eastern", 85.75, 84.5); // Moldova
    createCity("Minsk", "Small", "Anal", "Eastern", 83.75, 41.5); // Belarus

    // Ukraine
    createCity("Kyiv", "Medium", "Oral", "Eastern", 88.75, 63);
    createCity("Ternopil", "Small", "Sissy", "Eastern", 78.25, 70.25);

    // Turkey
    createCity("Istanbul", "Medium", "Bondage", "Eastern", 85, 114);
    createCity("Izmir", "Small", "Anal", "Eastern", 83.75, 130.5);
    createCity("Kayseri", "Small", "Sissy", "Eastern", 98, 125);
    localStorage["OFGame-userCities"] = JSON.stringify(userCities);
}

function generateConnections() {
    /*--- Anglo Regional Market ---*/
    // United Kingdom
    createConnection("London", "Dublin", "Premium");
    createConnection("London", "Paris", "Premium");
    createConnection("London", "Bristol", "Standard");

    createConnection("Bristol", "London", "Standard");
    createConnection("Bristol", "Manchester", "Standard");
    createConnection("Bristol", "Cork", "Standard");
    createConnection("Bristol", "Rennes", "Standard");
    createConnection("Bristol", "Santiago de Compostela", "Standard");
    createConnection("Bristol", "Lisbon", "Standard");

    createConnection("Manchester", "Bristol", "Standard");
    createConnection("Manchester", "Dublin", "Standard");
    createConnection("Manchester", "Edinburgh", "Standard");

    createConnection("Edinburgh", "Manchester", "Standard");
    createConnection("Edinburgh", "Dublin", "Standard");

    // Ireland
    createConnection("Dublin", "Cork", "Standard");
    createConnection("Dublin", "Edinburgh", "Standard");
    createConnection("Dublin", "Manchester", "Standard");
    createConnection("Dublin", "London", "Premium");

    createConnection("Cork", "Dublin", "Standard");
    createConnection("Cork", "Bristol", "Standard");
    createConnection("Cork", "Santiago de Compostela", "Standard");
    createConnection("Cork", "Rennes", "Standard");

    /*--- Iberian Regional Market ---*/
    // Spain
    createConnection("Madrid", "Lisbon", "Premium");
    createConnection("Madrid", "Paris", "Premium");
    createConnection("Madrid", "Barcelona", "Standard");
    createConnection("Madrid", "Santiago de Compostela", "Standard");
    createConnection("Madrid", "Seville", "Standard");
    createConnection("Madrid", "Malaga", "Standard");
    createConnection("Madrid", "Valencia", "Standard");

    createConnection("Barcelona", "Madrid", "Standard");
    createConnection("Barcelona", "Valencia", "Standard");
    createConnection("Barcelona", "Bordeaux", "Standard");
    createConnection("Barcelona", "Montpellier", "Standard");

    createConnection("Santiago de Compostela", "Madrid", "Standard");
    createConnection("Santiago de Compostela", "Lisbon", "Standard");
    createConnection("Santiago de Compostela", "Cork", "Standard");
    createConnection("Santiago de Compostela", "Bristol", "Standard");

    createConnection("Seville", "Madrid", "Standard");
    createConnection("Seville", "Lisbon", "Standard");
    createConnection("Seville", "Malaga", "Standard");

    createConnection("Malaga", "Madrid", "Standard");
    createConnection("Malaga", "Seville", "Standard");
    createConnection("Malaga", "Valencia", "Standard");
    createConnection("Malaga", "Cagliari", "Standard");
    createConnection("Malaga", "Palermo", "Standard");

    createConnection("Valencia", "Madrid", "Standard");
    createConnection("Valencia", "Barcelona", "Standard");
    createConnection("Valencia", "Malaga", "Standard");
    createConnection("Valencia", "Cagliari", "Standard");
    createConnection("Valencia", "Palermo", "Standard");

    // Portugal
    createConnection("Lisbon", "Madrid", "Premium");
    createConnection("Lisbon", "Santiago de Compostela", "Standard");
    createConnection("Lisbon", "Seville", "Standard");
    createConnection("Lisbon", "Cork", "Standard");
    createConnection("Lisbon", "Bristol", "Standard");

    /*--- French Regional Market ---*/
    // France
    createConnection("Paris", "London", "Premium");
    createConnection("Paris", "Madrid", "Premium");
    createConnection("Paris", "Berlin", "Premium");
    createConnection("Paris", "Rome", "Premium");
    createConnection("Paris", "Rennes", "Standard");
    createConnection("Paris", "Bordeaux", "Standard");
    createConnection("Paris", "Brussels", "Standard");
    createConnection("Paris", "Lyon", "Standard");

    createConnection("Rennes", "Paris", "Standard");
    createConnection("Rennes", "Bordeaux", "Standard");
    createConnection("Rennes", "Bristol", "Standard");
    createConnection("Rennes", "Cork", "Standard");

    createConnection("Bordeaux", "Paris", "Premium");
    createConnection("Bordeaux", "Rennes", "Standard");
    createConnection("Bordeaux", "Montpellier", "Standard");
    createConnection("Bordeaux", "Barcelona", "Standard");

    createConnection("Lyon", "Paris", "Standard");
    createConnection("Lyon", "Montpellier", "Standard");
    createConnection("Lyon", "Zurich", "Standard");

    createConnection("Montpellier", "Bordeaux", "Standard");
    createConnection("Montpellier", "Lyon", "Standard");
    createConnection("Montpellier", "Barcelona", "Standard");
    createConnection("Montpellier", "Milan", "Standard");

    createConnection("Brussels", "Paris", "Standard");
    createConnection("Brussels", "Amsterdam", "Standard");
    createConnection("Brussels", "Frankfurt", "Standard");

    /*--- Germanic Regional Market ---*/
    // Germany
    createConnection("Berlin", "Paris", "Premium");
    createConnection("Berlin", "Gothenburg", "Premium");
    createConnection("Berlin", "Budapest", "Premium");
    createConnection("Berlin", "Amsterdam", "Standard");
    createConnection("Berlin", "Frankfurt", "Standard");
    createConnection("Berlin", "Stuttgart", "Standard");
    createConnection("Berlin", "Vejle", "Standard");
    createConnection("Berlin", "Koszalin", "Standard");
    createConnection("Berlin", "Warsaw", "Standard");
    createConnection("Berlin", "Prague", "Standard");
    createConnection("Berlin", "Linz", "Standard");

    createConnection("Frankfurt", "Berlin", "Standard");
    createConnection("Frankfurt", "Amsterdam", "Standard");
    createConnection("Frankfurt", "Brussels", "Standard");
    createConnection("Frankfurt", "Stuttgart", "Standard");
    createConnection("Frankfurt", "Vejle", "Standard");
    createConnection("Frankfurt", "Koszalin", "Standard");

    createConnection("Stuttgart", "Berlin", "Standard");
    createConnection("Stuttgart", "Frankfurt", "Standard");
    createConnection("Stuttgart", "Prague", "Standard");
    createConnection("Stuttgart", "Linz", "Standard");
    createConnection("Stuttgart", "Zurich", "Standard");

    createConnection("Amsterdam", "Berlin", "Standard");
    createConnection("Amsterdam", "Brussels", "Standard");
    createConnection("Amsterdam", "Frankfurt", "Standard");
    createConnection("Amsterdam", "Vejle", "Standard");
    createConnection("Amsterdam", "Koszalin", "Standard");

    createConnection("Zurich", "Stuttgart", "Standard");
    createConnection("Zurich", "Lyon", "Standard");
    createConnection("Zurich", "Milan", "Standard");

    createConnection("Linz", "Berlin", "Standard");
    createConnection("Linz", "Stuttgart", "Standard");
    createConnection("Linz", "Prague", "Standard");
    createConnection("Linz", "Milan", "Standard");
    createConnection("Linz", "Rijeka", "Standard");

    /*--- Greco-Roman Regional Market ---*/
    // Italy & Italian Islands
    createConnection("Rome", "Paris", "Premium");
    createConnection("Rome", "Milan", "Standard");
    createConnection("Rome", "Naples", "Standard");
    createConnection("Rome", "Cagliari", "Standard");
    createConnection("Rome", "Rijeka", "Standard");

    createConnection("Milan", "Rome", "Standard");
    createConnection("Milan", "Montpellier", "Standard");
    createConnection("Milan", "Zurich", "Standard");
    createConnection("Milan", "Linz", "Standard");
    createConnection("Milan", "Rijeka", "Standard");

    createConnection("Naples", "Rome", "Standard");
    createConnection("Naples", "Cagliari", "Standard");
    createConnection("Naples", "Palermo", "Standard");
    createConnection("Naples", "Rijeka", "Standard");

    createConnection("Cagliari", "Rome", "Standard");
    createConnection("Cagliari", "Naples", "Standard");
    createConnection("Cagliari", "Palermo", "Standard");
    createConnection("Cagliari", "Malaga", "Standard");
    createConnection("Cagliari", "Valencia", "Standard");

    createConnection("Palermo", "Cagliari", "Standard");
    createConnection("Palermo", "Naples", "Standard");
    createConnection("Palermo", "Malaga", "Standard");
    createConnection("Palermo", "Valencia", "Standard");
    createConnection("Palermo", "Athens", "Standard");
    createConnection("Palermo", "Heraklion", "Standard");

    // Greece & Greek Islands
    createConnection("Athens", "Budapest", "Premium");
    createConnection("Athens", "Palermo", "Standard");
    createConnection("Athens", "Heraklion", "Standard");
    createConnection("Athens", "Thessaloniki", "Standard");
    createConnection("Athens", "Izmir", "Standard");

    createConnection("Thessaloniki", "Athens", "Standard");
    createConnection("Thessaloniki", "Heraklion", "Standard");
    createConnection("Thessaloniki", "Izmir", "Standard");
    createConnection("Thessaloniki", "Kragujevac", "Standard");
    createConnection("Thessaloniki", "Istanbul", "Standard");

    createConnection("Heraklion", "Athens", "Standard");
    createConnection("Heraklion", "Palermo", "Standard");
    createConnection("Heraklion", "Izmir", "Standard");
    createConnection("Heraklion", "Kayseri", "Standard");
    createConnection("Heraklion", "Thessaloniki", "Standard");

    /*--- Northern European Regional Market ---*/
    createConnection("Vejle", "Berlin", "Standard");
    createConnection("Vejle", "Amsterdam", "Standard");
    createConnection("Vejle", "Koszalin", "Standard");
    createConnection("Vejle", "Frankfurt", "Standard");
    createConnection("Vejle", "Gothenburg", "Standard");
    createConnection("Vejle", "Oslo", "Standard");

    createConnection("Oslo", "Edinburgh", "Standard");
    createConnection("Oslo", "Gothenburg", "Standard");
    createConnection("Oslo", "Vejle", "Standard");

    createConnection("Gothenburg", "Oslo", "Standard");
    createConnection("Gothenburg", "Vejle", "Standard");
    createConnection("Gothenburg", "Tallinn", "Standard");
    createConnection("Gothenburg", "Berlin", "Premium");

    createConnection("Tallinn", "Gothenburg", "Standard");
    createConnection("Tallinn", "Riga", "Standard");

    createConnection("Riga", "Tallinn", "Standard");
    createConnection("Riga", "Kaunas", "Standard");

    createConnection("Kaunas", "Riga", "Standard");
    createConnection("Kaunas", "Koszalin", "Standard");
    createConnection("Kaunas", "Warsaw", "Standard");
    createConnection("Kaunas", "Minsk", "Standard");
    createConnection("Kaunas", "Ternopil", "Standard");

    /*--- Eastern European Regional Market ---*/
    // Poland
    createConnection("Warsaw", "Koszalin", "Standard");
    createConnection("Warsaw", "Berlin", "Standard");
    createConnection("Warsaw", "Prague", "Standard");
    createConnection("Warsaw", "Ternopil", "Standard");
    createConnection("Warsaw", "Kaunas", "Standard");
    createConnection("Warsaw", "Budapest", "Standard");
    createConnection("Warsaw", "Minsk", "Standard");

    createConnection("Koszalin", "Warsaw", "Standard");
    createConnection("Koszalin", "Vejle", "Standard");
    createConnection("Koszalin", "Amsterdam", "Standard");
    createConnection("Koszalin", "Frankfurt", "Standard");
    createConnection("Koszalin", "Prague", "Standard");
    createConnection("Koszalin", "Berlin", "Standard");
    createConnection("Koszalin", "Kaunas", "Standard");

    createConnection("Budapest", "Berlin", "Premium");
    createConnection("Budapest", "Athens", "Premium");
    createConnection("Budapest", "Rijeka", "Standard");
    createConnection("Budapest", "Sarajevo", "Standard");
    createConnection("Budapest", "Prague", "Standard");
    createConnection("Budapest", "Warsaw", "Standard");
    createConnection("Budapest", "Brasov", "Standard");
    createConnection("Budapest", "Kragujevac", "Standard");
    createConnection("Budapest", "Ternopil", "Standard");

    createConnection("Prague", "Berlin", "Standard");
    createConnection("Prague", "Stuttgart", "Standard");
    createConnection("Prague", "Linz", "Standard");
    createConnection("Prague", "Koszalin", "Standard");
    createConnection("Prague", "Warsaw", "Standard");
    createConnection("Prague", "Budapest", "Standard");

    createConnection("Rijeka", "Rome", "Standard");
    createConnection("Rijeka", "Milan", "Standard");
    createConnection("Rijeka", "Linz", "Standard");
    createConnection("Rijeka", "Naples", "Standard");
    createConnection("Rijeka", "Sarajevo", "Standard");
    createConnection("Rijeka", "Budapest", "Standard");

    createConnection("Sarajevo", "Rijeka", "Standard");
    createConnection("Sarajevo", "Budapest", "Standard");
    createConnection("Sarajevo", "Kragujevac", "Standard");

    createConnection("Kragujevac", "Sarajevo", "Standard");
    createConnection("Kragujevac", "Budapest", "Standard");
    createConnection("Kragujevac", "Thessaloniki", "Standard");
    createConnection("Kragujevac", "Istanbul", "Standard");
    createConnection("Kragujevac", "Brasov", "Standard");
    createConnection("Kragujevac", "Sliven", "Standard");

    createConnection("Sliven", "Brasov", "Standard");
    createConnection("Sliven", "Istanbul", "Standard");
    createConnection("Sliven", "Kragujevac", "Standard");
    createConnection("Sliven", "Chisinau", "Standard");

    createConnection("Brasov", "Budapest", "Standard");
    createConnection("Brasov", "Sliven", "Standard");
    createConnection("Brasov", "Kragujevac", "Standard");
    createConnection("Brasov", "Chisinau", "Standard");
    createConnection("Brasov", "Ternopil", "Standard");

    createConnection("Chisinau", "Brasov", "Standard");
    createConnection("Chisinau", "Sliven", "Standard");
    createConnection("Chisinau", "Ternopil", "Standard");
    createConnection("Chisinau", "Kyiv", "Standard");
    createConnection("Chisinau", "Kayseri", "Standard");

    createConnection("Minsk", "Warsaw", "Standard");
    createConnection("Minsk", "Kyiv", "Standard");
    createConnection("Minsk", "Kaunas", "Standard");
    createConnection("Minsk", "Warsaw", "Standard");

    // Ukraine
    createConnection("Kyiv", "Minsk", "Standard");
    createConnection("Kyiv", "Ternopil", "Standard");
    createConnection("Kyiv", "Chisinau", "Standard");
    createConnection("Kyiv", "Kayseri", "Standard");

    createConnection("Ternopil", "Warsaw", "Standard");
    createConnection("Ternopil", "Minsk", "Standard");
    createConnection("Ternopil", "Kaunas", "Standard");
    createConnection("Ternopil", "Kyiv", "Standard");
    createConnection("Ternopil", "Chisinau", "Standard");
    createConnection("Ternopil", "Budapest", "Standard");
    createConnection("Ternopil", "Brasov", "Standard");

    // Turkey
    createConnection("Istanbul", "Kayseri", "Standard");
    createConnection("Istanbul", "Izmir", "Standard");
    createConnection("Istanbul", "Thessaloniki", "Standard");
    createConnection("Istanbul", "Kragujevac", "Standard");
    createConnection("Istanbul", "Sliven", "Standard");

    createConnection("Izmir", "Istanbul", "Standard");
    createConnection("Izmir", "Kayseri", "Standard");
    createConnection("Izmir", "Thessaloniki", "Standard");
    createConnection("Izmir", "Athens", "Standard");
    createConnection("Izmir", "Heraklion", "Standard");

    createConnection("Kayseri", "Istanbul", "Standard");
    createConnection("Kayseri", "Izmir", "Standard");
    createConnection("Kayseri", "Heraklion", "Standard");
    createConnection("Kayseri", "Chisinau", "Standard");
    createConnection("Kayseri", "Kyiv", "Standard");
}

/* Item Helper Functions */
function createItem(name, categories, effect, tier) {
    items.set(name, { categories: categories, effect: effect, tier: tier });

    if (!userDataFlag) {
        userItems[name] = false;
    }
}

function getItemUse(item) {
    switch (item) {
        case "Hand Cuffs": return "Cuff hands behind back (if you are not using them to hold you up).";
        case "Large Plug": return "Insert a large-fitting plug.";
        case "Large Dildo": return "Replace normal dildo with a larger one.";
        case "Dildo Gag": return "Wear a dildo gag. Ensure you can still breathe.";
        case "Nipple Clamps": return "Wear nipple clamps.";
        case "Dress": return "Wear a dress on top of bra and panties. This replaces top and skirt.";
        case "Ring Gag": return "Wear a ring gag. Ensure the chosen dildo fits inside.";
        case "Vibrating Plug": return "Insert a vibrating plug at the highest intensity.";
        case "Fantasy Dildo": return "Replace normal dildo with a fantasy dildo. It must be distinct from normal dildos (e.g. veiny is not fantasy).";
        case "Tunnel Plug": return "Insert a tunnel plug. Ensur the chosen dildo fits inside.";
        case "Nose Hook": return "Insert a nose hook and bind it to a collar.";
        case "Ankle Cuffs": return "Bind your ankles together tightly with ankle cuffs.";
        case "Wig": return "Wear a wig";
        case "High Heels": return "Wear high heels";
        case "Lingerie Set": return "Wear a lingerie bralette, panties, garter belt, and stockings. Replaces all feminine wear.";
        case "Squirting Dildo": return "Replace a normal dildo with a squirting dildo. At the end of the post, squirt both outside of and in the hole used."
        case "Anal Hook": return "Insert an anal hook connected tightly to a gag, collar, or chest harness.";
        case "Face Harness": return "Wear a face harness. Must allow oral to be used with oral contracts";
        case "Tail Plug": return "Wear a tail plug.";
        case "Corset": return "Wear a tight-fitting corset.";
        case "Chastity": return "Wear a chastity cage or belt (must allow anal to use with anal contracts).";
    }
}

function getItemPerk(item) {
    cats = items.get(item).categories;
    itemPerk = [];
    for (var i = 0; i < cats.length; i++) {
        catText = React.createElement(
            'span',
            { class: "fw-bold text-" + specCoding(cats[i]) },
            cats[i]
        )

        if (i == cats.length - 1 && cats.length > 1) {
            itemPerk.push("and ");
            itemPerk.push(catText);
        } else {
            itemPerk.push(catText);
            if (cats.length > 2) {
                itemPerk.push(",");
            }
            itemPerk.push(" ");
        }
    }

    if (items.get(item).effect == "Yield") {
        itemPerk.push(" yield modifier increased by " + getItemYieldMod(item) * 100 + "%.")
    } else {
        itemPerk.push(" duration decreased by 50%.");
    }
    return itemPerk;
}

function getItemYieldMod(item) {
    var tier = items.get(item).tier;
    var base = 0;
    switch (tier) {
        case 1: base = 0.25; break;
        case 2: base = 0.5; break;
        case 3: base = 0.75; break;
        case 4: base = 1; break;
    }
    return base + 0.05 * upgrades['Artisanal Retailers'];
}

function generateItems() {
    /* Tier 1 */
    createItem("Large Plug", ["Oral"], "Duration", 1);
    createItem("Large Dildo", ["Oral", "Anal"], "Yield", 1);
    createItem("Dildo Gag", ["Anal"], "Duration", 1);
    createItem("Nipple Clamps", ["Bondage"], "Yield", 1);
    createItem("Hand Cuffs", ["Bondage"], "Yield", 1);
    createItem("Dress", ["Sissy"], "Yield", 1);
    createItem("Wig", ["Sissy"], "Yield", 1);

    /* Tier 2 */
    createItem("Ring Gag", ["Oral"], "Yield", 2);
    createItem("Vibrating Plug", ["Oral"], "Yield", 2);
    createItem("Fantasy Dildo", ["Anal"], "Yield", 2);
    createItem("Tunnel Plug", ["Anal"], "Yield", 2);
    createItem("Nose Hook", ["Bondage"], "Yield", 2);
    createItem("Ankle Cuffs", ["Bondage"], "Yield", 2);
    createItem("High Heels", ["Sissy"], "Yield", 2);
    createItem("Lingerie Set", ["Sissy"], "Yield", 2);

    /* Tier 3 */
    createItem("Squirting Dildo", ["Oral", "Anal"], "Yield", 3);
    createItem("Anal Hook", ["Oral", "Bondage"], "Yield", 3);
    createItem("Tail Plug", ["Oral", "Sissy",], "Yield", 3);
    createItem("Face Harness", ["Anal", "Bondage"], "Yield", 3);
    createItem("Corset", ["Sissy", "Bondage"], "Yield", 3);

    /* Tier 4 */
    createItem("Chastity", ["Oral", "Anal", "Sissy", "Bondage"], "Yield", 4);
}

function getIncompatibleItems(item) {
    const Mouth = ["Dildo Gag", "Ring Gag", "Face Harness"]
    const Dildo = ["Large Dildo", "Fantasy Dildo", "Squirting Dildo"]
    const Plug = ["Large Plug", "Vibrating Plug", "Anal Hook", "Tail Plug"]
    const FemWear = ["Dress", "Lingerie Set", "Corset"]

    if (Mouth.includes(item)) {
        return Mouth.filter((i) => i != item);
    } else if (Dildo.includes(item)) {
        return Dildo.filter((i) => i != item);
    } else if (Plug.includes(item)) {
        return Plug.filter((i) => i != item);
    } else if (FemWear.includes(item)) {
        return FemWear.filter((i) => i != item);
    } else {
        return [];
    }
}

function getIncompatibleItemsText(item) {
    incItems = getIncompatibleItems(item);
    incText = "";
    for (var i = 0; i < incItems.length; i++) {
        if (i == incItems.length - 1 && incItems.length > 1) {
            incText += "and " + incItems[i] + ".";
        } else {
            incText += incItems[i];
            if (incItems.length > 2) { incText += "," }
            incText += " ";
        }
    }
    return incText;
}

function getIncompatibleContracts(item) {

}