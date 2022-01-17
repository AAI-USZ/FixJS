function(x,y,direction){
            var w = Crafty.math.randomInt(4, this.room.w);
            var h = Crafty.math.randomInt(4, this.room.h);
            var d = 'n';
          
            var i = this.directions.indexOf(direction);
            if( i !== -1){
            
                d = this.directions[i];
            }
            var yStart = 0;
            var yEnd = 0;
            var xStart = 0;
            var xEnd = 0;
            var tile = 0;
            var ty = 0;
            var tx = 0;
            var tyl = 0;
            var txl = 0;
           
            switch(d){
                case 'n':{
                    yStart = ~~(y);
                    yEnd = ~~(y-h);
                    xStart = ~~(x-(w/2));
                    xEnd = ~~(x +((w+1)/2));
                  
                    for(ty = yStart,tyl = yEnd;ty>tyl;ty-- ){
                        if(ty < 0 || ty > this.h) return false;
                        for(tx = xStart,txl = xEnd;tx<txl;tx++){
                            if(tx < 0 || tx > this.w) return false;
                           
                            if(!this.getCell(tx,ty,this.tiles.unused)) return false;
                        }
                    }
                    
                    for( ty = yStart,tyl = yEnd;ty>tyl;ty-- ){
                        for( tx = xStart,txl = xEnd;tx<txl;tx++){
                            if(tx == xStart) tile = this.tiles.wall.w;
                            else if(tx == xEnd) tile = this.tiles.wall.e;
                            else if(ty == yStart) tile = this.tiles.wall.n;
                            else if(ty == yEnd) tile = this.tiles.wall.s;
                            else tile = this.tiles.empty;
                            
                         
                            this.setCell(tx,ty,tile);
                        }
                    }

                  

                    break;
                }
            }
            
            return true;
             
        }