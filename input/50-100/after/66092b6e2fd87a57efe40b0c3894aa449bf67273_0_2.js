function( pixelScores, rLeft, rWidth, score ) {
        var iend = rLeft+rWidth;
        for( var i = rLeft; i < iend; i++ ) {
            pixelScores[i] = i in pixelScores ? Math.max( pixelScores[i], score ) : score;
        }
    }