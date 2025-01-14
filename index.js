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

//click handler for the biscuit clicker button
function clickHandler() {
    //updates their total biscuits variable
    totalBiscuits +=  bclick * clickMultiplier;
    //displays this variable by updating display
    updateTotalBiscuits();
}

//update biscuits
function updateTotalBiscuits() {
    //sets the total biscuits in html to the totalBiscuits variable using the element id
    document.getElementById("totalBiscuits").innerHTML = totalBiscuits;
}

//display on page load
updateTotalBiscuits();