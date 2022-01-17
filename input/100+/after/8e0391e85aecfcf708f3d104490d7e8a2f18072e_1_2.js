function(pos){
            var size = this.get('size');
            if(pos.x < 0 || pos.x >= size.x || pos.y < 0 || pos.y >= size.y){
                return undefined;
            }else{
                var csize = this.get('cellSize');
                var x = Math.max(0,Math.min(this._cellX - 1,Math.floor(pos.x/csize.x)));
                var y = Math.max(0,Math.min(this._cellY - 1,Math.floor(pos.y/csize.y)));
                return { x:x, y:y, cell:this.get('cell',x,y) };
            }
        }