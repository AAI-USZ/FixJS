function(e){
        if( Math.abs(e.touches[0].pageX - startX) > 100 ) { 
          if( (e.touches[0].pageX - startX) > 5 ) { 
            swipeLeft = true;
          } else {
            swipeLeft = false;
          }
          swipe = true;
        }
      }