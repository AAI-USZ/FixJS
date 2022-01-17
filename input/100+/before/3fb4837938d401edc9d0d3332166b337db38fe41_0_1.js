function(event) {
    var tempCanvas = document.getElementsByTagName("CANVAS")[0];
    var cam = gbox.getCamera();
    //mouse.x = (event.layerX - tempCanvas.offsetLeft)/gbox._zoom + cam.x;
    //mouse.y = (event.layerY - tempCanvas.offsetTop)/gbox._zoom + cam.y;
    mouse.x = event.layerX/gbox._zoom + cam.x;
    mouse.y = event.layerY /gbox._zoom + cam.y;
    }