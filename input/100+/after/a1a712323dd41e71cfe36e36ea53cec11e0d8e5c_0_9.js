function(x,z,width,depth) {
            width=width||0;
            depth=depth||0;
            var startX = this.hField.getStartX();
            var startZ = this.hField.getStartZ();

            var tileRowSize = Math.floor(this.divX/this.tileX);
            var startTileX = Math.floor(((x-startX)/(this.tileX*this.tileSize))*this.tileX);
            var startTileZ = Math.floor(((z-startZ)/(this.tileZ*this.tileSize))*this.tileZ);
            var tileIdx = 0;          
                      
            if ((width===0)&&(depth===0)) {
                tileIdx = parseInt(startTileX+startTileZ*tileRowSize,10);
                return tileIdx;
            } else {
                var endTileX = Math.floor(((x+width-startX)/(this.tileX*this.tileSize))*this.tileX);
                var endTileZ = Math.floor(((z+depth-startZ)/(this.tileZ*this.tileSize))*this.tileZ);
                
                var tileList = [];
                
                // endTileX = endTileX % tileRowSize;
                // endTileZ = Math.floor(endTileZ / tileRowSize);

                for (var j = startTileZ; j <= endTileZ; j++) {
                    for (var i = startTileX; i <= endTileX; i++) {
                        tileIdx = j*(this.divX/this.tileX)+i;
                        if (tileIdx >= 0 && tileIdx < this.tiles.length) {
                            tileList.push(tileIdx);
                        }
                    }
                }

                return tileList;
            }
            // x, z, width, 
        }