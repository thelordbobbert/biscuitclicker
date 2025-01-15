//auto biscuits per second multi
let bpsMultiplier = 1;
//biscuits per second (before multi)
let bps = 0;
//biscuits per click (before multi)
let bclick = 1;
//biscuits clicked multi
let clickMultiplier = 1;
//current total amount of biscuits
let totalBiscuits = 0;
//current total amount of slaves
let slaveAmount = 0;

//load data from local storage
function loadGame() {
    const savedGame = JSON.parse(localStorage.getItem("biscuitClickerGame"));
    if (savedGame) {
        totalBiscuits = savedGame.totalBiscuits || 0;
        bps = savedGame.bps || 0;
        slaveAmount = savedGame.slaveAmount || 0;
        bpsMultiplier = savedGame.bpsMultiplier || 1;
        clickMultiplier = savedGame.clickMultiplier || 1;
        bclick = savedGame.bclick || 1;
        updateTotalBiscuits();
        updateBps();
        updateSlaveOwnership();
    }
}

//save game to local storage
function saveGame() {
    const gameData = {
        totalBiscuits: totalBiscuits,
        bps: bps,
        slaveAmount: slaveAmount,
        bpsMultiplier: bpsMultiplier,
        clickMultiplier: clickMultiplier,
        bclick: bclick
    };
    localStorage.setItem("biscuitClickerGame", JSON.stringify(gameData));
}


//click handler for the biscuit clicker button
function clickHandler() {
    //updates their total biscuits variable
    totalBiscuits +=  bclick * clickMultiplier;
    //displays this variable by updating display & saves
    updateTotalBiscuits();
    saveGame();
}

//allows the user to buy slaves
function buySlave() {
    //if user has 100 or more biscuits, adds one slave, removes 100 biscuits.
    if (totalBiscuits >= 100) {
        totalBiscuits -= 100;
        slaveAmount += 1;
        bps += 1;
    }
    //displays the new slaves and total biscuit amounts & saves game
    updateSlaveOwnership();
    updateTotalBiscuits();
    updateBps();
    saveGame();
}

//update biscuits
function updateTotalBiscuits() {
    //sets the total biscuits in html to the totalBiscuits variable using the element id
    document.getElementById("totalBiscuits").innerHTML = totalBiscuits;
}

//update bps
function updateBps() {
    //sets the total bps in html to the bps variable using the element id
    document.getElementById("bps").innerHTML = bps;
}

//update slaves
function updateSlaveOwnership() {
    //sets the total slaves in html to the slaveAmount variable using the element id
    document.getElementById("slaves").innerHTML = slaveAmount;
}

//gives user their bps & updates display & saves games
function giveBps() {
    totalBiscuits += bps;
    updateTotalBiscuits();
    saveGame();
}
//run the giveBps function once per second
setInterval(giveBps, 1000);

//display on page load
loadGame();