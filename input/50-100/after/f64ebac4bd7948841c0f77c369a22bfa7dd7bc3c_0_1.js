function(e) {
      e.preventDefault();
      var $target = $(e.target);
      var uri = $target.attr('href') || $target.parent().attr('href');
      this.vent.trigger('show-docs', { url: uri });
    }