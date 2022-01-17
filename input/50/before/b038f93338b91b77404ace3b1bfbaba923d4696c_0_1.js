function (prop) {
  if (!bindings.hasOwnProperty(prop)) {
    return debug('skipping exporting of non-existant property: %s', prop)
  }
  var desc = Object.getOwnPropertyDescriptor(bindings, prop)
  Object.defineProperty(exports, prop, desc)
}