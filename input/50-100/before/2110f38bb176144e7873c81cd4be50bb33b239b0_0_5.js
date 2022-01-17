function(obsolete, node) {
      var click,
        _this = this;
      this.state = 'clicked';
      click = node.click();
      return setTimeout(function() {
        if (_this.state === 'clicked') {
          _this.state = 'default';
          if (click instanceof Poltergeist.ClickFailed) {
            return _this.owner.sendError(click);
          } else {
            return _this.sendResponse(true);
          }
        }
      }, 10);
    }