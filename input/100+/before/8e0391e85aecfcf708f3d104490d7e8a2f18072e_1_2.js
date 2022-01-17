function(minx, miny, maxx, maxy){
            var size = this.get('size');
            if(maxx <= 0 || maxy <= 0){
                return [];
            }else if(minx >= size.x || miny >= size.y){
                return [];
            }else{
                var csize = this.get('cellSize').clone();
                csize.x = 1.0 / csize.x;
                csize.y = 1.0 / csize.y;
                minx = Math.floor(Math.max(minx,0) * csize.x);
                miny = Math.floor(Math.max(miny,0) * csize.y);
                maxx = Math.floor(Math.min(maxx,size.x-1) * csize.x);
                maxy = Math.floor(Math.min(maxy,size.y-1) * csize.y);
                var cells = [];
                for(var x = minx; x <= maxx; x++){
                    for(var y = miny; y <= maxy; y++){
                        cells.push({x:x, y:y, cell: this.get('cell',[x,y])});
                    }
                }
                return cells;
            }
        }