function wrap (pointer) {
  debug('id#wrap()', pointer, pointer.address())
  var rtn = null
  var p = core.objc_getAssociatedObject(pointer, KEY)
  if (p.isNull()) {
    debug('no associated function wrapper... creating')
    rtn = createFunctionWrapper(pointer)
    assert.equal('function', typeof rtn)
    // Store the wrapped instance internally
    var buf = ref.alloc('Object', rtn)
    // XXX: use node-weak to get a callback when the wrapper is GC'd
    core.objc_setAssociatedObject(pointer, KEY, buf, 0)
  } else {
    debug('returning cached associated instance')
    p.type = 'Object'
    rtn = p.deref()
    assert.equal('function', typeof rtn)
  }
  return rtn
}