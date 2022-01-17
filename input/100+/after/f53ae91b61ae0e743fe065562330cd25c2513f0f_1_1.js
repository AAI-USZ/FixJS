function () {
  this._prepearModify(true);

  var elem = this.elem;
  if (elem.singleton) throw new Error('can not remove content from singleton element');

  // get positions and size
  var before = elem.pos.beforebegin + elem.pos.afterbegin + 1,
      after = elem.pos.beforeend,
      move = before - after; // should be negative or zero

  // remove any node children
  elem.childrens = [];

  // remove content from document
  removeContent(this, before, after);

  // update all other tags (both start and end) there are to follow
  moveTagPointers(elem, move);

  return this;
}