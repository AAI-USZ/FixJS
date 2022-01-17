function(){
        var i = 0;
        var bg = Crafty.e("IsoLayer,background"); //Create Background entity
       
        for(var y = 0;y<mh;y++){
            
            for(var x = 0;x<mw;x++){
                i = y * mh+x;
                var background = backgrounds[i],tile=null; //get Background image
                if(background > 0){
                    tile = Crafty.e(background); //Create Tile
                    iso.place(tile,x,y); //calculate tile positions
                    bg.addTile(tile.cacheCanvas,tile.x,tile.y); //Draw tile to offscreen
                    tile.destroy(); //Destroy object
                }
                
              
            }
                
            
        }
        bg.draw(); //Draw offscreen into stage
      
    }