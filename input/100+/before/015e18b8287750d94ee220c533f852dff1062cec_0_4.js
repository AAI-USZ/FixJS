function(levelname) {
        for( var i=1; i < 15; i++ ) {
            this.createCoin( cc._p(winSize.width/2 + i*35, 60 + i*3) );
        }
    }