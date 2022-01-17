function(callback, mimeType, quality) {
        var canvas = new Kinetic.Canvas(this.attrs.width, this.attrs.height);
        var context = canvas.getContext();
        var layers = this.children;

        function drawLayer(n) {
            var layer = layers[n];
            var canvasUrl;
            try {
                // If this call fails (due to browser bug, like in Firefox 3.6),
                // then revert to previous no-parameter image/png behavior
                canvasUrl = canvas.getElement().toDataURL(mimeType, quality);
            }
            catch(e) {
                canvasUrl = canvas.getElement().toDataURL();
            }

            var imageObj = new Image();
            imageObj.onload = function() {
                context.drawImage(imageObj, 0, 0);

                if(n < layers.length - 1) {
                    drawLayer(n + 1);
                }
                else {
                    try {
                        // If this call fails (due to browser bug, like in Firefox 3.6),
                        // then revert to previous no-parameter image/png behavior
                        callback(canvas.getElement().toDataURL(mimeType, quality));
                    }
                    catch(e) {
                        callback(canvas.getElement().toDataURL());
                    }
                }
            };
            imageObj.src = canvasUrl;
        }
        drawLayer(0);
    }