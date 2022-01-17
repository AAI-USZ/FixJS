function handleSwipes(dateInCurrentMonth) {
      var swipe, swipeLeft, startX;

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
        if( Math.abs(e.touches[0].pageX - startX) > 100 ) { 
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
        swipe = false;
      };
    }