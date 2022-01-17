function(x,z,tileIdx) {
            var spatX, spatZ;
            
            if (tileIdx === undef) {
                spatX = ((1.0-(x / this.getHeightField().getSize() + 0.5)) *  this.spatResolution * (this.divX/this.tileX)) % this.spatResolution;
                spatZ = ((1.0-(z / this.getHeightField().getSize() + 0.5)) *  this.spatResolution * (this.divZ/this.tileZ)) % this.spatResolution;
            } else {
                var tileRowSize = (this.divX/this.tileX);
                var tileX = tileIdx % tileRowSize;
                var tileZ = Math.floor(tileIdx / tileRowSize);
                var startX = this.hField.getStartX();
                var startZ = this.hField.getStartZ();
                var posX = startX+tileX*this.tileSize;
                var posZ = startZ+tileZ*this.tileSize;

                spatX = (1.0-((x-posX) / this.tileSize)) *  this.spatResolution;
                spatZ = (1.0-((z-posZ) / this.tileSize)) *  this.spatResolution;
            }
            
            return {x: spatX, z: spatZ};
        }