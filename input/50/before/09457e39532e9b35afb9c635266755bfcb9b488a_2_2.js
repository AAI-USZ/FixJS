function(){
        updateDisplay(true);
        if (scroller.scrollHeight > lastScrollPos)
          scroller.scrollTop = lastScrollPos;
      }