function (x, z) {
             // pretend we have faces and construct the triangle that forms at x,z
             if (typeof (x) === 'object') {
                 return this.getIndicesAt(x[0], x[2]);
             }
             
             var ofs_x = this.startX;
             var ofs_z = this.startZ;

             var i = Math.floor((x-ofs_x)/this.cellSize);
             var j = Math.floor((z-ofs_z)/this.cellSize);

             if (i < 0) {
                 return -1;
             }
             if (i >= this.divX - 1) {
                 return -1;
             }
             if (j < 0) {
                 return -1;
             }
             if (j >= this.divZ - 1) {
                 return -1;
             }
             
             var slope = Math.abs(z - ((j+1)*this.cellSize+ofs_z)) / Math.abs(x - (i*this.cellSize+ofs_x));

             var faceIndices;

             if (slope >= 1.0) {
                 faceIndices = [(i) + ((j + 1) * this.divX), (i + 1) + ((j) * this.divX), (i) + ((j) * this.divX)];
                 return [i,j,faceIndices,0];    // starting index + index tuple + offset (half quad indicator)
             } else {
                 faceIndices = [(i) + ((j + 1) * this.divX), (i + 1) + ((j + 1) * this.divX), (i + 1) + ((j) * this.divX)];
                 return [i,j,faceIndices,1];
             }             
         }