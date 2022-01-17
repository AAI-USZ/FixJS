function() {
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
            }