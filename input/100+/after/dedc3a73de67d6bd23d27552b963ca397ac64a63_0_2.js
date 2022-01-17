function (name) {
  if (this.isChunked) throw new Error('can not remove attribute after .append or .done');

  var elem = this.elem;
  if (elem.isRoot) throw new Error('can not remove attribute from root element');

  // attribute do not exist: do nothing
  if (this.hasAttr(name) === false) {
    return this;
  }

  var keys = elem.keys,
      attr = elem.attr[name];

  // get postions and sizes
  var before = elem.pos.beforebegin + attr.start,
      after = before + attr.end,
      move = -attr.end - 1; // should be negative

  // remove element from keys array and attr
  var index = keys.indexOf(name);
  keys.splice(index, 1);
  delete elem.attr[name];

  // remove content from document
  removeContent(this, before, after + 1);

  // move following attibutes
  moveAttibutePointers(elem, index, move);

  // update all other tags (both start and end) there are to follow
  elem.pos.afterbegin += move;
  moveTagPointers(elem, move);

  return this;
}