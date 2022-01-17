function (where, content) {
  this._prepearModify(true);

  if (insertAdjacentMethods.hasOwnProperty(where) === false) {
    throw new Error('did not understand first argument');
  }

  insertAdjacent(this, where, content);

  return this;
}