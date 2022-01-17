function (content) {
  this._prepearModify(false);

  var elem = this.elem;
  if (elem.singleton) throw new Error('can not append to singleton element');

  // append content
  insertAdjacent(this, 'beforeend', content);

  // just append content if this is an subcontainer
  if (!this.isContainer) return this;

  // set modify of flag
  this._childModify(false);

  // send next content chunk
  this.document._send(this);

  return this;
}