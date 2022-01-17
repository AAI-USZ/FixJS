function(page_id, id) {
    var node,
      _this = this;
    node = this.node(page_id, id);
    this.state = 'clicked';
    node.click();
    return setTimeout(function() {
      if (_this.state === 'clicked') {
        _this.state = 'default';
        return _this.sendResponse(true);
      }
    }, 10);
  }