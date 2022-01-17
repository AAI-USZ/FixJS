function(w,h){
            for(var y=0;y<this.h;y++){
                for(var x = 0;x<this.w;x++){
                    this.setCell(x,y,this.tiles.unused);
                }
            }
            this.createRoom(11,11);
            this.createRoom(40,40);
                      this.createRoom(10,30);
            console.log(this.rooms);
            return this;
        }