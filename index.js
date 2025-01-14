let multiplier = 1;
let bpm = 0;
let bclick = 0;
let clickMultiplier = 1;
let totalCookies = 0;

function clickHandler() {
    totalCookies +=  bclick * clickMultiplier;
    alert(totalCookies);
}
