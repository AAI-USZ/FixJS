function () {
    var n = arguments[0] || arguments[0] === 0 || 1;
    if (this.get('path').length) {
      for (var i = 0; i < n; i++) {
        this.get('path').pop();
      }
      this.trigger('change:path');
    }
  }