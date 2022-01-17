function(){
        var area = iso.area(),createdTiles = 0;
        for(var a=0,al = area.length;a<al;a++){
            var loc = area[a],
            x = loc[0],
            y= loc[1],
            i = y * mh + x,
            object = objects[i], //get current object
            collision =  collisions[i], //get current collision
            tile = null,//initialize tile
            layer = 1,//initialize layer
            z=0,//initialize Z
            tilename=''; //initialize individual name for tiles
          
         
            //place object tiles
            if(object > 0){
                
                //set layer
                layer = 2;
                z = (y+1)*layer;
                tilename = 'Y'+y+'X'+x+'Z'+z;
                //Find Tile
                tile = Crafty(tilename);
                if(tile.length < 1){ //Create tile if tile not exists
                    tile = Crafty.e("2D","Tile","Canvas",object,tilename);//Mark the components as Tiles with Tile component
                    
                    iso.place(tile,x,y,layer);
                    createdTiles++;
                }
                //clear tile
                tile = null;
            }
                    
              
        }
        console.log("Added Tiles",createdTiles);
        //Clearing up the objects
        if(Crafty("Tile").length > 300){
            console.time("Delete Objects");
            var vp = Crafty.viewport.rect(); //get Rect of viewport
            var removedTiles = 0;
            console.log(vp);
            Crafty("Tile").each(function () {
                if (!this.intersect(vp._x,vp._y,vp._w,vp._h)){
                     this.destroy();
                     removedTiles++;
                }
            });
            console.log("Removed Tiles",removedTiles);
            console.timeEnd("Delete Objects");
        }
        counter.text( "Amount of Tiles: "+Crafty("Tile").length);
         
    }