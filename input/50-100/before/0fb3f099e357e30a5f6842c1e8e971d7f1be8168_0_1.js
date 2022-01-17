function(w,h){
            for(var y=0;y<this.h;y++){
                for(var x = 0;x<this.w;x++){
                    this.setCell(x,y,this.tiles.unused);
                }
            }
            if(this.createRoom(11,11,'n')) console.log(this.map);
            return this;
        }