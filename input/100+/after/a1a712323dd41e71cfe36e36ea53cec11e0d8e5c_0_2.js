function(divX,divZ,size) {
            this.hfBuffer = new ArrayBuffer(divX*divZ*4);
            this.hfUInt8Buffer = new Uint8Array(this.hfBuffer);
            this.hfFloatBuffer = new Float32Array(this.hfBuffer);

            this.divX = divX||null;
            this.divZ = divZ||null;
            this.size = size||null;
            
            if (this.divX > this.divZ) {
                this.sizeX = size;
                this.sizeZ = (size / this.divX) * this.divZ;
            } else if (this.divZ > this.divX) {
                this.sizeX = (size / this.divZ) * this.divX;
                this.sizeZ = size;
            } else {
                this.sizeX = size;
                this.sizeZ = size;
            }
            
            
            this.drawBuffer = [];
            this.cellSize = this.sizeX/(this.divX);
            this.startX = -(this.sizeX / 2.0) + this.ofsX;
            this.startZ = -(this.sizeZ / 2.0) + this.ofsZ;
        }