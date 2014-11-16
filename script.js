$(function() {
    var Simulation = function() {
        var canvas = $("#canvas")[0];
        var context = canvas.getContext("2d");
        var radius = canvas.width / 2;
        var ratioExpected = 0.785398;
        var totalPoints = 0;
        var pointsInCircle = 0;
        var iterations = parseInt($("#numIterations").val());
        var numInCircleExpected = Math.floor(iterations * ratioExpected);

        canvas.width = canvas.width;
        drawCircle();
        drawBox();
        $("#numPointsExpected").text(iterations);
        $("#numInCircleExpected").text(numInCircleExpected);
        $("#ratioExpected").text(ratioExpected);

        this.run = function() {
            step();
        }

        function step() {
            totalPoints++;

            // Let's pick a random point in the grid.
            var x = randomPointComponent();
            var y = randomPointComponent();
            var color = "#ff0000";

            var inCircle = false;

            if ( isInCircle(x, y) ) {
                color = "#00ff00";
                pointsInCircle++;
            }

            drawPoint(x, y, color);
            update();

            if ( totalPoints < iterations )
                window.setTimeout(step, 1);
        }

        function update() {
            $("#numPointsActual").text(totalPoints);
            $("#numInCircleActual").text(pointsInCircle);
            $("#numInCircleError").text(errorPct(numInCircleExpected, pointsInCircle));

            var ratio = pointsInCircle / totalPoints;
            $("#ratioActual").text(ratio.toFixed(6));
            $("#ratioError").text(errorPct(ratioExpected, ratio));

            $("#piActual").text((ratio * 4).toFixed(6));
            $("#piError").text(errorPct(Math.PI, ratio*4));
        };

        function errorPct(expected, actual) {
            return (Math.abs(expected - actual)/Math.abs(expected) * 100).toFixed(6);
        }

        function drawPoint(x, y, color) {
            context.beginPath();
            context.arc(x, y, 1, 0, 2*Math.PI, false);
            context.fillStyle = color;
            context.fill();
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

        function drawCircle() {
           context.beginPath();
           context.arc(radius, radius, radius, 0, Math.PI*2, true);
           context.stroke();
        }

        function drawBox() {
            context.beginPath();
            context.rect(0, 0, canvas.width, canvas.height);
            context.stroke();
        }
    };

    var simulation = new Simulation();

    $("#run").click(function() {
        (new Simulation()).run();
    })
});
