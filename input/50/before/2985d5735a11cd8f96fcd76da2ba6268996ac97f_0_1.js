function() {
    var args = Array.prototype.slice.call(arguments);
    return args.join(fs.separator);
  }