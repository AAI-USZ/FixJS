function(type, scene, index) {
  var m = scene.mark, p = scene.parent, l = m.$handlers[type];

  if (pv.renderer() == 'svgweb' && type != 'mousemove') {
    // In SVGWeb, when nodes are rerendered, the re-render
    // can cause SVGWeb to tirgger a mouseover event for the
    // newly renderer node. As many graphs re-render the same
    // node, changing color etc, this causes an infinite
    // stream of mouseover events.
    //
    // This hack avoids this, by ensuring we don't
    // retrigger if we are getting the same event as last time
    // for the same indexed item, unless it's a mousemove.
    this.lastDispatchLog = this.lastDispatchLog || {};
    if (this.lastDispatchLog[type] == index)
      return;
    this.lastDispatchLog[type] = index;

    // Ensure if the user mouse-outs of item X, then the mouse
    // in will work, and vice-versa.
    if (type == 'mouseover') this.lastDispatchLog['mouseout'] = null;
    if (type == 'mouseout') this.lastDispatchLog['mouseover'] = null;
  }

  if (!l) return p && pv.Mark.dispatch(type, p, scene.parentIndex);
  m.context(scene, index, function() {
      m = l.apply(m, pv.Mark.stack);
      if (m && m.render) m.render();
    });
  return true;
}