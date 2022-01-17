function translateError(error) {
  if (error instanceof Error) {
    var type = toplevel.getTypeByName(Multiname.fromSimpleName(error.name), true, true);
    if (type) {
      return new type.instance(error.message);
    }
    unexpected("Can't translate error: " + error);
  }
  return error;
}