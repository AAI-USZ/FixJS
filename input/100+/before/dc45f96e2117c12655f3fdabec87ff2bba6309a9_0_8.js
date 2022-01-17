function() {
  this._state.box._uidnext = 0;
  this._state.box.validity = 0;
  this._state.box._flags = [];
  this._state.box._newKeywords = false;
  this._state.box.permFlags = [];
  this._state.box.keywords = [];
  this._state.box.name = null;
  this._state.box.messages.total = 0;
  this._state.box.messages.new = 0;
}