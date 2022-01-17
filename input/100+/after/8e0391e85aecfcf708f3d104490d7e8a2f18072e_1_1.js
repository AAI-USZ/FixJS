function(index){
            if(index){
                var csize = this.get('cellSize');
                return new modula.Rect(index[0] * csize.x, index[1] * csize.x, csize.x, csize.y );
            }else{
                return new modula.Rect(0,0,this.get('size').x, this.get('size').y);
            }
        }