function generateStorePanel() {
    ReactDOM.render(populateStore(), document.getElementById("store-panel"))
}

function populateStore() {
    var storeItems = []
    for (const [item, properties] of items) {
        storeItems.push(React.createElement(itemCard, {
            item: item,
            categories: properties.categories,
            effect: properties.effect,
            tier: properties.tier,
            owned: userItems[item],
            buttonType: "Purchase"
        }, null))
    }
    return (storeItems);
}

function toggleItem(item) {
    if (document.getElementById(itemCoding(item) + "-active").checked) {
        document.querySelector("label[for=" + itemCoding(item) + "-active]").innerHTML = "Active";
        activeItems.push(item);

        // Disable incompatible
        var incItems = getIncompatibleItems(item);
        for (const incItem of incItems) {
            if (userItems[incItem]) {
                document.getElementById(itemCoding(incItem) + "-active").checked = false;
                document.querySelector("label[for=" + itemCoding(incItem) + "-active]").innerHTML = "Activate";
                activeItems = activeItems.filter((i) => i != incItem);
            }
        }
    } else {
        document.querySelector("label[for=" + itemCoding(item) + "-active]").innerHTML = "Activate";
        activeItems = activeItems.filter((i) => i != item);
    }
    generateContractPanel();
}

function itemCard({ item, categories, effect, tier, owned, buttonType}, ) {
    var disabled = "";
    var textColor = " text-success"
    var buttonText = "$" + itemCost(item)
    if (money < itemCost(item) || owned) {
        disabled = " disabled";
        textColor = " text-danger";
        if (owned) {
            buttonText = "Owned";
        }
    }

    var cardScaling = "";
    if (buttonType == "Purchase") {
        var cardScaling = "col-xl-4 col-lg-6 ";
        var button = React.createElement(
            'div',
            { class: "card-footer text-center" },
            React.createElement(
                'button',
                { 
                    class: "btn btn-outline-primary fw-bold" + disabled,
                    onClick: () => {buyItem(item)}
                },
                React.createElement(
                    'span',
                    { class: textColor },
                    buttonText
                )
            )
        )
    } else {
        var button = [React.createElement(
            'div',
            { class: "card-footer text-center" },
            React.createElement(
                'input',
                {
                    id: itemCoding(item) + "-active",
                    type: "checkbox",
                    class: "btn-check",
                    autocomplete: "off",
                    onClick: () => { toggleItem(item) }
                }
            ),
            React.createElement(
                'label',
                {
                    class: "btn fs-5 w-50 btn-outline-primary",
                    for: itemCoding(item) + "-active"
                },
                "Activate"
            )
        )]
    }

    if (getIncompatibleItems(item).length != 0) {
        var incItems = React.createElement(
            'li',
            { class: "list-group-item" },
            React.createElement('span', { class: "text-primary fw-bold" }, "Incompatible with"),
            ": ",
            getIncompatibleItemsText(item)
        )
    }

    return React.createElement(
        'div',
        { class: cardScaling + "col-12 mb-2" },
        React.createElement(
            'div',
            { class: "card border-primary h-100" }, 
            React.createElement(
                'h5',
                { class: "card-header card-title text-center text-bg-primary fs-4 fw-bold" },
                item
            ),
            React.createElement(
                'div',
                { class: "card-body" },
                React.createElement(
                    'img',
                    {
                        class: "card-img mb-2 object-fit-cover",
                        src: "images/" + item.toLowerCase().replace(" ", "-") + ".jpg",
                        style: {'aspect-ratio': "1/1"}
                    }
                ),
                React.createElement(
                    'ul',
                    { class: "list-group" },
                    React.createElement(
                        'li',
                        { class: "list-group-item" },
                        React.createElement('span', { class: "text-primary fw-bold" }, "Use"),
                        ": ",
                        getItemUse(item)
                    ),
                    React.createElement(
                        'li',
                        { class: "list-group-item" },
                        React.createElement('span', { class: "text-primary fw-bold" }, "Perk"),
                        ": ",
                        getItemPerk(item)
                    ),
                    incItems
                )
            ),
            button
        )
    )
}

function itemCoding(item) {
    return item.toLowerCase().replaceAll(" ", "-");
}