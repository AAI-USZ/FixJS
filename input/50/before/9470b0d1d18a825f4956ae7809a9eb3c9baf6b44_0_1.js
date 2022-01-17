function getTypesClass (sel, isClass) {
  debug('_getTypesClass: %s, isClass: %d', sel, isClass)
  var method = this['get' + (isClass ? 'Class' : 'Instance') + 'Method'](sel)
  return method ? method.getTypes() : null
}