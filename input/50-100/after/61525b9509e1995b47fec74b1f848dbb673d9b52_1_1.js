function throwErrorFromVM(errorClass, message) {
  throw new (toplevel.getClass(errorClass)).instance(message);
}