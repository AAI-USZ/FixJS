function(e){
        if (disabled) return;
        if (slowMode && scroller.scrolling) return;

        scroller.calculate(e);
        
        for (var i = 0; i< scroller.scrollCallbacks.length; i++){
          scroller.scrollCallbacks[i](e);
        }
        
        if (slowMode){
          scroller.scrolling = true; 
          setTimeout(function(){delete scroller.scrolling}, 500)
        }
      }