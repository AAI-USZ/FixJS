function() {
        if($(this).css("position")=="absolute" || $(this).css("position")=="fixed" ){
          var cur = parseInt($(this).css('zIndex'));
          zi = cur > zi ? parseInt($(this).css('zIndex')) : zi;
        }
      }