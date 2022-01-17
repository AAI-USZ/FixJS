function(x,y,op,size,btype,color) {
            var imageData = this.imageBuffer;
            var width = this.width;
            var height = this.height;
            
            for (var i = parseInt(Math.floor(x),10) - size; i < parseInt(Math.ceil(x),10) + size; i++) {
                var dx = i-x, dy;
                for (var j = parseInt(Math.floor(y),10) - size; j < parseInt(Math.ceil(y),10) + size; j++) {
                    if (i < 0 || i >= width || j < 0 || j >= height) continue;
                    dy = j - y;
                    
                    var val;
                    
                    if (btype === 0) { // SINE
                        val = ((1.0 - Math.sqrt(dx * dx + dy * dy) / (size)) / 2.0);
                    }

                    var idx = (j * width + i)*4;

                    // todo: implement other than just replace..
                    if (op === 0) { // ADD 
                        if (val < 0) val = 0;
                    } else if (op === 1) { // REPLACE
                        if (val < 0) val = 0;
                    } else if (op === 2) { // SUBTRACT
                        val = -val;
                        if (val > 0) val = 0;
                    } 
                    // else if (op === 3) { // MULTIPLY                        
                    // }

                    var r = Math.floor(imageData[idx]*(1.0-val)+color[0]*val);
                    var g = Math.floor(imageData[idx+1]*(1.0-val)+color[1]*val);
                    var b = Math.floor(imageData[idx+2]*(1.0-val)+color[2]*val);
                    var a = Math.floor(imageData[idx+3]*(1.0-val)+color[3]*val);

                    if (r > 255) { r = 255; } else if (r < 0) { r = 0; }
                    if (g > 255) { g = 255; } else if (g < 0) { g = 0; }
                    if (b > 255) { b = 255; } else if (b < 0) { b = 0; }
                    if (a > 255) { a = 255; } else if (a < 0) { a = 0; }

                    imageData[idx] = r;
                    imageData[idx+1] = g;
                    imageData[idx+2] = b;
                    imageData[idx+3] = a;
                }
            }
        }