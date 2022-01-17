function(callback, mimeType, quality) {
        /*
         * we need to create a temp layer rather than using
         * the bufferLayer because the stage toDataURL method
         * is asynchronous, which means that other parts of the
         * code base could be updating or clearing the bufferLayer
         * while the stage toDataURL method is processing
         */
        var tempLayer = new Kinetic.Layer();
        tempLayer.getCanvas().width = this.attrs.width;
        tempLayer.getCanvas().height = this.attrs.height;
        tempLayer.parent = this;
        var tempCanvas = tempLayer.getCanvas();
        var tempContext = tempLayer.getContext();

        var layers = this.children;

        function drawLayer(n) {
            var layer = layers[n];
            var layerUrl;
            try {
                // If this call fails (due to browser bug, like in Firefox 3.6),
                // then revert to previous no-parameter image/png behavior
                layerUrl = layer.getCanvas().toDataURL(mimeType, quality);
            }
            catch(e) {
                layerUrl = layer.getCanvas().toDataURL();
            }

            var imageObj = new Image();
            imageObj.onload = function() {
                tempContext.drawImage(imageObj, 0, 0);

                if(n < layers.length - 1) {
                    drawLayer(n + 1);
                }
                else {
                    try {
                        // If this call fails (due to browser bug, like in Firefox 3.6),
                        // then revert to previous no-parameter image/png behavior
                        callback(tempLayer.getCanvas().toDataURL(mimeType, quality));
                    }
                    catch(e) {
                        callback(tempLayer.getCanvas().toDataURL());
                    }
                }
            };
            imageObj.src = layerUrl;
        }
        drawLayer(0);
    }