function distanceTo( target ) {
        
        if( !this.x || !this.y || !target.x || !target.y ) {
            edward.error( 'origin.distanceTo( target ) requires origin and point with x and y property' );
            return false;
        }
        
        var origin = { x: this.x, y: this.y };
        
        
        return distanceBetween( origin, target );
        
    }