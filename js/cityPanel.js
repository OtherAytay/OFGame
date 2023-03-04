function generateCityPanel() {
    const cityPanelRoot = ReactDOM.createRoot(document.getElementById("city-panel"))
    var currCity = cities.get(currentCity);
    const cityPanel = [
        React.createElement(cityCard, { city: currentCity, spec: currCity.special, market: currCity.market, posts: userCities[currentCity].posts, fusionAvailable: userCities[currentCity].fusionAvailable, yields: getYieldMods(currCity).map(yield => yield*100)}),
        React.createElement(perfCard, {perfCat: contractTypes[perfView], perfRoll: currentRolls[perfView], augCat: contractTypes[activeAug], augRoll: currentRolls[activeAug]}),
        React.createElement(augCard, {augCat: contractTypes[augView], augRoll: currentRolls[augView]}),
        React.createElement(fusionCard, {city: currentCity, fusionCat: currCity.special})
    ]
    
    cityPanelRoot.render(cityPanel);
}

/* City Panel Functions */
function setView(cat) {
    switch (cat) {
        case "Oral": perfView = 0; fusionView = false; break;
        case "Anal": perfView = 1; fusionView = false; break;
        case "Sissy": augView = 2; fusionView = false; break;
        case "Bondage": augView = 3; fusionView = false; break;
        default: fusionView = true;
    }
    
    localStorage["perfView"] = perfView;
    localStorage["augView"] = augView;
    localStorage["fusionView"] = fusionView;
    generateCityPanel();
}

function activateAug(cat) {
    switch (cat) {
        case "Sissy": activeAug = 2; break;
        case "Bondage": activeAug = 3; break;
    }
    localStorage["activeAug"] = activeAug;
    generateCityPanel();
}

function deactivateAug() {
    activeAug = null;
    localStorage["activeAug"] = activeAug;
    generateCityPanel();
}

// completePost() function available in game.js

function travel(destCity) {
    currentCity = destCity;
    fusionView = false;
    newCity();

    localStorage["currentCity"] = currentCity;
    localStorage["fusionView"] = fusionView;
    generateCityPanel();
    generateMapNodes();
}


function getContract(cat, roll) {
    switch (cat) {
        case "Oral": return getOralContract(roll);
        case "Anal": return getAnalContract(roll);
        case "Sissy": return getSissyContract(roll);
        case "Bondage": return getBondageContract(roll);
    }
}

function getFollowerYield(type, cat, roll) {
    yields = calculateStandardFollowerYield(currentCity, cat, roll);
    switch (type) {
        case "General": return yields[0];
        case "Oral": return yields[1];
        case "Anal": return yields[2];
        case "Sissy": return yields[3];
        case "Bondage": return yields[4];
    }
}


/* React Elements */

