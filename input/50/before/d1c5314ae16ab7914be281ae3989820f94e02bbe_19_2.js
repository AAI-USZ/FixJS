function(e) {
  var t = e.target.$scene;
  if (t) t.scenes.mark.dispatch(e, t.scenes, t.index);
}