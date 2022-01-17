function drawPowerup(xpos, ypos, type){
    var index = ((type == 'powerup_bomb') ? 11 : 10);
    var canvas, context, width, height, x = 0, y = 0, frameSize = 16;
    var mul = 30;image = new Image();
    image.src = "./powerups.png";
    image.onload = function() {
        width = image.width;
        height = image.height;
        canvas = document.getElementById("obstacles");
        x = index*mul;
        context = canvas.getContext("2d");
        context.drawImage(image, x, y, frameSize, frameSize, xpos*mul+7, ypos*mul+7, frameSize, frameSize);
    }
}