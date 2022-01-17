function(data, textStatus, jqXHR) {
      this.trigger('uploading');
      this.$input.val('');
    }