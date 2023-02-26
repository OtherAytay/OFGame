/* Data Structures */
var cities = new Map();
var cityGraph = new Map(); // Adjacency List representation
var followers = [0, 0, 0, 0, 0] // Generic, Oral, Anal, Sissy, Bondage
var currentCity = "Paris";

/* Constants */
const premiumTravel = 500; // large dotted line cost
const standardTravel = 300; // small dotted line cost
const marketTax = 100; // Tax paid to transfer regional markets
const citySpecBonus = 0.25; // 25% yield increase
const citySpecPenalty = 0.25; // 25% yield decrease

function calculateNormalYield(city, perfCat, perfRoll, augCat, augRoll) {
    // Calculate follower yields
    var followerYield = [0, 0, 0, 0, 0];

    var perfFollowerYield = [0, 0, 0, 0, 0];
    if (perfRoll > 0 && perfRoll < 10) {
        var perfYield = 10 + 2*perfRoll;
        var perfMod = 1;
        
        // City Specialization Modifier
        if (city.special == perfCat && city.market != "Northern") {
            perfMod += 0.25;
        } else {
            perfMod -= 0.25;
        }
        
        // Regional Market Modifier
        perfMod += getRegionalMarketModifier(city.market, perfCat, augRoll > 0);

        perfYield = Math.floor(perfYield * perfMod * getDiminishingReturnModifier(city.diminish));

        // Distribute follower yield
        perfFollowerYield[0] = Math.floor(perfYield / 2); // Generic followers
        if (perfCat == "Oral") { // Category-Specific Followers
            perfFollowerYield[1] = Math.ceil(perfYield / 2);
        } else {
            perfFollowerYield[2] = Math.ceil(perfYield / 2);
    }
    
    var augFollowerYield = [0, 0, 0, 0, 0];
    if (augRoll > 0 && augRoll < 10) {
        var augYield = 10 + 2*augRoll;
        var augMod = 1;
        
        // City Specialization Modifier
        if (city.special == augCat && city.market != "Northern") {
            augMod += 0.25;
        } else {
            augMod -= 0.25;
        }
        
        // Regional Market Modifier
        augMod += getRegionalMarketModifier(city.market, augCat, true);

        augYield = Math.floor(augYield * augMod * getDiminishingReturnModifier(city.diminish));

        // Distribute follower yield
        augFollowerYield[0] = Math.floor(augYield / 2); // Generic followers
        } if (augCat == "Sissy") {
            augFollowerYield[3] = Math.ceil(augYield / 2);
        } else {
            augFollowerYield[4] = Math.ceil(augYield / 2);
        }
    }

    // Add follower yields to followers
    for (var i = 0; i < followers.length; i++) {
        followerYield[i] = perfFollowerYield[i] + augFollowerYield[i];
        followers[i] = perfFollowerYield[i] + augFollowerYield[i];
    } 

}

function calculateFusionYield(city) {
    var followerYield = [0, 0, 0, 0, 0];
    switch (city) {
        case "London":
            followerYield[1] = 50;
            followerYield[3] = 50;
        case "Madrid":
            followerYield[2] = 50;
            followerYield[3] = 50;
        case "Paris":
            followerYield[1] = 50;
            followerYield[2] = 50;
        case "Berlin":
            followerYield[2] = 50;
            followerYield[4] = 50;
        case "Rome":
            followerYield[1] = 50;
            followerYield[4] = 50;
        case "Budapest":
            followerYield[3] = 50;
            followerYield[4] = 50;
    }

    for (var i = 0; i < followers.length; i++) {
        followers[i] = followerYield[i];
    } 
}

function getDiminishingReturnModifier(diminish) {
    switch (diminish) {
        case 1: return 1;
        case 2: return 0.9;
        case 3: return 0.5;
        case 4: return 0.25;
        default: return 0.1;
    }
}

