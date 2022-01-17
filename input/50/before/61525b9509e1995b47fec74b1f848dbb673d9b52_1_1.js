function coerce(obj, type) {
  if (type.isInstance(obj)) {
    return obj;
  } else {
    return null;
  }
}