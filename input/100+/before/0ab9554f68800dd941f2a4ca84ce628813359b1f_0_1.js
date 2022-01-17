function(from){
        var pos = iso.px2pos(this.x+this.w/2,this.y+this.h);
        pos.x = ~~pos.x;
        pos.y = ~~pos.y;
           //calculate index of tile
        var i = pos.y * mh + pos.x;
  
        //check if the tile is solid
        if(collisions[i] > 0) {
            this.x = from.x;
            this.y = from.y;
        }
        Crafty.background('url("img/frontier_outpost.png") '+(Crafty.viewport.x+32)+'px '+(Crafty.viewport.y-32)+'px  #000');
        //If player coordiantes didnt changed return
        if(this.position.x == pos.x || this.position.y == pos.y) return;
      
        //update player coordiantes
        this.position.x = pos.x;
        this.position.y = pos.y;
        this.z = (pos.y) * 2;
        //update map
        // bg.render();
        renderObjects();
    }