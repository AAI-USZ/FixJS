function(event) {
      event.preventDefault();
      var $target = $(event.currentTarget);
      var $element = $target.siblings('.element').clone();

      $element.removeClass('element')
        .addClass('live-element');
      this.trigger('createElement', $element);
    }