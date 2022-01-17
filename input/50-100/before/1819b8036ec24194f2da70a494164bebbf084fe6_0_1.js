function () {
    var _this = this;

    this.el.on('change', this.options.target, function () {
      _this.el.submit();
    });

    if (this.options.button) {
      _this.sandbox.$(_this.options.button).hide();
    }
  }