function() {
    var result = _.clone(this.defaults);
    result.views = _.clone(this.defaults.views);
    result.code = _.clone(this.defaults.code);
    result.style = _.clone(this.defaults.style);
    return result;
  }