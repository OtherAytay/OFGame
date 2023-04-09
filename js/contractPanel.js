function generateContractPanel() {
    var currCity = cities.get(currentCity);
    const contractPanel = [
        React.createElement(contractCard, { cat: "Oral", roll: currentRolls[0] }),
        React.createElement(contractCard, { cat: "Anal", roll: currentRolls[1] }),
        React.createElement(contractCard, { cat: "Sissy", roll: currentRolls[2] }),
        React.createElement(contractCard, { cat: "Bondage", roll: currentRolls[3] }),
        React.createElement(fusionCard)
    ];

    ReactDOM.render(contractPanel, document.getElementById("contracts-panel"), function () {
        switch (activeAug) {
            case 2:
                // Activate sissy
                document.getElementById("sissy-active").checked = true;
                document.querySelector("label[for=sissy-active]").innerHTML = "Active";

                if (augRemaining > 0) {           
                    document.querySelector("label[for=sissy-active]").innerHTML = "Active";
                    document.querySelector("label[for=bondage-active]").innerHTML = "Disabled";
                }
                break;
            case 3:
                // Activate bondage
                document.getElementById("bondage-active").checked = true;
                document.querySelector("label[for=bondage-active]").innerHTML = "Active";

                // Disable if in multi-post contract
                if (augRemaining > 0) {
                    document.querySelector("label[for=sissy-active]").innerHTML = "Disabled";
                    document.querySelector("label[for=bondage-active]").innerHTML = "Active";
                }
        }
        if (augRemaining > 0) {
            document.getElementById("sissy-active").disabled = true;
            document.getElementById("bondage-active").disabled = true;
        } else {
            document.getElementById("sissy-active").disabled = false;
            document.getElementById("bondage-active").disabled = false;
        }
    });
}

function toggleAug(cat) {
    if (augRemaining > 0) {
        return;
    }

    switch (cat) {
        case "Sissy":
            if (activeAug == 2) {
                activeAug = null;
                document.getElementById("sissy-active").checked = false;
                document.querySelector("label[for=sissy-active]").innerHTML = "Activate";
                document.querySelector("label[for=bondage-active]").innerHTML = "Activate";
            } else {
                activeAug = 2;

                // Activate sissy
                document.getElementById("sissy-active").checked = true;
                document.querySelector("label[for=sissy-active]").innerHTML = "Active";

                // Deactivate bondage
                document.getElementById("bondage-active").checked = false;
                document.querySelector("label[for=bondage-active]").innerHTML = "Activate";
            }
            break;
        case "Bondage":
            if (activeAug == 3) {
                activeAug = null;
                document.getElementById("bondage-active").checked = false;
                document.querySelector("label[for=bondage-active]").innerHTML = "Activate";
                document.querySelector("label[for=sissy-active]").innerHTML = "Activate";
            } else {
                activeAug = 3;

                // Activate bondage
                document.getElementById("bondage-active").checked = true;
                document.querySelector("label[for=bondage-active]").innerHTML = "Active";

                // Deactivate sissy
                document.getElementById("sissy-active").checked = false;
                document.querySelector("label[for=sissy-active]").innerHTML = "Activate";

            }
            break;
    }
    generateContractPanel();
}

function rerollContract(cat) {
    userCities[currentCity]["reroll" + cat] -= 1;
    protectedReroll(cat);
}

function getDuration(cat, roll) {
    if (cat == "Oral") {
        if (roll == 8) { return "20 deepthroats"}
        if (roll == 9) { return "10 deepthroats"}
        if (roll == 10) { return "120 seconds in throat"}

        baseDuration = 5 * contractDurationMult;
        if (cities.get(currentCity).market == "Anglo") {
            return baseDuration * 2 + " min";
        }
        if (activeItems.includes("Large Plug")) {
            baseDuration *= 0.5;
        }
        return baseDuration + " min";
    } else if (cat == "Anal") {
        baseDuration = 3 * contractDurationMult;
        if (cities.get(currentCity).market == "Germanic") {
            return baseDuration * 2 + " min";
        }
        if (activeItems.includes("Dildo Gag")) {
            baseDuration *= 0.5;
        }
        return baseDuration + " min";
    } else if (cat == "Sissy") {
        baseDuration = 1 * contractDurationMult;
        if (activeAug == 2) {
            if (augRemaining > 1) {
                return augRemaining + " posts"
            } else if (augRemaining > 0) {
                return augRemaining + " post"
            }
        }

        if (cities.get(currentCity).market == "Iberian") {
            return baseDuration * 2 + " posts";
        }
        return baseDuration + " post";
    } else {
        baseDuration = 1 * contractDurationMult;
        if (activeAug == 3) {
            if (augRemaining > 1) {
                return augRemaining + " posts"
            } else if (augRemaining > 0) {
                return augRemaining + " post"
            }
        }
        
        if (cities.get(currentCity).market == "Greco-Roman") {
            return baseDuration * 2 + " posts";
        }
        return baseDuration + " posts";
    }
}

