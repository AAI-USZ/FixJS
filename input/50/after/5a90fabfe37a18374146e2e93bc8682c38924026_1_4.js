function(data, textStatus, jqXHR) {
      this.$el.addClass('loading');
      this.trigger('uploading');
      this.$input.val('');
    }