function() {
    var regexp;
    regexp = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/g;
    return this.match(regexp) !== null || this.length === 0;
  }