function(page, options) {
      var $curr, $page;
      $('.active').addClass('curr');
      $curr = $('.curr');
      $page = $(page);
      if (options != null) {
        if (options.reverse === true) {
          $curr.addClass('reverse');
          $page.addClass('reverse');
        }
        $curr.addClass("" + options.transition + " out");
        $page.addClass("" + options.transition + " in active");
        $curr.one('webkitAnimationEnd', function() {
          return $curr.removeClass("" + options.transition + " out active reverse curr");
        });
        return $page.one('webkitAnimationEnd', function() {
          return $page.removeClass("" + options.transition + " in reverse");
        });
      } else {
        $curr.removeClass('active reverse curr');
        $page.addClass('active');
        return $page.removeClass('reverse');
      }
    }