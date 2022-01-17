function(){
            var grid  = gridEnt.grid;
            var centercell  = grid.getCellAtPixel(this.get('pos'));
            var bound = this.get('bound').cloneAt(this.get('pos'));
            var cells = [[],[],[]];
            if(!centercell){
                return {outside:true};
            }
            for(var x = -1; x <=1; x++){
                for(var y = -1; y <= 1; y++){
                    var px = centercell.x + x;
                    var py = centercell.y + y;
                    var c  = grid.get('cell',[px,py]);
                    var b =  grid.get('bound',[px,py]);
                    cells[x+1][y+1] = {
                        x:px,
                        y:py,
                        out: px < 0 || px >= grid.get('cellX') || py < 0 || py >= grid.get('cellY'),
                        cell:c,
                        bound:b,
                        solid: !!c,
                        collides: bound.collides(b),
                        cvec:bound.collisionVector(b),
                        caxis:bound.collisionAxis(b),
                    };
                }
            }
            return {
                outside:false,
                cells: cells,
            };
        }