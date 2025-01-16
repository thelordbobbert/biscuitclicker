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
//current total amount of plantations
let plantationAmount = 0;
//cost of slave
let baseSlaveCost = 15;
//base cost of plantation
let basePlantationCost = 100;
//current cost of slave
let slaveCost = 15;
//current cost of plantation
let plantationCost = 100;

//load data from local storage
function loadGame() {
    const savedGame = JSON.parse(localStorage.getItem("biscuitClickerGame"));
    if (savedGame) {
        totalBiscuits = savedGame.totalBiscuits || 0;
        bps = savedGame.bps || 0;
        slaveAmount = savedGame.slaveAmount || 0;
        plantationAmount = savedGame.plantationAmount || 0;
        bpsMultiplier = savedGame.bpsMultiplier || 1;
        clickMultiplier = savedGame.clickMultiplier || 1;
        bclick = savedGame.bclick || 1;
        updateTotalBiscuits();
        updateBps();
        updateSlaveOwnership();
        updatePlantationOwnership();
    }
}

function resetGame() {
    const gameData = {
        totalBiscuits: 0,
        bps: 0,
        slaveAmount: 0,
        plantationAmount: 0,
        bpsMultiplier: 1,
        clickMultiplier: 1,
        bclick: 1,
        slaveCost: 15,
        plantationCost: 100
    };
    localStorage.setItem("biscuitClickerGame", JSON.stringify(gameData));
    loadGame();
}

//used for testing, gives 1mil biscuits
function testing() {
    totalBiscuits += 1000000;
    updateTotalBiscuits();
    saveGame();
}


//save game to local storage
function saveGame() {
    const gameData = {
        totalBiscuits: totalBiscuits,
        bps: bps,
        slaveAmount: slaveAmount,
        plantationAmount: plantationAmount,
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
    //if user has slaveCost or more biscuits, adds one slave, removes slaveCost biscuits.
    slaveCost = baseSlaveCost * Math.ceil((1.1 ^ slaveAmount)* 100)/100;
    if (totalBiscuits >= slaveCost) {
        totalBiscuits -= slaveCost;
        slaveAmount += 1;
        bps += 0.1;
    }
    //displays the new slaves and total biscuit amounts & saves game
    updateSlaveOwnership();
    updateTotalBiscuits();
    updateBps();
    saveGame();
}
// function to buy plantations
function buyPlantation(){
    //if the user has plantationCost biscuits they can buy 1 plantation
    plantationCost = basePlantationCost * (1.1 ^ plantationAmount);
    if(totalBiscuits >= plantationCost){
        totalBiscuits -= plantationCost;
        plantationAmount += 1;
        bps += 1;
    }

    //display the new plantations and update+save game
    updatePlantationOwnership();
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
    //updates slave purchase price display
    document.getElementById("slave-upgrade").innerHTML = "buy slave: " + slaveCost + " biscuits " + "(0.1 bps)";
}
//update plantations
function updatePlantationOwnership() {
    //sets the total plantations in html to the plantationAmount variable using the element id
    document.getElementById("plantations").innerHTML = plantationAmount;
    //upgrades plantation purchase price display
    document.getElementById("plantation-upgrade").innerHTML = "buy plantation: " + plantationCost + " biscuits " + "(1 bps)";
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