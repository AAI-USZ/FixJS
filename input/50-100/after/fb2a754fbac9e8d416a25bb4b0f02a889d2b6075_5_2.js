function distanceBetween( point1, point2 ) {
        
        if( !point1.x || !point1.y || !point2.x || !point2.y ) {
            edward.error( 'distanceBetween( point1, point2 ) requires point1 and point2 with x and y property' );
            return false;
        }
        
        var deltaX = ( point2.x - point1.x ),
            deltaY = ( point2.y - point1.y );
            
        return Math.sqrt( Math.pow( deltaX, 2 ) + Math.pow( deltaY, 2 ) );
        
    }