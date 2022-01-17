function(){
        target.animate({backgroundColor:orig_color}, 250, null, function(){
          target.removeAttr('style');
        });
      }