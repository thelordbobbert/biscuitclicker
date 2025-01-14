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

//click handler for the biscuit clicker button
function clickHandler() {
    //updates their total biscuits variable
    totalBiscuits +=  bclick * clickMultiplier;
    //displays this variable by updating display
    updateTotalBiscuits();
}

//allows the user to buy slaves
function buySlave() {
    if (totalBiscuits >= 100) {
        totalBiscuits -= 100;
        slaveAmount += 1;
    }
    updateSlaveOwnership();
}

//update biscuits
function updateTotalBiscuits() {
    //sets the total biscuits in html to the totalBiscuits variable using the element id
    document.getElementById("totalBiscuits").innerHTML = totalBiscuits;
}

//update bps
function updateBps() {
    //sets the total cps in html to the bps variable using the element id
    document.getElementById("bps").innerHTML = bps;
}

//update slaves
function updateSlaveOwnership() {
    //sets the total slaves in html to the slaveAmount variable using the element id
    document.getElementById("slaves").innerHTML = slaveAmount;
}

//display on page load
updateTotalBiscuits();
updateBps();
updateSlaveOwnership();