function ns_init() {
    window.addEventListener('mozChromeEvent', this);

    this._toasterGD = new GestureDetector(this.toaster);
    ['tap', 'mousedown', 'swipe'].forEach(function(evt) {
      this.container.addEventListener(evt, this);
      this.toaster.addEventListener(evt, this);
    }, this);

    window.addEventListener('utilitytrayshow', this);
  }