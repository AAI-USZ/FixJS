function removeBomb(xpos, ypos) {
    var canvas, context;
    var mul = 30;
    canvas = document.getElementById("bombs");
    context = canvas.getContext("2d");
    context.clearRect(xpos*mul, ypos*mul, 30, 30);
}