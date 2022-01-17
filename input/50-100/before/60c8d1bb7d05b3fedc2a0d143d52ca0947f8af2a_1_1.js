function(){
      if($window.scrollTop() > offset.top + $menu.height() + additionalOffset && !$menu.hasClass('fixed')){
        $menu.addClass('fixed');
        $original.width(originalWidth);
      }
      else if($window.scrollTop() + additionalOffset < offset.top && $menu.hasClass('fixed')){
        $menu.removeClass('fixed');
        $original.width("auto");
      }
    }