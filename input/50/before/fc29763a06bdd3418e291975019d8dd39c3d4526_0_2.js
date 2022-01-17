function(e){
          if (scroller.disabled) return;
          if (scroller.timeout) 
            clearTimeout(scroller.timeout);
          scroller.calculate()
          scroller.show()   
        }