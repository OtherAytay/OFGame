function generateMapNodes() {
    ReactDOM.render(populateMap(), document.getElementById("interactive-map"), function () {
        const popoverTriggerList = document.querySelectorAll('#interactive-map>[data-bs-toggle="popover"]');
        const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl, {
            container: '#interactive-map',
            trigger: "hover click"
        }));
    });
}

function populateMap() {
    var mapNodes = []
    for (const [city, properties] of cities) {
        mapNodes.push(React.createElement(MapNode, {
            city: city,
            spec: properties.special,
            size: properties.size,
            market: properties.market,
            x: properties.x + "%",
            y: properties.y * 0.665 + "%",
            posts: userCities[city]["posts"]
        }, null))
    }
    mapNodes.push(React.createElement(
        'img',
        { src: 'images/EuroMap.png' },
        null
    ))
    return (mapNodes);
}

function MapNode({ city, spec, size, market, x, y, posts }) {
    var specCode = specCoding(spec);
    var sizeCode = "fs-3";
    if (size == "Medium") {
        sizeCode = "fs-2"
    } else if (size == "Big") {
        sizeCode = "fs-1"
    }

    var icon = "bi-circle-fill"
    var fs = "";
    if (city == currentCity) {
        icon = "bi-person-circle";
        fs = "4em";
        sizeCode = "";
    }

    return React.createElement(
        'a',
        {
            type: "button",
            class: icon + " text-" + specCode + " " + sizeCode,
            'data-bs-toggle': "popover",
            'data-bs-title': city,
            'data-bs-custom-class': specCode + "-popover text-center fs-3",
            'data-bs-placement': "top",
            'data-bs-content': spec + "<br/>" + market + " Regional Market <br/> Posts: " + posts,
            'data-bs-html': "true",
            style: { left: x, top: y, 'font-size': fs }
        },
        null
    );
}