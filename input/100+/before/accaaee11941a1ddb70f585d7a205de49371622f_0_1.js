function () {
  this._prepearModify(false);

  var elem = this.elem;
  var before = elem.pos.beforebegin,
      after = elem.pos.beforeend + elem.pos.afterend + 1,
      move = before - after;

  // remove content from document
  removeContent(this, before, after);

  // update all other tags (both start and end) there are to follow
  moveParentSiblings(elem, move);

  // remove this node from parent
  var childrens = elem.parent.childrens;
  childrens.splice(childrens.indexOf(elem), 1);

  return this;
}