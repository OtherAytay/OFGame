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

function saveLocal() {
    localStorage["OFGame-localSave"] = true;
    localStorage["OFGame-userCities"] = JSON.stringify(userCities);
    localStorage["OFGame-currentCity"] = currentCity;
    localStorage["OFGame-currentRolls"] = JSON.stringify(currentRolls);
    localStorage["OFGame-followers"] = JSON.stringify(followers)
    localStorage["OFGame-perfView"] = perfView;
    localStorage["OFGame-augView"] = augView;
    localStorage["OFGame-fusionView"] = fusionView;
    localStorage["OFGame-activeAug"] = activeAug;
}

function loadLocal() {
    if (localStorage["OFGame-localSave"] == "true") {
        userCities = JSON.parse(localStorage["OFGame-userCities"]);
        currentCity = localStorage["OFGame-currentCity"];
        currentRolls = JSON.parse(localStorage["OFGame-currentRolls"]);
        followers = JSON.parse(localStorage["OFGame-followers"]);
        perfView = JSON.parse(localStorage["OFGame-perfView"]);
        augView = JSON.parse(localStorage["OFGame-augView"]);
        fusionView = JSON.parse(localStorage["OFGame-fusionView"]);
        activeAug = JSON.parse(localStorage["OFGame-activeAug"]);
    } else {
        userDataFlag = false;
        saveLocal();
        generateCities();
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
    } else {
        return ""
    }
}

/** 
 * Use this function as a script in the options HTML file to detect uploaded save files.
*/
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