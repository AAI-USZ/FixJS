function(cell){
            var bound = cell.bound;
            if(cell.cell){
                this.colVec = this.collisionAxis(bound);
                this.increase('pos',this.colVec);
                if(this.colVec.x){
                    this.moveSpeed.x = 0;
                }else{
                    this.moveSpeed.y = 0;
                }
                if(this.colVec.len() > 1){
                    return true;
                }
            }
        }