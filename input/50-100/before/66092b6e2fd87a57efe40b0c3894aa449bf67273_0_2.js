function( pixelScores, rLeft, rWidth, score ) {
        var iend = rLeft+rWidth;
        for( var i = rLeft; i < iend; i++ ) {
            pixelScores[i] = Math.max( pixelScores[i] || -Infinity, score );
        }
    }