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
//current total amount of factories
let factoryAmount = 0;
//cost of slave
let baseSlaveCost = 15;
//base cost of plantation
let basePlantationCost = 100;
//base cost of factories
let baseFactoryCost = 1100;
//current cost of slave
let slaveCost = 15;
//current cost of plantation
let plantationCost = 100;
// current cost of factories
let factoryCost = 1100;

//load data from local storage
function loadGame() {
    const savedGame = JSON.parse(localStorage.getItem("biscuitClickerGame"));
    if (savedGame) {
        totalBiscuits = savedGame.totalBiscuits || 0;
        bps = savedGame.bps || 0;

        //Amounts
        slaveAmount = savedGame.slaveAmount || 0;
        plantationAmount = savedGame.plantationAmount || 0;
        factoryAmount = savedGame.factoryAmount || 0;

        bpsMultiplier = savedGame.bpsMultiplier || 1;
        clickMultiplier = savedGame.clickMultiplier || 1;
        bclick = savedGame.bclick || 1;

        //Costs
        slaveCost = savedGame.slaveCost || 15;
        plantationCost = savedGame.plantationCost || 100;
        factoryCost = savedGame.factoryCost || 1100;
        updateTotalBiscuits();
        updateBps();
        updateSlaveOwnership();
        updatePlantationOwnership();
        updateFactoryOwnership();
    }
}

function resetGame() {
    const gameData = {
        totalBiscuits: 0,
        bps: 0,
        slaveAmount: 0,
        plantationAmount: 0,
        factoryAmount: 0,
        bpsMultiplier: 1,
        clickMultiplier: 1,
        bclick: 1,
        slaveCost: 15,
        plantationCost: 100,
        factoryCost: 1100
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
        factoryAmount: factoryAmount,
        bpsMultiplier: bpsMultiplier,
        clickMultiplier: clickMultiplier,
        bclick: bclick,
        slaveCost: slaveCost,
        plantationCost: plantationCost,
        factoryCost: factoryCost
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
 
    if (totalBiscuits >= slaveCost) {
        totalBiscuits -= slaveCost;
        slaveAmount += 1;
        bps += 0.1;
        slaveCost = Math.ceil(baseSlaveCost * Math.pow(1.1,slaveAmount) * 100)/100;    
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
    if(totalBiscuits >= plantationCost){
        totalBiscuits -= plantationCost;
        plantationAmount += 1;
        bps += 1;
        plantationCost = Math.ceil(basePlantationCost * Math.pow(1.1,plantationAmount) * 100)/100;    
    }

    //display the new plantations and update+save game
    updatePlantationOwnership();
    updateTotalBiscuits();
    updateBps();
    saveGame();
}

// function to buy factories
function buyFactory(){
    //if the user has plantationCost biscuits they can buy 1 plantation
    if(totalBiscuits >= factoryCost){
        totalBiscuits -= factoryCost;
        factoryAmount += 1;
        bps += 1;
        factoryCost = Math.ceil(baseFactoryCost * Math.pow(1.1,factoryAmount) * 100)/100;    
    }

    //display the new plantations and update+save game
    updateFactoryOwnership();
    updateTotalBiscuits();
    updateBps();
    saveGame();
}

//update biscuits
function updateTotalBiscuits() {
    //sets the total biscuits in html to the totalBiscuits variable using the element id
    totalBiscuits = Math.ceil(totalBiscuits*100)/100;
    document.getElementById("totalBiscuits").innerHTML = totalBiscuits;
}

//update bps
function updateBps() {
    //sets the total bps in html to the bps variable using the element id
    bps = Math.ceil(bps * 100)/100;
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
//update factories
function updateFactoryOwnership() {
    //sets the total factory in html to the factoryAmount variable using the element id
    document.getElementById("factories").innerHTML = factoryAmount;
    //upgrades factory purchase price display
    document.getElementById("factory-upgrade").innerHTML = "buy factory: " + factoryCost + " biscuits " + "(8 bps)";
}

//gives user their bps & updates display & saves games
function giveBps() {
    totalBiscuits += bps * bpsMultiplier;
    updateTotalBiscuits();
    saveGame();
}
//run the giveBps function once per second
setInterval(giveBps, 1000);

//display on page load
loadGame();