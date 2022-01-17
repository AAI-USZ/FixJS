function drawPicture(index,xpos,ypos,xposold,yposold, myCanvas)
{
    var canvas, context, image, width, height, x = 0, y = 0, numFrames = 15, frameSize = 29;
    var mul = 30;
    image = new Image();
    image.src = "./spritesheet.png";
    image.onload = function() {
        width = image.width;
        height = image.height;
        canvas = document.getElementById(myCanvas);
        y = (index-(index%numFrames))/numFrames*frameSize;
        x = (index%numFrames)*frameSize;
        context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, x, y, frameSize, frameSize, xpos*mul+4, ypos*mul+4, frameSize, frameSize);
    }
}