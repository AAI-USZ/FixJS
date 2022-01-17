function(page, options) {
      var $curr, $page;
      $curr = $('.active');
      $page = $(page);
      if (options != null) {
        if (options.reverse === true) {
          $curr.addClass('reverse');
          $page.addClass('reverse');
        }
        $curr.addClass("" + options.transition + " out");
        $page.addClass("" + options.transition + " in active");
        $curr.one('webkitAnimationEnd', function() {
          return $curr.removeClass("" + options.transition + " out active reverse");
        });
        return $page.one('webkitAnimationEnd', function() {
          return $page.removeClass("" + options.transition + " in reverse");
        });
      } else {
        $curr.removeClass('active reverse');
        $page.addClass('active');
        return $page.removeClass('reverse');
      }
    }