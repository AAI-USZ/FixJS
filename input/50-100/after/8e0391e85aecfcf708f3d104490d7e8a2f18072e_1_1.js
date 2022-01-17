function(cell){
            for(var x = 0; x < this._cellX; x++){
                for (var y = 0; y < this._cellY; y++){
                    this.set('cell',[x,y],cell);
                }
            }
        }