function() {
        var $btn = $(this);
        var $element = $btn.siblings('.element');

        if ($element.height() > $btn.height()) {
          $btn.css('margin-top', ($element.height() - $btn.height()) / 2);
        }
      }