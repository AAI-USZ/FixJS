function(e) {
      var reverse;
      if ($(this).attr('href')) {
        e.preventDefault();
        reverse = false;
        if ($(this).attr('data-transition') === 'reverse') {
          reverse = true;
        }
        return changePage($(this).attr('href'), {
          transition: 'slide',
          reverse: reverse
        });
      }
    }