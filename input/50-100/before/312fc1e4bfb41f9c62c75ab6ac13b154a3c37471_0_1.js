function (where, content) {
  if (this.isChunked) throw new Error('can not insert content after .append or .done');

  var elem = this.elem;

  if (insertAdjacentMethods.hasOwnProperty(where) === false) {
    throw new Error('did not understand first argument');
  }

  insertAdjacent(this.elem, where, content);

  return this;
}