function(lvl) {
        if( lvl == 0 ) {
            // Coins
            var coins = level0['coins']; 
            for( var i=0;i < coins.length; i++) {
                var coin = coins[i];
                this.createCoin( cc._p( coin.x, coin.y) ); 
            }

            // car
            var car = level0['car'];
            this.createCar( cp.v( car.x, car.y) );

            // Segments
            var segments = level0['segments']; 
            for( var i=0; i < segments.length; i++) {
                var segment = segments[i];
                this.createSegment( cp._v(segment.x0, segment.y0), cp._v(segment.x1, segment.y1) ); 
            }

            //lines  
            var p = {x:0, y:0};
            var lines = level0['lines']; 
            for( var i=0; i < lines.length; i++) {
                var line = lines[i];
                if( i > 0 ) {
                    this.createSegment( cp._v(p.x, p.y), cp._v( p.x+line.x, p.y+line.y )  ); 
                }

                p = {x:p.x+line.x, y:p.y+line.y};
            }
        }
    }