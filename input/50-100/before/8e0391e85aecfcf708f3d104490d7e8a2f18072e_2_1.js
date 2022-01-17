function(cell){
            var bound = cell.bound;
            if(cell.cell){
                this.colVec = this.collisionAxis(bound);
                this.increase('pos',this.colVec);
                if(this.colVec.len() > 1){
                    return true;
                }
            }
        }