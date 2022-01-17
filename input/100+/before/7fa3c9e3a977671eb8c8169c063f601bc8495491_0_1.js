function( distance, speed )
        {
            speed = speed || 0.1;

            var animation = [],
                former    = 0,
                ticker    = ( Math.PI / 2 ) * - 1,
                value;

            while( true )
            {
                ticker += speed
                value   = ( Math.sin( ticker ) + 1 ) / 2;

                if( former >= value )
                    break;

                former = value;

                animation.push( Math.round( value * distance ));
            }

            if( animation.length > 0 )
                animation[ animation.length - 1 ] = distance;

            return animation;
        }