function(e){
            if(e.touches.length<2){var ev=(e.touches.length)?e.touches[0]:e;ev.original=e;fn.call(this,ev);}
          }