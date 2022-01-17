function(e) {
      e.preventDefault();
      this.vent.trigger('show-docs', { url: $(e.target).attr('href') });
    }