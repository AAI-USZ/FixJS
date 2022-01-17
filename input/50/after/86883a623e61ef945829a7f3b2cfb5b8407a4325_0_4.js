function(){
        updateDisplay(true, null, lastScrollTop);
        if (scrollbar.scrollHeight > lastScrollTop)
          scrollbar.scrollTop = lastScrollTop;
      }