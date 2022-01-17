function calculateGravity(tipSize, calcPosition){
        /*jshint expr:true */
        
        // <Debug>
        // jquery.tipsy calls this on the element to which it is attached
        (this === $fakeTipTarget[0]) || def.assert();
        // </Debug>
        
        var scrollOffset = pv.scrollOffset(this);
        
        // Obtain desired user gravity
        var gravity = opts.userGravity;
        if(typeof gravity === 'function'){
            gravity = gravity.call(this) || $.fn.tipsy.defaults.gravity;
        }
        
        // backwards compatibility for special gravity, 'c', 
        // added to jquery.tipsy to avoid the style applying to the arrow, 
        // causing it to not show.
        // If you want to hide the arrow, change the style (not per tooltip, though).
        if(gravity === 'c'){
            gravity = 'w';
        }
        
        var bestScore = scoreGravity(gravity);
        if(!bestScore.isTotal){
            // Find the best scored gravity.
            // Start from the position *after* 'gravity' in the gravities array,
            // turning around when the end is reached.
            
            var g = _gravities.indexOf(gravity);
            for(var n = 1, L = _gravities.length ; n < L ; n++){
                var i = (g + n) % L;
                bestScore = chooseScores(bestScore, scoreGravity(_gravities[i]));
            }
            
            if(pvc.debug >= 4 && gravity !== bestScore.gravity){
                pvc.log("[TIPSY] Choosing gravity '" + bestScore.gravity + "' over '" + gravity + "'");
            }
            
            gravity = bestScore.gravity;
        }
        
        if(pvc.debug >= 4) {
            pvc.log("[TIPSY] Gravity '" + gravity + "'");
        }
    
        return gravity;
        
        function scoreGravity(gravity){
            var tp = calcPosition(gravity);
            return scorePosition(gravity, tp);
        }
        
        function scorePosition(gravity, tp){
            var wScore = calcPosScore(tp.left, 'width' );
            var hScore = calcPosScore(tp.top,  'height');
            var isTotal = wScore.fits && hScore.fits;
            
            return {
                gravity:   gravity,
                width:     wScore, 
                height:    hScore,
                value:     wScore.value + hScore.value + (2 - gravity.length), // prefer simple gravities
                isTotal:   isTotal,
                isPartial: !isTotal && (wScore.fits || hScore.fits)
            };
        }
        
        function calcPosScore(absPos, a_len){
            var maxLen = $(window)[a_len]();
            var len  = tipSize[a_len];
            
            var pos  = absPos - scrollOffset[a_len === 'width' ? 0 : 1];
            var opos = maxLen - (pos + len);
            
            var fits = pos >= 0 && opos >= 0;
            
            // Negative positions (off-screen) are amplified 4 times
            // so that they negatively impact the score more than positive ones.
            var value = (pos  >= 0 ?  pos : (4 *  pos)) + 
                        (opos >= 0 ? opos : (4 * opos));
              
            return {fits: fits, value: value};
        }
    }