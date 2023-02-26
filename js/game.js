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
    createConnection("London", "Dublin", "Premium", premiumTravel);
    createConnection("London", "Paris", "Premium", premiumTravel + marketTax);
    createConnection("London", "Bristol", "Standard", standardTravel);
    
    createConnection("Bristol", "London", "Standard", standardTravel);
    createConnection("Bristol", "Manchester", "Standard", standardTravel);
    createConnection("Bristol", "Cork", "Standard", standardTravel);
    createConnection("Bristol", "Rennes", "Standard", standardTravel + marketTax);
    createConnection("Bristol", "Santiago de Compostela", "Standard", standardTravel + marketTax);
    createConnection("Bristol", "Lisbon", "Standard", standardTravel + marketTax);

    createConnection("Manchester", "Bristol", "Standard", standardTravel);
    createConnection("Manchester", "Dublin", "Standard", standardTravel);
    createConnection("Manchester", "Edinburgh", "Standard", standardTravel);

    createConnection("Edinburgh", "Manchester", "Standard", standardTravel);
    createConnection("Edinburgh", "Dublin", "Standard", standardTravel);
    
    // Ireland
    createConnection("Dublin", "Cork", "Standard", standardTravel);
    createConnection("Dublin", "Edinburgh", "Standard", standardTravel);
    createConnection("Dublin", "Manchester", "Standard", standardTravel);
    createConnection("Dublin", "London", "Premium", premiumTravel);

    createConnection("Cork", "Dublin", "Standard", standardTravel);
    createConnection("Cork", "Bristol", "Standard", standardTravel);
    createConnection("Cork", "Santiago de Compostela", "Standard", standardTravel + marketTax);
    createConnection("Cork", "Rennes", "Standard", standardTravel + marketTax);

    /*--- Iberian Regional Market ---*/
    // Spain
    createConnection("Madrid", "Lisbon", "Premium", premiumTravel);
    createConnection("Madrid", "Paris", "Premium", premiumTravel + marketTax);
    createConnection("Madrid","Barcelona", "Standard", standardTravel);
    createConnection("Madrid", "Santiago de Compostela", "Standard", standardTravel);
    createConnection("Madrid", "Seville", "Standard", standardTravel);
    createConnection("Madrid", "Malaga", "Standard", standardTravel);
    createConnection("Madrid", "Valencia", "Standard", standardTravel);

    createConnection("Barcelona", "Madrid", "Standard", standardTravel);
    createConnection("Barcelona", "Valencia", "Standard", standardTravel);
    createConnection("Barcelona", "Bordeaux", "Standard", standardTravel + marketTax);
    createConnection("Barcelona", "Montpellier", "Standard", standardTravel + marketTax);

    createConnection("Santiago de Compostela", "Madrid", "Standard", standardTravel);
    createConnection("Santiago de Compostela", "Lisbon", "Standard", standardTravel);
    createConnection("Santiago de Compostela", "Cork", "Standard", standardTravel + marketTax);
    createConnection("Santiago de Compostela", "Bristol", "Standard", standardTravel + marketTax);

    createConnection("Seville", "Madrid", "Standard", standardTravel);
    createConnection("Seville", "Lisbon", "Standard", standardTravel);
    createConnection("Seville", "Malaga", "Standard", standardTravel);

    createConnection("Malaga", "Madrid", "Standard", standardTravel);
    createConnection("Malaga", "Seville", "Standard", standardTravel);
    createConnection("Malaga", "Valencia", "Standard", standardTravel);
    createConnection("Malaga", "Cagliari", "Standard", standardTravel + marketTax);
    createConnection("Malaga", "Palermo", "Standard", standardTravel + marketTax);

    createConnection("Valencia", "Madrid", "Standard", standardTravel);
    createConnection("Valencia", "Barcelona", "Standard", standardTravel);
    createConnection("Valencia", "Malaga", "Standard", standardTravel);
    createConnection("Valencia", "Cagliari", "Standard", standardTravel + marketTax);
    createConnection("Valencia", "Palermo", "Standard", standardTravel + marketTax);

    // Portugal
    createConnection("Lisbon", "Madrid", "Premium", premiumTravel);
    createConnection("Lisbon", "Santiago de Compostela", "Standard", standardTravel);
    createConnection("Lisbon", "Seville", "Standard", standardTravel);
    createConnection("Lisbon", "Cork", "Standard", standardTravel + marketTax);
    createConnection("Lisbon", "Bristol", "Standard", standardTravel + marketTax);

    /*--- French Regional Market ---*/
    // France
    createConnection("Paris", "London", "Premium", premiumTravel + marketTax);
    createConnection("Paris", "Madrid", "Premium", premiumTravel + marketTax);
    createConnection("Paris", "Berlin", "Premium", premiumTravel + marketTax);
    createConnection("Paris", "Rome", "Premium", premiumTravel + marketTax);
    createConnection("Paris", "Rennes", "Standard", standardTravel);
    createConnection("Paris", "Bordeaux", "Standard", standardTravel);
    createConnection("Paris", "Brussels", "Standard", standardTravel);
    createConnection("Paris", "Lyon", "Standard", standardTravel);

    createConnection("Rennes", "Paris", "Standard", standardTravel);
    createConnection("Rennes", "Bordeaux", "Standard", standardTravel);
    createConnection("Rennes", "Bristol", "Standard", standardTravel + marketTax);
    createConnection("Rennes", "Cork", "Standard", standardTravel + marketTax);
    
    createConnection("Bordeaux", "Paris", "Premium", premiumTravel);
    createConnection("Bordeaux", "Rennes", "Standard", standardTravel);
    createConnection("Bordeaux", "Montpellier", "Standard", standardTravel);
    createConnection("Bordeaux", "Barcelona", "Standard", standardTravel + marketTax);

    createConnection("Lyon", "Paris", "Standard", standardTravel);
    createConnection("Lyon", "Montpellier", "Standard", standardTravel);
    createConnection("Lyon", "Zurich", "Standard", standardTravel + marketTax);

    createConnection("Montpellier", "Bordeaux", "Standard", standardTravel);
    createConnection("Montpellier", "Lyon", "Standard", standardTravel);
    createConnection("Montpellier", "Barcelona", "Standard", standardTravel + marketTax);
    createConnection("Montpellier", "Milan", "Standard", standardTravel + marketTax);

    createConnection("Brussels", "Paris", "Standard", standardTravel);
    createConnection("Brussels", "Amsterdam", "Standard", standardTravel + marketTax);
    createConnection("Brussels", "Frankfurt", "Standard", standardTravel + marketTax);

    /*--- Germanic Regional Market ---*/
    // Germany
    createConnection("Berlin", "Paris", "Premium", premiumTravel + marketTax);
    createConnection("Berlin", "Gothenburg", "Premium", premiumTravel + marketTax);
    createConnection("Berlin", "Budapest", "Premium", premiumTravel + marketTax);
    createConnection("Berlin", "Amsterdam", "Standard", standardTravel);
    createConnection("Berlin", "Frankfurt", "Standard", standardTravel);
    createConnection("Berlin", "Stuttgart", "Standard", standardTravel);
    createConnection("Berlin", "Vejle", "Standard", standardTravel + marketTax);
    createConnection("Berlin", "Koszalin", "Standard", standardTravel + marketTax);
    createConnection("Berlin", "Warsaw", "Standard", standardTravel + marketTax);
    createConnection("Berlin", "Prague", "Standard", standardTravel + marketTax);
    createConnection("Berlin", "Linz", "Standard", standardTravel);

    createConnection("Frankfurt", "Berlin", "Standard", standardTravel);
    createConnection("Frankfurt", "Amsterdam", "Standard", standardTravel);
    createConnection("Frankfurt", "Brussels", "Standard", standardTravel + marketTax);
    createConnection("Frankfurt", "Stuttgart", "Standard", standardTravel);
    createConnection("Frankfurt", "Vejle", "Standard", standardTravel + marketTax);
    createConnection("Frankfurt", "Koszalin", "Standard", standardTravel + marketTax);

    createConnection("Stuttgart", "Berlin", "Standard", standardTravel);
    createConnection("Stuttgart", "Frankfurt", "Standard", standardTravel);
    createConnection("Stuttgart", "Prague", "Standard", standardTravel + marketTax);
    createConnection("Stuttgart", "Linz", "Standard", standardTravel);
    createConnection("Stuttgart", "Zurich", "Standard", standardTravel);
    
    createConnection("Amsterdam", "Berlin", "Standard", standardTravel);
    createConnection("Amsterdam", "Brussels", "Standard", standardTravel + marketTax);
    createConnection("Amsterdam", "Frankfurt", "Standard", standardTravel);
    createConnection("Amsterdam", "Vejle", "Standard", standardTravel + marketTax);
    createConnection("Amsterdam", "Koszalin", "Standard", standardTravel + marketTax);

    createConnection("Zurich", "Stuttgart", "Standard", standardTravel);
    createConnection("Zurich", "Lyon", "Standard", standardTravel + marketTax);
    createConnection("Zurich", "Milan", "Standard", standardTravel + marketTax);

    createConnection("Linz", "Berlin", "Standard", standardTravel); 
    createConnection("Linz", "Stuttgart", "Standard", standardTravel);
    createConnection("Linz", "Prague", "Standard", standardTravel + marketTax);
    createConnection("Linz", "Milan", "Standard", standardTravel + marketTax);
    createConnection("Linz", "Rijeka", "Standard", standardTravel + marketTax);    

    /*--- Greco-Roman Regional Market ---*/
    // Italy & Italian Islands
    createConnection("Rome", "Paris", "Premium", premiumTravel + marketTax);
    createConnection("Rome", "Milan", "Standard", standardTravel);
    createConnection("Rome", "Naples", "Standard", standardTravel);
    createConnection("Rome", "Cagliari", "Standard", standardTravel);
    createConnection("Rome", "Rijeka", "Standard", standardTravel);
    
    createConnection("Milan", "Rome", "Standard", standardTravel);
    createConnection("Milan", "Montpellier", "Standard", standardTravel + marketTax);
    createConnection("Milan", "Zurich", "Standard", standardTravel + marketTax);
    createConnection("Milan", "Linz", "Standard", standardTravel + marketTax);
    createConnection("Milan", "Rijeka", "Standard", standardTravel + marketTax);

    createConnection("Naples", "Rome", "Standard", standardTravel);
    createConnection("Naples", "Cagliari", "Standard", standardTravel);
    createConnection("Naples", "Palermo", "Standard", standardTravel);
    createConnection("Naples", "Rijeka", "Standard", standardTravel + marketTax);

    createConnection("Cagliari", "Rome", "Standard", standardTravel);
    createConnection("Cagliari", "Naples", "Standard", standardTravel);
    createConnection("Cagliari", "Palermo", "Standard", standardTravel);
    createConnection("Cagliari", "Malaga", "Standard", standardTravel + marketTax);
    createConnection("Cagliari", "Valencia", "Standard", standardTravel + marketTax);

    createConnection("Palermo", "Cagliari", "Standard", standardTravel);
    createConnection("Palermo", "Naples", "Standard", standardTravel);
    createConnection("Palermo", "Malaga", "Standard", standardTravel + marketTax);
    createConnection("Palermo", "Valencia", "Standard", standardTravel + marketTax);
    createConnection("Palermo", "Athens", "Standard", standardTravel);
    createConnection("Palermo", "Heraklion", "Standard", standardTravel);

    // Greece & Greek Islands
    createConnection("Athens", "Budapest", "Premium", premiumTravel + marketTax);
    createConnection("Athens", "Palermo", "Standard", standardTravel);
    createConnection("Athens", "Heraklion", "Standard", standardTravel);
    createConnection("Athens", "Thessaloniki", "Standard", standardTravel);
    createConnection("Athens", "Izmir", "Standard", standardTravel + marketTax);

    createConnection("Thessaloniki", "Athens", "Standard", standardTravel);
    createConnection("Thessaloniki", "Heraklion", "Standard", standardTravel);
    createConnection("Thessaloniki", "Izmir", "Standard", standardTravel + marketTax);
    createConnection("Thessaloniki", "Kragujevac", "Standard", standardTravel + marketTax);
    createConnection("Thessaloniki", "Istanbul", "Standard", standardTravel + marketTax);
    
    createConnection("Heraklion", "Athens", "Standard", standardTravel);
    createConnection("Heraklion", "Palermo", "Standard", standardTravel);
    createConnection("Heraklion", "Izmir", "Standard", standardTravel + marketTax);
    createConnection("Heraklion", "Kayseri", "Standard", standardTravel + marketTax);
    createConnection("Heraklion", "Thessaloniki", "Standard", standardTravel);

    /*--- Northern European Regional Market ---*/
    createConnection("Vejle", "Berlin", "Standard", standardTravel + marketTax);
    createConnection("Vejle", "Amsterdam", "Standard", standardTravel + marketTax);
    createConnection("Vejle", "Koszalin", "Standard", standardTravel + marketTax);
    createConnection("Vejle", "Frankfurt", "Standard", standardTravel + marketTax);
    createConnection("Vejle", "Gothenburg", "Standard", standardTravel);
    createConnection("Vejle", "Oslo", "Standard", standardTravel);
    
    createConnection("Oslo", "Edinburgh", "Standard", standardTravel + marketTax);
    createConnection("Oslo", "Gothenburg", "Standard", standardTravel);
    createConnection("Oslo", "Vejle", "Standard", standardTravel);

    createConnection("Gothenburg", "Oslo", "Standard", standardTravel);
    createConnection("Gothenburg", "Vejle", "Standard", standardTravel);
    createConnection("Gothenburg", "Tallinn", "Standard", standardTravel);
    createConnection("Gothenburg", "Berlin", "Premium", premiumTravel + marketTax);
    
    createConnection("Tallinn", "Gothenburg", "Standard", standardTravel);
    createConnection("Tallinn", "Riga", "Standard", standardTravel);
    
    createConnection("Riga", "Tallinn", "Standard", standardTravel);
    createConnection("Riga", "Kaunas", "Standard", standardTravel);
    
    createConnection("Kaunas", "Riga", "Standard", standardTravel);
    createConnection("Kaunas", "Koszalin", "Standard", standardTravel + marketTax);
    createConnection("Kaunas", "Warsaw", "Standard", standardTravel + marketTax);
    createConnection("Kaunas", "Minsk", "Standard", standardTravel + marketTax);
    createConnection("Kaunas", "Ternopil", "Standard", standardTravel + marketTax);

    /*--- Eastern European Regional Market ---*/
    // Poland
    createConnection("Warsaw", "Koszalin", "Standard", standardTravel);
    createConnection("Warsaw", "Berlin", "Standard", standardTravel + marketTax);
    createConnection("Warsaw", "Prague", "Standard", standardTravel);
    createConnection("Warsaw", "Ternopil", "Standard", standardTravel);
    createConnection("Warsaw", "Kaunas", "Standard", standardTravel);
    createConnection("Warsaw", "Budapest", "Standard", standardTravel);
    createConnection("Warsaw", "Minsk", "Standard", standardTravel);

    createConnection("Koszalin", "Warsaw", "Standard", standardTravel);
    createConnection("Koszalin", "Velje", "Standard", standardTravel + marketTax);
    createConnection("Koszalin", "Amsterdam", "Standard", standardTravel + marketTax);
    createConnection("Koszalin", "Frankfurt", "Standard", standardTravel + marketTax);
    createConnection("Koszalin", "Prague", "Standard", standardTravel);
    createConnection("Koszalin", "Berlin", "Standard", standardTravel + marketTax);
    createConnection("Koszalin", "Kaunas", "Standard", standardTravel + marketTax);

    createConnection("Budapest", "Berlin", "Premium", premiumTravel + marketTax);
    createConnection("Budapest", "Athens", "Premium", premiumTravel + marketTax);
    createConnection("Budapest", "Rijeka", "Standard", standardTravel);
    createConnection("Budapest", "Sarajevo", "Standard", standardTravel);
    createConnection("Budapest", "Prague", "Standard", standardTravel);
    createConnection("Budapest", "Warsaw", "Standard", standardTravel);
    createConnection("Budapest", "Brasov", "Standard", standardTravel);
    createConnection("Budapest", "Kragujevac", "Standard", standardTravel);
    createConnection("Budapest", "Ternopil", "Standard", standardTravel);

    createConnection("Prague", "Berlin", "Standard", standardTravel + marketTax);
    createConnection("Prague", "Stuttgart", "Standard", standardTravel + marketTax);
    createConnection("Prague", "Linz", "Standard", standardTravel + marketTax);
    createConnection("Prague", "Koszalin", "Standard", standardTravel);
    createConnection("Prague", "Warsaw", "Standard", standardTravel);
    createConnection("Prague", "Budapest", "Standard", standardTravel);

    createConnection("Rijeka", "Rome", "Standard", standardTravel + marketTax);
    createConnection("Rijeka", "Milan", "Standard", standardTravel + marketTax);
    createConnection("Rijeka", "Linz", "Standard", standardTravel + marketTax);
    createConnection("Rijeka", "Naples", "Standard", standardTravel + marketTax);
    createConnection("Rijeka", "Sarajevo", "Standard", standardTravel);
    createConnection("Rijeka", "Budapest", "Standard", standardTravel);

    createConnection("Sarajevo", "Rijeka", "Standard", standardTravel);
    createConnection("Sarajevo", "Budapest", "Standard", standardTravel);
    createConnection("Sarajevo", "Kragujevac", "Standard", standardTravel);
    
    createConnection("Kragujevac", "Sarajevo", "Standard", standardTravel);
    createConnection("Kragujevac", "Budapest", "Standard", standardTravel);
    createConnection("Kragujevac", "Thessaloniki", "Standard", standardTravel + marketTax);
    createConnection("Kragujevac", "Istanbul", "Standard", standardTravel);
    createConnection("Kragujevac", "Brasov", "Standard", standardTravel);
    createConnection("Kragujevac", "Sliven", "Standard", standardTravel);

    createConnection("Sliven", "Brasov", "Standard", standardTravel);
    createConnection("Sliven", "Istanbul", "Standard", standardTravel);
    createConnection("Sliven", "Kragujevac", "Standard", standardTravel);
    createConnection("Sliven", "Chisinau", "Standard", standardTravel);

    createConnection("Brasov", "Budapest", "Standard", standardTravel);
    createConnection("Brasov", "Sliven", "Standard", standardTravel);
    createConnection("Brasov", "Kragujevac", "Standard", standardTravel);
    createConnection("Brasov", "Chisinau", "Standard", standardTravel);
    createConnection("Brasov", "Ternopil", "Standard", standardTravel);

    createConnection("Chisinau", "Brasov", "Standard", standardTravel);
    createConnection("Chisinau", "Sliven", "Standard", standardTravel);
    createConnection("Chisinau", "Ternopil", "Standard", standardTravel);
    createConnection("Chisinau", "Kyiv", "Standard", standardTravel);
    createConnection("Chisinau", "Kayseri", "Standard", standardTravel);

    createConnection("Minsk", "Warsaw", "Standard", standardTravel);
    createConnection("Minsk", "Kyiv", "Standard", standardTravel);
    createConnection("Minsk", "Kaunas", "Standard", standardTravel + marketTax);
    createConnection("Minsk", "Warsaw", "Standard", standardTravel);
    
    // Ukraine
    createConnection("Kyiv", "Minsk", "Standard", standardTravel);
    createConnection("Kyiv", "Ternopil", "Standard", standardTravel);
    createConnection("Kyiv", "Chisinau", "Standard", standardTravel);
    createConnection("Kyiv", "Kayseri", "Standard", standardTravel);
    
    createConnection("Ternopil", "Warsaw", "Standard", standardTravel);
    createConnection("Ternopil", "Minsk", "Standard", standardTravel);
    createConnection("Ternopil", "Kaunas", "Standard", standardTravel + marketTax);
    createConnection("Ternopil", "Kyiv", "Standard", standardTravel);
    createConnection("Ternopil", "Chisinau", "Standard", standardTravel);
    createConnection("Ternopil", "Budapest", "Standard", standardTravel);
    createConnection("Ternopil", "Brasov", "Standard", standardTravel);

    // Turkey
    createConnection("Istanbul", "Kayseri", "Standard", standardTravel);
    createConnection("Istanbul", "Izmir", "Standard", standardTravel);
    createConnection("Istanbul", "Thessaloniki", "Standard", standardTravel + marketTax);
    createConnection("Istanbul", "Kragujevac", "Standard", standardTravel);
    createConnection("Istanbul", "Sliven", "Standard", standardTravel);

    createConnection("Izmir", "Istanbul", "Standard", standardTravel);
    createConnection("Izmir", "Kayseri", "Standard", standardTravel);
    createConnection("Izmir", "Thessaloniki", "Standard", standardTravel + marketTax);
    createConnection("Izmir", "Athens", "Standard", standardTravel + marketTax);
    createConnection("Izmir", "Heraklion", "Standard", standardTravel + marketTax);
    
    createConnection("Kayseri", "Istanbul", "Standard", standardTravel);
    createConnection("Kayseri", "Izmir", "Standard", standardTravel);
    createConnection("Kayseri", "Heraklion", "Standard", standardTravel + marketTax);
    createConnection("Kayseri", "Chisinau", "Standard", standardTravel);
    createConnection("Kayseri", "Kyiv", "Standard", standardTravel);
}