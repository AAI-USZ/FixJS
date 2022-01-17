function defineConstant (node, fw) {
  var name = node.name
  debug('defineConstant', name)
  var type = getType(node)
  _global.__defineGetter__(name, function () {
    var ptr = fw.lib.get(name) // TODO: Cache the pointer after the 1st call
    ptr._type = '^' + type
    var val = ptr.deref()
    return val
  })
}