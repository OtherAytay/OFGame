function MapNode({ city, spec, size, market, x, y, }) {
    var specCode = specCoding(spec);
    var sizeCode = "fs-3";
    if (size == "Medium") {
        sizeCode = "fs-2"
    } else if (size == "Big") {
        sizeCode = "fs-1"
    }

    return React.createElement(
        'a',
        {
            type: "button",
            class: "bi-circle-fill text-" + specCode + " " + sizeCode,
            'data-bs-toggle': "popover",
            'data-bs-title': city,
            'data-bs-custom-class': specCode + "-popover text-center fs-3",
            'data-bs-placement': "top",
            'data-bs-content': spec + "<br/>" + market + " Regional Market",
            'data-bs-html': "true",
            style: {left: x , top: y}
        },
        null
    );
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
            y: properties.y * 0.665  + "%"
        }, null))
    }
    mapNodes.push(React.createElement(
        'img',
        { src: 'EuroMap.png' },
        null
    ))
    return (mapNodes);
}

function generateMapNodes() {
    generateCities();
    generateConnections();

    const mapRoot = ReactDOM.createRoot(document.getElementById("interactive-map"));
    mapRoot.render(populateMap());
}

function specCoding(specText) {
    // Standard
    if (specText == "Oral") {
        return "oral"
    }
    if (specText == "Anal") {
        return "anal"
    }
    if (specText == "Sissy") {
        return "sissy"
    }
    if (specText == "Bondage") {
        return "bondage"
    }

    // Fusion
    if (specText == "Oral / Anal") {
        return "fusion-OA"
    } else if (specText == "Oral / Sissy") {
        return "fusion-OS"
    } else if (specText == "Oral / Bondage") {
        return "fusion-OB"
    } else if (specText == "Anal / Sissy") {
        return "fusion-AS"
    } else if (specText == "Anal / Bondage") {
        return "fusion-AB"
    } else if (specText == "Sissy / Bondage") {
        return "fusion-SB"
    }
}