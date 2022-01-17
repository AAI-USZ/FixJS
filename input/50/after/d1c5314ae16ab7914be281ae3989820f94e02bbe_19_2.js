function(e) {
  var t = e.target.$scene;
  if (t) pv.Mark.dispatch(e, t.scenes, t.index);
}