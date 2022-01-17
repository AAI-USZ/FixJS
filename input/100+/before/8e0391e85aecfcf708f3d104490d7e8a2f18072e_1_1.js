function(pos){
            var size = this.get('size');
            if(pos.x < 0 || pos.x >= size.x || pos.y < 0 || pos.y >= size.y){
                return undefined;
            }else{
                var csize = this.get('cellSize');
                return this.get('cell', [Math.floor(pos.x / csize.x),
                                        Math.floor(pos.y / csize.y)]  );
            }
        }