var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var iteration = document.getElementById("iteration");
var numPoints = document.getElementById("numPoints");
var numInCircle = document.getElementById("numInCircle");
var estimate = document.getElementById("estimate");
var ratio = document.getElementById("ratio");
var numIters = document.getElementById("numIters");
var runButton = document.getElementById("mc-run");
var radius = canvas.width / 2;
var drawDelay = 1;

var totalPoints = 0;
var pointsInCircle = 0;
var iters = 0;
var thisIter = 0;

function drawCircle() {
   context.beginPath();
   context.arc(radius, radius, radius, 0, Math.PI*2, true);
   context.stroke();
}

function drawBox() {
    context.rect(0, 0, canvas.width, canvas.height);
    context.stroke();
}

function initDraw() {
    // sneaky way of totally clearing canvas state
    canvas.width = canvas.width;
    totalPoints = 0;
    pointsInCircle = 0;
    iters = 0 + numIters.value;

    // Draw our initial stuff.
    drawBox();
    drawCircle();
}

function randomPointComponent() {
    // max = canvas width, min = 0.
    return (Math.random() * canvas.width);
}

// Pythagorean theorem: x^2 + y^2 = r^2. If <= r^2, in circle.
function isInCircle(x, y) {
    var magX = Math.pow(x - radius, 2);
    var magY = Math.pow(y - radius, 2);
    var rSquared = Math.pow(radius, 2);

    return magX + magY <= rSquared;
}

function drawPoint(x, y, color) {
    context.beginPath();
    context.arc(x, y, 3, 0, 2*Math.PI, false);
    context.fillStyle = color;
    context.fill();
}

function createPoint() {
    // Let's pick a random point in the grid.
    var x = randomPointComponent();
    var y = randomPointComponent();
    var color = "#ff0000";

    totalPoints++;

    if ( isInCircle(x, y) ) {
        color = "#00ff00";
        pointsInCircle++;
    }

    drawPoint(x, y, color);
}

function simulationStep() {
    thisIter++;

    createPoint();

    iteration.innerHTML = thisIter;
    numPoints.innerHTML = totalPoints;
    numInCircle.innerHTML = pointsInCircle;
    ratio.innerHTML = (pointsInCircle/totalPoints);
    estimate.innerHTML = 4 * (pointsInCircle/totalPoints);

    if ( thisIter <= iters )
        setTimeout(simulationStep, drawDelay);
}

runButton.addEventListener('click', function() {
    initDraw();
    simulationStep();
});
window.addEventListener('load', initDraw);
