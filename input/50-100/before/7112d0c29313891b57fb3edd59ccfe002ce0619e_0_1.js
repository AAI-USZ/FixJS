function() {
        width = image.width;
        height = image.height;
        canvas = document.getElementById("bombs");
        y = (index-(index%numFrames))/numFrames*frameSize;
        x = (index%numFrames)*frameSize;
        context = canvas.getContext("2d");
        context.drawImage(image, x, y, frameSize, frameSize, xpos*mul+4, ypos*mul+4, frameSize, frameSize);
    }