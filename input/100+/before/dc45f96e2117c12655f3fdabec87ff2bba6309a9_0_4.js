function(name, readOnly, cb) {
  if (this._state.status < STATES.AUTH)
    throw new Error('Not connected or authenticated');
  if (this._state.status === STATES.BOXSELECTED)
    this._resetBox();
  if (cb === undefined) {
    if (readOnly === undefined)
      cb = emptyFn;
    else
      cb = readOnly;
    readOnly = false;
  }
  this._state.status = STATES.BOXSELECTING;
  this._state.box.name = name;

  this._send((readOnly ? 'EXAMINE' : 'SELECT') + ' "' + utils.escape(name)
             + '"', cb);
}