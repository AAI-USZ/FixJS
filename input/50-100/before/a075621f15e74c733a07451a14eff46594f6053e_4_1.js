function() {
        var $btn = $(this);
        var $element = $btn.siblings('.element');
        $btn.css('margin-top', ($element.height() - $btn.height()) / 2);
      }