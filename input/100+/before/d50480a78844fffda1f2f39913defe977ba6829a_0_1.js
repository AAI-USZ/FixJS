function (x, z) {
             // pretend we have faces and construct the triangle that forms at x,z
             if (typeof (x) === 'object') {
                 return this.getIndicesAt(x[0], x[2]);
             }

             var ofs_w = (this.sizeX / 2.0) - ((this.sizeX / (this.divX)) / 2.0);
             var ofs_h = (this.sizeZ / 2.0) - ((this.sizeZ / (this.divZ)) / 2.0);

             var i = parseInt(Math.floor(((x + ofs_w) / this.sizeX) * (this.divX)), 10);
             var j = parseInt(Math.floor(((z + ofs_h) / this.sizeZ) * (this.divZ)), 10);
             
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
             
             // todo: this seems a tad wasteful..
             var slope = Math.abs(z-ofs_h - (i*this.cellSize-ofs_h)) / Math.abs(x-ofs_w - (j*this.cellSize-ofs_h));

             var faceIndices;

             if (slope >= 1.0) {
                 faceIndices = [(i) + ((j + 1) * this.divX), (i + 1) + ((j) * this.divX), (i) + ((j) * this.divX)];
                 return [i,j,faceIndices,0];    // starting index + index tuple + offset (half quad indicator)
             } else {
                 faceIndices = [(i) + ((j + 1) * this.divX), (i + 1) + ((j + 1) * this.divX), (i + 1) + ((j) * this.divX)];
                 return [i,j,faceIndices,1];
             }             
         }