function getRegionalMarketModifier(market, category, hasAug) {
    // Northern market has been omitted as it will be considered when item modifiers are evaluated.
    switch (market) {
        case "Anglo":
            if (category == "Oral") {
                return 2;
            }
        case "Iberian":
            if (category == "Sissy") {
                return 2;
            }
        case "French":
            if (category == "Oral" || category == "Anal") {
                return 0.5;
            }
        case "Germanic":
            if (category == "Anal") {
                return 2;
            }
        case "Greco-Roman":
            if (category == "Bondage") {
                return 2;
            }
        case "Eastern":
            if (hasAug) {
                return 1;
            } else {
                return -0.5;
            }
        default:
            return 0;
    }
}

/* HELPER FUNCTIONS */

function createCity(name, size, special, market, x, y) {
    var fusionAvailable = false;
    if (special.match(/\w* \/ \w*/) != null) {
        fusionAvailable = true;
    }
    
    cities.set(name, {size: size, special: special, market: market, x: x, y:y, posts: 0, fusionAvailable: fusionAvailable});
}

function createConnection(srcCity, destCity, cost) {
    if (cityGraph.has(srcCity)) {
        cityGraph.set(srcCity, cityGraph.get(srcCity).concat([{destCity: destCity, cost: cost}]));
    } else {
        cityGraph.set(srcCity,[{destCity: destCity, cost: cost}]);
    }
}


/*--- Information Retrieval ---*/

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
            return "Lying on bed with head hanging off. Medium pace and deep. Hold deepthroat for 3 seconds every 20 seconds";
        case 8:
            return "Sitting on your knees. Deepthroat 20 times, holding each for 5 seconds.";
        case 9:
            return "Standing on your knees. Deepthroat 5 times, holding each for 15 seconds.";
        case 10:
            return "Lying on bed with head hanging off. Fast facefuck hitting throat with each thrust. Hold deepthroat to take a break.";
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
            return "Standing on your knees. Slow, up to the throat, and sensual. Deepthroat every 10 seconds.";
        case 6:
            return "Face down, ass up. Using 2 fingers of each hand, gape your asshole for 30 seconds. Do this 6 times.";
        case 7:
            return "On your stomach. Fast in, slow out, and deep.";
        case 8:
            return "Piledriver. Fast and deep.";
        case 9:
            return "Place your longest dildo on the ground, and sit on your knees over it.";
        case 10:
            return "Doggystyle. Fast and deep.";
    }
}

function getSissyContract(roll) {
    switch (roll) {
        case 1:
            return "Wear a bra and panties for the next post. Push panties aside or drop them for anal posts.";
        case 2:
            return "Wear a bra, panties, and short skirt for the next post.";
        case 3:
            return "Wear a bra, panties, short skirt, feminine crop top, and high thigh stockings for the next post.";
        case 4:
            return "Wear a sports / activewear bra and leggings for the next post.";
        case 5:
            return "Wear a matching lingerie set for the next post.";
        case 6:
            return "Wear a buttplug during your next oral post.";
        case 7:
            return "Apply Lipstick and Lipgloss for your next post.";
        case 8:
            return "Apply Lipstick and Lip gloss, as well as eyeshadow and eyeliner for your next post.";
        case 9:
            return "Apply full face makeup, including foundation, concealer, and blush for your next post.";
        case 10:
            return "Write degrading words or phrases on your breasts and ass with lipstick for the next post.";
    }
}

function getBondageContract(roll) {
    switch (roll) {
        case 1:
            return "Wear a collar for the next post.";
        case 2:
            return "Wear a chest harness for your next post.";
        case 3:
            return "Spend 10 minutes in a frogtie.";
        case 4:
            return "Spend 10 minutes in a hogtie.";
        case 5:
            return "Tie legs behind head for the next anal post. Overrides position.";
        case 6:
            return "Tie your hands behind your back during your next oral post.";
        case 7:
            return "Wear an crotch rope attached to a collar or tight chest harness during your next oral post.";
        case 8:
            return "Wear a mouth gag during your next anal post.";
        case 9:
            return "Spend 10 minutes in a frogtie with a crotch rope pulling on a collar.";
        case 10:
            return "Spend 10 minutes in a hogtie with a crotch rope pulling on a collar.";
    }
}

