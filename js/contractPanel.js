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
                break;
            case 3:
                // Activate bondage
                document.getElementById("bondage-active").checked = true;
                document.querySelector("label[for=bondage-active]").innerHTML = "Active";
        }
    });
}

function toggleAug(cat) {
    
    switch (cat) {
        case "Sissy":
            if (activeAug == 2) {
                activeAug = null;
                document.getElementById("sissy-active").checked = false;
                document.querySelector("label[for=sissy-active]").innerHTML = "Activate";
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

function getDuration(cat) {
    if (cat == "Oral") {
        if (cities.get(currentCity).market == "Anglo") {
            return "10 min";
        }
        return "5 min";
    } else if (cat == "Anal") {
        if (cities.get(currentCity).market == "Germanic") {
            return "6 min";
        }
        return "3 min";
    } else if (cat == "Sissy") {
        if (cities.get(currentCity).market == "Iberian") {
            return "2 posts";
        }
        return "1 post";
    } else {
        if (cities.get(currentCity).market == "Greco-Roman") {
            return "2 posts";
        }
        return "1 post";
    }
}

function contractCard({ cat, roll }) {
    var specCode = specCoding(cat);


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
            )
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
            )
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
                            ),
                            React.createElement(
                                'li',
                                { class: "list-group-item border-" + specCode },
                                "Yield: " + getYieldMods(cities.get(currentCity))[contractTypes.indexOf(cat)] * 100 + "%"
                            )
                        ),
                        React.createElement(
                            'p',
                            null,
                            getContract(cat, roll)
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
                                        getFollowerYield("General", cat, roll)
                                    ),
                                    React.createElement(
                                        'td',
                                        { class: "text-" + specCode },
                                        getFollowerYield(cat, cat, roll)
                                    ),
                                    React.createElement(
                                        'td',
                                        null,
                                        getFollowerYield("General", cat, roll) + getFollowerYield(cat, cat, roll)
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
                        { class: "card-title card-header text-center fw-bold text-bg-" + specCode },
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
                                onClick: () => { completeStandardPost(cat, roll) }
                            },
                            "Complete"
                        )
                    )
                )
            )
        )
    )
}


