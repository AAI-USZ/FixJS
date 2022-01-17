function(response) {
    response = this.parse(response);
    var list = response;
    if (!(list instanceof Array)) {
      this.apply(response);
      list = response[this.itemsProperty];
    }
    this.add.apply(this, list);
    this.trigger('fetchSuccess', {response: response});
  }