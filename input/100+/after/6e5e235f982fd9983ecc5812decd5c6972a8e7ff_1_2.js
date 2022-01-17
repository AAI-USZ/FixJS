f        var x, y,
            fromTile,
            toTile;
        if (this.visible) {            
            if(true) {//!lastOffset || lastOffset.not(a2d.offset)) {
                canvasCache.width = self.dimension.Width;
                canvasCache.height = self.dimension.Height;
                fromTile = new a2d.Position(0, 0); //this.getTile(a2d.offset);
                //fromTile.add(new a2d.Position(1, 1)); //correction for top/left tiles
                //fromTile.scale(new a2d.Position(-1, -1));
                //toTile = new a2d.Position((fromTile.X + Math.floor(a2d.dimension.Width / tileSize.Width) + 1) + 1,                    
                //(fromTile.Y + Math.floor(a2d.dimension.Height / (tileSize.Height / 4)) + 1) + 1);
                toTile = new a2d.Position(gridSize.Width, gridSize.Height);
                if(toTile.X > gridSize.Width){ toTile.X = gridSize.Width; }
                if(toTile.Y > gridSize.Height){ toTile.Y = gridSize.Height; }
                if(fromTile.X < 0){ fromTile.X = 0; }
                if(fromTile.Y < 0){ fromTile.Y = 0; }
                for(y = fromTile.Y; y < toTile.Y; y++){
                    for(x = fromTile.X; x < toTile.X; x++){
                        if(tiles[x][y].tile !== -1) {                            
                            tiles[x][y].draw(canvasCache); 
                        }
                    }
                } 
                lastOffset = self.offset.clone(); //new a2d.Position(a2d.offset.X, a2d.offset.Y);
            }
            a2d.context.drawImage(canvasCache, self.position.X, self.position.Y);    
        } 
        $draw();
    };
