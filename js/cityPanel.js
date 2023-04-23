function generateCityPanel() {
    var currCity = cities.get(currentCity);
    cityPanel = React.createElement(cityCard, { city: currentCity, spec: currCity.special, market: currCity.market, posts: userCities[currentCity].posts, fusionAvailable: userCities[currentCity].fusionAvailable, yields: getYieldMods(currCity).map(yield => yield * 100) });

    ReactDOM.render(cityPanel, document.getElementById("city-panel"), function () {
        const popoverTriggerList = document.querySelectorAll('#city-panel [data-bs-toggle="popover"]');
        const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl, {
            container: 'body',
            trigger: "hover click"
        }));
    });
}

/* React Elements */

function cityCard({ city, spec, market, posts, fusionAvailable, yields }) {

    var specCode = specCoding(spec);
    var marketCode = marketCoding(market);
    var followers = getTotalFollowers();
    var stFollowers = getSTFollowers();

    var specText = React.createElement(
        'h3',
        { class: "card-subtitle text-center fw-bold" },
        React.createElement(
            'span',
            { class: "text-" + specCode },
            spec
        ));
    if (specCode.startsWith("fusion")) {
        var subSpecs = spec.match(/(\w*) \/ (\w*)/);
        var spec1Code = specCoding(subSpecs[1]);
        var spec2Code = specCoding(subSpecs[2]);

        specText = React.createElement(
            'h3',
            { class: "card-subtitle text-center fw-bold" },
            React.createElement(
                'span',
                { class: "text-" + spec1Code },
                subSpecs[1]
            ),
            " / ",
            React.createElement(
                'span',
                { class: "text-" + spec2Code },
                subSpecs[2]
            )
        );
    }

    if (activeEvent != "") {
        var event = React.createElement(
            'li',
            {class: "list-group-item"},
            "Active Event: " + activeEvent
        )
    }

    var marketElem = null;
    if (marketsUnlocked) {
        marketElem = [React.createElement(
            'li',
            { class: "list-group-item fw-bold fs-5 text-" + marketCode + " border-" + marketCode },
            market + " Regional Market"
        ),
        React.createElement(
            'li',
            { class: "list-group-item border-" + marketCode },
            getRegionalMarketCharacteristics(market)
        )]
    }

    var upgradesElem = null;
    if (upgradesUnlocked) {
        upgradesElem = React.createElement(
            'div',
            { class: "accordion-item" },
            React.createElement(
                'div',
                { class: "accordion-header", id: "upgrades" },
                React.createElement(
                    'button',
                    {
                        class: "accordion-button collapsed",
                        type: "button",
                        'data-bs-toggle': "collapse",
                        'data-bs-target': "#collapse-upgrades",
                        'aria-expanded': "false",
                        'aria-controls': "collapse-upgrades",
                    },
                    "Upgrades"
                )
            ),
            React.createElement(
                'div',
                {
                    class: "accordion-collapse collapse",
                    id: "collapse-upgrades",
                    'aria-labelledby': "upgrades",
                    'data-bs-parent': "#cityPanelOptions"
                },
                React.createElement(
                    'div',
                    { class: "accordion-body text-center" },
                    upgradeMenu()
                ),
            )
        );
    }

    var itemsElem = null;
    if (itemsUnlocked) {
        itemsElem = React.createElement(
            'div',
            { class: "accordion-item" },
            React.createElement(
                'div',
                {
                    class: "accordion-header",
                    id: "items"
                },
                React.createElement(
                    "button",
                    {
                        type: "button",
                        class: "accordion-button collapsed",
                        'data-bs-toggle': "collapse",
                        'data-bs-target': "#collapse-items",
                        'aria-expanded': "false",
                        'aria-controls': "collapse-items"
                    },
                    "Items"
                )
            ),
            React.createElement(
                'div',
                {
                    id: "collapse-items",
                    class: "accordion-collapse collapse",
                    'aria-labelledby': "items",
                    'data-bs-parent': "#cityPanelOptions"
                },
                React.createElement(
                    'div',
                    { class: "accordion-body text-center" },
                    ownedItems()
                )
            )
        );
    }

    var eventElem = null;
    if (eventsUnlocked) {
        eventElem = [React.createElement(
            'li',
            {class: "list-group-item"},
            "Luck: " + (luck * 100).toFixed(0) + "%"
        ),
        React.createElement(
            'li',
            {class: "list-group-item"},
            "Event Chance: " + (eventChance * 100).toFixed(0) + "%"
        ),
        event]
    }

    return React.createElement(
        'div',
        { class: "card shadow text-center border-primary my-5" },
        React.createElement(
            'div',
            { class: "card-header border-primary" },
            React.createElement(
                'h1',
                { class: "card-title fw-bold fs-3" },
                applyTitle()
            )
        ),
        React.createElement(
            'div',
            { class: "card-body px-2" },
            React.createElement(
                'h1',
                { class: "card-title fw-bold" },
                currentCity
            ),
            specText,
            React.createElement(
                'ul',
                { class: "list-group d-inline-flex justify-content-center mt-2" },
                React.createElement(
                    'li',
                    { class: "list-group-item" },
                    "Money: $" + Math.floor(money)
                ),
                eventElem
            ),
            React.createElement(
                'ul',
                { class: "list-group mt-2" },
                marketElem,
                React.createElement(
                    'li',
                    { class: "list-group-item fs-5" },
                    "Posts: " + posts + " → " + "Diminishing Returns: " + getDiminishingReturnModifier(posts) * 100 + "%"
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
                            { class: "accordion-body overflow-auto text-center" },
                            React.createElement(
                                'ul',
                                { class: "list-group d-inline-flex justify-content-center" },
                                React.createElement(
                                    'a',
                                    {
                                        class: "list-group-item list-group-item-action",
                                        'data-bs-toggle': "popover",
                                        'data-bs-title': "Saturation Index",
                                        'data-bs-content': "A metric that measures the impact of market saturation on your yield potential (see yield reduction threshold). This index grows on a curve with faster growth as you approach the saturation cap. At the saturation cap, market saturation is 100% and follower yields above 15 per post are heavily reduced. The saturation cap is upgradeable.",
                                        //'data-bs-placement': ""
                                    },
                                    "Saturation Index: " + Math.round((getSaturationFactor() * 100 + Number.EPSILON) * 100) / 100 + "%"
                                ),
                                React.createElement(
                                    'a',
                                    {
                                        class: "list-group-item list-group-item-action",
                                        'data-bs-toggle': "popover",
                                        'data-bs-title': "Yield Reduction Threshold",
                                        'data-bs-html': "true",
                                        'data-bs-content': "Yield modifiers up to this threshold will function normally, then any remaining yield modifier percentage will be greatly reduced.<br/><br/>For instance if the threshold is 400%, then a yield modifier of 450% will multiply your yields by 400% + some greatly reduced portion of 50%.",
                                        //'data-bs-placement': ""
                                    },
                                    "Yield Reduction Threshold: " + Math.floor(500 * (1 - getSaturationFactor())) + "%"
                                )
                            ),
                            React.createElement(
                                'table',
                                { class: "table table-sm table-bordered mt-2 mb-0" },
                                React.createElement(
                                    'thead',
                                    null,
                                    React.createElement(
                                        'tr',
                                        null,
                                        React.createElement(
                                            'th',
                                            { colspan: "7" },
                                            "Followers"
                                        )
                                    ),
                                    React.createElement(
                                        'tr',
                                        null,
                                        React.createElement(
                                            'th',
                                            null,

                                        ),
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
                                    { class: "align-middle" },
                                    React.createElement(
                                        'tr',
                                        null,
                                        React.createElement(
                                            'td',
                                            null,
                                            "Short Term"
                                        ),
                                        React.createElement(
                                            'td',
                                            null,
                                            stFollowers[0]
                                        ),
                                        React.createElement(
                                            'td',
                                            { class: "text-oral" },
                                            stFollowers[1]
                                        ),
                                        React.createElement(
                                            'td',
                                            { class: "text-anal" },
                                            stFollowers[2]
                                        ),
                                        React.createElement(
                                            'td',
                                            { class: "text-sissy" },
                                            stFollowers[3]
                                        ),
                                        React.createElement(
                                            'td',
                                            { class: "text-bondage" },
                                            stFollowers[4]
                                        ),
                                        React.createElement(
                                            'td',
                                            null,
                                            getSTFollowers().reduce((a, b) => a + b, 0)
                                        ),
                                    ),
                                    React.createElement(
                                        'tr',
                                        null,
                                        React.createElement(
                                            'td',
                                            null,
                                            "Long Term"
                                        ),
                                        React.createElement(
                                            'td',
                                            null,
                                            ltFollowers[0]
                                        ),
                                        React.createElement(
                                            'td',
                                            { class: "text-oral" },
                                            ltFollowers[1]
                                        ),
                                        React.createElement(
                                            'td',
                                            { class: "text-anal" },
                                            ltFollowers[2]
                                        ),
                                        React.createElement(
                                            'td',
                                            { class: "text-sissy" },
                                            ltFollowers[3]
                                        ),
                                        React.createElement(
                                            'td',
                                            { class: "text-bondage" },
                                            ltFollowers[4]
                                        ),
                                        React.createElement(
                                            'td',
                                            null,
                                            ltFollowers.reduce((a, b) => a + b, 0)
                                        ),
                                    ),
                                    React.createElement(
                                        'tr',
                                        null,
                                        React.createElement(
                                            'td',
                                            null,
                                            "All"
                                        ),
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
                upgradesElem,
                itemsElem,
                React.createElement(
                    'div',
                    { class: "accordion-item" },
                    React.createElement(
                        'div',
                        {
                            class: "accordion-header",
                            id: "fop"
                        },
                        React.createElement(
                            "button",
                            {
                                type: "button",
                                class: "accordion-button collapsed",
                                'data-bs-toggle': "collapse",
                                'data-bs-target': "#collapse-fop",
                                'aria-expanded': "false",
                                'aria-controls': "collapse-fop"
                            },
                            "Forces at Play"
                        )
                    ),
                    React.createElement(
                        'div',
                        {
                            id: "collapse-fop",
                            class: "accordion-collapse collapse",
                            'aria-labelledby': "fop",
                            'data-bs-parent': "#cityPanelOptions"
                        },
                        React.createElement(
                            'div',
                            { class: "accordion-body text-center" },
                            activeFOPs()
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

        var disabled = "";
        var textColor = " text-success"
        if (money < travelCosts[i].cost) {
            disabled = " disabled";
            textColor = " text-danger"
        }

        var elem = (
            React.createElement(
                'li',
                null,
                React.createElement(
                    'a',
                    {
                        class: "dropdown-item" + disabled,
                        value: connections[i].destCity,
                        onClick: (e) => { travel(e.target.attributes.value.value) }
                    },
                    connections[i].destCity + taxed + " ",
                    React.createElement(
                        'span',
                        { class: "float-end" + textColor },
                        "$" + travelCosts[i].cost
                    )
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
                { class: "dropdown-menu shadow-sm w-75" },
                premium,
                standard
            )
        )
    )
}

function upgradeMenu() {
    upgradeElements = []
    for (const [upgrade, level] of Object.entries(upgrades)) {
        var disabled = "";
        var textColor = " text-success"
        var buttonText = "$" + upgradeCost(upgrade)
        if (money < upgradeCost(upgrade) || level == upgradeLimits[upgrade]) {
            disabled = " disabled";
            textColor = " text-danger";
            if (level == upgradeLimits[upgrade]) {
                buttonText = "Max";
            }
        }

        upgradeElements.push(
            React.createElement(
                'ul',
                { class: "list-group mt-3" },
                React.createElement(
                    'a',
                    {
                        class: "list-group-item list-group-item-action border-primary",
                        'data-bs-toggle': "popover",
                        'data-bs-title': upgrade,
                        'data-bs-html': "true",
                        'data-bs-content': getUpgradeDetails(upgrade),
                        //'data-bs-placement': ""
                    },
                    upgrade,
                    React.createElement('br'),
                    "(" + level + " / " + upgradeLimits[upgrade] + ")"
                ),
                React.createElement(
                    'li',
                    { class: "list-group-item border-primary" },
                    React.createElement(
                        'div',
                        {
                            class: "progress",
                            role: "progressbar",
                        },
                        React.createElement(
                            'div',
                            {
                                class: "progress-bar",
                                style: { width: (level / upgradeLimits[upgrade]) * 100 + "%" }
                            }
                        )
                    )
                ),
                React.createElement(
                    'li',
                    { class: "list-group-item border-primary" },
                    React.createElement(
                        'button',
                        {
                            class: "btn btn-outline-primary fs-6 fw-bold" + disabled,
                            onClick: () => {buyUpgrade(upgrade)},
                            disabled: disabled
                        },
                        React.createElement(
                            'span',
                            { class: textColor },
                            buttonText
                        )
                    )
                )
            )
        )
    }
    return upgradeElements;
}

function ownedItems() {
    itemCards = []

    for (const [item, owned] of Object.entries(userItems)) {
        properties = items.get(item);
        if (owned) {
            itemCards.push(React.createElement(itemCard, {
                item: item,
                categories: properties.categories,
                effect: properties.effect,
                tier: properties.tier,
                owned: owned,
                buttonType: "Inventory"
            }))
        }
    }
    return itemCards;
}

function activeFOPs() {
    fopCards = []

    for (const fop of fopSelected) {
        fopCards.push(React.createElement(
            'div',
            { class: "card col-12 mb-2 text-center border-primary" },
            React.createElement(
                'h3',
                { class: "card-header card-title fs-5 fw-bold" },
                fop
            ),
            React.createElement(
                'div',
                { class: "card-body" },
                React.createElement(
                    'p',
                    { class: "fs-6 mb-0" },
                    getFOPDetails(fop)
                )
            )
        ));
    }
    return fopCards;
}

function getUpgradeDetails(upgradeType) {
    switch (upgradeType) {
        case "Interactive Media":
            return "Selling interactive content increases revenue from category-specific followers.<br/><br/>Currently earning $" + (2.5 + upgrades[upgradeType] * 0.25) + " per post from category-specific followers.";
        case "Community Management":
            return "Improved community engagement improves follower retention and loyalty.<br/><br/>Currently " + ltRatio * 100 + "% of new followers become long-term.";
        case "Professional Marketing":
            return "Investment into better marketing strategies allows you to better overcome the effects of market saturation.<br/><br/>Currently market saturation is at full effect at " + saturationCap + " followers.";
        case "Premium Content":
            return "Higher quality content allows you to charge higher subscription fees without impacting follower retention.<br/><br/>Currently earning $" + (5 + upgrades[upgradeType] * 0.5) + " per month from general followers."; 
        case "Contract Negotiation":
            return "Greater market sway has allowed you to renegotiate contract terms more frequently.<br/><br/>Currently able to reroll " + (1 + upgrades[upgradeType]) + " times per category per city.";
        case "High-Value Contractors":
            return "Building more connections with contractors has allowed you to primarily get more lucrative contracts.<br/><br/>Currently rolling contracts " + (1 + upgrades[upgradeType]) + " and above.";
        case "Artisanal Retailers":
            return "Purchasing from more skillful and specialized retailers results in items more effective at captivating an audience.<br/><br/>Currently gaining an additional " + (upgrades[upgradeType]) * 5 + "% yield modifier from items.";   
    }
}

function getFOPDetails(fop) {
    switch (fop) {
        case "Due Diligence":
            return "All contract durations are doubled.";
        case "Economic Recession":
            return "All money gains are halved.";
        case "Intermarket Tariffs":
            return "Market transfer tax is greatly increased";
        case "Attention Deficit":
            return "Only 25% of new followers are long-term (down from 50%)."
        case "Extensive Competition":
            return "Partnerships are offered half as often.";
        case "Strong relations":
            return "Partnerships last twice as long.";
    }
}