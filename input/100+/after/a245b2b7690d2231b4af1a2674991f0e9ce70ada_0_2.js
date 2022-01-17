function drawBomb(xpos, ypos){

    var index = 51;

    var canvas, context, width, height, x = 0, y = 0, numFrames = 15, frameSize = 29;

    var mul = 30;image = new Image();

    image.src = "./spritesheet.png";

    image.onload = function() {

        width = image.width;

        height = image.height;

        canvas = document.getElementById("bombs");

        y = (index-(index%numFrames))/numFrames*frameSize;

        x = (index%numFrames)*frameSize;

        context = canvas.getContext("2d");

        context.drawImage(image, x, y, frameSize, frameSize, xpos*mul, ypos*mul, frameSize, frameSize);

    }

}