function cityCard({ city, spec, market, posts, fusionAvailable, yields }) {
    
    var specCode = specCoding(spec);

    var buttonStyles = getButtonStyles(spec);

    var fusionButton = null
    if (specCode.startsWith("fusion")) {
        var buttonText = spec
        var disabled = false
        if (!fusionAvailable) {
            buttonText = "Fusion Complete"
            disabled = true
        }
        
        fusionButton = [
            React.createElement(
                'p',
                {class: "fs-4"},
                "Fusion Contract"
            ),
            React.createElement(
                'button',
                {
                    id: "fusion-show",
                    type: "button",
                    class: "btn btn-" + specCode + " w-100 fs-5 fw-bold",
                    onClick: () => {setView('Fusion')},
                    disabled: disabled
                },
                buttonText
            )
        ]
    }

    return React.createElement(
        'div',
        { class: "card border-primary my-5" },
        React.createElement(
            'h1',
            { class: "card-title text-center" },
            currentCity
        ),
        React.createElement(
            'h3',
            { class: "card-subtitle text-center text-" + specCode },
            spec
        ),
        React.createElement(
            'div',
            { class: "card-body px-2" },
            React.createElement(
                'p',
                { class: "card-text text-center fs-6" },
                market + " Regional Market"
            ),
            React.createElement(
                'div',
                { class: "accordion", id: "cityPanelOptions" },
                React.createElement(
                    'div',
                    {class: "accordion-item"},
                    React.createElement(
                        'div',
                        {class: "accordion-header", id: "followers"},
                        React.createElement(
                            'button',
                            {
                                class: "accordion-button collapsed",
                                type: "button",
                                'data-bs-toggle': "collapse",
                                'data-bs-target': "#collapse-followers",
                                'aria-expanded': "false",
                                'aria-controls': "collapse-followers",
                            },
                            "Followers"
                        )
                    ),
                    React.createElement(
                        'div',
                        {
                            id: "collapse-followers",
                            class: "accordion-collapse collapse",
                            'aria-labelledby': "followers",
                            'data-bs-parent': "#cityPanelOptions"
                        },
                        React.createElement(
                            'div',
                            { class: "accordion-body text-center" },
                            React.createElement(
                                'table',
                                {class: "table table-sm table-bordered mt-2 mb-0"},
                                React.createElement(
                                    'thead',
                                    null,
                                    React.createElement(
                                        'th',
                                        {colspan: "6"},
                                        "Follower Yield"
                                    ),
                                    React.createElement(
                                        'tr',
                                        null,
                                        React.createElement(
                                            'th',
                                            null,
                                            "General"
                                        ),
                                        React.createElement(
                                            'th',
                                            {class: "text-oral"},
                                            "Oral"
                                        ),
                                        React.createElement(
                                            'th',
                                            {class: "text-anal"},
                                            "Anal"
                                        ),
                                        React.createElement(
                                            'th',
                                            {class: "text-sissy"},
                                            "Sissy"
                                        ),
                                        React.createElement(
                                            'th',
                                            {class: "text-bondage"},
                                            "Bondage"
                                        ),
                                        React.createElement(
                                            'th',
                                            null,
                                            "Total"
                                        )
                                    )
                                ),
                                React.createElement(
                                    'tbody',
                                    null,
                                    React.createElement(
                                        'tr',
                                        null,
                                        React.createElement(
                                            'td',
                                            null,
                                            followers[0]
                                        ),
                                        React.createElement(
                                            'td',
                                            {class: "text-oral"},
                                            followers[1]
                                        ),
                                        React.createElement(
                                            'td',
                                            {class: "text-anal"},
                                            followers[2]
                                        ),
                                        React.createElement(
                                            'td',
                                            {class: "text-sissy"},
                                            followers[3]
                                        ),
                                        React.createElement(
                                            'td',
                                            {class: "text-bondage"},
                                            followers[4]
                                        ),
                                        React.createElement(
                                            'td',
                                            null,
                                            followers.reduce((a, b) => a+b, 0)
                                        ),
                                    )
                                )
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { class: "accordion-item" },
                    React.createElement(
                        'div',
                        { class: "accordion-header", id: "contracts" },
                        React.createElement(
                            'button',
                            {
                                class: "accordion-button",
                                type: "button",
                                'data-bs-toggle': "collapse",
                                'data-bs-target': "#collapse-contracts",
                                'aria-expanded': "true",
                                'aria-controls': "collapse-contracts",
                            },
                            "Contracts"
                        )
                    ),
                    React.createElement(
                        'div',
                        {
                            class: "accordion-collapse collapse show",
                            id: "collapse-contracts",
                            'aria-labelledby': "contracts",
                            'data-bs-parent': "#cityPanelOptions"
                        },
                        React.createElement(
                            'div',
                            { class: "accordion-body text-center" },
                            React.createElement(
                                'p',
                                { class: "fs-3" },
                                "Posts: " + posts
                            ),
                            React.createElement(
                                'p',
                                {class: "fs-4 fw-bold"},
                                "Performative Contracts"
                            ),
                            React.createElement(
                                'div',
                                {
                                    class: "btn-group btn-group-sm w-100 mb-2",
                                },
                                React.createElement(
                                    'button',
                                    {
                                        id: "oral-show",
                                        type: "button",
                                        class: "btn fs-5 w-50 " + buttonStyles[0],
                                        onClick: () => {setView('Oral')}
                                    },
                                    "Oral",
                                    React.createElement('br', null, null),
                                    yields[0] + "%"
                                ),
                                React.createElement(
                                    'button',
                                    {
                                        id: "anal-show",
                                        type: "button",
                                        class: "btn fs-5 w-50 " + buttonStyles[1],
                                        onClick: () => {setView('Anal')}
                                    },
                                    "Anal",
                                    React.createElement('br', null, null),
                                    yields[1] + "%"
                                ),
                            ),
                            React.createElement(
                                'p',
                                {class: "fs-4 fw-bold"},
                                "Augmentative Contracts"
                            ),
                            React.createElement(
                                'div',
                                {
                                    class: "btn-group btn-group-sm w-100 mb-2",
                                },
                                React.createElement(
                                    'button',
                                    {
                                        id: "sissy-show",
                                        type: "button",
                                        class: "btn fs-5 w-50 " + buttonStyles[2],
                                        onClick: () => {setView('Sissy')}
                                    },
                                    "Sissy",
                                    React.createElement('br', null, null),
                                    yields[2] + "%"
                                ),
                                React.createElement(
                                    'button',
                                    {
                                        id: "bondage-show",
                                        type: "button",
                                        class: "btn fs-5 w-50 " + buttonStyles[3],
                                        onClick: () => {setView('Bondage')}
                                    },
                                    "Bondage",
                                    React.createElement('br', null, null),
                                    yields[3] + "%"
                                ),
                            ),
                            fusionButton
                        ),
                        
                    )
                ),
                React.createElement(
                    'div',
                    { class: "accordion-item" },
                    React.createElement(
                        'div',
                        {
                            class: "accordion-header",
                            id: "market-characteristics"
                        },
                        React.createElement(
                            "button",
                            {
                                type: "button",
                                class: "accordion-button collapsed",
                                'data-bs-toggle': "collapse",
                                'data-bs-target': "#collapse-market-characteristics",
                                'aria-expanded': "false",
                                'aria-controls': "collapse-market-characteristics"
                            },
                            "Market Characteristics"
                        )
                    ),
                    React.createElement(
                        'div',
                        {
                            id: "collapse-market-characteristics",
                            class: "accordion-collapse collapse",
                            'aria-labelledby': "market-characteristics",
                            'data-bs-parent': "#cityPanelOptions"
                        },
                        React.createElement(
                            'div',
                            { class: "accordion-body text-center" },
                            getRegionalMarketCharacteristics(market)
                        )
                    )
                )
            ),
            travelMenu({ city })
        )
    )
}

function travelMenu({ city }) {
    var connections = cityGraph.get(city);
    var premium = [];
    var standard = [];
    for (var i = 0; i < connections.length; i++) {
        var taxed = "";
        if (cities.get(city).market != cities.get(connections[i].destCity).market) {
            taxed = " (Taxed)";
        }

        var elem = (
            React.createElement(
                'li',
                null,
                React.createElement(
                    'a',
                    { 
                        class: "dropdown-item",
                        value: connections[i].destCity,
                        onClick: (e) => {travel(e.target.attributes.value.value)}
                    },
                    connections[i].destCity + taxed
                )
            )
        )

        if (connections[i].type == "Premium") {
            premium.push(elem)
        } else if (connections[i].type == "Standard") {
            standard.push(elem)
        }
    }

    if (premium.length > 0) {
        premium.unshift(
            React.createElement(
                'li',
                null,
                React.createElement(
                    'h6',
                    { class: "dropdown-header" },
                    "Premium Connections"
                )
            )
        )
    }

    if (standard.length > 0) {
        standard.unshift(
            React.createElement(
                'li',
                null,
                React.createElement(
                    'h6',
                    { class: "dropdown-header" },
                    "Standard Connections"
                )
            )
        )
    }

    return (
        React.createElement(
            'div',
            { class: "dropup dropup-center text-center pt-2" },
            React.createElement(
                'button',
                {
                    type: "button",
                    class: "btn btn-primary btn-lg w-75 dropdown-toggle",
                    'data-bs-toggle': "dropdown",
                    'aria-expanded': "false"
                },
                "Travel"
            ),
            React.createElement(
                'ul',
                { class: "dropdown-menu" },
                premium,
                standard
            )
        )
    )
}

function getButtonStyles(spec) {
    var buttonStyles = ["btn-outline-oral", "btn-outline-anal", "btn-outline-sissy", "btn-outline-bondage"]
    if (spec.includes("Oral")) {
        buttonStyles[0] = "btn-oral";
    }

    if (spec.includes("Anal")) {
        buttonStyles[1] = "btn-anal";
    }

    if (spec.includes("Sissy")) {
        buttonStyles[2] = "btn-sissy";
    }

    if (spec.includes("Bondage")) {
        buttonStyles[3] = "btn-bondage";
    }

    return buttonStyles;
}

function perfCard({perfCat, perfRoll, augCat, augRoll}) {
    if (fusionView) { return;}
    
    perfSpecCode = specCoding(perfCat)
    
    var aug = React.createElement(
        'div',
        {class: "card mt-3 border-primary"},
        React.createElement(
            'h5',
            {class: "card-title card-header"},
            "No Augmentation Active"
        )
    )
    if (augCat != null) {
        augSpecCode = specCoding(augCat)

        aug = React.createElement(
            'div',
            {class: "card mt-3 border-" + augSpecCode},
            React.createElement(
                'div',
                {class: "row g-0"},
                React.createElement(
                    'div',
                    {class: "col-4"},
                    React.createElement(
                        'img',
                        {
                            src: "images/" + augSpecCode + "1.jpg", 
                            class: "rounded-start",
                            style: {'object-fit': "cover", 'object-position': "0%", width: "100%", height: "100%"}
                        },
                        null
                    )
                ),
                React.createElement(
                    'div',
                    {class: "col-8"},
                    React.createElement(
                        'h5',
                        {class: "card-title card-header text-bg-" + augSpecCode},
                        "Augmentation: " + augCat + " (" + augRoll + ")"
                    ),
                    React.createElement(
                        'div',
                        {class: "card-body"},
                        React.createElement(
                            'p',
                            null,
                            getContract(augCat, augRoll)
                        )
                    ),
                    React.createElement(
                        'div',
                        {class: "card-footer border-" + augSpecCode},
                        React.createElement(
                            'button',
                            {
                                class: "btn fs-6 w-75 btn-outline-" + augSpecCode,
                                onClick: () => {deactivateAug()}
                            },
                            "Deactivate"
                        )
                    )
                )
            )
        )
    }
    
    

    return React.createElement(
        'div',
        {class: "card text-center my-2 border-" + perfSpecCode},
        React.createElement(
            'img',
            {
                class: "card-img-top",
                src: "images/" + perfSpecCode + "1.jpg",
                style: {'aspect-ratio': "1/1"}
            },
            null
        ),
        React.createElement(
            'h4',
            {class: "card-title card-header text-center fw-bold text-bg-" + perfSpecCode},
            "Performance: " + perfCat + " (" + perfRoll + ")"
        ),
        React.createElement(
            'div',
            {class: "card-body"},
            React.createElement(
                'p',
                null,
                getContract(perfCat, perfRoll)
            ),
            React.createElement(
                'table',
                {class: "table table-sm table-bordered mt-2 mb-0 border-" + perfSpecCode},
                React.createElement(
                    'thead',
                    null,
                    React.createElement(
                        'tr',
                        null,
                        React.createElement(
                            'th',
                            {colspan: "3"},
                            "Follower Yield"
                        ),
                    ),
                    React.createElement(
                        'tr',
                        null,
                        React.createElement(
                            'th',
                            null,
                            "General"
                        ),
                        React.createElement(
                            'th',
                            {class: "text-" + perfSpecCode},
                            perfCat
                        ),
                        React.createElement(
                            'th',
                            null,
                            "Total"
                        )
                    )
                ),
                React.createElement(
                    'tbody',
                    null,
                    React.createElement(
                        'tr',
                        null,
                        React.createElement(
                            'td',
                            null,
                            getFollowerYield("General", perfCat, perfRoll)
                        ),
                        React.createElement(
                            'td',
                            {class: "text-" + perfSpecCode},
                            getFollowerYield(perfCat, perfCat, perfRoll)
                        ),
                        React.createElement(
                            'td',
                            null,
                            getFollowerYield("General", perfCat, perfRoll) + getFollowerYield(perfCat, perfCat, perfRoll)
                        ),
                    )
                )
            ),
            aug
        ),
        React.createElement(
            'div',
            {class: "card-footer"},
            React.createElement(
                'button',
                {
                    class: "btn fs-5 w-50 btn-" + perfSpecCode,
                    onClick: () => {completeStandardPost(perfCat, perfRoll, augCat, augRoll)}
                },
                "Complete"
            )
        )
    )
}

function augCard({augCat, augRoll}) {
    var augSpecCode = specCoding(augCat);

    if (activeAug != null || fusionView) {
        return;
    }

    return React.createElement(
        'div',
        {class: "card text-center my-2 border-" + augSpecCode},
        React.createElement(
            'img',
            {
                class: "card-img-top",
                src: "images/" + augSpecCode + "1.jpg",
                style: {'aspect-ratio': "1/1"}
            },
            null
        ),
        React.createElement(
            'h4',
            {class: "card-title card-header text-center fw-bold text-bg-" + augSpecCode},
            "Augmentation: " + augCat + " (" + augRoll + ")"
        ),
        React.createElement(
            'div',
            {class: "card-body"},
            React.createElement(
                'p',
                null,
                getContract(augCat, augRoll)
            ),
            React.createElement(
                'table',
                {class: "table table-sm table-bordered mt-2 mb-0 border-" + augSpecCode},
                React.createElement(
                    'thead',
                    null,
                    React.createElement(
                        'tr',
                        null,
                        React.createElement(
                            'th',
                            {colspan: "3"},
                            "Follower Yield"
                        ),
                    ),                
                    React.createElement(
                        'tr',
                        null,
                        React.createElement(
                            'th',
                            null,
                            "General"
                        ),
                        React.createElement(
                            'th',
                            {class: "text-" + augSpecCode},
                            augCat
                        ),
                        React.createElement(
                            'th',
                            null,
                            "Total"
                        )
                    )
                ),
                React.createElement(
                    'tbody',
                    null,
                    React.createElement(
                        'tr',
                        null,
                        React.createElement(
                            'td',
                            null,
                            getFollowerYield("General", augCat, augRoll)
                        ),
                        React.createElement(
                            'td',
                            {class: "text-" + augSpecCode},
                            getFollowerYield(augCat, augCat, augRoll)
                        ),
                        React.createElement(
                            'td',
                            null,
                            getFollowerYield("General", augCat, augRoll) + getFollowerYield(augCat, augCat, augRoll)
                        ),
                    )
                )
            )
        ),
        React.createElement(
            'div',
            {class: "card-footer"},
            React.createElement(
                'button',
                {
                    class: "btn fs-5 w-50 btn-" + augSpecCode,
                    onClick: () => {activateAug(augCat)}
                },
                "Activate"
            )
        )
    )
}

function fusionCard({city, fusionCat}) {
    if (!fusionView) {return;}
    var fusionSpecCode = specCoding(fusionCat)

    subSpecs = fusionCat.match(/(\w*) \/ (\w*)/)
    spec1Code = specCoding(subSpecs[1])
    spec2Code = specCoding(subSpecs[2])
    
    return React.createElement(
        'div',
        {class: "card text-center my-2"},
        React.createElement(
            'img',
            {
                class: "card-img-top",
                src: "images/" + fusionSpecCode + ".jpg",
                style: {'aspect-ratio': "1/1"}
            },
            null
        ),
        React.createElement(
            'h4',
            {class: "card-title card-header text-center fw-bold"},
            "Fusion: " + fusionCat
        ),
        React.createElement(
            'div',
            {class: "card-body"},
            React.createElement(
                'p',
                null,
                getFusionContract(city)
            ),
            React.createElement(
                'table',
                {class: "table table-sm table-bordered mt-2 mb-0 border-" + fusionSpecCode},
                React.createElement(
                    'thead',
                    null,
                    React.createElement(
                        'tr',
                        null,
                        React.createElement(
                            'th',
                            {colspan: "3"},
                            "Follower Yield"
                        ),
                    ),
                    React.createElement(
                        'tr',
                        null,
                        React.createElement(
                            'th',
                            {class: "text-" + spec1Code},
                            subSpecs[1]
                        ),
                        React.createElement(
                            'th',
                            {class: "text-" + spec2Code},
                            subSpecs[2]
                        ),
                        React.createElement(
                            'th',
                            null,
                            "Total"
                        )
                    )
                ),
                React.createElement(
                    'tbody',
                    null,
                    React.createElement(
                        'tr',
                        null,
                        React.createElement(
                            'td',
                            {class: "text-" + spec1Code},
                            50
                        ),
                        React.createElement(
                            'td',
                            {class: "text-" + spec2Code},
                            50
                        ),
                        React.createElement(
                            'td',
                            null,
                            100
                        ),
                    )
                )
            )
        ),
        React.createElement(
            'div',
            {class: "card-footer"},
            React.createElement(
                'button',
                {
                    class: "btn fs-5 w-50 btn-" + fusionSpecCode,
                    onClick: () => {completeFusionPost(city)}
                },
                "Complete"
            )
        )
    )
}