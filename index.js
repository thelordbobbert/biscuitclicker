let multiplier = 1;
let bpm = 0;
let bclick = 1;
let clickMultiplier = 1;
let totalCookies = 0;

//click handler for the biscuit clicker button
function clickHandler() {
    //updates their total cookies variable
    totalCookies +=  bclick * clickMultiplier;
    //displays this variable by updating display
    updateTotalCookies();
}

//update cookies
function updateTotalCookies() {
    //sets the total cookies in html to the totalCookies variable using the element id
    document.getElementById("totalCookies").innerHTML = totalCookies;
}

//display on page load
updateTotalCookies();