let multiplier = 1;
let bpm = 0;
let bclick = 1;
let clickMultiplier = 1;
let totalCookies = 0;

function clickHandler() {
    totalCookies +=  bclick * clickMultiplier;
    
}

function updateTotalCookies() {
    document.getElementById("totalCookies").innerHTML = totalCookies;
}