function observe (object, name, callback) {
  E.observe.apply(this, arguments);
  this._handles.push(arguments);
  return this;
}