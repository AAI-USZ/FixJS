function (r) {
  var self = this;
  this.handler = function(onChangeEvent) {
    var url = self.history === true ? self.getPath() : onChangeEvent.newURL.replace(/.*#/, '');
    self.dispatch('on', url);
  };

  listener.init(this.handler, this.history);

  if (this.history === false) {
    if (dloc.hash === '' && r) {
      dloc.hash = r;
    } else if (dloc.hash.length > 0) {
      self.dispatch('on', dloc.hash.replace(/^#/, ''));
    }
  }
  else {
    routeTo = dloc.hash === '' && r ? r : dloc.hash.length > 0 ? dloc.hash.replace(/^#/, '') : null;
    if (routeTo) {
      window.history.replaceState({}, document.title, routeTo);
    }

    // Router has been initialized, but due to the chrome bug it will not
    // yet actually route HTML5 history state changes. Thus, decide if should route.
    if (routeTo || this.run_in_init === true) {
      this.handler();
    }
  }

  return this;
}