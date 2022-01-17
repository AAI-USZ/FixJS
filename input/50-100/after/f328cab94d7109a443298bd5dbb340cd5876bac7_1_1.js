function(name, map, reduce) {
  var view = {};

  if (reduce) {
    view.reduce = reduce;
  }

  if (map !== undefined) {
    view.map = map;

    this.body('views', name, ((map === null) ? undefined : view));
  }

  return ((map !== undefined) ?
    this :
    (this._body.views) ? this._body.views[name] : undefined
  );
}