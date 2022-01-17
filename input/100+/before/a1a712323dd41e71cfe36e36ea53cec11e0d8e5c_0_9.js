function(x,z,width,depth) {
            width=width||0;
            depth=depth||0;

            var tileRowSize = Math.floor(this.divX/this.tileX);
            var startTileX = Math.floor(((x+(this.sizeX/2.0))/(this.tileX*this.tileSize))*this.tileX);
            var startTileZ = Math.floor(((z+(this.sizeZ/2.0))/(this.tileZ*this.tileSize))*this.tileZ);
            var tileIdx = 0;          
                      
            if ((width===0)&&(depth===0)) {
                tileIdx = parseInt(startTileX+startTileZ*tileRowSize,10);
                return tileIdx;
            } else {
                var endTileX = Math.floor(((x+width+(this.sizeX/2.0))/(this.tileX*this.tileSize))*this.tileX);
                var endTileZ = Math.floor(((z+depth+(this.sizeZ/2.0))/(this.tileZ*this.tileSize))*this.tileZ);
                
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