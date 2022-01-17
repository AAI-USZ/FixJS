function() {
          $page.removeClass("" + options.transition + " in reverse");
          if (page === '#match') {
            $('#lobby').find('#matches-container').css('height', '0');
          }
          if (page === '#lobby') {
            return $('#match').find('#hand-container').css('height', '0');
          }
        }