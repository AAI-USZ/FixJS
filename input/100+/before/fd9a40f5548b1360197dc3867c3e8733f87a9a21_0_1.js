function check_internal () {
        var canvas, context, errorType, i, l;
        
        // webgl browser check
        if (!window.WebGLRenderingContext) {
            errorType = 'webgl_browser';
        }
        else {
            canvas = document.createElement( 'canvas' );
            
            // try each browser's webgl type
            for (i = 0, l = webglNames.length; i < l; i += 1) {
                try {
                    context = canvas.getContext(webglNames[i]);
                }
                catch ( e ) {
                }
                if (context !== null && typeof context !== 'undefined') {
                    break;
                }
            }
            
            // if none found, there is another problem
            if (context === null || typeof context === 'undefined') {
                errorType = 'webgl_other';
            }
        }
        
        // if error found, flag
        if (typeof errorType !== 'undefined') {
            flag(errorType);
        }
    }