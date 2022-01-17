f    'use strict';
    a2d.Node.apply(this);
    var self = this,
        $draw = this.draw.bind(this),
        $fireEvent = this.fireEvent.bind(this),
        tiles = [],
        tileSize = new a2d.Dimension(0, 0),
        gridSize = new a2d.Dimension(0, 0),
        lastOffset = null,
        canvasCache = document.createElement("canvas");
    canvasCache.width = a2d.dimension.Width;
    canvasCache.height = a2d.dimension.Height;
    this.boundingBox = new a2d.Rectangle(new a2d.Position(0, 0), new a2d.Position(a2d.dimension.Width, a2d.dimension.Height));
    this.scrollLock = true;
    this.offset = new a2d.Position(0, 0);
    this.dimension = new a2d.Dimension(a2d.dimension.Width, a2d.dimension.Height);
    this.setData = function (data) {
        var x = 0, y = 0, tileCount = 0;
        gridSize = new a2d.Dimension(data.gridSize[0], data.gridSize[1]);
        tileSize = new a2d.Dimension(data.tileSize[0], data.tileSize[1]);
        for(y = 0; y < gridSize.Height; y++) {         
            for(x = 0; x < gridSize.Width; x++) {
                if (!tiles[x]) { 
                    tiles[x] = [];
                }                    
                tiles[x][y] = new a2d.Tile(a2d.resources[data.tileSet]);
                tiles[x][y].tileSize = tileSize;
                tiles[x][y].setTile(data.tiles[tileCount]);
                tiles[x][y].parent = this;
                if(data.tiles[tileCount] !== -1) {
                   tiles[x][y].edit = true;
                }            
                tiles[x][y].position = new a2d.Position((x * tileSize.Width / 2) - y * (tileSize.Width / 2), (y * tileSize.Height / 2) + x * tileSize.Height / 2);
                tileCount++;
            }
        }
        //console.log(tileCount);
    };
    this.getTileSize = function() { return tileSize; }
    /**
     * Hijack the fireEvent method to add a little tile-related information to each click event
     */
    this.fireEvent = function(eventName, eventObject) {
        //console.log("delegate firing: " + eventName);
        if(eventName === "click") {
            if(!eventObject) {
                eventObject = {};
            }
            eventObject.tile = self.getTile(a2d.mousePosition);
            //console.log(eventObject.tile);
            eventObject.tileType = tiles[eventObject.tile.X][eventObject.tile.Y].tile;
        }
        $fireEvent(eventName, eventObject);
    }
    /**
     * @returns {number} grid width
     */
    this.getWidth = function () {
        return gridSize.Width;
    };
    /**
     * @returns {number} grid height
     */    
    this.getHeight = function () {
        return gridSize.Height;
    };
    /**
     * @returns {a2d.Position} tile position from pixel position
     * @param {a2d.Position} pos pixel position
     */    
    this.getTile = function (pixelPosition) {
        var pp = pixelPosition.clone();
        pp.X = pp.X / tileSize.Width;
        pp.Y = pp.Y / tileSize.Height;
        pp = a2d.ScreenToGame(pp);        
        if(game.chrome) {
            pp.Y -= 0.5;
        } else {
            pp.X -= 0.5;            
        }
        //
        
        pp = pp.floor();
        //console.log(pp);
        return pp;
    };

/*
    document.addEventListener("mousemove", function(e) {
        var tp = self.getTile(new a2d.Position(e.clientX, e.clientY));
        console.log(tp);
        if(tiles[tp.X] && tiles[tp.X][tp.Y] && tp.not(self.last)) {
            tiles[tp.X][tp.Y].opacity = 0.5;
            if(self.last) {
                tiles[self.last.X][self.last.Y].opacity = 1.0;
            }
            self.last = tp;
        }
    });
*/
    /*
    this.on("mouseover", function() {
        var tp = self.getTile(a2d.mousePosition);
        console.log(tp);
        if(tiles[tp.X] && tiles[tp.X][tp.Y]) {
            tiles[tp.X][tp.Y].opacity = 0.5;
            if(self.last) {
                tiles[self.last.X][self.last.Y].opacity = 1.0;
            }
            self.last = tp;
        }
        //tiles[tp.X][tp.Y].on("mouseout", function(e) { e.target.opacity = 1.0; });
                
    });*/

     /**
     * @returns {a2d.Position} pixel position from tile position
     * @param {a2d.Position} pos tile position
     */ 
    this.toPix = function(pos) {
        return new a2d.Position(pos.X * tileSize.Width + parseInt(tileSize.Width / 2, 10), pos.Y * tileSize.Height + parseInt(tileSize.Height / 2, 10));  
    };
    /** 
     * @returns {Array} array of tiles
     */
    this.getTiles = function () {
        return tiles;
    };
    this.draw = function () {
        var x, y,
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
    /**
     * Get the visible area of the map
     * @returns {object} o
     * @returns {a2d.Position} o.from coordinates of the top left visible tile
     * @returns {a2d.Position} o.to coordinates of the bottom right tile
     */
    this.visibleArea = function() {
        return ({
            from: this.getTile(self.offset),
            to: new a2d.Position((fromTile.X + Math.floor(a2d.dimension.Width / tileSize.Width) + 1) + 1,
                (fromTile.Y + Math.floor(a2d.dimension.Height / tileSize.Height) + 1) + 1)
        });
    };
    /**
     * render an image of this tilegrid in the given size,
     * presumably to use as a base for a minimap.
     * @param {a2d.Dimension} miniSize the size of the output
     * @returns drawable a2d.SceneNode containing a static image of the level in requested size.
     * warning: using sizes that result in fractured scales may leave some lines blank between tiles.
     */
    this.getMini = function(miniSize) {
        var miniCanvas = document.createElement("canvas"),
            miniContext = miniCanvas.getContext("2d"),
            fullWidth = tileSize.Width * gridSize.Width,
            fullHeight = tileSize.Height * gridSize.Height,
            scale = new a2d.Vector(miniSize.Width / fullWidth, miniSize.Height / fullHeight);
        miniCanvas.width = miniSize.Width;
        miniCanvas.height = miniSize.Height;
        for(var x = 0; x < gridSize.Width; x++) {
            for(var y = 0; y < gridSize.Height; y++) {
                tiles[x][y].draw(miniCanvas, scale);
            }
        }
        return new a2d.Tile(miniCanvas);
    };
    //if data is supplied in the constructor, use it.
    if(data) {
        this.setData(data);
    }
};