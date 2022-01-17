function(rect){
        if(!rect) {
            return false;
        }
        var sides = rect.sides();
        for(var i = 0 ; i < 4 ; i++){
            if(this.intersectsLine(sides[i])){
                return true;
            }
        }

        return false;
    }