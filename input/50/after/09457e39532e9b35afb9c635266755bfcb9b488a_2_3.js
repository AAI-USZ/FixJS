function(){
        updateDisplay(true);
        if (scrollbar.scrollHeight > lastScrollTop)
          scrollbar.scrollTop = lastScrollTop;
      }