function _checkArgument(type, argument) {
    var object = Object.prototype.toString.call(argument).slice(8, -1);

    return argument !== undefined && argument !== null && object === type;
  }