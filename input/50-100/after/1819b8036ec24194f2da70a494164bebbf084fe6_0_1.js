function () {
    var _this = this;

    this.el.on('change', this.options.target, function () {
      _this.el.submit();
    });

    if (this.options.button) {
      this.$(this.options.button).hide();
    }
  }