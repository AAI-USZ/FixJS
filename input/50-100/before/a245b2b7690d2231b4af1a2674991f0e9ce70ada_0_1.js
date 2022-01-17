function() {
        width = image.width;
        height = image.height;
        canvas = document.getElementById("obstacles");
        x = index*mul;
        context = canvas.getContext("2d");
        context.drawImage(image, x, y, frameSize, frameSize, xpos*mul+7, ypos*mul+7, frameSize, frameSize);
    }