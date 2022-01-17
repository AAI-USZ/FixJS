function(response) {
    response = this.parse(response);
    this.add.apply(this, response);
    this.trigger('fetchSuccess', {response: response});
  }