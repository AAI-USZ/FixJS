function( distance, speed )
    {
        speed = speed || 1;
        speed = Math.abs( speed );

        var 
        value = 0,
        ani   = [];

        while( value < distance )
        {
            value += speed;
            ani.push( Math.round( value ));
        }
        
        if( ani.length > 0 )
            ani[ ani.length - 1 ] = distance;
        
        return ani;
    }