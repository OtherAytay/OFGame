/* Interface Management */
function gameView() {
    if (document.getElementById("contracts-tab").checked) {
        document.getElementById("contracts-panel").hidden = false;
        document.getElementById("map-panel").hidden = true;
        generateContractPanel();
    } else if (document.getElementById("map-tab").checked) {
        document.getElementById("contracts-panel").hidden = true;
        document.getElementById("map-panel").hidden = false;
    } else {
        
    }
}

/* Helpers */

/**
* Parameters: numeric min, numeric max, boolean integer
* Return: random numeric between min and max. Reduced to int if (integer == true)
**/
function randRange(min, max, integer) {
    if (integer) {
        return Math.floor(Math.random() * ((max - min) + 1) + min);
    } else {
        return Math.random() * ((max - min) + 1) + min;
    }
}

function getSTFollowers() {
    stFollowers = [0,0,0,0,0]
    for (var post = 0; post < stFollowersRolling.length; post++) {
        for (var cat = 0; cat < stFollowersRolling[0].length; cat++) {
            stFollowers[cat] += stFollowersRolling[post][cat]
        }
    }
    return stFollowers;
}

function getTotalFollowers() {
    followers = [0,0,0,0,0]
    stFollowers = getSTFollowers();
    
    for (var i = 0; i < followers.length; i++) {
        followers[i] += stFollowers[i] + ltFollowers[i]
    }
    return followers;
}

function getSaturationFactor() {
    var totalFollowers = getTotalFollowers().reduce((a,b) => a + b);
    return (totalFollowers / 1000)**(1.5);
}

/* Local Save Management */

function saveLocal() {
    localStorage["OFGame-localSave"] = true;
    localStorage["OFGame-userCities"] = JSON.stringify(userCities);
    localStorage["OFGame-currentCity"] = currentCity;
    localStorage["OFGame-currentRolls"] = JSON.stringify(currentRolls);
    localStorage["OFGame-stFollowersRolling"] = JSON.stringify(stFollowersRolling);
    localStorage["OFGame-ltFollowers"] = JSON.stringify(ltFollowers);
    localStorage["OFGame-perfView"] = perfView;
    localStorage["OFGame-augView"] = augView;
    localStorage["OFGame-fusionView"] = fusionView;
}

function loadLocal() {
    if (localStorage["OFGame-localSave"] == "true") {
        userCities = JSON.parse(localStorage["OFGame-userCities"]);
        currentCity = localStorage["OFGame-currentCity"];
        currentRolls = JSON.parse(localStorage["OFGame-currentRolls"]);
        stFollowersRolling = JSON.parse(localStorage["OFGame-stFollowersRolling"]);
        ltFollowers = JSON.parse(localStorage["OFGame-ltFollowers"]);
        perfView = JSON.parse(localStorage["OFGame-perfView"]);
        augView = JSON.parse(localStorage["OFGame-augView"]);
        fusionView = JSON.parse(localStorage["OFGame-fusionView"]);
    } else {
        userDataFlag = false;
        saveLocal();
        generateCities();
    }
}

function clearSave() {
    localStorage.removeItem("OFGame-localSave");
    localStorage.removeItem("OFGame-userCities");
    localStorage.removeItem("OFGame-currentCity");
    localStorage.removeItem("OFGame-currentRolls");
    localStorage.removeItem("OFGame-stFollowersRolling");
    localStorage.removeItem("OFGame-ltFollowers");
    localStorage.removeItem("OFGame-perfView");
    localStorage.removeItem("OFGame-augView");
    localStorage.removeItem("OFGame-fusionView");
    initializeGame();
}


/* Save import / export */

function fileUpload() {
    const inputElement = document.getElementById("input");
    inputElement.addEventListener("change", importSave, false);
}

function importSave() {
    const save = this.files[0];
    fr = new FileReader()
    fr.readAsText(save);
    fr.onload = function () {
        saveData = JSON.parse(fr.result);
        for (const [key, value] of Object.entries(saveData)) {
            if (key.startsWith("OFGame")) {
                localStorage[key] = value;
            }
        }
        loadLocal();
    }
}

function exportSave() {
    var saveDate = new Date()
    saveDate = saveDate.toISOString().slice(0, 10) + " " + saveDate.toTimeString().slice(0, 8).replaceAll(":", "-");

    let saveName = 'OFGame - ' + saveDate;

    let saveData = new Blob([JSON.stringify(localStorage)], {
        type: 'application/json',
        name: saveName
    });

    saveAs(saveData, saveName);
}

function saveAs(content, fileName) {
    const a = document.createElement("a");
    const isBlob = content.toString().indexOf("Blob") > -1;
    let url = content;
    if (isBlob) {
        url = window.URL.createObjectURL(content);
    }
    a.href = url;
    a.download = fileName;
    a.click();
    if (isBlob) {
        window.URL.revokeObjectURL(url);
    }
}