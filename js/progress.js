function loadStats() {
    loadLocal();
    // Lifetime Contracts
    document.getElementById("contracts-oral").innerHTML = playerStats["contracts"][0];
    document.getElementById("contracts-anal").innerHTML = playerStats["contracts"][1];
    document.getElementById("contracts-sissy").innerHTML = playerStats["contracts"][2];
    document.getElementById("contracts-bondage").innerHTML = playerStats["contracts"][3];
    document.getElementById("contracts-total").innerHTML = playerStats["contracts"][4];

    // Contract Misc
    document.getElementById("posts").innerHTML = playerStats["posts"];
    document.getElementById("cities-visited").innerHTML = playerStats["visited"];
    document.getElementById("average-roll").innerHTML = playerStats["rollSum"] / Math.max(1, playerStats["contracts"][4]);

    // Lifetime Followers
    document.getElementById("lifetime-general").innerHTML = playerStats["lifetimeFollowers"][0];
    document.getElementById("lifetime-oral").innerHTML = playerStats["lifetimeFollowers"][1];
    document.getElementById("lifetime-anal").innerHTML = playerStats["lifetimeFollowers"][2];
    document.getElementById("lifetime-sissy").innerHTML = playerStats["lifetimeFollowers"][3];
    document.getElementById("lifetime-bondage").innerHTML = playerStats["lifetimeFollowers"][4];
    document.getElementById("lifetime-total").innerHTML = playerStats["lifetimeFollowers"][5];

    // Max Followers
    document.getElementById("max-general").innerHTML = playerStats["maxFollowers"][0];
    document.getElementById("max-oral").innerHTML = playerStats["maxFollowers"][1];
    document.getElementById("max-anal").innerHTML = playerStats["maxFollowers"][2];
    document.getElementById("max-sissy").innerHTML = playerStats["maxFollowers"][3];
    document.getElementById("max-bondage").innerHTML = playerStats["maxFollowers"][4];
    document.getElementById("max-total").innerHTML = playerStats["maxFollowers"][5];

    // Follower Misc
    document.getElementById("max-yield-modifier").innerHTML = Math.round(playerStats["maxYieldModifier"] * 100) + "%";
    document.getElementById("max-atomic-follower-gain").innerHTML = playerStats["maxAtomicMoneyGain"];
    document.getElementById("event-follower-gain").innerHTML = playerStats["eventFollowerGain"];
    document.getElementById("event-follower-loss").innerHTML = playerStats["eventFollowerLoss"];

    // Finances
    document.getElementById("lifetime-money").innerHTML = "$" + playerStats["lifetimeMoney"];
    document.getElementById("max-money").innerHTML = "$" + playerStats["maxMoney"];
    document.getElementById("max-atomic-money-gain").innerHTML = "$" + playerStats["maxAtomicMoneyGain"];
    document.getElementById("event-money-gain").innerHTML = "$" + playerStats["eventMoneyGain"];
    document.getElementById("event-money-loss").innerHTML = "$" + playerStats["eventMoneyLoss"];
    document.getElementById("spent-on-upgrades").innerHTML = "$" + playerStats["spentOnUpgrades"];
    document.getElementById("spent-on-items").innerHTML = "$" + playerStats["spentOnItems"];
    document.getElementById("spent-on-travel").innerHTML = "$" + playerStats["spentOnTravel"];
}