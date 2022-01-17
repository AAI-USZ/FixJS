function(opt) {
        opt = opt||{};
        
        this.divX = opt.divX||null;
        this.divZ = opt.divZ||null;
        this.size = opt.size||null;
        
        this.hfBuffer = null;
        this.hfUInt8Buffer = null;
        this.hfFloatBuffer = null;
        this.cellSize = null;
        this.sizeX = null;
        this.sizeZ = null;
        this.cellSize = null;
        this.ofsX = opt.ofsX||(-this.cellSize / 2.0);
        this.ofsZ = opt.ofsZ||(-this.cellSize / 2.0);

        if (this.divX && this.divZ && this.size) {
            this.initBuffer(this.divX,this.divZ,this.size);
        }
        
        this.areaBuffered = false;
        this.drawArea = {startX:0,startZ:0,endX:0,endZ:0};
    }