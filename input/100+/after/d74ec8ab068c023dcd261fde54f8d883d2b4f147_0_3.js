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