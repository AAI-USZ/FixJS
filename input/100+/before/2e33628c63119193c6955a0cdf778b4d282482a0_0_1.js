function(page, options) {
      var $curr, $page;
      $('.active').addClass('curr');
      $curr = $('.curr');
      $page = $(page);
      if (page === '#match') {
        $('#match').find('#hand-container').css('height', '237px');
      }
      if (page === '#lobby') {
        $('#lobby').find('#matches').css('height', '340px');
      }
      if (options != null) {
        if (options.reverse === true) {
          $curr.addClass('reverse');
          $page.addClass('reverse');
        }
        $page.css("z-index", -10);
        $curr.addClass("" + options.transition + " out");
        $page.addClass("" + options.transition + " in active");
        $page.css("z-index", "");
        $curr.one('webkitAnimationEnd', function() {
          return $curr.removeClass("" + options.transition + " out active reverse curr");
        });
        return $page.one('webkitAnimationEnd', function() {
          $page.removeClass("" + options.transition + " in reverse");
          if (page === '#match') {
            $('#lobby').find('#matches').css('height', '0');
          }
          if (page === '#lobby') {
            return $('#match').find('#hand-container').css('height', '0');
          }
        });
      } else {
        $curr.removeClass('active reverse curr');
        $page.addClass('active');
        return $page.removeClass('reverse');
      }
    }