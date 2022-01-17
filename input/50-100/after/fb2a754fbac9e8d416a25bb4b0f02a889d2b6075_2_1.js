function lineTo( destination, ctx ) {
        
        if( !this.x || !this.y ) {
            edward.error( 'lineTo()\'s host object needs an x and y value' );
            return false;
        }
        
        ctx.beginPath();
        ctx.moveTo( this.x, this.y );
        ctx.lineTo( destination.x, destination.y );
        ctx.stroke();
        
        return destination;
        
    }