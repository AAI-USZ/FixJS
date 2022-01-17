function(e, scenes, index) {

  var l = this.$handlers && this.$handlers[e.type];

  if (pv.renderer() == 'svgweb' && e.type != 'mousemove') {
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
    if (this.lastDispatchLog[e.type] == index)
      return;
    this.lastDispatchLog[e.type] = index;

    // Ensure if the user mouse-outs of item X, then the mouse
    // in will work, and vice-versa.
    if (e.type == 'mouseover') this.lastDispatchLog['mouseout'] = null;
    if (e.type == 'mouseout') this.lastDispatchLog['mouseover'] = null;
  }

  if (!l) return this.parent
      && this.parent.dispatch(e, scenes.parent, scenes.parentIndex);

  try {
    /* Setup the scene stack. */
    var mark = this;
    do {
      mark.index = index;
      mark.scene = scenes;
      index = scenes.parentIndex;
      scenes = scenes.parent;
    } while (mark = mark.parent);

    /* Execute the event listener. */
    try {
      mark = l.apply(this, this.root.scene.data = argv(this));
    } finally {
      e.preventDefault();
      this.root.scene.data = null;
    }

    /* Update the display. TODO dirtying. */
    if (mark instanceof pv.Mark) mark.render();
  } finally {
    /* Restore the scene stack. */
    var mark = this;
    do {
      if (mark.parent) delete mark.scene;
      delete mark.index;
    } while (mark = mark.parent);
  }
}