function generateCityPanel() {
    const cityPanelRoot = ReactDOM.createRoot(document.getElementById("city-panel"))
    var currCity = cities.get(currentCity);
    cityPanelRoot.render(React.createElement(cityCard, { city: currentCity, spec: currCity.special, market: currCity.market, posts: userCities[currentCity].posts, fusionAvailable: userCities[currentCity].fusionAvailable, yields: getYieldMods(currCity).map(yield => yield * 100) }));
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

    localStorage["OFGame-perfView"] = perfView;
    localStorage["OFGame-augView"] = augView;
    localStorage["OFGame-fusionView"] = fusionView;
    generateCityPanel();
    generateContractPanel();
}

// completePost() function available in game.js

function travel(destCity) {
    currentCity = destCity;
    fusionView = false;
    newCity();

    localStorage["OFGame-currentCity"] = currentCity;
    localStorage["OFGame-fusionView"] = fusionView;
    generateCityPanel();
    generateContractPanel();
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
    var marketCode = marketCoding(market);

    var buttonStyles = getButtonStyles(spec);

    if (specCode.startsWith("fusion")) {
        var subSpecs = spec.match(/(\w*) \/ (\w*)/);
        var spec1Code = specCoding(subSpecs[1]);
        var spec2Code = specCoding(subSpecs[2]);

        specText = React.createElement(
            'h3',
            {class: "card-subtitle text-center fw-bold"},
            React.createElement(
                'span',
                {class: "text-" + spec1Code},
                subSpecs[1]
            ),
            " / ",
            React.createElement(
                'span',
                {class: "text-" + spec2Code},
                subSpecs[2]
            )
        );
    }

    return React.createElement(
        'div',
        { class: "card text-center border-primary my-5" },
        React.createElement(
            'div',
            {class: "card-header border-primary"},
            React.createElement(
                'h1',
                { class: "card-title fw-bold" },
                currentCity
            ),
            specText,
        ),
        React.createElement(
            'div',
            { class: "card-body px-2" },
            React.createElement(
                'ul',
                {class: "list-group"},
                React.createElement(
                    'li',
                    {class: "list-group-item fw-bold fs-5 text-" + marketCode + " border-" + marketCode},
                    market + " Regional Market"
                ),
                React.createElement(
                    'li',
                    {class: "list-group-item border-" + marketCode},
                    getRegionalMarketCharacteristics(market)
                )
            ),
            React.createElement(
                'div',
                { class: "accordion mt-2", id: "cityPanelOptions" },
                React.createElement(
                    'div',
                    { class: "accordion-item" },
                    React.createElement(
                        'div',
                        { class: "accordion-header", id: "followers" },
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
                                { class: "table table-sm table-bordered mt-2 mb-0" },
                                React.createElement(
                                    'thead',
                                    null,
                                    React.createElement(
                                        'th',
                                        { colspan: "6" },
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
                                            { class: "text-oral" },
                                            "Oral"
                                        ),
                                        React.createElement(
                                            'th',
                                            { class: "text-anal" },
                                            "Anal"
                                        ),
                                        React.createElement(
                                            'th',
                                            { class: "text-sissy" },
                                            "Sissy"
                                        ),
                                        React.createElement(
                                            'th',
                                            { class: "text-bondage" },
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
                                            { class: "text-oral" },
                                            followers[1]
                                        ),
                                        React.createElement(
                                            'td',
                                            { class: "text-anal" },
                                            followers[2]
                                        ),
                                        React.createElement(
                                            'td',
                                            { class: "text-sissy" },
                                            followers[3]
                                        ),
                                        React.createElement(
                                            'td',
                                            { class: "text-bondage" },
                                            followers[4]
                                        ),
                                        React.createElement(
                                            'td',
                                            null,
                                            followers.reduce((a, b) => a + b, 0)
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
                                { class: "fs-4 fw-bold" },
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
                                        onClick: () => { setView('Oral') }
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
                                        onClick: () => { setView('Anal') }
                                    },
                                    "Anal",
                                    React.createElement('br', null, null),
                                    yields[1] + "%"
                                ),
                            ),
                            React.createElement(
                                'p',
                                { class: "fs-4 fw-bold" },
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
                                        onClick: () => { setView('Sissy') }
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
                                        onClick: () => { setView('Bondage') }
                                    },
                                    "Bondage",
                                    React.createElement('br', null, null),
                                    yields[3] + "%"
                                ),
                            ),
                            //fusionButton
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
                        onClick: (e) => { travel(e.target.attributes.value.value) }
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