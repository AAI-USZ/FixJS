function () {
        var x, y,
            fromTile,
            toTile;
        if (this.visible) {
        
            if(!lastOffset || lastOffset.not(this.offset)) {
                if(a2d.forceClear) {
                    //canvasCache.width = canvasCache.width;
                    canvasCache.getContext("2d").clearRect(0, 0, a2d.dimension.Width, a2d.dimension.Height);
                }
                fromTile = this.getTile(this.offset);
                fromTile.add(new a2d.Position(1, 1)); //correction for top/left tiles
                fromTile.scale(new a2d.Position(-1, -1));
                toTile = new a2d.Position((fromTile.X + Math.floor(a2d.dimension.Width / tileSize.Width) + 1) + 1,
                (fromTile.Y + Math.floor(a2d.dimension.Height / tileSize.Height) + 1) + 1);
                if(toTile.X > gridSize.Width){ toTile.X = gridSize.Width; }
                if(toTile.Y > gridSize.Height){ toTile.Y = gridSize.Height; }
                if(fromTile.X < 0){ fromTile.X = 0; }
                if(fromTile.Y < 0){ fromTile.Y = 0; }
                for(x = fromTile.X; x < toTile.X; x++){
                    for(y = fromTile.Y; y < toTile.Y; y++){
                        if(tiles[x][y].tile !== -1) {
                            tiles[x][y].draw(canvasCache); 
                        }
                    }
                } 
                lastOffset = this.offset.clone();
            }            
            
            //canvasCache.offset = this.offset;
            //canvasCache.draw();
            a2d.context.drawImage(canvasCache, 0, 0);    
        } 
        $draw();
    }