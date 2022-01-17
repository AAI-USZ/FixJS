function(x,z,op,size,btype,strength) {
            var hfBuffer = this.hfFloatBuffer;
            var hfWidth = this.divX;
            var hfDepth = this.divZ;
            
            var sz = size/this.cellSize;
            
            x = (x-this.startX)/this.cellSize;
            z = (z-this.startZ)/this.cellSize;

            for (var i = parseInt(Math.floor(x - sz),10), iMax = parseInt(Math.ceil(x + sz),10); i < iMax; i++) {
                var dx = i - x;

                for (var j = parseInt(Math.floor(z - sz),10), jMax = parseInt(Math.ceil(z + sz),10); j < jMax; j++) {
                    if (i <= 0 || i >= hfWidth || j <= 0 || j >= hfDepth) continue;
                    var dz = j - z;
                    // todo: implement ops..
                    var val = strength * ((1.0 - Math.sqrt(dx * dx + dz * dz) / (sz)) / 2.0);
                    if (val < 0 && strength >= 0) val = 0;
                    if (val > 0 && strength <= 0) val = 0;
                    hfBuffer[j * hfWidth + i] += val;
                }
            }
        }