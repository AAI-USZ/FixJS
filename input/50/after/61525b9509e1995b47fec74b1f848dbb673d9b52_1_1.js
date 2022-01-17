function coerce(obj, type) {
  if (obj == null || type.isInstance(obj)) {
    return obj;
  } else {
    throwErrorFromVM("TypeError", "Cannot coerce " + obj + " to type " + type);
  }
}