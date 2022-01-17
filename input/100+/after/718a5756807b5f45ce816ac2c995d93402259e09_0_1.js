function handleSwipes(dateInCurrentMonth) {
      var swipe, swipeLeft, startX, startY, deltaX;

      container.ontouchend = function(e) {
        //swipe left
        if( swipeLeft && swipe ) { 
          incrementMonth(-1, dateInCurrentMonth);
          e.stopPropagation();
        //swipe right
        } else if(swipe) {
          incrementMonth(1, dateInCurrentMonth);
          e.stopPropagation();          
        }       
      };

      container.ontouchmove = function(e){
        deltaX = Math.abs(e.touches[0].pageX - startX);
        if ( deltaX > Math.abs(e.touches[0].pageY - startY) ) {
          // this prevents vertical scrolling, when user wants to swipe.
          e.preventDefault(); 
        }
        if( deltaX > 100 ) { 
          if( (e.touches[0].pageX - startX) > 5 ) { 
            swipeLeft = true;
          } else {
            swipeLeft = false;
          }
          swipe = true;
        }
      };

      container.ontouchstart = function(e) {
        startX = e.touches[0].pageX;
        startY = e.touches[0].pageY;
        swipe = false;
      };
    }