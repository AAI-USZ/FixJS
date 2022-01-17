function(){
      if($window.scrollTop() > offset.top + $menu.height() + additionalOffset && !$menu.hasClass('stuck')){
        $menu.addClass('stuck');
        $original.width(originalWidth);
      }
      else if($window.scrollTop() + additionalOffset < offset.top && $menu.hasClass('stuck')){
        $menu.removeClass('stuck');
        $original.width("auto");
      }
    }