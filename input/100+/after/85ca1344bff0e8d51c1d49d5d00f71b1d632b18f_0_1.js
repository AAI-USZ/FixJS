function(type, scene, index) {
  var m = scene.mark, p = scene.parent, l = m.$handlers[type];
  if (!l) return p && pv.Mark.dispatch(type, p, scene.parentIndex);
  m.context(scene, index, function() {
      m = l.apply(m, pv.Mark.stack);
      if (m && m.render) m.render();
    });
  return true;
}