function contractCard({ cat, roll }) {
    var specCode = specCoding(cat);
    var yields = calculateStandardFollowerYield(currentCity, cat, roll);
    var genYield = yields[0];
    var catYield;
    switch (cat) {
        case "Oral": catYield = yields[1]; break;
        case "Anal": catYield = yields[2]; break;
        case "Sissy": catYield = yields[3]; break;
        case "Bondage": catYield = yields[4]; break;
    }
    var yieldMod = getYieldMods(cities.get(currentCity))[contractTypes.indexOf(cat)] * 100;
    var diminishYieldMod = (calculateDiminishedYieldMod(currentCity, cat, roll) * 100);
    //Math.floor(((genYield + catYield) / (10 + 2*roll)) * 100);


    var reroll = null;
    if (userCities[currentCity]["reroll" + cat] > 0) {
        var reroll = React.createElement(
            'button',
            {
                class: "btn ms-2 fs-5 w-25 btn-outline-primary",
                onClick: () => {rerollContract(cat)}
            },
            "Reroll"
        )
    }
    

    if (cat == "Oral" || cat == "Anal") {
        var title = "Performance: ";
        var button = React.createElement(
            'div',
            { class: "card-footer border-" + specCode },
            React.createElement(
                'button',
                {
                    class: "btn fs-5 w-50 btn-" + specCode,
                    onClick: () => { completeStandardPost(cat, roll) }
                },
                "Complete"
            ),
            reroll
        );
    } else {
        var title = "Augmentation: ";
        var button = React.createElement(
            'div',
            { class: "card-footer" },
            React.createElement(
                'input',
                {
                    id: specCode + "-active",
                    type: "checkbox",
                    class: "btn-check",
                    autocomplete: "off",
                    onClick: () => { toggleAug(cat) }
                }
            ),
            React.createElement(
                'label',
                {
                    class: "btn fs-5 w-50 btn-outline-" + specCode,
                    for: specCode + "-active"
                },
                "Activate"
            ),
            reroll
        );
    }
    title += cat + " (" + roll + ")";



    return React.createElement(
        'div',
        { class: "col-xxl-6 col-12 mt-2" },
        React.createElement(
            'div',
            { class: "card h-100 text-center shadow mb-3 border-" + specCode },
            React.createElement(
                'div',
                { class: "row g-0 h-100" },
                React.createElement(
                    'div',
                    { class: "col-lg-4" },
                    React.createElement(
                        'img',
                        {
                            src: "images/" + specCode + "1.jpg",
                            class: "rounded-start",
                            style: { 'object-fit': "cover", 'object-position': "0% center", width: "100%", height: "100%" }
                        }
                    )
                ),
                React.createElement(
                    'div',
                    { class: "col-lg-8 d-flex flex-column" },
                    React.createElement(
                        'h5',
                        { class: "card-title card-header text-center fw-bold text-bg-" + specCode },
                        title
                    ),
                    React.createElement(
                        'div',
                        { class: "card-body" },
                        React.createElement(
                            'ul',
                            { class: "list-group list-group-horizontal mb-2 justify-content-center" },
                            React.createElement(
                                'li',
                                { class: "list-group-item border-" + specCode },
                                "Duration: " + getDuration(cat, roll)
                            )
                        ),
                        React.createElement(
                            'p',
                            null,
                            getContract(cat, roll)
                        ),
                        React.createElement(
                            'ul',
                            { class: "list-group list-group-horizontal mb-2 justify-content-center" },
                            React.createElement(
                                'li',
                                { class: "list-group-item border-" + specCode },
                                "Yield Modifier: " + yieldMod.toFixed(0) + "%"
                            ),
                            React.createElement(
                                'li',
                                { class: "list-group-item border-" + specCode },
                                "Final Yield: " + diminishYieldMod.toFixed(0) + "%"
                            ),
                        ),
                        React.createElement(
                            'table',
                            { class: "table table-sm table-bordered mt-2 mb-0 border-" + specCode },
                            React.createElement(
                                'thead',
                                null,
                                React.createElement(
                                    'tr',
                                    null,
                                    React.createElement(
                                        'th',
                                        { colspan: "3" },
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
                                        { class: "text-" + specCode },
                                        cat
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
                                        genYield
                                    ),
                                    React.createElement(
                                        'td',
                                        { class: "text-" + specCode },
                                        catYield
                                    ),
                                    React.createElement(
                                        'td',
                                        null,
                                        genYield + catYield
                                    ),
                                )
                            )
                        ),
                    ),
                    button
                )
            )
        )
    )
}

