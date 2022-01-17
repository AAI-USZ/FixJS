function(e){
          if (disabled) return;
          if (scroller.timeout) 
            clearTimeout(scroller.timeout);
          scroller.calculate()
          scroller.show()   
        }