function() {
    // We do this check so cursor position doesn't get affected in IE
    var value = get(this, 'value');
    if (value !== this.$().val()) {
      this.$().val(value);
    }
  }