function fusionCard() {
    if (!userCities[currentCity].fusionAvailable) {
        return;
    }
    var cat = cities.get(currentCity).special

    var specCode = specCoding(cat);
    var subSpecs = cat.match(/(\w*) \/ (\w*)/);
    var spec1Code = specCoding(subSpecs[1]);
    var spec2Code = specCoding(subSpecs[2]);

    return React.createElement(
        'div',
        { class: "col-xxl-6 offset-xxl-3 col-12 mt-2" },
        React.createElement(
            'div',
            { class: "card h-100 text-center shadow mb-3 border-primary" },
            React.createElement(
                'div',
                { class: "row g-0 h-100" },
                React.createElement(
                    'div',
                    { class: "col-lg-4" },
                    React.createElement(
                        'img',
                        {
                            src: "images/" + specCode + "1.jpg",
                            class: "rounded-start",
                            style: { 'object-fit': "cover", 'object-position': "0% center", width: "100%", height: "100%" }
                        }
                    )
                ),
                React.createElement(
                    'div',
                    { class: "col-lg-8 d-flex flex-column" },
                    React.createElement(
                        'h5',
                        { class: "card-title card-header text-center fw-bold text-white text-bg-" + specCode },
                        "Fusion: " + cat
                    ),
                    React.createElement(
                        'div',
                        { class: "card-body" },
                        React.createElement(
                            'p',
                            null,
                            getFusionContract(currentCity)
                        ),
                        React.createElement(
                            'table',
                            { class: "table table-sm table-bordered mt-2 mb-0 border-primary" },
                            React.createElement(
                                'thead',
                                null,
                                React.createElement(
                                    'tr',
                                    null,
                                    React.createElement(
                                        'th',
                                        { colspan: "3" },
                                        "Follower Yield"
                                    ),
                                ),
                                React.createElement(
                                    'tr',
                                    null,
                                    React.createElement(
                                        'th',
                                        { class: "text-" + spec1Code },
                                        subSpecs[1]
                                    ),
                                    React.createElement(
                                        'th',
                                        { class: "text-" + spec2Code },
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
                                        { class: "text-" + spec1Code },
                                        50
                                    ),
                                    React.createElement(
                                        'td',
                                        { class: "text-" + spec2Code },
                                        50
                                    ),
                                    React.createElement(
                                        'td',
                                        null,
                                        100
                                    ),
                                )
                            )
                        ),
                    ),
                    React.createElement(
                        'div',
                        { class: "card-footer border-primary" },
                        React.createElement(
                            'button',
                            {
                                class: "btn fs-5 w-50 btn-" + specCode,
                                onClick: () => { completeFusionPost(currentCity) }
                            },
                            "Complete"
                        )
                    )
                )
            )
        )
    )
}

function getContract(cat, roll) {
    switch (cat) {
        case "Oral": return getOralContract(roll);
        case "Anal": return getAnalContract(roll);
        case "Sissy": return getSissyContract(roll);
        case "Bondage": return getBondageContract(roll);
    }
}