function getFusionContract(city) {
    switch (city) {
        case "London":
            return "Apply heavy eyeshadow, eyeliner, and mascara. Deepthroat 50 times, holding each for 10 seconds. Your makeup should run down your face.";
        case "Madrid":
            return "Wear a full feminine outfit and makeup. Film a post of you revealing, removing, and inserting a buttplug multiple times under your skirt or panties.";
        case "Paris":
            return "Spitroast yourself for 5 minutes, alternating balls deep on the dildos. Show multiple camera angles.";
        case "Berlin":
            return "Apply full body bondage (tight chest harness and crotch rope). Spend 15 minutes in a frogtie with an anal hook pulling on a collar.";
        case "Rome":
            return "Apply full body bondage (chest harness and crotch rope). Tie a dildo or buttplug into your mouth (or use a dildo gag) for 10 minutes. Make sure you can breathe and can easily remove it in an emergency.";
        case "Budapest":
            return "Wear a full feminine outfit and makeup. Apply full body bondage (tight chest harness and crotch rope) over the clothing into a frogtie position for 15 minutes.";
    }
}

function getRegionalMarketCharacteristics(city) {
    switch (city.market) {
        case "Anglo":
            return "Oral contract yields are increased by 200%, but task time is increased by 100%.";
        case "Iberian":
            return "Sissy contract yields are increased by 200%, but last for the next 2 tasks instead of 1.";
        case "French":
            return "You must wear a buttplug during oral contracts and a mouth gag during anal contracts. Oral / Anal contract yields increased by 50%.";
        case "Germanic":
            return "Anal contract yields are increased by 200%, but task time is increased by 100%.";
        case "Greco-Roman":
            return "Bondage contract yields are increased by 200%, but last for the next 2 tasks instead of 1.";
        case "Northern":
            return "Item bonuses are increased by 100%, but city specialization positive effects are disabled.";
        case "Eastern":
            return "Posts with augmentations have yields increased by 100%, but posts without augmentations have yields decreased by 50%.";
    }
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
    createCity("Thessaloniki", "Small", "Bondage", "Greco-Roman", 73.75 , 117.5);
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
}

