function(e){
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
      }