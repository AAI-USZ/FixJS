function(x,z,tileIdx) {
            var spatX, spatZ;
            
            if (tileIdx === undef) {
                spatX = ((1.0-(x / this.getHeightField().getSize() + 0.5)) *  this.spatResolution * (this.divX/this.tileX)) % this.spatResolution;
                spatZ = ((1.0-(z / this.getHeightField().getSize() + 0.5)) *  this.spatResolution * (this.divZ/this.tileZ)) % this.spatResolution;
            } else {
                var tileRowSize = (this.divX/this.tileX);
                var tileX = tileIdx % tileRowSize;
                var tileZ = Math.floor(tileIdx / tileRowSize);
                var posX = (-this.sizeX/2.0)+tileX*this.tileSize;
                var posZ = (-this.sizeZ/2.0)+tileZ*this.tileSize;

                spatX = (1.0-((x-posX) / this.tileSize)) *  this.spatResolution;
                spatZ = (1.0-((z-posZ) / this.tileSize)) *  this.spatResolution;
            }
            
            return {x: spatX, z: spatZ};
        }