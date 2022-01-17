function distanceTo( target ) {
        
        if( !this.x || !this.y || !target.x || !target.y ) {
            return false;
        }
        
        var origin = { x: this.x, y: this.y };
        
        
        return distanceBetween( origin, target );
        
    }