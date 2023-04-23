function loadStats() {
    loadLocal();
    document.getElementById("ms-points").innerHTML = playerStats["milestonePoints"];
    // Lifetime Contracts
    document.getElementById("contracts-oral").innerHTML = playerStats["contracts"][0];
    document.getElementById("contracts-anal").innerHTML = playerStats["contracts"][1];
    document.getElementById("contracts-sissy").innerHTML = playerStats["contracts"][2];
    document.getElementById("contracts-bondage").innerHTML = playerStats["contracts"][3];
    document.getElementById("contracts-total").innerHTML = playerStats["contracts"][4];

    // Contract Misc
    document.getElementById("posts").innerHTML = playerStats["posts"];
    document.getElementById("cities-visited").innerHTML = playerStats["visited"];
    document.getElementById("average-roll").innerHTML = (playerStats["rollSum"] / Math.max(1, playerStats["contracts"][4])).toFixed(2);

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

function generateMilestones() {
    ReactDOM.render(earnedMS.map((MS) => milestoneCard(MS)), document.getElementById("earned"));
    ReactDOM.render(contractMS.map((MS) => milestoneCard(MS)), document.getElementById("contracts"));
    ReactDOM.render(followerMS.map((MS) => milestoneCard(MS)), document.getElementById("followers"));
    ReactDOM.render(financeMS.map((MS) => milestoneCard(MS)), document.getElementById("finances"));
}

function milestoneCard({name, desc, type, amount, stat, points, reward}) {
    cardStyling = "primary";
    if (["oral", "anal", "sissy", "bondage"].includes(type)) {
        cardStyling = type;
    }
    
    rewardElem = null
    if (reward) {
        rewardElem = React.createElement(
            'ul',
            { class: "list-group" },
            React.createElement(
                'li',
                { class: "list-group-item text-center fw-bold text-bg-success border-success"},
                "Reward"
            ),
            React.createElement(
                'li',
                { class: "list-group-item text-center border-success" },
                reward
            ),
        )
    }
    
    return React.createElement(
        'div',
        { class: "col-xl-4 col-lg-6 col-12 mb-2" },
        React.createElement(
            'div',
            { class: "card h-100 border-" + cardStyling }, 
            React.createElement(
                'h5',
                { class: "card-header card-title text-center fs-5 fw-bold text-bg-" + cardStyling },
                name,
                React.createElement(
                    'span',
                    {class: "ms-2 badge bg-success"},
                    points
                )
            ),
            React.createElement(
                'div',
                { class: "card-body" },
                React.createElement(
                    'p',
                    {class: "text-center"},
                    desc
                ),
                rewardElem
            ),
        )
    )
}

earnedMS = [];

contractMS = [
    // Posts, cities visited
    {
        name: "Start of a Career",
        desc: "Create 5 posts",
        type: null,
        amount: 5,
        stat: "posts",
        points: 10,
        reward: "System: Events",
    },
    {
        name: "Selling Myself",
        desc: "Create 25 posts",
        type: null,
        amount: 25,
        stat: "posts",
        points: 10,
        reward: null,
    },
    {
        name: "Career Slut",
        desc: "Create 50 posts",
        type: null,
        amount: 50,
        stat: "posts",
        points: 20,
        reward: null,
    },
    {
        name: "Rising Star",
        desc: "Create 100 posts",
        type: null,
        amount: 100,
        stat: "posts",
        points: 30,
        reward: null,
    },
    {
        name: "Stardom",
        desc: "Create 200 posts",
        type: null,
        amount: 200,
        stat: "posts",
        points: 30,
        reward: "Title: OnlyFans Superstar",
    },
    {
        name: "Reaching Around",
        desc: "Visit 5 cities",
        type: null,
        amount: 5,
        stat: "visited",
        points: 10,
        reward: "System: Regional Markets",
    },
    {
        name: "European Cock Explorer",
        desc: "Visit 25 cities",
        type: null,
        amount: 25,
        stat: "visited",
        points: 20,
        reward: null,
    },
    {
        name: "Dicked in Every Corner of Europe",
        desc: "Visit all 55 cities",
        type: null,
        amount: 55,
        stat: "visited",
        points: 30,
        reward: "Title: the Explorer",
    },

    // Oral
    {
        name: "Oral Adept",
        desc: "Complete 5 oral contracts",
        type: "oral",
        amount: 5,
        stat: "contracts",
        points: 10,
        reward: null,
    },
    {
        name: "Oral Aficionado",
        desc: "Complete 25 oral contracts",
        type: "oral",
        amount: 25,
        stat: "contracts",
        points: 10,
        reward: null,
    },
    {
        name: "Oral Connoisseur",
        desc: "Complete 50 oral contracts",
        type: "oral",
        amount: 50,
        stat: "contracts",
        points: 20,
        reward: "Badge: Oral",
    },
    {
        name: "Mouth Whore",
        desc: "Complete 100 oral contracts",
        type: "oral",
        amount: 100,
        stat: "contracts",
        points: 30,
        reward: "Title: Mouth Whore",
    },
    // Anal
    {
        name: "Anal Adept",
        desc: "Complete 5 anal contracts",
        type: "anal",
        amount: 5,
        stat: "contracts",
        points: 10,
        reward: null,
    },
    {
        name: "Anal Aficionado",
        desc: "Complete 25 anal contracts",
        type: "anal",
        amount: 25,
        stat: "contracts",
        points: 10,
        reward: null,
    },
    {
        name: "Anal Connoisseur",
        desc: "Complete 50 anal contracts",
        type: "anal",
        amount: 50,
        stat: "contracts",
        points: 20,
        reward: "Badge: Anal",
    },
    {
        name: "Anal Whore",
        desc: "Complete 100 anal contracts",
        type: "anal",
        amount: 100,
        stat: "contracts",
        points: 30,
        reward: "Title: Anal Whore",
    },
    // Sissy
    {
        name: "Sissy Groupie",
        desc: "Complete 5 sissy contracts",
        type: "sissy",
        amount: 5,
        stat: "contracts",
        points: 10,
        reward: null,
    },
    {
        name: "Sissy Enthusiast",
        desc: "Complete 25 sissy contracts",
        type: "sissy",
        amount: 25,
        stat: "contracts",
        points: 10,
        reward: null,
    },
    {
        name: "Sissy Guru",
        desc: "Complete 50 sissy contracts",
        type: "sissy",
        amount: 50,
        stat: "contracts",
        points: 20,
        reward: "Badge: Sissy",
    },
    {
        name: "Sissy Slut",
        desc: "Complete 100 sissy contracts",
        type: "sissy",
        amount: 100,
        stat: "contracts",
        points: 30,
        reward: "Title: Sissy Slut",
    },
    // Bondage
    {
        name: "Bondage Groupie",
        desc: "Complete 5 bondage contracts",
        type: "bondage",
        amount: 5,
        stat: "contracts",
        points: 10,
        reward: null,
    },
    {
        name: "Bondage Enthusiast",
        desc: "Complete 25 bondage contracts",
        type: "bondage",
        amount: 25,
        stat: "contracts",
        points: 10,
        reward: null,
    },
    {
        name: "Bondage Guru",
        desc: "Complete 50 bondage contracts",
        type: "bondage",
        amount: 50,
        stat: "contracts",
        points: 20,
        reward: "Badge: Bondage",
    },
    {
        name: "Bondage Slut",
        desc: "Complete 100 bondage contracts",
        type: "bondage",
        amount: 100,
        stat: "contracts",
        points: 30,
        reward: "Title: Bondage Slut",
    },
];

followerMS = [
    // Total
    {
        name: "On the Map",
        desc: "Have 100 total followers at one time",
        type: "total",
        amount: 100,
        stat: "maxFollowers",
        points: 10,
        reward: "System: Upgrades",
    },
    {
        name: "Getting Popular",
        desc: "Have 250 total followers at one time",
        type: "total",
        amount: 250,
        stat: "maxFollowers",
        points: 10,
        reward: null,
    },
    {
        name: "Community of my Own",
        desc: "Have 500 total followers at one time",
        type: "total",
        amount: 500,
        stat: "maxFollowers",
        points: 20,
        reward: null,
    },
    {
        name: "Cult Following",
        desc: "Have 1000 total followers at one time",
        type: "total",
        amount: 1000,
        stat: "maxFollowers",
        points: 30,
        reward: null,
    },
    // Oral
    {
        name: "Oral Following",
        desc: "Have 50 oral followers at one time",
        type: "oral",
        amount: 50,
        stat: "maxFollowers",
        points: 10,
        reward: null,
    },
    {
        name: "Oral Club",
        desc: "Have 100 oral followers at one time",
        type: "oral",
        amount: 100,
        stat: "maxFollowers",
        points: 10,
        reward: null,
    },
    {
        name: "Oral Community",
        desc: "Have 250 oral followers at one time",
        type: "oral",
        amount: 250,
        stat: "maxFollowers",
        points: 20,
        reward: null,
    },
    {
        name: "Oral Cult",
        desc: "Have 500 oral followers at one time",
        type: "oral",
        amount: 500,
        stat: "maxFollowers",
        points: 30,
        reward: null,
    },
    // Anal
    {
        name: "Anal Following",
        desc: "Have 50 anal followers at one time",
        type: "anal",
        amount: 50,
        stat: "maxFollowers",
        points: 10,
        reward: null,
    },
    {
        name: "Anal Club",
        desc: "Have 100 anal followers at one time",
        type: "anal",
        amount: 100,
        stat: "maxFollowers",
        points: 10,
        reward: null,
    },
    {
        name: "Anal Community",
        desc: "Have 250 anal followers at one time",
        type: "anal",
        amount: 250,
        stat: "maxFollowers",
        points: 20,
        reward: null,
    },
    {
        name: "Anal Cult",
        desc: "Have 500 anal followers at one time",
        type: "anal",
        amount: 500,
        stat: "maxFollowers",
        points: 30,
        reward: null,
    },
    // Sissy
    {
        name: "Sissy Following",
        desc: "Have 50 sissy followers at one time",
        type: "sissy",
        amount: 50,
        stat: "maxFollowers",
        points: 10,
        reward: null,
    },
    {
        name: "Sissy Club",
        desc: "Have 100 sissy followers at one time",
        type: "sissy",
        amount: 100,
        stat: "maxFollowers",
        points: 10,
        reward: null,
    },
    {
        name: "Sissy Community",
        desc: "Have 250 sissy followers at one time",
        type: "sissy",
        amount: 250,
        stat: "maxFollowers",
        points: 20,
        reward: null,
    },
    {
        name: "Sissy Cult",
        desc: "Have 500 sissy followers at one time",
        type: "sissy",
        amount: 500,
        stat: "maxFollowers",
        points: 30,
        reward: null,
    },
    // Bondage
    {
        name: "Bondage Following",
        desc: "Have 50 bondage followers at one time",
        type: "bondage",
        amount: 50,
        stat: "maxFollowers",
        points: 10,
        reward: null,
    },
    {
        name: "Bondage Club",
        desc: "Have 100 bondage followers at one time",
        type: "bondage",
        amount: 100,
        stat: "maxFollowers",
        points: 10,
        reward: null,
    },
    {
        name: "Bondage Community",
        desc: "Have 250 bondage followers at one time",
        type: "bondage",
        amount: 250,
        stat: "maxFollowers",
        points: 20,
        reward: null,
    },
    {
        name: "Bondage Cult",
        desc: "Have 500 bondage followers at one time",
        type: "bondage",
        amount: 500,
        stat: "maxFollowers",
        points: 30,
        reward: null,
    },
];

financeMS = [
    {
        name: "First Paycheck",
        desc: "Earn $1000 over your whole career.",
        type: null,
        amount: 1000,
        stat: "lifetimeMoney",
        points: 10,
        reward: "System: Items",
    },
    {
        name: "Living Wage",
        desc: "Earn $5000 over your whole career.",
        type: null,
        amount: 5000,
        stat: "lifetimeMoney",
        points: 10,
        reward: null,
    },
    {
        name: "Sustainable Sluttiness",
        desc: "Earn $10000 over your whole career.",
        type: null,
        amount: 10000,
        stat: "lifetimeMoney",
        points: 10,
        reward: null,
    },
        {
        name: "Loads of Cash",
        desc: "Earn $25000 over your whole career.",
        type: null,
        amount: 25000,
        stat: "lifetimeMoney",
        points: 20,
        reward: null,
    },
    {
        name: "Cum Money",
        desc: "Earn $50000 over your whole career.",
        type: null,
        amount: 25000,
        stat: "lifetimeMoney",
        points: 20,
        reward: null,
    },
    {
        name: "Pornstar",
        desc: "Earn $100000 over your whole career.",
        type: null,
        amount: 100000,
        stat: "lifetimeMoney",
        points: 30,
        reward: null,
    },
];