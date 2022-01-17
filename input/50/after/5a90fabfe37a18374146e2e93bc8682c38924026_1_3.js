function(jqXHR) {
      this.$el.removeClass('loading');
      this.trigger('fail', JSON.parse(jqXHR.responseText), jqXHR);
    }