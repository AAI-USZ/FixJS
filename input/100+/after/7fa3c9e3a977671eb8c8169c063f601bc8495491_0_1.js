function( distance, speed )
        {
            speed  = speed || 0.6 ;
            speed /= 10;

            var 
            ani    = [],
            former = 0,
            ticker = 0,
            value;

            while( true )
            {
                ticker += speed
                value   = Math.sin( ticker );

                if( former >= value )
                    break;

                former = value;

                ani.push( Math.round( value * distance ));
            }

            if( ani.length > 0 )
                ani[ ani.length - 1 ] = distance;

            return ani;
        }