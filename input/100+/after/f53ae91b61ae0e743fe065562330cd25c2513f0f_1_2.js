function (content) {
  this._prepearModify(true);

  var elem = this.elem;
  if (elem.singleton) throw new Error('can not set content to singleton element');

  // get postions and sizes
  var before = elem.pos.beforebegin + elem.pos.afterbegin + 1,
      after = elem.pos.beforeend,
      length = content.length,
      move = before - after + length; // should be negative

  // remove any node children
  elem.childrens = [];

  // remove content from document
  replaceContent(this, before, after, content);

  // update all other tags (both start and end) there are to follow
  moveTagPointers(elem, move);

  return this;
}