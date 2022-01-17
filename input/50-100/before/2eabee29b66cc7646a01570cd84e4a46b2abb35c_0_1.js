function startMandelbulb() {

    /* Load the canvas */
    var mandelbulbCanvas = document.getElementById('mandelbulb');
    cHeight = mandelbulbCanvas.height;
    cWidth = mandelbulbCanvas.width;

    context = mandelbulbCanvas.getContext("2d");
    context.fillRect(0, 0, cWidth, cHeight);

    //With a depth of field of 2.0x2.0 we calculate the pixel detail
    //This isn't using aspect ratio, nor real perspective
    pixel = DEPTH_OF_FIELD/((cHeight+cWidth)/2);
    halfPixel = pixel/2;

    image = context.getImageData(0, 0, cWidth, cHeight);
    imageData = image.data;

    animate();
}