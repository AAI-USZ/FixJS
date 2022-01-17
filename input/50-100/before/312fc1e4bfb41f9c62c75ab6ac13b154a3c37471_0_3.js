function () {
  var elem = this.elem;
  if (elem.singleton) throw new Error('can not get content from singleton element');

  var pos = elem.pos;
  return this.document.content.slice(pos.afterbegin, pos.beforeend);
}