function describeOperation(name, op) {
    var str = "  " + name + " (";
    str += op.method.toUpperCase() + " - ";
    str += (op.authed ? "" : "not ") + "authed";
    if (op.args) {
      str += " - " + op.args.join(", ");
    }
    if (op.internal) str += ' - internal';
    str += ")";
    logger.debug(str);
  }