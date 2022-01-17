function removeObstacle(xpos, ypos) {
    var canvas, context;
    var mul = 30;
    canvas = document.getElementById("obstacles");
    context = canvas.getContext("2d");
    context.clearRect(xpos*mul+4, ypos*mul+4, 30, 30);
}