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
            return "Write degrading words or phrases on your breasts and ass with lipstick for the next post.";
        case 7:
            return "Apply Lipstick and Lipgloss for your next post.";
        case 8:
            return "Apply Lipstick and Lip gloss, as well as eyeshadow and eyeliner for your next post.";
        case 9:
            return "Apply full face makeup, including lips (lipstick and lipgloss), eyes (eyeshadow, eyeliner, mascara), and face (foundation, concealer, blush) for your next post.";
        case 10:
            return "Wear a bra, panties, short skirt, feminine crop top, and high thigh stockings. Apply full face makeup, including lips (lipstick and lipgloss), eyes (eyeshadow, eyeliner, mascara), and face (foundation, concealer, blush) for your next post.";
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
            return "Tie legs behind head for your next post if it's anal (ignore anal contract position). Tie hands behind back if it's oral.";
        case 6:
        case 7:
        case 8:
            return "Wear a crotch rope attached to a collar or tight chest harness during your next post if it's oral. Wear a mouth gag during your next post if it's anal.";
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

function getRegionalMarketCharacteristics(market) {
    switch (market) {
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

/* City Helper Functions */
function createCity(name, size, special, market, x, y) {
    var fusionAvailable = false;
    if (special.match(/\w* \/ \w*/) != null) {
        fusionAvailable = true;
    }

    cities.set(name, { size: size, special: special, market: market, x: x, y: y });
    if (!userDataFlag) {
        userCities[name] = { posts: 0, fusionAvailable: fusionAvailable };
    }
}

function createConnection(srcCity, destCity, type) {
    if (cityGraph.has(srcCity)) {
        cityGraph.set(srcCity, cityGraph.get(srcCity).concat([{ destCity: destCity, type: type}]));
    } else {
        cityGraph.set(srcCity, [{ destCity: destCity, type: type}]);
    }
}

function calcAllDistances() {
    cityDists = []
    for (const source of cities.keys()) {
        for (const dest of cityGraph.get(source)) {
            c1 = cities.get(source);
            c2 = cities.get(dest.destCity);
            if (c1.x != c2.x || c1.y != c2.y) {
                cityDists.push({source: source, dest: dest.destCity, dist: dist(c1.x, c1.y * 0.665, c2.x, c2.y * 0.665)})
            }
        }
    }
    
    min = Math.min.apply(Math, cityDists.map(c => c.dist))
    max = Math.max.apply(Math, cityDists.map(c => c.dist))
    sum = cityDists.map(c => c.dist).reduce((a, b) => {return a + b})
    mean = sum / cityDists.length;
    varArray = cityDists.map(c => c.dist).map(dist => (dist - mean)**2)
    variance = varArray.reduce((a,b) => {return a + b}) / cityDists.length;
    stdev = Math.sqrt(variance);
    cityDistsSorted = cityDists.map(c => c.dist).sort();
    q1 = cityDistsSorted[Math.floor(cityDists.length/4)]
    med = cityDistsSorted[Math.floor(cityDists.length/2)]
    q3 = cityDistsSorted[Math.floor(3*cityDists.length/4)]
    console.log("Min: " + min);
    console.log("Q1: " + q1);
    console.log("Med: " + med);
    console.log("Q3: " + q3);
    console.log("Max: " + max);
    console.log("Mean: " +  mean);
    console.log("Std Dev: " + stdev);
    console.log(cityDistsSorted);
    return cityDistsSorted;
}

function dist(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1)**2 + (y2 - y1)**2);
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