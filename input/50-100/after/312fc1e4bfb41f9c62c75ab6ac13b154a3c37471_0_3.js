function () {
  var elem = this.elem;
  if (elem.singleton) throw new Error('can not get content from singleton element');

  var pos = elem.pos,
      before = pos.beforebegin + pos.afterbegin + 1,
      after = pos.beforeend;
  return this.document.content.slice(before, after);
}