function generateConnections() {
    /*--- Anglo Regional Market ---*/
    // United Kingdom
    createConnection("London", "Dublin", premiumTravel);
    createConnection("London", "Paris", premiumTravel + marketTax);
    createConnection("London", "Bristol", standardTravel);
    
    createConnection("Bristol", "London", standardTravel);
    createConnection("Bristol", "Manchester", standardTravel);
    createConnection("Bristol", "Cork", standardTravel);
    createConnection("Bristol", "Rennes", standardTravel + marketTax);
    createConnection("Bristol", "Santiago de Compostela", standardTravel + marketTax);
    createConnection("Bristol", "Lisbon", standardTravel + marketTax);

    createConnection("Manchester", "Bristol", standardTravel);
    createConnection("Manchester", "Dublin", standardTravel);
    createConnection("Manchester", "Edinburgh", standardTravel);

    createConnection("Edinburgh", "Manchester", standardTravel);
    createConnection("Edinburgh", "Dublin", standardTravel);
    
    // Ireland
    createConnection("Dublin", "Cork", standardTravel);
    createConnection("Dublin", "Edinburgh", standardTravel);
    createConnection("Dublin", "Manchester", standardTravel);
    createConnection("Dublin", "London", premiumTravel);

    createConnection("Cork", "Dublin", standardTravel);
    createConnection("Cork", "Bristol", standardTravel);
    createConnection("Cork", "Santiago de Compostela", standardTravel + marketTax);
    createConnection("Cork", "Rennes", standardTravel + marketTax);

    /*--- Iberian Regional Market ---*/
    // Spain
    createConnection("Madrid", "Lisbon", premiumTravel);
    createConnection("Madrid", "Paris", premiumTravel + marketTax);
    createConnection("Madrid","Barcelona", standardTravel);
    createConnection("Madrid", "Santiago de Compostela", standardTravel);
    createConnection("Madrid", "Seville", standardTravel);
    createConnection("Madrid", "Malaga", standardTravel);
    createConnection("Madrid", "Valencia", standardTravel);

    createConnection("Barcelona", "Madrid", standardTravel);
    createConnection("Barcelona", "Valencia", standardTravel);
    createConnection("Barcelona", "Bordeaux", standardTravel + marketTax);
    createConnection("Barcelona", "Montpellier", standardTravel + marketTax);

    createConnection("Santiago de Compostela", "Madrid", standardTravel);
    createConnection("Santiago de Compostela", "Lisbon", standardTravel);
    createConnection("Santiago de Compostela", "Cork", standardTravel + marketTax);
    createConnection("Santiago de Compostela", "Bristol", standardTravel + marketTax);

    createConnection("Seville", "Madrid", standardTravel);
    createConnection("Seville", "Lisbon", standardTravel);
    createConnection("Seville", "Malaga", standardTravel);

    createConnection("Malaga", "Madrid", standardTravel);
    createConnection("Malaga", "Seville", standardTravel);
    createConnection("Malaga", "Valencia", standardTravel);
    createConnection("Malaga", "Cagliari", standardTravel + marketTax);
    createConnection("Malaga", "Palermo", standardTravel + marketTax);

    createConnection("Valencia", "Madrid", standardTravel);
    createConnection("Valencia", "Barcelona", standardTravel);
    createConnection("Valencia", "Malaga", standardTravel);
    createConnection("Valencia", "Cagliari", standardTravel + marketTax);
    createConnection("Valencia", "Palermo", standardTravel + marketTax);

    // Portugal
    createConnection("Lisbon", "Madrid", premiumTravel);
    createConnection("Lisbon", "Santiago de Compostela", standardTravel);
    createConnection("Lisbon", "Seville", standardTravel);
    createConnection("Lisbon", "Cork", standardTravel + marketTax);
    createConnection("Lisbon", "Bristol", standardTravel + marketTax);

    /*--- French Regional Market ---*/
    // France
    createConnection("Paris", "London", premiumTravel + marketTax);
    createConnection("Paris", "Madrid", premiumTravel + marketTax);
    createConnection("Paris", "Berlin", premiumTravel + marketTax);
    createConnection("Paris", "Rome", premiumTravel + marketTax);
    createConnection("Paris", "Rennes", standardTravel);
    createConnection("Paris", "Bordeaux", standardTravel);
    createConnection("Paris", "Brussels", standardTravel);
    createConnection("Paris", "Lyon", standardTravel);

    createConnection("Rennes", "Paris", standardTravel);
    createConnection("Rennes", "Bordeaux", standardTravel);
    createConnection("Rennes", "Bristol", standardTravel + marketTax);
    createConnection("Rennes", "Cork", standardTravel + marketTax);
    
    createConnection("Bordeaux", "Paris", premiumTravel);
    createConnection("Bordeaux", "Rennes", standardTravel);
    createConnection("Bordeaux", "Montpellier", standardTravel);
    createConnection("Bordeaux", "Barcelona", standardTravel + marketTax);

    createConnection("Lyon", "Paris", standardTravel);
    createConnection("Lyon", "Montpellier", standardTravel);
    createConnection("Lyon", "Zurich", standardTravel + marketTax);

    createConnection("Montpellier", "Bordeaux", standardTravel);
    createConnection("Montpellier", "Lyon", standardTravel);
    createConnection("Montpellier", "Barcelona", standardTravel + marketTax);
    createConnection("Montpellier", "Milan", standardTravel + marketTax);

    createConnection("Brussels", "Paris", standardTravel);
    createConnection("Brussels", "Amsterdam", standardTravel + marketTax);
    createConnection("Brussels", "Frankfurt", standardTravel + marketTax);

    /*--- Germanic Regional Market ---*/
    // Germany
    createConnection("Berlin", "Paris", premiumTravel + marketTax);
    createConnection("Berlin", "Gothenburg", premiumTravel + marketTax);
    createConnection("Berlin", "Budapest", premiumTravel + marketTax);
    createConnection("Berlin", "Amsterdam", standardTravel);
    createConnection("Berlin", "Frankfurt", standardTravel);
    createConnection("Berlin", "Stuttgart", standardTravel);
    createConnection("Berlin", "Vejle", standardTravel + marketTax);
    createConnection("Berlin", "Koszalin", standardTravel + marketTax);
    createConnection("Berlin", "Warsaw", standardTravel + marketTax);
    createConnection("Berlin", "Prague", standardTravel + marketTax);
    createConnection("Berlin", "Linz", standardTravel);

    createConnection("Frankfurt", "Berlin", standardTravel);
    createConnection("Frankfurt", "Amsterdam", standardTravel);
    createConnection("Frankfurt", "Brussels", standardTravel + marketTax);
    createConnection("Frankfurt", "Stuttgart", standardTravel);
    createConnection("Frankfurt", "Vejle", standardTravel + marketTax);
    createConnection("Frankfurt", "Koszalin", standardTravel + marketTax);

    createConnection("Stuttgart", "Berlin", standardTravel);
    createConnection("Stuttgart", "Frankfurt", standardTravel);
    createConnection("Stuttgart", "Prague", standardTravel + marketTax);
    createConnection("Stuttgart", "Linz", standardTravel);
    createConnection("Stuttgart", "Zurich", standardTravel);
    
    createConnection("Amsterdam", "Berlin", standardTravel);
    createConnection("Amsterdam", "Brussels", standardTravel + marketTax);
    createConnection("Amsterdam", "Frankfurt", standardTravel);
    createConnection("Amsterdam", "Vejle", standardTravel + marketTax);
    createConnection("Amsterdam", "Koszalin", standardTravel + marketTax);

    createConnection("Zurich", "Stuttgart", standardTravel);
    createConnection("Zurich", "Lyon", standardTravel + marketTax);
    createConnection("Zurich", "Milan", standardTravel + marketTax);

    createConnection("Linz", "Berlin", standardTravel); 
    createConnection("Linz", "Stuttgart", standardTravel);
    createConnection("Linz", "Prague", standardTravel + marketTax);
    createConnection("Linz", "Milan", standardTravel + marketTax);
    createConnection("Linz", "Rijeka", standardTravel + marketTax);    

    /*--- Greco-Roman Regional Market ---*/
    // Italy & Italian Islands
    createConnection("Rome", "Paris", premiumTravel + marketTax);
    createConnection("Rome", "Milan", standardTravel);
    createConnection("Rome", "Naples", standardTravel);
    createConnection("Rome", "Cagliari", standardTravel);
    createConnection("Rome", "Rijeka", standardTravel);
    
    createConnection("Milan", "Rome", standardTravel);
    createConnection("Milan", "Montpellier", standardTravel + marketTax);
    createConnection("Milan", "Zurich", standardTravel + marketTax);
    createConnection("Milan", "Linz", standardTravel + marketTax);
    createConnection("Milan", "Rijeka", standardTravel + marketTax);

    createConnection("Naples", "Rome", standardTravel);
    createConnection("Naples", "Cagliari", standardTravel);
    createConnection("Naples", "Palermo", standardTravel);
    createConnection("Naples", "Rijeka", standardTravel + marketTax);

    createConnection("Cagliari", "Rome", standardTravel);
    createConnection("Cagliari", "Naples", standardTravel);
    createConnection("Cagliari", "Palermo", standardTravel);
    createConnection("Cagliari", "Malaga", standardTravel + marketTax);
    createConnection("Cagliari", "Valencia", standardTravel + marketTax);

    createConnection("Palermo", "Cagliari", standardTravel);
    createConnection("Palermo", "Naples", standardTravel);
    createConnection("Palermo", "Malaga", standardTravel + marketTax);
    createConnection("Palermo", "Valencia", standardTravel + marketTax);
    createConnection("Palermo", "Athens", standardTravel);
    createConnection("Palermo", "Heraklion", standardTravel);

    // Greece & Greek Islands
    createConnection("Athens", "Budapest", premiumTravel + marketTax);
    createConnection("Athens", "Palermo", standardTravel);
    createConnection("Athens", "Heraklion", standardTravel);
    createConnection("Athens", "Thessaloniki", standardTravel);
    createConnection("Athens", "Izmir", standardTravel + marketTax);

    createConnection("Thessaloniki", "Athens", standardTravel);
    createConnection("Thessaloniki", "Heraklion", standardTravel);
    createConnection("Thessaloniki", "Izmir", standardTravel + marketTax);
    createConnection("Thessaloniki", "Kragujevac", standardTravel + marketTax);
    createConnection("Thessaloniki", "Istanbul", standardTravel + marketTax);
    
    createConnection("Heraklion", "Athens", standardTravel);
    createConnection("Heraklion", "Palermo", standardTravel);
    createConnection("Heraklion", "Izmir", standardTravel + marketTax);
    createConnection("Heraklion", "Kayseri", standardTravel + marketTax);
    createConnection("Heraklion", "Thessaloniki", standardTravel);

    /*--- Northern European Regional Market ---*/
    createConnection("Vejle", "Berlin", standardTravel + marketTax);
    createConnection("Vejle", "Amsterdam", standardTravel + marketTax);
    createConnection("Vejle", "Koszalin", standardTravel + marketTax);
    createConnection("Vejle", "Frankfurt", standardTravel + marketTax);
    createConnection("Vejle", "Gothenburg", standardTravel);
    createConnection("Vejle", "Oslo", standardTravel);
    
    createConnection("Oslo", "Edinburgh", standardTravel + marketTax);
    createConnection("Oslo", "Gothenburg", standardTravel);
    createConnection("Oslo", "Vejle", standardTravel);

    createConnection("Gothenburg", "Oslo", standardTravel);
    createConnection("Gothenburg", "Vejle", standardTravel);
    createConnection("Gothenburg", "Tallinn", standardTravel);
    createConnection("Gothenburg", "Berlin", premiumTravel + marketTax);
    
    createConnection("Tallinn", "Gothenburg", standardTravel);
    createConnection("Tallinn", "Riga", standardTravel);
    
    createConnection("Riga", "Tallinn", standardTravel);
    createConnection("Riga", "Kaunas", standardTravel);
    
    createConnection("Kaunas", "Riga", standardTravel);
    createConnection("Kaunas", "Koszalin", standardTravel + marketTax);
    createConnection("Kaunas", "Warsaw", standardTravel + marketTax);
    createConnection("Kaunas", "Minsk", standardTravel + marketTax);
    createConnection("Kaunas", "Ternopil", standardTravel + marketTax);

    /*--- Eastern European Regional Market ---*/
    // Poland
    createConnection("Warsaw", "Koszalin", standardTravel);
    createConnection("Warsaw", "Berlin", standardTravel + marketTax);
    createConnection("Warsaw", "Prague", standardTravel);
    createConnection("Warsaw", "Ternopil", standardTravel);
    createConnection("Warsaw", "Kaunas", standardTravel);
    createConnection("Warsaw", "Budapest", standardTravel);
    createConnection("Warsaw", "Minsk", standardTravel);

    createConnection("Koszalin", "Warsaw", standardTravel);
    createConnection("Koszalin", "Velje", standardTravel + marketTax);
    createConnection("Koszalin", "Amsterdam", standardTravel + marketTax);
    createConnection("Koszalin", "Frankfurt", standardTravel + marketTax);
    createConnection("Koszalin", "Prague", standardTravel);
    createConnection("Koszalin", "Berlin", standardTravel + marketTax);
    createConnection("Koszalin", "Kaunas", standardTravel + marketTax);

    createConnection("Budapest", "Berlin", premiumTravel + marketTax);
    createConnection("Budapest", "Athens", premiumTravel + marketTax);
    createConnection("Budapest", "Rijeka", standardTravel);
    createConnection("Budapest", "Sarajevo", standardTravel);
    createConnection("Budapest", "Prague", standardTravel);
    createConnection("Budapest", "Warsaw", standardTravel);
    createConnection("Budapest", "Brasov", standardTravel);
    createConnection("Budapest", "Kragujevac", standardTravel);
    createConnection("Budapest", "Ternopil", standardTravel);

    createConnection("Prague", "Berlin", standardTravel + marketTax);
    createConnection("Prague", "Stuttgart", standardTravel + marketTax);
    createConnection("Prague", "Linz", standardTravel + marketTax);
    createConnection("Prague", "Koszalin", standardTravel);
    createConnection("Prague", "Warsaw", standardTravel);
    createConnection("Prague", "Budapest", standardTravel);

    createConnection("Rijeka", "Rome", standardTravel + marketTax);
    createConnection("Rijeka", "Milan", standardTravel + marketTax);
    createConnection("Rijeka", "Linz", standardTravel + marketTax);
    createConnection("Rijeka", "Naples", standardTravel + marketTax);
    createConnection("Rijeka", "Sarajevo", standardTravel);
    createConnection("Rijeka", "Budapest", standardTravel);

    createConnection("Sarajevo", "Rijeka", standardTravel);
    createConnection("Sarajevo", "Budapest", standardTravel);
    createConnection("Sarajevo", "Kragujevac", standardTravel);
    
    createConnection("Kragujevac", "Sarajevo", standardTravel);
    createConnection("Kragujevac", "Budapest", standardTravel);
    createConnection("Kragujevac", "Thessaloniki", standardTravel + marketTax);
    createConnection("Kragujevac", "Istanbul", standardTravel);
    createConnection("Kragujevac", "Brasov", standardTravel);
    createConnection("Kragujevac", "Sliven", standardTravel);

    createConnection("Sliven", "Brasov", standardTravel);
    createConnection("Sliven", "Istanbul", standardTravel);
    createConnection("Sliven", "Kragujevac", standardTravel);
    createConnection("Sliven", "Chisinau", standardTravel);

    createConnection("Brasov", "Budapest", standardTravel);
    createConnection("Brasov", "Sliven", standardTravel);
    createConnection("Brasov", "Kragujevac", standardTravel);
    createConnection("Brasov", "Chisinau", standardTravel);
    createConnection("Brasov", "Ternopil", standardTravel);

    createConnection("Chisinau", "Brasov", standardTravel);
    createConnection("Chisinau", "Sliven", standardTravel);
    createConnection("Chisinau", "Ternopil", standardTravel);
    createConnection("Chisinau", "Kyiv", standardTravel);
    createConnection("Chisinau", "Kayseri", standardTravel);

    createConnection("Minsk", "Warsaw", standardTravel);
    createConnection("Minsk", "Kyiv", standardTravel);
    createConnection("Minsk", "Kaunas", standardTravel + marketTax);
    createConnection("Minsk", "Warsaw", standardTravel);
    
    // Ukraine
    createConnection("Kyiv", "Minsk", standardTravel);
    createConnection("Kyiv", "Ternopil", standardTravel);
    createConnection("Kyiv", "Chisinau", standardTravel);
    createConnection("Kyiv", "Kayseri", standardTravel);
    
    createConnection("Ternopil", "Warsaw", standardTravel);
    createConnection("Ternopil", "Minsk", standardTravel);
    createConnection("Ternopil", "Kaunas", standardTravel + marketTax);
    createConnection("Ternopil", "Kyiv", standardTravel);
    createConnection("Ternopil", "Chisinau", standardTravel);
    createConnection("Ternopil", "Budapest", standardTravel);
    createConnection("Ternopil", "Brasov", standardTravel);

    // Turkey
    createConnection("Istanbul", "Kayseri", standardTravel);
    createConnection("Istanbul", "Izmir", standardTravel);
    createConnection("Istanbul", "Thessaloniki", standardTravel + marketTax);
    createConnection("Istanbul", "Kragujevac", standardTravel);
    createConnection("Istanbul", "Sliven", standardTravel);

    createConnection("Izmir", "Istanbul", standardTravel);
    createConnection("Izmir", "Kayseri", standardTravel);
    createConnection("Izmir", "Thessaloniki", standardTravel + marketTax);
    createConnection("Izmir", "Athens", standardTravel + marketTax);
    createConnection("Izmir", "Heraklion", standardTravel + marketTax);
    
    createConnection("Kayseri", "Istanbul", standardTravel);
    createConnection("Kayseri", "Izmir", standardTravel);
    createConnection("Kayseri", "Heraklion", standardTravel + marketTax);
    createConnection("Kayseri", "Chisinau", standardTravel);
    createConnection("Kayseri", "Kyiv", standardTravel);
}