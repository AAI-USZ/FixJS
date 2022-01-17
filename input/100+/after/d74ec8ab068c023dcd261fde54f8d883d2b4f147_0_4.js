function(callback, mimeType, quality) {
        /*
         * need to create a canvas element rather than using the buffer canvas
         * because this method is asynchonous which means that other parts of the
         * code could modify the buffer canvas before it's finished
         */
        var canvas = new Kinetic.Canvas(this.attrs.width, this.attrs.height);
        var context = canvas.getContext();
        var layers = this.children;

        function drawLayer(n) {
            var layer = layers[n];
            var layerUrl = layer.getCanvas().toDataURL(mimeType, quality);
            var imageObj = new Image();
            imageObj.onload = function() {
                context.drawImage(imageObj, 0, 0);

                if(n < layers.length - 1) {
                    drawLayer(n + 1);
                }
                else {
                    callback(canvas.toDataURL(mimeType, quality));
                }
            };
            imageObj.src = layerUrl;
        }
        drawLayer(0);
    }