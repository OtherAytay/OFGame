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
    localStorage["userCities"] = JSON.stringify(userCities);
    localStorage["currentCity"] = currentCity;
    localStorage["currentRolls"] = JSON.stringify(currentRolls);
    localStorage["followers"] = JSON.stringify(followers)
    localStorage["perfView"] = perfView;
    localStorage["augView"] = augView;
    localStorage["fusionView"] = fusionView;
    localStorage["activeAug"] = activeAug;
}

function loadLocal() {
    if (localStorage.length >= 8) {
        userCities = JSON.parse(localStorage["userCities"]);
        currentCity = localStorage["currentCity"];
        currentRolls = JSON.parse(localStorage["currentRolls"]);
        followers = JSON.parse(localStorage["followers"]);
        perfView = JSON.parse(localStorage["perfView"]);
        augView = JSON.parse(localStorage["augView"]);
        fusionView = JSON.parse(localStorage["fusionView"]);
        activeAug = JSON.parse(localStorage["activeAug"]);
    } else {
        userDataFlag = false;
        saveLocal()
    }
}

function exportSave() {
    var data = JSON.stringify(localStorage);

    var saveDate = new Date()
    saveDate = saveDate.toISOString().slice(0, 10) + " " + saveDate.toTimeString().slice(0, 8).replace(":", "-")

    let saveName = 'OFGame-Save - ' + saveDate;

    let saveData = new Blob([JSON.stringify(data, null, 4)], {
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
    localStorage["userCities"] = save["userCities"];
    localStorage["currentCity"] = save["currentCity"];
    loadLocal();
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