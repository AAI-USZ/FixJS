function describeOperation(name, op) {
    var str = "  " + name + " (";
    str += op.method.toUpperCase() + " - ";
    str += (op.authed ? "" : "not ") + "authed";
    if (op.args) {
      var keys = Array.isArray(op.args) ? op.args : Object.keys(op.args);
      str += " - " + keys.join(", ");
    }
    if (op.internal) str += ' - internal';
    str += ")";
    logger.debug(str);
  }