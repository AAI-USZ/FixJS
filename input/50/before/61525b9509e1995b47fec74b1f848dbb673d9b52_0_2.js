function () {
  function Interface(name) {
    this.name = name;
  }
  Interface.prototype = {
    toString: function () {
      return "[interface " + this.name + "]";
    }
  };
  return Interface;
}