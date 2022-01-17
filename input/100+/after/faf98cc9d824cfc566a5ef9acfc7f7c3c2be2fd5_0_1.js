function msgSend (sel, args) {
  debug('sending message:', sel, args)
  var types = this._getTypes(sel, args)
    , msgSendFunc = core.get_objc_msgSend(types)
    , fullArgs = [this, sel].concat(args)
    , rtn

  debug('msgSend - before:', sel)
  try {
    rtn = msgSendFunc.apply(null, fullArgs)
  } catch (e) {
    if (Buffer.isBuffer(e)) {
      e = exception.wrap(e)
    }
    throw e
  }
  debug('msgSend - after:', sel)
  return rtn
}